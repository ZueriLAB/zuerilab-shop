import { Link } from "react-router-dom";
import "./App.css";

export default function SupportPage({ cart }) {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page">
      <div className="topbar">Alle unsere Produkte sind Labor geprüft.</div>

      <header className="header">
        <Link to="/" className="brand">
          <img src="/logo1.png" alt="SwissPharmaLab" className="logo" />
        </Link>
      </header>

      <nav className="nav">
        <Link to="/" className="nav-link">
          Zurück zum Shop
        </Link>

        <Link to="/warenkorb" className="nav-link cart-link">
          🛒 Warenkorb ({cartCount})
        </Link>
      </nav>

      <section className="support-page">
        <h2 className="section-title">SUPPORT</h2>

        <div className="support-card">
          <h3>Kundensupport</h3>

          <p>
            Unser Support-Team unterstützt dich bei sämtlichen Fragen zu
            Bestellungen, Versand, Produkten und Anwendung. Anfragen werden in
            der Regel innerhalb weniger Stunden bearbeitet.
          </p>

          <p>
            Auch bei Fragen zu Dosierung, Einnahme, Injektionszubehör oder
            produktspezifischen Anwendungen kannst du uns jederzeit
            kontaktieren – wir beraten dich gerne diskret und zuverlässig.
          </p>

          <div className="support-row">
            <strong>E-Mail:</strong>
            <span>support@swisspharmalab.ch</span>
          </div>
        </div>
      </section>
    </div>
  );
}