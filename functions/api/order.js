export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const { orderNumber, date, total, cart, form } = body || {};

    if (!orderNumber || !form?.email || !Array.isArray(cart)) {
      return new Response(
        JSON.stringify({ success: false, error: "Ungültige Bestelldaten" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const totalFormatted = `${Number(total).toFixed(2)} CHF`;

    const shippingAddress = `
      ${form.firstName} ${form.lastName}<br/>
      ${form.street}<br/>
      ${form.addressExtra ? form.addressExtra + "<br/>" : ""}
      ${form.zip} ${form.city}<br/>
      ${form.country}
    `;

    const itemsHtml = cart
      .map(
        (item) => `
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid #e5e5e5;">
              <div style="display:flex;align-items:center;gap:12px;">
                <img
                  src="https://www.swisspharmalab.ch${item.image}"
                  alt="${item.title}"
                  style="width:58px;height:58px;object-fit:contain;border:1px solid #e5e5e5;border-radius:12px;background:#fff;"
                />
                <div>
                  <div style="font-size:15px;font-weight:700;color:#111;">
                    ${item.title}
                    ${item.variant ? ` – ${item.variant}` : ""}
                    ${item.dose ? ` – ${item.dose}` : ""}
                  </div>
                  <div style="font-size:13px;color:#666;margin-top:4px;">
                    Menge: ${item.quantity}
                  </div>
                </div>
              </div>
            </td>
            <td style="padding:14px 0;border-bottom:1px solid #e5e5e5;text-align:right;font-size:15px;font-weight:700;color:#111;">
              ${item.price}
            </td>
          </tr>
        `
      )
      .join("");

    const customerHtml = `
      <div style="background:#f5f5f5;padding:30px;font-family:Arial,sans-serif;color:#111;">
        <div style="max-width:760px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #e5e5e5;box-shadow:0 20px 50px rgba(0,0,0,.08);">

          <div style="text-align:center;margin-bottom:28px;">
            <img
              src="https://www.swisspharmalab.ch/logo1.png"
              alt="SwissPharmaLab"
              style="max-width:220px;height:auto;"
            />
          </div>

          <div style="text-align:center;margin-bottom:28px;">
            <div style="width:64px;height:64px;border-radius:50%;background:#16a34a;color:#fff;font-size:34px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;">
              ✓
            </div>

            <h1 style="margin:18px 0 8px;font-size:28px;line-height:1.25;color:#111;">
              Bestellung erhalten
            </h1>

            <p style="margin:0;font-size:16px;color:#555;">
              Vielen Dank für deine Bestellung bei SwissPharmaLab.
            </p>

            <p style="margin:12px 0 0;font-size:15px;color:#555;line-height:1.6;">
              Bitte schließe jetzt die Zahlung ab. Nach erfolgreicher Prüfung wird deine Bestellung bearbeitet und versendet.
            </p>
          </div>

          <div style="background:#f7f7f7;border:1px solid #e5e5e5;border-radius:18px;padding:22px;margin-bottom:18px;text-align:center;">
            <div style="font-size:14px;color:#666;font-weight:700;margin-bottom:8px;">
              Zu zahlender Betrag
            </div>
            <div style="font-size:38px;font-weight:800;color:#111;">
              ${totalFormatted}
            </div>
          </div>

          <div style="background:#fff;border:1px solid #e5e5e5;border-radius:18px;padding:22px;margin-bottom:18px;">
            <h2 style="margin:0 0 14px;font-size:21px;color:#111;">Bestellübersicht</h2>

            <p style="margin:0 0 6px;color:#333;">
              <strong>Bestellnummer:</strong> ${orderNumber}
            </p>
            <p style="margin:0;color:#333;">
              <strong>Datum:</strong> ${date}
            </p>
          </div>

          <div style="background:#fff;border:1px solid #e5e5e5;border-radius:18px;padding:22px;margin-bottom:18px;">
            <h2 style="margin:0 0 14px;font-size:21px;color:#111;">Produkte</h2>

            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="text-align:right;margin-top:18px;font-size:18px;font-weight:800;color:#111;">
              Gesamt: ${totalFormatted}
            </div>
          </div>

          <div style="background:#fff;border:1px solid #e5e5e5;border-radius:18px;padding:22px;margin-bottom:18px;">
            <h2 style="margin:0 0 14px;font-size:21px;color:#111;">Lieferadresse</h2>

            <p style="margin:0 0 10px;color:#333;line-height:1.7;">
              ${shippingAddress}
            </p>

            ${form.phone ? `<p style="margin:0 0 8px;color:#333;"><strong>Telefon:</strong> ${form.phone}</p>` : ""}
            ${form.notes ? `<p style="margin:0;color:#333;"><strong>Anmerkungen:</strong><br/>${form.notes}</p>` : ""}
          </div>

          <div style="background:#f7f7f7;border:1px solid #e5e5e5;border-radius:18px;padding:22px;margin-bottom:18px;">
            <h2 style="margin:0 0 14px;font-size:21px;color:#111;">
              Option 1: TWINT / Paysafe
            </h2>

            <ol style="margin:0;padding-left:20px;color:#333;line-height:1.8;font-size:15px;">
              <li>Kaufe Paysafe Guthaben via TWINT App, PostFinance App, SBB Schalter, k kiosk oder Tankstelle.</li>
              <li>Der Betrag kann frei gewählt werden, insgesamt müssen <strong>${totalFormatted}</strong> erreicht werden.</li>
              <li>Sende uns den Paysafe Code als Antwort auf diese E-Mail.</li>
              <li>Nach erfolgreicher Prüfung wird deine Bestellung bearbeitet und versendet.</li>
            </ol>

            <p style="margin:14px 0 0;color:#666;font-size:14px;">
              Bitte immer die Bestellnummer mitsenden: <strong>${orderNumber}</strong>
            </p>
          </div>

          <div style="background:#f7f7f7;border:1px solid #e5e5e5;border-radius:18px;padding:22px;margin-bottom:18px;">
            <h2 style="margin:0 0 14px;font-size:21px;color:#111;">
              Option 2: Kreditkarte / Bitcoin
            </h2>

            <ol style="margin:0;padding-left:20px;color:#333;line-height:1.8;font-size:15px;">
              <li>Gehe auf www.rampnetwork.com</li>
              <li>Wähle „Bitcoin kaufen“.</li>
              <li>Logge dich ein oder erstelle ein Konto.</li>
              <li>Gib den Betrag von <strong>${totalFormatted}</strong> ein.</li>
              <li>Trage unsere Bitcoin Wallet Adresse als Empfänger ein.</li>
              <li>Bezahle bequem mit deiner Kreditkarte.</li>
              <li>Sende uns danach einen Screenshot oder Zahlungsnachweis als Antwort auf diese E-Mail.</li>
            </ol>

            <div style="margin-top:18px;background:#fff;border:1px solid #ddd;border-radius:14px;padding:16px;text-align:center;">
              <h3 style="margin:0 0 12px;font-size:16px;color:#111;">Bitcoin Wallet</h3>

              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:3M6rjxUfiLU18UMnpMMJwW2KTxa8fC4wpA"
                alt="Bitcoin QR Code"
                style="width:200px;max-width:100%;height:auto;border-radius:12px;background:#fff;"
              />

              <p style="margin:12px 0 0;font-family:monospace;font-size:13px;color:#111;word-break:break-all;">
                3M6rjxUfiLU18UMnpMMJwW2KTxa8fC4wpA
              </p>
            </div>

            <p style="margin:14px 0 0;color:#666;font-size:14px;">
              Bitte immer die Bestellnummer mitsenden: <strong>${orderNumber}</strong>
            </p>
          </div>

          <div style="text-align:center;margin-top:24px;">
            <p style="margin:0;color:#555;font-size:15px;">
              Wir melden uns, sobald deine Bestellung bearbeitet wurde.
            </p>
            <p style="margin:10px 0 0;color:#999;font-size:13px;">
              SwissPharmaLab
            </p>
          </div>

        </div>
      </div>
    `;

    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:760px;margin:0 auto;color:#111;">
        <h2>Neue Bestellung eingegangen</h2>

        <p>
          <strong>Bestellnummer:</strong> ${orderNumber}<br/>
          <strong>Datum:</strong> ${date}<br/>
          <strong>Gesamt:</strong> ${totalFormatted}
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
                    <td style="padding:8px;border-bottom:1px solid #eee;">
                      ${item.title}
                      ${item.variant ? ` – ${item.variant}` : ""}
                      ${item.dose ? ` – ${item.dose}` : ""}
                    </td>
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
        { status: 500, headers: { "Content-Type": "application/json" } }
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
        { status: 500, headers: { "Content-Type": "application/json" } }
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
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}