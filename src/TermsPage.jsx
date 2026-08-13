import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function TermsPage({ cart }) {
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


      {/* MAIN */}
      <main className="legal-page">


        {/* HERO */}
        <div className="legal-hero">

          <div className="about-badge">
            SWISSPHARMALAB • TERMS & CONDITIONS
          </div>

          <h1>
            Allgemeine Geschäftsbedingungen
          </h1>

          <p className="legal-updated">
            Letzte Aktualisierung: Juli 2026
          </p>

        </div>


        {/* CONTENT */}
        <div className="legal-content">


          {/* 1 */}
          <section>
            <h2>1. Über uns</h2>

            <p>
              Diese Website wird von{" "}
              <strong>SwissPharmaLab</strong>{" "}
              („wir“, „uns“, „unser“) mit Sitz in Zürich,
              Schweiz, betrieben.
            </p>

            <p>
              Durch den Zugriff auf unsere Website oder die Aufgabe
              einer Bestellung auf swisspharmalab.ch erklären Sie sich
              mit diesen Allgemeinen Geschäftsbedingungen vollständig
              einverstanden.
            </p>
          </section>


          {/* 2 */}
          <section>
            <h2>2. Ausschließlich für Forschungszwecke</h2>

            <p>
              Alle auf dieser Website angebotenen Produkte sind
              ausschließlich für In-vitro-Labor- und wissenschaftliche
              Forschungszwecke bestimmt.
            </p>

            <p>
              Sie sind nicht für den menschlichen oder tiermedizinischen
              Verzehr, therapeutische Anwendungen, klinische Anwendungen
              oder andere nicht-wissenschaftliche Zwecke bestimmt.
            </p>

            <p>
              Mit dem Kauf über diese Website bestätigen Sie, dass:
            </p>

            <ul>

              <li>
                Sie ein qualifizierter Forscher, zugelassener Fachmann
                oder institutioneller Käufer sind und die Produkte im
                Rahmen einer professionellen Forschungstätigkeit erwerben.
              </li>

              <li>
                Sie alle erworbenen Produkte ausschließlich für
                rechtmäßige und nicht-klinische Forschungszwecke verwenden.
              </li>

              <li>
                Sie die Produkte nicht weiterverkaufen, weiterverteilen
                oder anderen Personen zur Anwendung am Menschen oder
                an Tieren zur Verfügung stellen.
              </li>

              <li>
                Sie mindestens 18 Jahre alt sind.
              </li>

            </ul>
          </section>


          {/* 3 */}
          <section>
            <h2>3. Teilnahmeberechtigung</h2>

            <p>
              Der Zugang zu dieser Website sowie der Kauf von Produkten
              ist auf verifizierte Forscher und Fachpersonen beschränkt.
            </p>

            <p>
              Wir behalten uns das Recht vor, Bestellungen nach eigenem
              Ermessen abzulehnen oder zu stornieren, insbesondere wenn
              Grund zu der Annahme besteht, dass die Produkte nicht für
              legitime Forschungszwecke verwendet werden.
            </p>
          </section>


          {/* 4 */}
          <section>
            <h2>4. Bestellungen & Zahlung</h2>

            <p>
              Alle Preise werden in Schweizer Franken (CHF) angegeben
              und verstehen sich, sofern nicht anders angegeben,
              ohne Mehrwertsteuer.
            </p>

            <p>
              Wir akzeptieren die Zahlungsmethoden, die während des
              Bestellvorgangs angezeigt werden.
            </p>

            <p>
              Eine Bestellbestätigung per E-Mail stellt noch keine
              endgültige Annahme der Bestellung dar. Wir behalten uns
              das Recht vor, eine Bestellung vor dem Versand zu stornieren.
            </p>
          </section>


          {/* 5 */}
          <section>
            <h2>5. Versand</h2>

            <p>
              Bestellungen, die an Werktagen vor 14:00 Uhr CET eingehen,
              werden in der Regel noch am selben Tag versendet.
            </p>

            <p>
              Wir versenden aus der Schweiz und bieten internationalen
              Versand an. Die Lieferzeiten können je nach Zielland
              variieren.
            </p>

            <p>
              Der Kunde ist selbst dafür verantwortlich, sicherzustellen,
              dass die Einfuhr der bestellten Produkte in seinem jeweiligen
              Land gesetzlich zulässig ist.
            </p>

            <p>
              SwissPharmaLab übernimmt keine Haftung für Bestellungen,
              die von Zollbehörden beschlagnahmt, zurückgehalten oder
              verzögert werden.
            </p>

            <p>
              Das Versandrisiko geht mit der Übergabe der Bestellung
              an den Versanddienstleister auf den Kunden über.
            </p>
          </section>


          {/* 6 */}
          <section>
            <h2>6. Rückgaben & Rückerstattungen</h2>

            <p>
              Aufgrund der besonderen Beschaffenheit unserer
              Forschungsprodukte akzeptieren wir keine Rücksendungen
              geöffneter oder bereits verwendeter Produkte.
            </p>

            <p>
              Für weitere Einzelheiten beachten Sie bitte unsere
              Rückerstattungsrichtlinie.
            </p>
          </section>


          {/* 7 */}
          <section>
            <h2>7. Haftungsbeschränkung</h2>

            <p>
              Soweit nach Schweizer Recht zulässig, haftet
              SwissPharmaLab nicht für indirekte, zufällige, besondere
              oder Folgeschäden, die aus der Verwendung oder der
              Unmöglichkeit der Verwendung unserer Produkte entstehen.
            </p>

            <p>
              Die Gesamthaftung von SwissPharmaLab ist auf den Betrag
              begrenzt, der für die konkrete Bestellung bezahlt wurde,
              aus der der jeweilige Anspruch entstanden ist.
            </p>
          </section>


          {/* 8 */}
          <section>
            <h2>8. Geistiges Eigentum</h2>

            <p>
              Alle Inhalte dieser Website, einschließlich Texte, Bilder,
              Grafiken, Produktbeschreibungen und sonstiger Materialien,
              sind Eigentum von SwissPharmaLab oder werden mit
              entsprechender Berechtigung verwendet.
            </p>

            <p>
              Eine Vervielfältigung, Veröffentlichung oder sonstige
              Verwendung dieser Inhalte ist ohne vorherige schriftliche
              Zustimmung von SwissPharmaLab nicht gestattet.
            </p>
          </section>


          {/* 9 */}
          <section>
            <h2>9. Anwendbares Recht</h2>

            <p>
              Diese Allgemeinen Geschäftsbedingungen unterliegen
              dem Recht der Schweiz.
            </p>

            <p>
              Für sämtliche Streitigkeiten aus oder im Zusammenhang
              mit diesen Allgemeinen Geschäftsbedingungen ist, soweit
              gesetzlich zulässig, die Zuständigkeit der Gerichte in
              Zürich, Schweiz, vereinbart.
            </p>
          </section>


          {/* 10 */}
          <section>
            <h2>10. Änderungen dieser Geschäftsbedingungen</h2>

            <p>
              Wir behalten uns das Recht vor, diese Allgemeinen
              Geschäftsbedingungen jederzeit zu ändern oder zu
              aktualisieren.
            </p>

            <p>
              Die jeweils aktuelle Version wird auf dieser Website
              veröffentlicht.
            </p>

            <p>
              Durch die weitere Nutzung der Website nach einer Änderung
              erklären Sie sich mit der aktualisierten Version der
              Allgemeinen Geschäftsbedingungen einverstanden.
            </p>
          </section>


          {/* KONTAKT */}
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