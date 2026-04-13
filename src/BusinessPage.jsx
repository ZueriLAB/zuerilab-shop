import { Link } from "react-router-dom";
import "./App.css";

export default function BusinessPage({ cart }) {
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

      <section className="business-page">
        <h2 className="section-title">BUSINESS</h2>

        <div className="business-grid">
          <div className="business-card">
            <h3>Großhandel</h3>
            <p>
              Beim Großhandel profitierst du von attraktiven Mengenrabatten von
              bis zu 30 % je nach Bestellvolumen. Wir erstellen individuelle
              Angebote für Wiederverkäufer, Studios, Händler und
              Geschäftspartner. Bitte beachte, dass einzelne Produkte aufgrund
              bestehender Marken- oder Vertriebspartnervereinbarungen vom
              Großhandel ausgeschlossen sein können.
            </p>
          </div>

          <div className="business-card">
            <h3>Dropshipping</h3>
            <p>
              Du möchtest unsere Produkte über deinen eigenen Shop oder unter
              deinem eigenen Brand verkaufen, ohne Lagerhaltung oder hohe
              Vorabinvestitionen? Mit unserem Dropshipping-Modell übernehmen wir
              Lagerung, Verpackung und Versand direkt für dich. So kannst du
              sofort starten und dein Business mit minimalem Risiko aufbauen.
            </p>
          </div>

 <div className="business-card">
  <h3>Kontakt</h3>
  <p>
    Für Geschäftsanfragen zu Großhandel, Partnerschaften,
    B2B-Konditionen oder Dropshipping erreichst du unser Business-Team
    direkt via Mail{" "}
    <a
      href="mailto:support@swisspharmalab.ch"
      className="business-mail"
    >
      support@swisspharmalab.ch
    </a>.
    Wir bearbeiten Anfragen persönlich und erstellen individuelle
    Angebote passend zu deinem Geschäftsmodell.
  </p>
</div>
          <div className="business-card">
  <h3>Qualitätsversprechen</h3>
  <p>
    Wir legen höchsten Wert auf Qualität und Produktsicherheit.
    Deshalb wird jedes Produkt vor dem Verkauf umfassend laborgeprüft,
    um unseren Kunden maximale Reinheit, Sicherheit und Premium-Qualität
    garantieren zu können.
  </p>
</div>
        </div>
      </section>
    </div>
  );
}