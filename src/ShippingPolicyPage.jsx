import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function ShippingPolicyPage({ cart }) {
  const cartCount =
    cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="page">

      {/* HEADER */}
      <header className="header">
        <Link to="/" className="brand">
          <img
            src="/logo1.png"
            alt="SwissPharmaLab"
            className="logo"
          />
        </Link>
      </header>

      {/* NAVIGATION */}
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

      {/* SHIPPING POLICY */}
      <main className="legal-page">

        {/* HERO */}
        <div className="legal-hero">

          <div className="about-badge">
            SWISS QUALITY • TRUST • PRECISION
          </div>

          <h1>Versandrichtlinie</h1>

          <p className="legal-updated">
            Letzte Aktualisierung: Juli 2026
          </p>

        </div>

        {/* CONTENT */}
        <div className="legal-content">

          {/* 1 */}
          <section>
            <h2>1. Versand aus der Schweiz</h2>

            <p>
              Alle Bestellungen von SwissPharmaLab werden aus der Schweiz
              versendet.
            </p>

            <p>
              Wir bieten internationalen Versand an und bemühen uns,
              Bestellungen zuverlässig und schnell zu bearbeiten.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2>2. Bearbeitung der Bestellung</h2>

            <p>
              Bestellungen werden nach Eingang geprüft und für den Versand
              vorbereitet.
            </p>

            <p>
              Bestellungen, die an Werktagen vor 14:00 Uhr CET eingehen,
              werden in der Regel noch am selben Werktag bearbeitet und
              versendet.
            </p>

            <p>
              In Einzelfällen kann sich der Versand aufgrund von
              Zahlungsprüfung, Bestellprüfung oder anderen Umständen
              verzögern.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2>3. Lieferzeit</h2>

            <p>
              Die Lieferzeit beträgt in der Regel <strong>1 bis 7 Werktage</strong>.
            </p>

            <p>
              Die tatsächliche Lieferzeit kann abhängig vom Zielland, der
              Versandart, dem Versanddienstleister und möglichen Verzögerungen
              bei der Zollabfertigung abweichen.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2>4. Versandkosten</h2>

            <p>
              Die anfallenden Versandkosten werden während des
              Bestellvorgangs angezeigt.
            </p>

            <p>
              Die Versandkosten können abhängig vom Zielland, der
              Versandart und dem Umfang der Bestellung variieren.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2>5. Internationale Lieferungen</h2>

            <p>
              Bei internationalen Bestellungen können zusätzliche
              Einfuhrgebühren, Steuern, Zollgebühren oder andere Abgaben
              anfallen.
            </p>

            <p>
              Diese Kosten sind grundsätzlich vom Empfänger zu tragen,
              sofern nicht ausdrücklich anders angegeben.
            </p>

            <p>
              Der Kunde ist selbst dafür verantwortlich, sicherzustellen,
              dass die Einfuhr der bestellten Produkte in das jeweilige
              Zielland gesetzlich zulässig ist.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2>6. Zoll und Einfuhrbestimmungen</h2>

            <p>
              SwissPharmaLab kann keine Garantie dafür übernehmen, dass eine
              Sendung von den Zollbehörden des Ziellandes ohne Verzögerung
              oder zusätzliche Anforderungen abgefertigt wird.
            </p>

            <p>
              Für Verzögerungen, Rücksendungen oder Beschlagnahmungen durch
              Zoll- oder andere Behörden übernehmen wir keine Haftung,
              soweit dies gesetzlich zulässig ist.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2>7. Sendungsverfolgung</h2>

            <p>
              Sofern für die gewählte Versandart eine Sendungsverfolgung
              verfügbar ist, können die entsprechenden Tracking-Informationen
              nach dem Versand bereitgestellt werden.
            </p>

            <p>
              Die Aktualisierung der Tracking-Daten kann je nach
              Versanddienstleister einige Zeit in Anspruch nehmen.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2>8. Lieferverzögerungen</h2>

            <p>
              Obwohl wir uns bemühen, die angegebenen Lieferzeiten einzuhalten,
              können Verzögerungen beispielsweise durch Feiertage,
              Transportprobleme, Zollabfertigungen oder außergewöhnliche
              Umstände entstehen.
            </p>

            <p>
              Eine Verzögerung der Lieferung begründet nicht automatisch einen
              Anspruch auf Rückerstattung der Versandkosten.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2>9. Falsche oder unvollständige Lieferadresse</h2>

            <p>
              Der Kunde ist dafür verantwortlich, bei der Bestellung eine
              korrekte und vollständige Lieferadresse anzugeben.
            </p>

            <p>
              Sollte eine Bestellung aufgrund einer falschen oder
              unvollständigen Adresse nicht zugestellt werden können, können
              zusätzliche Versandkosten für eine erneute Zustellung anfallen.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2>10. Kontakt</h2>

            <p>
              Wenn du Fragen zu deiner Lieferung oder deiner Bestellung hast,
              kannst du uns jederzeit kontaktieren.
            </p>
          </section>

          {/* CONTACT */}
          <section className="legal-contact">
            <h2>Kontakt</h2>

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

        {/* BUTTON */}
        <Link
          to="/"
          className="hero-btn hero-btn-primary"
        >
          Zurück zum Shop
        </Link>

      </main>

    </div>
  );
}