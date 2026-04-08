import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";

export default function CheckoutPage({ cart = [] }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "Deutschland",
    street: "",
    addressExtra: "",
    city: "",
    zip: "",
    email: "",
    phone: "",
    differentShipping: false,
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const parsePrice = (price) => {
    return Number(String(price).replace(" CHF", "").replace(",", "."));
  };

  const total = cart.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.quantity;
  }, 0);

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

const handleSubmit = async () => {
  alert("handleSubmit läuft");
  let newErrors = {};

  if (!form.firstName.trim()) newErrors.firstName = true;
  if (!form.lastName.trim()) newErrors.lastName = true;
  if (!form.country.trim()) newErrors.country = true;
  if (!form.street.trim()) newErrors.street = true;
  if (!form.city.trim()) newErrors.city = true;
  if (!form.zip.trim()) newErrors.zip = true;

  if (!form.email.trim()) {
    newErrors.email = true;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    newErrors.email = "invalid";
  }

  if (cart.length === 0) {
    setSubmitError("Dein Warenkorb ist leer.");
    return;
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) return;

  const orderNumber = "SP-" + Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toLocaleDateString("de-DE");

  setSubmitError("");

  try {
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderNumber,
        date,
        total,
        cart,
        form,
      }),
    });

    const data = await res.json();
    console.log("API response:", data);
    alert(JSON.stringify(data));

if (!res.ok || !data.success) {
  throw new Error(data.error || "Mail konnte nicht gesendet werden.");
}

    if (!res.ok || !data.success) {
      throw new Error(data.error || "Mail konnte nicht gesendet werden.");
    }

    navigate("/success", {
      state: {
        orderNumber,
        date,
        total,
        paymentMethod: "Kreditkarte",
        cart,
        form,
      },
    });
  } catch (err) {
    console.error("Mail Fehler:", err);
    setSubmitError(err.message || "Mail Versand fehlgeschlagen.");
  }
};

  return (
    <div className="page">
      <div className="topbar">Alle unsere Produkte sind Labor geprüft.</div>

      <header className="header">
        <Link to="/" className="brand">
          <img src="/logo1.png" alt="SwissPharmaLab" className="logo" />
        </Link>
      </header>

      <nav className="nav">
        <Link to="/" className="nav-link">Zurück zum Shop</Link>
        <Link to="/warenkorb" className="nav-link">Zurück zum Warenkorb</Link>
      </nav>

      <section className="checkout-page">
        <div className="checkout-layout">
          <div className="checkout-form-box">
            <h1 className="checkout-title">Versand Daten</h1>

            <form
              className="checkout-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="checkout-row two-cols">
                <div className="checkout-field">
                  <label>Vorname *</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                  />
                  {errors.firstName && (
                    <span className="error">Bitte Vorname eingeben</span>
                  )}
                </div>

                <div className="checkout-field">
                  <label>Nachname *</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                  />
                  {errors.lastName && (
                    <span className="error">Bitte Nachname eingeben</span>
                  )}
                </div>
              </div>

              <div className="checkout-field">
                <label>Land *</label>
                <select
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                >
                  <option value="Deutschland">Deutschland</option>
                  <option value="Schweiz">Schweiz</option>
                  <option value="Österreich">Österreich</option>
                </select>
                {errors.country && (
                  <span className="error">Bitte Land auswählen</span>
                )}
              </div>

              <div className="checkout-field">
                <label>Straße *</label>
                <input
                  type="text"
                  placeholder="Straßenname und Hausnummer"
                  value={form.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                />
                {errors.street && (
                  <span className="error">Bitte Straße eingeben</span>
                )}
              </div>

              <div className="checkout-field">
                <input
                  type="text"
                  placeholder="Wohnung, Suite, Zimmer usw. (optional)"
                  value={form.addressExtra}
                  onChange={(e) => handleChange("addressExtra", e.target.value)}
                />
              </div>

              <div className="checkout-field">
                <label>Ort / Stadt *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
                {errors.city && (
                  <span className="error">Bitte Ort / Stadt eingeben</span>
                )}
              </div>

              <div className="checkout-field">
                <label>Postleitzahl *</label>
                <input
                  type="text"
                  value={form.zip}
                  onChange={(e) => handleChange("zip", e.target.value)}
                />
                {errors.zip && (
                  <span className="error">Bitte Postleitzahl eingeben</span>
                )}
              </div>

              <div className="checkout-field">
                <label>E-Mail-Adresse *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email === true && (
                  <span className="error">Bitte E-Mail eingeben</span>
                )}
                {errors.email === "invalid" && (
                  <span className="error">Bitte gültige E-Mail eingeben</span>
                )}
              </div>

              <div className="checkout-field">
                <label>Telefonnummer (Bessere Zustellung) (optional)</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>

              <div className="checkout-checkbox-row">
                <label className="checkbox-label">
                  Lieferung an eine andere Adresse senden?
                </label>
                <input
                  type="checkbox"
                  checked={form.differentShipping}
                  onChange={(e) =>
                    handleChange("differentShipping", e.target.checked)
                  }
                />
              </div>

              <div className="checkout-field">
                <label>Anmerkungen zur Bestellung (optional)</label>
                <textarea
                  rows="5"
                  placeholder="Anmerkungen zu deiner Bestellung, z.B. besondere Hinweise für die Lieferung."
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>

              {submitError && <span className="error">{submitError}</span>}
            </form>
          </div>

          <div className="checkout-summary-box">
            <h2 className="checkout-summary-title">Bestellübersicht</h2>

            {cart.length === 0 ? (
              <p>Dein Warenkorb ist leer.</p>
            ) : (
              <div className="checkout-summary-list">
                {cart.map((item) => {
                  const itemTotal = parsePrice(item.price) * item.quantity;

                  return (
                    <div className="checkout-summary-item" key={item.id}>
                      <div className="checkout-summary-item-left">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="checkout-summary-image"
                        />
                        <div>
                          <div className="checkout-summary-name">{item.title}</div>
                          <div className="checkout-summary-qty">
                            Menge: {item.quantity}
                          </div>
                        </div>
                      </div>

                      <div className="checkout-summary-price">
                        {itemTotal.toFixed(2)} CHF
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-row">
              <span>Gesamtsumme inkl. Versand</span>
              <span>{total.toFixed(2)} CHF</span>
            </div>

            <button
              type="button"
              className="buy-btn checkout-pay-btn"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wird gesendet..." : "Bezahlen"}
            </button>

            <div className="shipping-row">
              <span>Lieferzeit: 2–7 Tage</span>
              <img src="/POST.png" alt="Schweizer Post" className="post-logo" />
            </div>

            <div className="shipping-sub">Versand aus der Schweiz</div>
          </div>
        </div>
      </section>
    </div>
  );
}