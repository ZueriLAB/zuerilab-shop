import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function FAQsPage({ cart }) {
  const [openFaq, setOpenFaq] = useState(null);

  const cartCount =
    cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const faqs = [
    {
      question: "Was sind Peptide?",
      answer:
        "Peptide sind kurze Ketten aus Aminosäuren, die in der Forschung für unterschiedliche biologische Prozesse untersucht werden.",
    },
    {
      question: "Woher kommen eure Produkte?",
      answer:
        "Unsere Produkte werden für Forschungszwecke angeboten und entsprechend unseren Qualitätsanforderungen ausgewählt.",
    },
    {
      question: "Werden die Produkte geprüft?",
      answer:
        "Unsere Produkte werden entsprechend den verfügbaren Qualitäts- und Laborinformationen geprüft.",
    },
    {
      question: "Wie lange dauert der Versand?",
      answer:
        "Der Versand erfolgt aus der Schweiz. Die Lieferzeit beträgt in der Regel 1 bis 7 Werktage, abhängig vom Zielland und der jeweiligen Versandart.",
    },
    {
      question: "Wie kann ich meine Bestellung bezahlen?",
      answer:
        "Die verfügbaren Zahlungsmethoden werden dir während des Bestellvorgangs angezeigt.",
    },
    {
      question: "Kann ich meine Bestellung zurückgeben?",
      answer:
        "Informationen zu Rückgaben und Erstattungen findest du in unserer Refund Policy.",
    },
    {
      question: "Wie kann ich den Kundenservice kontaktieren?",
      answer:
        "Bei Fragen kannst du dich direkt über unseren Kundenservice oder WhatsApp an uns wenden.",
    },
  ];

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


      {/* FAQ PAGE */}

      <main className="info-page">


        {/* HERO */}

        <div className="info-hero">

          <div className="info-badge">
            SWISSPHARMALAB • FAQ
          </div>

          <h1>
            FAQs
          </h1>

          <p>
            Hier findest du Antworten auf häufig gestellte Fragen
            rund um unsere Produkte, Bestellungen und den Versand.
          </p>

        </div>


        {/* FAQ CONTENT */}

        <div className="info-content">

          <div className="faq-list">

            {faqs.map((faq, index) => (

              <div
                className={`faq-item ${
                  openFaq === index ? "faq-open" : ""
                }`}
                key={index}
              >

                <button
                  className="faq-question"
                  onClick={() =>
                    setOpenFaq(
                      openFaq === index ? null : index
                    )
                  }
                >

                  <span>
                    {faq.question}
                  </span>

                  <span className="faq-icon">
                    {openFaq === index ? "−" : "+"}
                  </span>

                </button>


                {openFaq === index && (

                  <div className="faq-answer">

                    <p>
                      {faq.answer}
                    </p>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>


        {/* CONTACT BOX */}

        <div className="faq-contact-box">

          <h2>
            Noch Fragen?
          </h2>

          <p>
            Wenn deine Frage hier nicht beantwortet wurde,
            kannst du uns direkt kontaktieren.
          </p>

          <div className="faq-actions">

            <Link
              to="/support"
              className="hero-btn hero-btn-primary"
            >
              Kundenservice
            </Link>

            <a
              href="https://wa.me/19543389150"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn hero-btn-secondary"
            >
              WhatsApp
            </a>

          </div>

        </div>


        {/* BACK BUTTON */}

        <Link
          to="/"
          className="hero-btn hero-btn-primary info-back-button"
        >
          Zurück zum Shop
        </Link>

      </main>

    </div>
  );
}