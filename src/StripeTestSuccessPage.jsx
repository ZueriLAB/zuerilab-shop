import { Link } from "react-router-dom";
import "./App.css";

export default function StripeTestSuccessPage() {
  return (
    <div className="page">
      <div className="success-box">
        <div className="success-header">
          <div className="success-icon">✓</div>

          <h1>Zahlung erfolgreich</h1>

          <p className="success-main-text">
            Vielen Dank für deine Bestellung!
          </p>

          <p className="success-email-info">
            Deine Zahlung wurde erfolgreich übermittelt.
            Eine Bestellbestätigung wird an deine E-Mail-Adresse gesendet.
          </p>
        </div>

        <div className="payment-box">
          <h3>Zahlungsstatus</h3>

          <p
            className="payment-amount"
            style={{ color: "#16a34a" }}
          >
            Bezahlt
          </p>
        </div>

        <div className="success-details">
          <div className="success-row">
            <span>Zahlungsmethode</span>
            <span>Kreditkarte</span>
          </div>

          <div className="success-row">
            <span>Status</span>
            <span>Erfolgreich</span>
          </div>
        </div>

        <Link to="/" className="buy-btn success-btn">
          Zurück zum Shop
        </Link>
      </div>
    </div>
  );
}