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
            <td style="padding:10px 8px;border-bottom:1px solid #2a2a2a;color:#ffffff;">${item.title}</td>
            <td style="padding:10px 8px;border-bottom:1px solid #2a2a2a;color:#ffffff;">${item.quantity}</td>
            <td style="padding:10px 8px;border-bottom:1px solid #2a2a2a;color:#ffffff;">${item.price}</td>
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
      <div style="background:#0b0b0b;padding:30px;font-family:Arial,sans-serif;color:#ffffff;">
        <div style="max-width:680px;margin:0 auto;">

          <div style="text-align:center;margin-bottom:30px;">
            <img
              src="https://www.swisspharmalab.ch/logo1.png"
              alt="SwissPharmaLab"
              style="max-width:180px;height:auto;display:inline-block;"
            />
          </div>

          <div style="text-align:center;margin-bottom:28px;">
            <h1 style="margin:0;font-size:32px;line-height:1.2;color:#ffffff;">
              Bestellung erhalten
            </h1>
            <p style="margin:12px 0 0 0;font-size:18px;color:#d1d5db;">
              Vielen Dank für deine Bestellung bei SwissPharmaLab
            </p>
            <p style="margin:10px 0 0 0;font-size:16px;color:#d1d5db;">
              Deine Bestelldetails und Zahlungsinformationen findest du unten in dieser E-Mail.
            </p>
          </div>

          <div style="background:#111111;border:1px solid #222222;border-radius:16px;padding:18px 20px;margin-bottom:18px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tr>
                <td style="font-size:16px;color:#facc15;font-weight:700;padding-bottom:8px;">
                  Bestellübersicht
                </td>
              </tr>
              <tr>
                <td style="font-size:15px;color:#ffffff;padding-bottom:6px;">
                  <strong>Bestellnummer:</strong> ${orderNumber}
                </td>
              </tr>
              <tr>
                <td style="font-size:15px;color:#ffffff;">
                  <strong>Datum:</strong> ${date}
                </td>
              </tr>
            </table>
          </div>

          <div style="background:#111111;border:1px solid #222222;border-radius:16px;padding:20px;margin-bottom:18px;">
            <div style="font-size:16px;color:#facc15;font-weight:700;margin-bottom:10px;">
              Zu zahlender Betrag
            </div>
            <div style="font-size:38px;line-height:1.1;font-weight:800;color:#ffffff;">
              ${Number(total).toFixed(2)} CHF
            </div>
          </div>

          <div style="background:#111111;border:1px solid #222222;border-radius:16px;padding:20px;margin-bottom:18px;">
            <h2 style="margin:0 0 14px 0;font-size:22px;color:#ffffff;">Bestelldetails</h2>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;color:#ffffff;">
              <thead>
                <tr>
                  <th align="left" style="padding:10px 8px;border-bottom:1px solid #2a2a2a;color:#facc15;font-size:14px;">
                    Produkt
                  </th>
                  <th align="left" style="padding:10px 8px;border-bottom:1px solid #2a2a2a;color:#facc15;font-size:14px;">
                    Menge
                  </th>
                  <th align="left" style="padding:10px 8px;border-bottom:1px solid #2a2a2a;color:#facc15;font-size:14px;">
                    Preis
                  </th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <p style="margin:16px 0 0 0;font-size:16px;color:#ffffff;">
              <strong>Gesamt:</strong> ${Number(total).toFixed(2)} CHF
            </p>
          </div>

          <div style="background:#111111;border:1px solid #222222;border-radius:16px;padding:20px;margin-bottom:18px;">
            <h2 style="margin:0 0 14px 0;font-size:22px;color:#ffffff;">Lieferadresse</h2>

            <p style="margin:0 0 8px 0;color:#ffffff;">
              ${shippingAddress}
            </p>

            ${form.phone ? `<p style="margin:0 0 8px 0;color:#ffffff;"><strong>Telefon:</strong> ${form.phone}</p>` : ""}
            ${form.notes ? `<p style="margin:0;color:#ffffff;"><strong>Anmerkungen:</strong><br/>${form.notes}</p>` : ""}
          </div>

          <div style="background:#111111;border:1px solid #222222;border-radius:16px;padding:20px;margin-bottom:18px;">
            <h2 style="margin:0 0 14px 0;font-size:22px;color:#facc15;">Zahlungsanleitung</h2>

            <p style="margin:0 0 18px 0;color:#d1d5db;font-size:15px;line-height:1.6;">
              Bitte führe jetzt die Zahlung über eine der folgenden Optionen durch.
              Nach erfolgreicher Prüfung wird deine Bestellung bearbeitet und versendet.
            </p>

            <div style="border:1px solid #2a2a2a;border-radius:14px;padding:18px;margin-bottom:18px;">
              <h3 style="margin:0 0 12px 0;font-size:19px;color:#facc15;">
                Option 1: Bezahlung via Kreditkarte (Bitcoin über Ramp)
              </h3>

              <ol style="margin:0 0 14px 0;padding-left:20px;color:#ffffff;line-height:1.8;">
                <li>Gehe auf www.rampnetwork.com</li>
                <li>Wähle „Bitcoin kaufen“.</li>
                <li>Logge dich ein oder erstelle ein Konto.</li>
                <li>Gib den Betrag von <strong>${Number(total).toFixed(2)} CHF</strong> ein.</li>
                <li>Trage unsere Bitcoin Wallet Adresse als Empfänger ein.</li>
                <li>Bezahle bequem mit deiner Kreditkarte.</li>
                <li>Sende uns danach einen Screenshot oder Zahlungsnachweis, indem du einfach auf diese E-Mail antwortest.</li>
              </ol>

              <div style="margin:14px 0 10px 0;font-size:15px;color:#facc15;font-weight:700;">
                Bitcoin Wallet Adresse
              </div>

              <div style="background:#0b0b0b;border:1px solid #2a2a2a;border-radius:10px;padding:12px;font-family:monospace;font-size:14px;color:#ffffff;word-break:break-all;">
                3M6rjxUfiLU18UMnpMMJwW2KTxa8fC4wpA
              </div>

              <div style="text-align:center;margin:18px 0 8px 0;">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=bitcoin:3M6rjxUfiLU18UMnpMMJwW2KTxa8fC4wpA"
                  alt="Bitcoin QR Code"
                  style="width:220px;max-width:100%;height:auto;border-radius:12px;background:#ffffff;padding:10px;display:inline-block;"
                />
              </div>

              <p style="margin:12px 0 0 0;color:#d1d5db;font-size:15px;line-height:1.6;">
                Die Transaktion dauert in der Regel nur wenige Minuten
                (ca. 3–4 Minuten). Deine Bestellnummer ist bereits im Betreff dieser E-Mail enthalten.
              </p>
            </div>

            <div style="border:1px solid #2a2a2a;border-radius:14px;padding:18px;">
              <h3 style="margin:0 0 12px 0;font-size:19px;color:#facc15;">
                Option 2: Paysafe
              </h3>

              <ol style="margin:0 0 12px 0;padding-left:20px;color:#ffffff;line-height:1.8;">
                <li>Kaufe Paysafe Guthaben bei einem SBB Schalter, k kiosk oder in der PostFinance App.</li>
                <li>Der Betrag kann frei gewählt werden, insgesamt müssen <strong>${Number(total).toFixed(2)} CHF</strong> erreicht werden.</li>
                <li>Sende uns den Paysafe Code, indem du einfach auf diese E-Mail antwortest.</li>
                <li>Nach erfolgreicher Prüfung wird deine Bestellung bearbeitet und versendet.</li>
              </ol>

              <p style="margin:0;color:#d1d5db;font-size:15px;line-height:1.6;">
                Deine Bestellnummer ist bereits im Betreff dieser E-Mail enthalten.
              </p>
            </div>
          </div>

          <div style="text-align:center;padding:10px 0 0 0;">
            <p style="margin:0 0 10px 0;color:#d1d5db;font-size:15px;">
              Wir melden uns, sobald deine Bestellung bearbeitet wurde.
            </p>
            <p style="margin:0;color:#6b7280;font-size:13px;">
              SwissPharmaLab
            </p>
          </div>
        </div>
      </div>
    `;

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#111;">
        <h2>Neue Bestellung eingegangen</h2>

        <p>
          <strong>Bestellnummer:</strong> ${orderNumber}<br/>
          <strong>Datum:</strong> ${date}<br/>
          <strong>Gesamt:</strong> ${Number(total).toFixed(2)} CHF
        </p>

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
            ${cart
              .map(
                (item) => `
                  <tr>
                    <td style="padding:8px;border-bottom:1px solid #eee;">${item.title}</td>
                    <td style="padding:8px;border-bottom:1px solid #eee;">${item.quantity}</td>
                    <td style="padding:8px;border-bottom:1px solid #eee;">${item.price}</td>
                  </tr>
                `
              )
              .join("")}
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