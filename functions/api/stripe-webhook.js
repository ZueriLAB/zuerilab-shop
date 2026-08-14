javascript
import Stripe from "stripe";

export async function onRequestPost({ request, env }) {
  try {
    if (!env.STRIPE_SECRET_KEY) {
      return new Response("STRIPE_SECRET_KEY fehlt", { status: 500 });
    }

    if (!env.STRIPE_WEBHOOK_SECRET) {
      return new Response("STRIPE_WEBHOOK_SECRET fehlt", { status: 500 });
    }

    if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.ADMIN_ORDER_EMAIL) {
      return new Response("Resend ENV Variablen fehlen", { status: 500 });
    }

    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Stripe-Signatur fehlt", { status: 400 });
    }

    const body = await request.text();

    let event;

    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("Stripe Webhook Signaturfehler:", error);
      return new Response("Ungültige Stripe-Signatur", { status: 400 });
    }

    if (event.type !== "checkout.session.completed") {
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const session = event.data.object;

    const orderNumber = session.metadata?.orderNumber || session.id;
    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      console.error("Keine Kunden-E-Mail vorhanden.");
      return new Response("Kunden-E-Mail fehlt", { status: 400 });
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(
      session.id,
      { limit: 100 }
    );

    const productsHtml = lineItems.data
      .map((item) => {
        const name = item.description || "Produkt";
        const quantity = item.quantity || 1;
        const amount = ((item.amount_total || 0) / 100).toFixed(2);

        return `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eee;">
              ${name}
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;">
              ${quantity}
            </td>
            <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;">
              ${amount} CHF
            </td>
          </tr>
        `;
      })
      .join("");

    const total = ((session.amount_total || 0) / 100).toFixed(2);

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;">
        <h1>Bestellung erhalten ✓</h1>

        <p>Vielen Dank für deine Bestellung bei SwissPharmaLab.</p>

        <p>
          <strong>Bestellnummer:</strong> ${orderNumber}
        </p>

        <h2>Bestellübersicht</h2>

        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th align="left">Produkt</th>
              <th align="left">Menge</th>
              <th align="right">Preis</th>
            </tr>
          </thead>

          <tbody>
            ${productsHtml}
          </tbody>
        </table>

        <h2 style="text-align:right;">
          Gesamt: ${total} CHF
        </h2>

        <p>
          Zahlung erfolgreich per Kreditkarte.
        </p>

        <p>
          SwissPharmaLab
        </p>
      </div>
    `;

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;">
        <h1>Neue Bestellung</h1>

        <p>
          <strong>Bestellnummer:</strong> ${orderNumber}<br>
          <strong>Kunde:</strong> ${customerEmail}<br>
          <strong>Betrag:</strong> ${total} CHF
        </p>

        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th align="left">Produkt</th>
              <th align="left">Menge</th>
              <th align="right">Preis</th>
            </tr>
          </thead>

          <tbody>
            ${productsHtml}
          </tbody>
        </table>
      </div>
    `;

    const headers = {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    };

    const [customerRes, adminRes] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers,
        body: JSON.stringify({
          from: env.RESEND_FROM_EMAIL,
          to: [customerEmail],
          subject: `Bestellbestätigung ${orderNumber}`,
          html: customerHtml,
        }),
      }),

      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers,
        body: JSON.stringify({
          from: env.RESEND_FROM_EMAIL,
          to: [env.ADMIN_ORDER_EMAIL],
          subject: `Neue Bestellung ${orderNumber}`,
          html: adminHtml,
          reply_to: customerEmail,
        }),
      }),
    ]);

    if (!customerRes.ok || !adminRes.ok) {
      const customerError = await customerRes.text();
      const adminError = await adminRes.text();

      console.error("Resend Fehler:", {
        customerError,
        adminError,
      });

      return new Response("E-Mail Versand fehlgeschlagen", {
        status: 500,
      });
    }

    console.log("Bestellmails erfolgreich versendet:", orderNumber);

    return new Response(
      JSON.stringify({
        received: true,
        emailsSent: true,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Webhook Fehler:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Webhook Fehler",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

