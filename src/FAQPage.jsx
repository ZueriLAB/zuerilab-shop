import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function FAQPage({ cart }) {
  const cartCount =
    cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

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
        <Link to="/" className="nav-link">
          Peptide
        </Link>

        <Link to="/support" className="nav-link">
          Kundenservice
        </Link>

        <Link to="/business" className="nav-link">
          Business
        </Link>

        <Link to="/warenkorb" className="nav-link cart-link">
          🛒 Warenkorb ({cartCount})
        </Link>
      </nav>

      <main className="faq-page">

        <div className="about-badge">
          SWISSPHARMALAB • FAQ
        </div>

        <h1>FAQs</h1>

        <p className="faq-intro">
          Hier findest du Antworten auf häufig gestellte Fragen
          rund um unsere Produkte, Bestellungen und den Versand.
        </p>

        <div className="faq-list">

          {/* FAQ 1 */}
          <div className="faq-item">
            <h2>Was sind Peptide?</h2>

            <p>
              Peptide sind kurze Ketten aus Aminosäuren, die in der
              Forschung für unterschiedliche biologische Prozesse
              untersucht werden.
            </p>
          </div>


          {/* FAQ 2 */}
          <div className="faq-item">
            <h2>Woher kommen eure Produkte?</h2>

            <p>
              Unsere Produkte werden für Forschungszwecke angeboten
              und entsprechend unseren Qualitätsanforderungen
              ausgewählt.
            </p>
          </div>


          {/* FAQ 3 */}
          <div className="faq-item">
            <h2>Werden die Produkte geprüft?</h2>

            <p>
              Unsere Produkte werden entsprechend den verfügbaren
              Qualitäts- und Laborinformationen geprüft.
            </p>
          </div>


          {/* FAQ 4 */}
          <div className="faq-item">
            <h2>Wie lange dauert der Versand?</h2>

            <p>
              Der Versand erfolgt aus der Schweiz. Die Lieferzeit
              beträgt in der Regel 1 bis 7 Werktage, abhängig vom
              Zielland und der jeweiligen Versandart.
            </p>
          </div>


          {/* FAQ 5 */}
          <div className="faq-item">
            <h2>Wie kann ich meine Bestellung bezahlen?</h2>

            <p>
              Die verfügbaren Zahlungsmethoden werden dir während
              des Bestellvorgangs angezeigt.
            </p>
          </div>


          {/* FAQ 6 */}
          <div className="faq-item">
            <h2>Kann ich meine Bestellung zurückgeben?</h2>

            <p>
              Informationen zu Rückgaben und Erstattungen findest du
              in unserer Refund Policy.
            </p>
          </div>


          {/* FAQ 7 */}
          <div className="faq-item">
            <h2>Wie kann ich den Kundenservice kontaktieren?</h2>

            <p>
              Bei Fragen kannst du dich direkt über unseren
              Kundenservice oder WhatsApp an uns wenden.
            </p>
          </div>

        </div>


        <Link
          to="/support"
          className="hero-btn hero-btn-primary"
        >
          Kundenservice kontaktieren
        </Link>

      </main>

    </div>
  );
}