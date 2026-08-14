import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";

export default function CheckoutPage({ cart = [] }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "Schweiz",
    street: "",
    addressExtra: "",
    city: "",
    zip: "",
    email: "",
    phone: "",
    differentShipping: false,
    notes: "",
    paymentMethod: "Kreditkarte",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // =========================
  // GUTSCHEIN
  // =========================

  const [voucherInput, setVoucherInput] = useState("");

  const [voucherApplied, setVoucherApplied] = useState(() => {
    return localStorage.getItem("voucherCode") === "SIBEL";
  });

  const [voucherError, setVoucherError] = useState("");

  // =========================
  // PREISE
  // =========================

  const parsePrice = (price) => {
    const value = Number(
      String(price)
        .replace(" CHF", "")
        .replace(",", ".")
    );

    return Number.isFinite(value) ? value : 0;
  };

  const total = cart.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.quantity;
  }, 0);

  // Bestehender prozentualer Rabatt
  // z.B. Reta10 = 10%
  const discount =
    Number(localStorage.getItem("discount")) || 0;

  const discountAmount =
    total * (discount / 100);

  const afterPercentDiscount =
    total - discountAmount;

  // =========================
  // 80 CHF GUTSCHEIN
  // =========================

  const voucherAmount = voucherApplied ? 80 : 0;

  // =========================
  // ENDGÜLTIGER PREIS
  // =========================

  const finalTotal = Math.max(
    0,
    afterPercentDiscount - voucherAmount
  );

  // =========================
  // GUTSCHEIN ANWENDEN
  // =========================

 const applyVoucher = () => {
  const code = voucherInput.trim().toUpperCase();

  if (code === "SIBEL") {
    localStorage.setItem("voucherCode", "SIBEL");

    setVoucherApplied(true);
    setVoucherError("");
    setVoucherInput("SIBEL");
  } else {
    localStorage.removeItem("voucherCode");

    setVoucherApplied(false);
    setVoucherError("Dieser Gutscheincode ist nicht gültig.");
  }
};

  // =========================
  // FORMULAR
  // =========================

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  // =========================
  // CHECKOUT
  // =========================

  const handleSubmit = async () => {
    if (isSubmitting) return;

    let newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = true;
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = true;
    }

    if (!form.country.trim()) {
      newErrors.country = true;
    }

    if (!form.street.trim()) {
      newErrors.street = true;
    }

    if (!form.city.trim()) {
      newErrors.city = true;
    }

    if (!form.zip.trim()) {
      newErrors.zip = true;
    }

    if (!form.email.trim()) {
      newErrors.email = true;
    } else if (
      !/\S+@\S+\.\S+/.test(form.email)
    ) {
      newErrors.email = "invalid";
    }

    if (cart.length === 0) {
      setSubmitError(
        "Dein Warenkorb ist leer."
      );
      return;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const orderNumber =
      "SP-" +
      Math.floor(
        100000 +
          Math.random() * 900000
      );

    const date =
      new Date().toLocaleDateString(
        "de-DE"
      );

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const res = await fetch(
        "/api/stripe-test",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            orderNumber,
            date,

            // Wichtig:
            // Hier wird der bereits rabattierte
            // Endbetrag an Stripe übergeben.
            total: finalTotal,

            cart,

            form: {
              ...form,
              paymentMethod:
                "Kreditkarte",
            },
          }),
        }
      );

      const raw = await res.text();

      console.log(
        "Stripe API Status:",
        res.status
      );

      console.log(
        "Stripe API Antwort:",
        raw
      );

      let data = {};

      try {
        data = raw
          ? JSON.parse(raw)
          : {};
      } catch (e) {
        throw new Error(
          "Stripe API hat kein gültiges JSON zurückgegeben."
        );
      }

      if (
        !res.ok ||
        !data.success ||
        !data.url
      ) {
        throw new Error(
          data.error ||
            "Stripe Checkout konnte nicht gestartet werden."
        );
      }

      // Reta10-Rabatt entfernen
      localStorage.removeItem(
        "discount"
      );

      // SIBEL-Gutschein entfernen
      localStorage.removeItem(
        "voucherCode"
      );

      window.location.href =
        data.url;
    } catch (err) {
      console.error(
        "Stripe Fehler:",
        err
      );

      setSubmitError(
        err.message ||
          "Stripe-Zahlung konnte nicht gestartet werden."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="topbar">
        Alle unsere Produkte sind Labor geprüft.
      </div>

      <header className="header">
        <Link
          to="/"
          className="brand"
        >
          <img
            src="/logo1.png"
            alt="SwissPharmaLab"
            className="logo"
          />
        </Link>
      </header>

      <nav className="nav">
        <Link
          to="/"
          className="nav-link"
        >
          Zurück zum Shop
        </Link>

        <Link
          to="/warenkorb"
          className="nav-link"
        >
          Zurück zum Warenkorb
        </Link>
      </nav>

      <section className="checkout-page">
        <div className="checkout-layout">

          {/* =========================
              FORMULAR
          ========================= */}

          <div className="checkout-form-box">
            <h1 className="checkout-title">
              Versand Daten
            </h1>

            <form
              className="checkout-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >

              <div className="checkout-row two-cols">

                <div className="checkout-field">
                  <label>
                    Vorname *
                  </label>

                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={
                      form.firstName
                    }
                    onChange={(e) =>
                      handleChange(
                        "firstName",
                        e.target.value
                      )
                    }
                  />

                  {errors.firstName && (
                    <span className="error">
                      Bitte Vorname eingeben
                    </span>
                  )}
                </div>

                <div className="checkout-field">
                  <label>
                    Nachname *
                  </label>

                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={
                      form.lastName
                    }
                    onChange={(e) =>
                      handleChange(
                        "lastName",
                        e.target.value
                      )
                    }
                  />

                  {errors.lastName && (
                    <span className="error">
                      Bitte Nachname eingeben
                    </span>
                  )}
                </div>

              </div>

              <div className="checkout-field">
                <label>
                  Land *
                </label>

                <select
                  id="country"
                  name="country"
                  value={
                    form.country
                  }
                  onChange={(e) =>
                    handleChange(
                      "country",
                      e.target.value
                    )
                  }
                >
                  <option value="Deutschland">
                    Deutschland
                  </option>

                  <option value="Schweiz">
                    Schweiz
                  </option>

                  <option value="Österreich">
                    Österreich
                  </option>
                </select>

                {errors.country && (
                  <span className="error">
                    Bitte Land auswählen
                  </span>
                )}
              </div>

              <div className="checkout-field">
                <label>
                  Straße *
                </label>

                <input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Straßenname und Hausnummer"
                  value={
                    form.street
                  }
                  onChange={(e) =>
                    handleChange(
                      "street",
                      e.target.value
                    )
                  }
                />

                {errors.street && (
                  <span className="error">
                    Bitte Straße eingeben
                  </span>
                )}
              </div>

              <div className="checkout-field">
                <input
                  type="text"
                  id="addressExtra"
                  name="addressExtra"
                  placeholder="Wohnung, Suite, Zimmer usw. (optional)"
                  value={
                    form.addressExtra
                  }
                  onChange={(e) =>
                    handleChange(
                      "addressExtra",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="checkout-field">
                <label>
                  Ort / Stadt *
                </label>

                <input
                  type="text"
                  id="city"
                  name="city"
                  value={
                    form.city
                  }
                  onChange={(e) =>
                    handleChange(
                      "city",
                      e.target.value
                    )
                  }
                />

                {errors.city && (
                  <span className="error">
                    Bitte Ort / Stadt eingeben
                  </span>
                )}
              </div>

              <div className="checkout-field">
                <label>
                  Postleitzahl *
                </label>

                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={
                    form.zip
                  }
                  onChange={(e) =>
                    handleChange(
                      "zip",
                      e.target.value
                    )
                  }
                />

                {errors.zip && (
                  <span className="error">
                    Bitte Postleitzahl eingeben
                  </span>
                )}
              </div>

              <div className="checkout-field">
                <label>
                  E-Mail-Adresse *
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={
                    form.email
                  }
                  onChange={(e) =>
                    handleChange(
                      "email",
                      e.target.value
                    )
                  }
                />

                {errors.email === true && (
                  <span className="error">
                    Bitte E-Mail eingeben
                  </span>
                )}

                {errors.email ===
                  "invalid" && (
                  <span className="error">
                    Bitte gültige E-Mail eingeben
                  </span>
                )}
              </div>

              <div className="checkout-field">
                <label>
                  Telefonnummer
                  {" "}
                  (Bessere Zustellung)
                  {" "}
                  (optional)
                </label>

                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={
                    form.phone
                  }
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="checkout-checkbox-row">
                <label className="checkbox-label">
                  Lieferung an eine andere Adresse senden?
                </label>

                <input
                  type="checkbox"
                  id="differentShipping"
                  name="differentShipping"
                  checked={
                    form.differentShipping
                  }
                  onChange={(e) =>
                    handleChange(
                      "differentShipping",
                      e.target.checked
                    )
                  }
                />
              </div>

              <div className="checkout-field">
                <label>
                  Anmerkungen zur Bestellung
                  {" "}
                  (optional)
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows="5"
                  placeholder="Anmerkungen zu deiner Bestellung, z.B. besondere Hinweise für die Lieferung."
                  value={
                    form.notes
                  }
                  onChange={(e) =>
                    handleChange(
                      "notes",
                      e.target.value
                    )
                  }
                />
              </div>

              {submitError && (
                <span className="error">
                  {submitError}
                </span>
              )}
            </form>
          </div>

          {/* =========================
              BESTELLÜBERSICHT
          ========================= */}

          <div className="checkout-summary-box">

            <h2 className="checkout-summary-title">
              Bestellübersicht
            </h2>

            {cart.length === 0 ? (
              <p>
                Dein Warenkorb ist leer.
              </p>
            ) : (
              <div className="checkout-summary-list">

                {cart.map((item) => {
                  const itemTotal =
                    parsePrice(
                      item.price
                    ) *
                    item.quantity;

                  return (
                    <div
                      className="checkout-summary-item"
                      key={`${item.id}-${item.variant || ""}-${item.dose || ""}`}
                    >

                      <div className="checkout-summary-item-left">

                        <img
                          src={item.image}
                          alt={item.title}
                          className="checkout-summary-image"
                        />

                        <div>

                          <div className="checkout-summary-name">
                            {item.title}
                          </div>

                          <div className="checkout-summary-qty">
                            Menge:{" "}
                            {item.quantity}
                          </div>

                        </div>
                      </div>

                      <div className="checkout-summary-price">
                        {itemTotal.toFixed(
                          2
                        )}{" "}
                        CHF
                      </div>

                    </div>
                  );
                })}

              </div>
            )}

            <div className="checkout-summary-divider" />

            {/* =========================
                GUTSCHEIN
            ========================= */}

            <div className="voucher-box">

              <label
                htmlFor="voucherCodeInput"
              >
                Gutscheincode
              </label>

              <div className="voucher-input-row">

                <input
                  id="voucherCodeInput"
                  name="voucherCode"
                  type="text"
                  placeholder="Code eingeben"
                  value={
                    voucherInput
                  }
                  onChange={(e) => {
                    setVoucherInput(
                      e.target.value
                    );

                    setVoucherError("");
                  }}
                />

                <button
                  type="button"
                  className="buy-btn"
                  onClick={
                    applyVoucher
                  }
                >
                  Anwenden
                </button>

              </div>

              {voucherApplied && (
                <div className="voucher-success">
                  ✓ Gutschein SIBEL angewendet:
                  {" "}
                  -80.00 CHF
                </div>
              )}

              {voucherError && (
                <div className="voucher-error">
                  {voucherError}
                </div>
              )}

            </div>

            {/* =========================
                PREISÜBERSICHT
            ========================= */}

            {discount > 0 && (
              <div className="checkout-summary-row">
                <span>
                  Rabatt ({discount}%)
                </span>

                <span>
                  -{discountAmount.toFixed(2)}
                  {" "}
                  CHF
                </span>
              </div>
            )}

            {voucherApplied && (
              <div className="checkout-summary-row">
                <span>
                  Gutschein SIBEL
                </span>

                <span>
                  -80.00 CHF
                </span>
              </div>
            )}

            <div className="checkout-summary-row">
              <span>
                Gesamtsumme inkl. Versand
              </span>

              <span>
                {finalTotal.toFixed(2)}
                {" "}
                CHF
              </span>
            </div>

            <div className="checkout-card-logo">
              <img
                src="/visa.png"
                alt="Kreditkartenzahlung"
              />
            </div>

            <button
              type="button"
              className="buy-btn checkout-pay-btn"
              onClick={
                handleSubmit
              }
              disabled={
                isSubmitting
              }
            >
              {isSubmitting
                ? "Wird verarbeitet..."
                : "Bezahlen mit Kreditkarte"}
            </button>

            <div className="shipping-row">
              <span>
                Lieferzeit: 1–7 Tage
              </span>

              <img
                src="/POST.png"
                alt="Schweizer Post"
                className="post-logo"
              />
            </div>

            <div className="shipping-sub">
              Versand aus der Schweiz
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}