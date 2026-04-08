export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

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
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#111;line-height:1.6;">
        <h2 style="margin-bottom:8px;">Vielen Dank für deine Bestellung bei SwissPharmaLab</h2>
        <p>Deine Bestellung ist bei uns eingegangen.</p>

        <div style="background:#f8f8f8;border:1px solid #ddd;border-radius:10px;padding:16px;margin:20px 0;">
          <p style="margin:0 0 6px 0;"><strong>Bestellnummer:</strong> ${orderNumber}</p>
          <p style="margin:0;"><strong>Datum:</strong> ${date}</p>
        </div>

        <div style="background:#f8f8f8;border:1px solid #ddd;border-radius:10px;padding:16px;margin:20px 0;">
          <h3 style="margin:0 0 8px 0;">Zu zahlender Betrag</h3>
          <p style="font-size:28px;font-weight:bold;margin:0;">${total.toFixed(2)} CHF</p>
        </div>

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

        ${form.phone ? `<p><strong>Telefon:</strong> ${form.phone}</p>` : ""}
        ${form.notes ? `<p><strong>Anmerkungen:</strong><br/>${form.notes}</p>` : ""}

        <hr style="margin:28px 0;border:none;border-top:1px solid #ddd;" />

        <h3>Zahlungsanleitung</h3>
        <p>
          Bitte führe jetzt die Zahlung über eine der folgenden Optionen durch.
          Nach erfolgreicher Prüfung wird deine Bestellung bearbeitet und versendet.
        </p>

        <div style="border:1px solid #ddd;border-radius:10px;padding:16px;margin:20px 0;">
          <h3 style="margin-top:0;">Option 1: Bezahlung via Kreditkarte (Bitcoin über Ramp)</h3>
          <ol style="padding-left:20px;margin-bottom:12px;">
            <li>Gehe auf www.rampnetwork.com</li>
            <li>Wähle „Bitcoin kaufen“.</li>
            <li>Logge dich ein oder erstelle ein Konto.</li>
            <li>Gib den Betrag von <strong>${total.toFixed(2)} CHF</strong> ein.</li>
            <li>Trage unsere Bitcoin Wallet Adresse als Empfänger ein.</li>
            <li>Bezahle bequem mit deiner Kreditkarte.</li>
            <li>Sende uns danach einen Screenshot oder Zahlungsnachweis, indem du einfach auf diese E-Mail antwortest.</li>
          </ol>

          <p style="margin-bottom:8px;"><strong>Bitcoin Wallet Adresse:</strong></p>
          <p style="word-break:break-all;font-family:monospace;background:#f8f8f8;padding:10px;border-radius:6px;margin-top:0;">
            3M6rjxUfiLU18UMnpMMJwW2KTxa8fC4wpA
          </p>

          <p style="margin-top:12px;">
            Die Transaktion dauert in der Regel nur wenige Minuten
            (ca. 3–4 Minuten). Deine Bestellnummer ist bereits im Betreff dieser E-Mail enthalten.
          </p>
        </div>

        <div style="border:1px solid #ddd;border-radius:10px;padding:16px;margin:20px 0;">
          <h3 style="margin-top:0;">Option 2: Paysafe</h3>
          <ol style="padding-left:20px;margin-bottom:12px;">
            <li>Kaufe Paysafe Guthaben bei einem SBB Schalter, k kiosk oder in der PostFinance App.</li>
            <li>Der Betrag kann frei gewählt werden, insgesamt müssen <strong>${total.toFixed(2)} CHF</strong> erreicht werden.</li>
            <li>Sende uns den Paysafe Code, indem du einfach auf diese E-Mail antwortest.</li>
            <li>Nach erfolgreicher Prüfung wird deine Bestellung bearbeitet und versendet.</li>
          </ol>

          <p style="margin:0;">
            Deine Bestellnummer ist bereits im Betreff dieser E-Mail enthalten.
          </p>
        </div>

        <p style="margin-top:24px;">
          Wir melden uns, sobald deine Bestellung bearbeitet wurde.
        </p>
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

        ${form.notes ? `<p><strong>Notiz:</strong><br/>${form.notes}</p>` : ""}

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

    if (!env.RESEND_API_KEY || !fromEmail || !adminEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Fehlende ENV Variablen für Mailversand",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

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