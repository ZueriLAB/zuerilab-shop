import { Link, useLocation } from "react-router-dom";
import "./App.css";

export default function SuccessPage() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="page">
        <div className="success-box">
          <h1>Keine Bestelldaten gefunden</h1>
          <Link to="/" className="buy-btn">
            Zurück zum Shop
          </Link>
        </div>
      </div>
    );
  }

  const {
    orderNumber,
    date,
    total,
    paymentMethod,
    cart = [],
    form = {},
  } = state;

  const formattedTotal = `${parseFloat(total).toFixed(2)} CHF`;

  return (
    <div className="page">
      <div className="success-box">
        <div className="success-header">
          <div className="success-icon">✓</div>
          <h1>Bestellung erhalten</h1>

          <p className="success-main-text">
            Vielen Dank für deine Bestellung!
          </p>

          <p className="success-email-info">
            Deine Bestelldetails wurden an deine E-Mail-Adresse gesendet.
          </p>

          <p className="payment-info-text">
            Bitte führe jetzt die Zahlung über eine der folgenden Optionen durch.
            Nach erfolgreicher Prüfung wird deine Bestellung bearbeitet und versendet.
          </p>
        </div>

        <div className="payment-box">
          <h3>Zu zahlender Betrag</h3>
          <p className="payment-amount">{formattedTotal}</p>
        </div>

        <div className="payment-method-box payment-grid">
          <div>
            <div className="payment-title-row">
              <h3>Bezahlung via Kreditkarte (Bitcoin über Ramp)</h3>

              <img
                src="/mastercard.png"
                alt="Mastercard"
                className="payment-logo"
              />
            </div>

            <ol className="payment-steps">
              <li>
                Gehe auf{" "}
                <a
                  href="https://www.rampnetwork.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.rampnetwork.com
                </a>
              </li>
              <li>Wähle „Bitcoin kaufen“.</li>
              <li>Logge dich ein oder erstelle ein Konto.</li>
              <li>
                Gib den Betrag von <strong>{formattedTotal}</strong> ein.
              </li>
              <li>Trage unsere Bitcoin Wallet Adresse als Empfänger ein.</li>
              <li>Bezahle bequem mit deiner Kreditkarte.</li>
              <li>
                Sende uns danach einen Screenshot oder Zahlungsnachweis per
                E-Mail.
              </li>
            </ol>

            <p className="payment-note">
              Die Transaktion dauert in der Regel nur wenige Minuten
              (ca. 3–4 Minuten). Bitte gib in deiner E-Mail immer deine
              Bestellnummer an.
            </p>
          </div>

          <div className="qr-box">
  <h4>Bitcoin Wallet</h4>

  <img
    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=bitcoin:3M6rjxUfiLU18UMnpMMJwW2KTxa8fC4wpA`}
    alt="Bitcoin QR Code"
    className="qr-image"
  />

  <p className="wallet-address">
    3M6rjxUfiLU18UMnpMMJwW2KTxa8fC4wpA
  </p>

  <button
    className="copy-btn"
    onClick={() => {
      navigator.clipboard.writeText("3M6rjxUfiLU18UMnpMMJwW2KTxa8fC4wpA");
      alert("Adresse kopiert!");
    }}
  >
    Adresse kopieren
  </button>
          </div>
        </div>

        <div className="payment-method-box">
<div className="payment-title-row">


  <h3>Option 2: Paysafe</h3>


  <img
    src="/paysafe.png"
    alt="Paysafe"
    className="payment-logo"
  />
</div>

          <ol className="payment-steps">
            <li>
              Kaufe Paysafe Guthaben bei einem SBB Schalter, k kiosk oder in
              der PostFinance App.
            </li>
            <li>
              Der Betrag kann frei gewählt werden, insgesamt müssen{" "}
              <strong>{formattedTotal}</strong> erreicht werden.
            </li>
            <li>Sende uns den Paysafe Code per E-Mail.</li>
            <li>
              Nach erfolgreicher Prüfung wird deine Bestellung bearbeitet und
              versendet.
            </li>
          </ol>

          <p className="payment-note">
            Bitte sende auch hier immer deine Bestellnummer mit.
          </p>
        </div>

        <div className="success-details">
          <div className="success-row">
            <span>Bestellnummer</span>
            <span>{orderNumber}</span>
          </div>
          <div className="success-row">
            <span>Datum</span>
            <span>{date}</span>
          </div>
          <div className="success-row">
            <span>Gesamtsumme</span>
            <span>{formattedTotal}</span>
          </div>
          <div className="success-row">
            <span>Zahlungsmethode</span>
            <span>{paymentMethod}</span>
          </div>
        </div>

        <div className="success-grid">
          <div>
            <h2 className="success-subtitle">Bestelldetails</h2>

            <div className="success-order-list">
              {cart.map((item) => (
                <div className="success-order-item" key={item.id}>
                  <div className="success-order-left">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="success-order-image"
                    />
                    <div>
                      <div className="success-order-name">{item.title}</div>
                      <div className="success-order-qty">
                        Menge: {item.quantity}
                      </div>
                    </div>
                  </div>

                  <div className="success-order-price">{item.price}</div>
                </div>
              ))}
            </div>

            <div className="success-total">
              Gesamtsumme inkl. Versand: {formattedTotal}
            </div>
          </div>

          <div>
            <h2 className="success-subtitle">Lieferdaten</h2>

            <div className="success-address">
              <p>
                <strong>Name:</strong> {form.firstName} {form.lastName}
              </p>
              <p>
                <strong>Land:</strong> {form.country}
              </p>
              <p>
                <strong>Straße:</strong> {form.address}
              </p>
              <p>
                <strong>Ort / Stadt:</strong> {form.city}
              </p>
              <p>
                <strong>PLZ:</strong> {form.zip}
              </p>
              <p>
                <strong>E-Mail:</strong> {form.email}
              </p>
              <p>
                <strong>Telefon:</strong> {form.phone}
              </p>
            </div>
          </div>
        </div>

        <Link to="/" className="buy-btn success-btn">
          Zurück zum Shop
        </Link>
      </div>
    </div>
  );
}