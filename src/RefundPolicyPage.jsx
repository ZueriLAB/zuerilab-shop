import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function RefundPolicyPage({ cart }) {
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

      <main className="legal-page">

        <div className="legal-hero">

          <div className="about-badge">
            SWISSPHARMALAB • REFUND POLICY
          </div>

          <h1>Rückerstattungsrichtlinie</h1>

          <p className="legal-updated">
            Letzte Aktualisierung: Juli 2026
          </p>

        </div>

        <div className="legal-content">

          <section>
            <h2>1. Allgemeine Informationen</h2>

            <p>
              SwissPharmaLab bietet Produkte ausschließlich für
              wissenschaftliche und nicht-klinische Forschungszwecke an.
            </p>

            <p>
              Aufgrund der besonderen Beschaffenheit unserer
              Forschungsprodukte gelten für Rückgaben und Rückerstattungen
              besondere Bedingungen.
            </p>
          </section>

          <section>
            <h2>2. Rückgaben</h2>

            <p>
              Eine Rückgabe ist grundsätzlich nur möglich, wenn die
              gesetzlichen Voraussetzungen erfüllt sind und die Ware
              ungeöffnet, unbenutzt und in ihrem ursprünglichen Zustand
              zurückgesendet wird.
            </p>

            <p>
              Geöffnete, verwendete oder anderweitig veränderte Produkte
              können aus Gründen der Produktsicherheit und Qualität nicht
              zurückgenommen werden.
            </p>
          </section>

          <section>
            <h2>3. Beschädigte oder fehlerhafte Lieferung</h2>

            <p>
              Sollte deine Bestellung bei der Lieferung beschädigt sein oder
              ein falsches Produkt enthalten, kontaktiere uns bitte so schnell
              wie möglich.
            </p>

            <p>
              Bitte sende dabei deine Bestellnummer sowie gegebenenfalls
              aussagekräftige Fotos der Verpackung und des erhaltenen Produkts
              mit.
            </p>

            <p>
              Wir prüfen den Fall und entscheiden nach Prüfung über eine
              geeignete Lösung, beispielsweise einen Ersatz oder eine
              Rückerstattung.
            </p>
          </section>

          <section>
            <h2>4. Falsch bestellte Produkte</h2>

            <p>
              Wenn ein Produkt versehentlich falsch bestellt wurde, kontaktiere
              uns bitte vor dem Versand der Bestellung.
            </p>

            <p>
              Sobald eine Bestellung versendet wurde, können Änderungen oder
              Stornierungen möglicherweise nicht mehr vorgenommen werden.
            </p>
          </section>

          <section>
            <h2>5. Stornierung einer Bestellung</h2>

            <p>
              Eine Stornierung ist grundsätzlich möglich, solange die Bestellung
              noch nicht versendet wurde.
            </p>

            <p>
              Bitte kontaktiere unseren Kundenservice so schnell wie möglich,
              wenn du eine Bestellung stornieren möchtest.
            </p>

            <p>
              Bereits versendete Bestellungen können nicht garantiert
              storniert werden.
            </p>
          </section>

          <section>
            <h2>6. Rückerstattungen</h2>

            <p>
              Wenn eine Rückerstattung genehmigt wurde, erfolgt diese über die
              ursprünglich verwendete Zahlungsmethode, soweit dies technisch
              möglich ist.
            </p>

            <p>
              Die Bearbeitungsdauer kann je nach Zahlungsmethode und
              Finanzinstitut variieren.
            </p>
          </section>

          <section>
            <h2>7. Versandkosten</h2>

            <p>
              Versandkosten werden grundsätzlich nicht erstattet, sofern die
              Rückerstattung nicht aufgrund eines von SwissPharmaLab zu
              vertretenden Fehlers erfolgt.
            </p>

            <p>
              Kosten für eine Rücksendung können vom Kunden zu tragen sein,
              sofern nichts anderes vereinbart wurde.
            </p>
          </section>

          <section>
            <h2>8. Nicht angenommene oder vom Zoll zurückgehaltene Sendungen</h2>

            <p>
              Der Kunde ist dafür verantwortlich, sicherzustellen, dass die
              Einfuhr der bestellten Produkte in das jeweilige Zielland
              gesetzlich zulässig ist.
            </p>

            <p>
              SwissPharmaLab übernimmt keine Verantwortung für Sendungen, die
              aufgrund lokaler Einfuhrbestimmungen, Zollvorschriften oder
              behördlicher Maßnahmen zurückgehalten, beschlagnahmt oder
              zurückgesendet werden.
            </p>
          </section>

          <section>
            <h2>9. Ausschluss der Rückerstattung</h2>

            <p>
              Eine Rückerstattung kann insbesondere ausgeschlossen werden,
              wenn ein Produkt geöffnet, verwendet, beschädigt oder anderweitig
              verändert wurde oder wenn die Rückgabe nicht den geltenden
              Voraussetzungen entspricht.
            </p>
          </section>

          <section>
            <h2>10. Kontakt</h2>

            <p>
              Wenn du Fragen zu einer Rückgabe oder Rückerstattung hast,
              kontaktiere uns bitte vorab.
            </p>

            <p>
              <strong>SwissPharmaLab</strong>
              <br />
              Zürich, Schweiz
            </p>

            <p>
              <strong>E-Mail:</strong>{" "}
              <a href="mailto:info@swisspharmalab.ch">
                info@swisspharmalab.ch
              </a>
            </p>
          </section>

        </div>

        <Link to="/" className="hero-btn hero-btn-primary">
          Zurück zum Shop
        </Link>

      </main>

    </div>
  );
}