export async function onRequestGet(context) {
  return new Response(
    JSON.stringify({
      ok: true,
      message: "API lebt",
      hasResendKey: !!context.env.RESEND_API_KEY,
      hasFromEmail: !!context.env.RESEND_FROM_EMAIL,
      hasAdminEmail: !!context.env.ADMIN_ORDER_EMAIL,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  try {
    const { request, env } = context;
    const body = await request.json();
    const data = await res.json();
console.log("API response:", data);
alert(JSON.stringify(data));

    const { orderNumber, date, total, cart, form } = body || {};

    if (!orderNumber || !form?.email || !Array.isArray(cart)) {
      return new Response(
        JSON.stringify({ success: false, error: "Ungültige Bestelldaten" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const itemsHtml = cart
      .map(
        (item) => `
          <tr>
            <td style="padding:8px;border-bottom:1px solid #eee;">${item.title}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;">${item.quantity}</td>
            <td style="padding:8px;border-bottom:1px solid #eee;">${item.price}</td>
          </tr>
        `
      )
      .join("");

    const shippingAddress = `
      ${form.firstName} ${form.lastName}<br/>
      ${form.street}<br/>
      ${form.addressExtra ? form.addressExtra + "<br/>" : ""}
      ${form.zip} ${form.city}<br/>
      ${form.country}
    `;

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#111;">
        <h2>Vielen Dank für deine Bestellung bei SwissPharmaLab</h2>
        <p>Deine Bestellung ist bei uns eingegangen.</p>

        <p><strong>Bestellnummer:</strong> ${orderNumber}<br/>
        <strong>Datum:</strong> ${date}</p>

        <h3>Bestellübersicht</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th align="left" style="padding:8px;border-bottom:2px solid #ddd;">Produkt</th>
              <th align="left" style="padding:8px;border-bottom:2px solid #ddd;">Menge</th>
              <th align="left" style="padding:8px;border-bottom:2px solid #ddd;">Preis</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p style="margin-top:16px;"><strong>Gesamt:</strong> ${total.toFixed(2)} CHF</p>

        <h3>Lieferadresse</h3>
        <p>${shippingAddress}</p>

        ${
          form.phone
            ? `<p><strong>Telefon:</strong> ${form.phone}</p>`
            : ""
        }

        ${
          form.notes
            ? `<p><strong>Anmerkungen:</strong><br/>${form.notes}</p>`
            : ""
        }

        <p style="margin-top:24px;">Wir melden uns, sobald deine Bestellung bearbeitet wurde.</p>
      </div>
    `;

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#111;">
        <h2>Neue Bestellung eingegangen</h2>

        <p><strong>Bestellnummer:</strong> ${orderNumber}<br/>
        <strong>Datum:</strong> ${date}<br/>
        <strong>Gesamt:</strong> ${total.toFixed(2)} CHF</p>

        <h3>Kundendaten</h3>
        <p>
          ${form.firstName} ${form.lastName}<br/>
          ${form.email}<br/>
          ${form.phone || "-"}
        </p>

        <h3>Adresse</h3>
        <p>${shippingAddress}</p>

        ${
          form.notes
            ? `<p><strong>Notiz:</strong><br/>${form.notes}</p>`
            : ""
        }

        <h3>Produkte</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th align="left" style="padding:8px;border-bottom:2px solid #ddd;">Produkt</th>
              <th align="left" style="padding:8px;border-bottom:2px solid #ddd;">Menge</th>
              <th align="left" style="padding:8px;border-bottom:2px solid #ddd;">Preis</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>
    `;

    const resendEndpoint = "https://api.resend.com/emails";
    const fromEmail = env.RESEND_FROM_EMAIL;
    const adminEmail = env.ADMIN_ORDER_EMAIL;

    const sendCustomer = fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [form.email],
        subject: `Bestellbestätigung ${orderNumber}`,
        html: customerHtml,
      }),
    });

    const sendAdmin = fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        subject: `Neue Bestellung ${orderNumber}`,
        html: adminHtml,
        reply_to: form.email,
      }),
    });

    const [customerRes, adminRes] = await Promise.all([sendCustomer, sendAdmin]);

    if (!customerRes.ok || !adminRes.ok) {
      const customerErr = await customerRes.text();
      const adminErr = await adminRes.text();

      return new Response(
        JSON.stringify({
          success: false,
          error: "E-Mail Versand fehlgeschlagen",
          details: { customerErr, adminErr },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Serverfehler",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}