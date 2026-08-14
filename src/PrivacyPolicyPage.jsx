import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function PrivacyPolicyPage({ cart }) {
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

      {/* PRIVACY POLICY */}
      <main className="legal-page">

        {/* HERO */}
        <div className="legal-hero">

          <div className="about-badge">
            SWISS QUALITY • TRUST • PRECISION
          </div>

          <h1>Datenschutzerklärung</h1>

          <p className="legal-updated">
            Letzte Aktualisierung: Juli 2026
          </p>

        </div>

        {/* CONTENT */}
        <div className="legal-content">

          {/* 1 */}
          <section>
            <h2>1. Verantwortlicher</h2>

            <p>
              Verantwortlich für die Verarbeitung personenbezogener Daten
              auf dieser Website ist:
            </p>

            <p>
              <strong>SwissPharmaLab</strong>
              <br />
              Zürich, Schweiz
              <br />
              E-Mail:{" "}
              <a href="mailto:info@swisspharmalab.ch">
                info@swisspharmalab.ch
              </a>
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2>2. Allgemeine Informationen</h2>

            <p>
              Der Schutz deiner persönlichen Daten ist uns wichtig. Wir
              behandeln personenbezogene Daten vertraulich und entsprechend
              den geltenden gesetzlichen Datenschutzbestimmungen.
            </p>

            <p>
              Diese Datenschutzerklärung erläutert, welche Daten wir bei der
              Nutzung unserer Website erfassen, zu welchen Zwecken wir diese
              verarbeiten und welche Rechte dir bezüglich deiner Daten
              zustehen.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2>3. Welche Daten wir erfassen</h2>

            <p>
              Je nach Nutzung unserer Website können insbesondere folgende
              Informationen verarbeitet werden:
            </p>

            <ul>
              <li>Name und Kontaktdaten</li>
              <li>Rechnungs- und Lieferadresse</li>
              <li>E-Mail-Adresse</li>
              <li>Bestell- und Zahlungsinformationen</li>
              <li>Informationen, die du bei einer Kontaktaufnahme übermittelst</li>
              <li>Technische Daten wie IP-Adresse, Browsertyp und Betriebssystem</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2>4. Zweck der Datenverarbeitung</h2>

            <p>
              Wir verwenden personenbezogene Daten insbesondere für folgende
              Zwecke:
            </p>

            <ul>
              <li>
                Bearbeitung und Abwicklung von Bestellungen
              </li>

              <li>
                Kommunikation mit Kunden und Beantwortung von Anfragen
              </li>

              <li>
                Abwicklung von Zahlungen und Versand
              </li>

              <li>
                Verbesserung und Weiterentwicklung unserer Website
              </li>

              <li>
                Schutz unserer Website vor Missbrauch und Sicherheitsrisiken
              </li>

              <li>
                Erfüllung gesetzlicher Verpflichtungen
              </li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2>5. Bestellungen und Zahlungsabwicklung</h2>

            <p>
              Wenn du eine Bestellung aufgibst, verarbeiten wir die für die
              Bearbeitung und Lieferung erforderlichen Informationen.
            </p>

            <p>
              Zahlungsdaten können je nach gewählter Zahlungsmethode durch
              den jeweiligen Zahlungsdienstleister verarbeitet werden.
            </p>

            <p>
              Wir speichern Zahlungsinformationen nur soweit dies für die
              Abwicklung der Zahlung, die Dokumentation der Bestellung oder
              aufgrund gesetzlicher Aufbewahrungspflichten erforderlich ist.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2>6. Weitergabe an Dritte</h2>

            <p>
              Wir geben personenbezogene Daten grundsätzlich nicht ohne
              entsprechenden Grund an Dritte weiter.
            </p>

            <p>
              Eine Weitergabe kann jedoch erforderlich sein, wenn dies zur
              Abwicklung einer Bestellung notwendig ist, beispielsweise an
              Zahlungsdienstleister, Versanddienstleister oder technische
              Dienstleister.
            </p>

            <p>
              Eine Weitergabe kann außerdem erfolgen, wenn wir gesetzlich
              dazu verpflichtet sind oder dies zur Wahrung unserer
              rechtlichen Interessen erforderlich ist.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2>7. Speicherung und Sicherheit</h2>

            <p>
              Wir treffen angemessene technische und organisatorische
              Maßnahmen, um personenbezogene Daten vor Verlust, Missbrauch,
              unbefugtem Zugriff oder unbefugter Offenlegung zu schützen.
            </p>

            <p>
              Personenbezogene Daten werden nur so lange gespeichert, wie
              dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche
              Aufbewahrungspflichten bestehen.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2>8. Cookies und technische Daten</h2>

            <p>
              Unsere Website kann technische Informationen erfassen, die für
              den sicheren und ordnungsgemäßen Betrieb der Website erforderlich
              sind.
            </p>

            <p>
              Je nach eingesetzten Technologien können Cookies oder ähnliche
              Technologien verwendet werden. Diese können dazu dienen,
              Funktionen der Website bereitzustellen, Einstellungen zu
              speichern oder die Nutzung der Website zu analysieren.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2>9. Kommunikation</h2>

            <p>
              Wenn du uns per E-Mail oder über andere Kommunikationskanäle
              kontaktierst, verarbeiten wir die von dir übermittelten
              Informationen zur Bearbeitung deiner Anfrage.
            </p>

            <p>
              Wir verwenden diese Informationen ausschließlich im Rahmen des
              jeweiligen Kommunikationszwecks und soweit dies zur Bearbeitung
              deiner Anfrage erforderlich ist.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2>10. Deine Rechte</h2>

            <p>
              Im Rahmen der geltenden Datenschutzgesetze hast du unter anderem
              das Recht, Auskunft über deine personenbezogenen Daten zu
              verlangen.
            </p>

            <p>
              Je nach den gesetzlichen Voraussetzungen kannst du außerdem die
              Berichtigung, Löschung oder Einschränkung der Verarbeitung
              deiner Daten verlangen oder einer bestimmten Verarbeitung
              widersprechen.
            </p>

            <p>
              Für entsprechende Anfragen kannst du uns jederzeit kontaktieren.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2>11. Änderungen dieser Datenschutzerklärung</h2>

            <p>
              Wir behalten uns das Recht vor, diese Datenschutzerklärung
              jederzeit zu ändern oder zu aktualisieren.
            </p>

            <p>
              Die jeweils aktuelle Version wird auf dieser Website
              veröffentlicht.
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