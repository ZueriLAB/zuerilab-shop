import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function AboutUsPage({ cart }) {
  return (
    <div className="page">

      <header className="header">
        <Link to="/" className="brand">
          <img
            src="/logo1.png"
            alt="SwissPharmaLab"
            className="logo"
          />
        </Link>
      </header>
<nav className="nav">
  <Link to="/" className="nav-link">Peptide</Link>

  <Link to="/support" className="nav-link">Kundenservice</Link>

  <Link to="/business" className="nav-link">Business</Link>

  <Link to="/warenkorb" className="nav-link cart-link">
    🛒 Warenkorb ({cart?.reduce((sum, item) => sum + item.quantity, 0) || 0})
  </Link>

  <div className="payment-security">
    <div className="payment-icons">
      <div className="payment-card visa">VISA</div>

      <div className="payment-card mastercard">
        <span></span>
        <span></span>
      </div>
    </div>

    <div className="payment-secure">
      <span className="secure-lock">🔒</span>
      <div>
        <strong>Sichere Zahlung</strong>
        <small>SSL · Secure Checkout</small>
      </div>
    </div>
  </div>
</nav>

      <main className="about-page">

        <div className="about-badge">
          SWISS QUALITY • TRUST • PRECISION
        </div>

        <h1>About Us</h1>

        <h2>SwissPharmaLab</h2>

        <h3>
          Premium Peptide Research Solutions from Switzerland
        </h3>

        <p>
          Bei SwissPharmaLab konzentrieren wir uns darauf,
          hochwertige Forschungspeptide, Laborbedarf und
          zuverlässige Peptidlösungen für professionelle
          Forschungszwecke anzubieten.
        </p>

        <p>
          Mit Sitz in der Schweiz verbinden wir Qualität,
          Zuverlässigkeit und schnellen internationalen Versand,
          um Labore und Forschende weltweit zu unterstützen.
        </p>

        <p>
          Unsere Mission ist einfach: Präzision, Vertrauen und
          höchste Qualität bei jeder Bestellung.
        </p>

        <Link to="/" className="hero-btn hero-btn-primary">
          Unsere Produkte
        </Link>

      </main>

    </div>
  );
}