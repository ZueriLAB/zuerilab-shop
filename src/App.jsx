import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import SuccessPage from "./SuccessPage";
import StripeTestSuccessPage from "./StripeTestSuccessPage";
import SupportPage from "./SupportPage";
import BusinessPage from "./BusinessPage";
import ScrollToTop from "./ScrollToTop";
import AboutUsPage from "./AboutUsPage";
import FAQPage from "./FAQPage";
import TermsPage from "./TermsPage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import ShippingPolicyPage from "./ShippingPolicyPage";
import RefundPolicyPage from "./RefundPolicyPage";
import reportImage from "./assets/test-report.png";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

const products = [
  {
  id: 30,
  title: "GHK-CU 50mg",
  category: "AUGUST NEWS",
  price: "30.00 CHF",
  oldPrice: "110.00 CHF",
  badge: "AUGUST",
  image: "/GHK-CU.png",
  variants: ["Vial", "Kartusche"],
  description:
    "GHK-CU – Hochreiner Laborwirkstoff für Forschungszwecke.",
  details:
    "GHK-CU ist ein synthetischer kupfergebundener Peptidkomplex in lyophilisierter Pulverform.",
  gallery: ["/GHK-CU.png"],
  inStock: true,
},

{
  id: 31,
  title: "5-Amino-1MQ",
  category: "AUGUST NEWS",
  price: "60.00 CHF",
  oldPrice: "80.00 CHF",
  badge: "AUGUST",
  image: "/amino.png",
  variants: ["Vial", "Kartusche"],
  description:
    "5-Amino-1MQ – Hochreiner Laborwirkstoff für Forschungszwecke.",
  details:
    "Research-Grade-Laborverbindung für kontrollierte Forschungs- und Modellanwendungen.",
  gallery: ["/amino.png"],
  inStock: true,
},

{
  id: 32,
  title: "MT-2 10mg",
  category: "AUGUST NEWS",
  price: "30.00 CHF",
  oldPrice: "60.00 CHF",
  badge: "AUGUST",
  image: "/mt2.png",
  variants: ["Vial", "Kartusche"],
  description:
    "MT-2 – Hochreiner Laborwirkstoff für Forschungszwecke.",
  details:
    "Research-Grade-Laborverbindung für kontrollierte Forschungs- und Modellanwendungen.",
  gallery: ["/mt2.png"],
  inStock: true,
},
{
  id: 33,
  title: "Semax 30mg",
  category: "AUGUST NEWS",
  price: "30.00 CHF",
  oldPrice: "60.00 CHF",
  badge: "AUGUST",
  image: "/semaxx.png",
  variants: ["Vial", "Kartusche"],
  description:
    "Semax – Hochreiner Laborwirkstoff für Forschungszwecke.",
  details:
    "Research-Grade-Laborverbindung für kontrollierte Forschungs- und Modellanwendungen.",
  gallery: ["/semaxx.png"],
  inStock: true,
},

  {
    id: 99,
    title: "RETATRUTIDE 20mg Fertigpen",
    category: "NEU",
    price: "260.00 CHF",
    badge: "NEU",
    image: "/RETAPEN.png",
    description:
      "Retatrutide 20mg Fertigpen ausschließlich für Labor-, Analyse- und Referenzzwecke. Exclusive nur bei SwissPharmaLab.",
    details:
      "RETATRUTIDE 20mg ist ein synthetisches Peptid in Forschungsqualität, ausschließlich für Labor-, Analyse- und Referenzzwecke.",
    gallery: ["/RETAPEN.png"],
    inStock: true,
  },

  {
    id: 98,
    title: "GHK-CU 50mg Fertigpen",
    category: "NEU",
    price: "130.00 CHF",
    badge: "NEU",
    image: "/OZEN.png",
    description:
      "GHK-CU 50mg Fertigpen ausschließlich für Labor-, Analyse- und Referenzzwecke. Exclusive nur bei SwissPharmaLab.",
    details:
      "GHK-Cu ist ein hochwertiges Kupferpeptid für kontrollierte Forschungs- und Analysezwecke.",
    gallery: ["/OZEN.png"],
    inStock: true,
  },

  {
    id: 97,
    title: "MOTS-C 10mg Fertigpen",
    category: "NEU",
    price: "220.00 CHF",
    badge: "NEU",
    image: "/MOTS.png",
    description:
      "MOTS-C 10mg Fertigpen ausschließlich für Labor-, Analyse- und Referenzzwecke. Exclusive nur bei SwissPharmaLab.",
    details:
      "MOTS-C Forschungsqualität ist ein synthetisches Peptid für Laborforschung, analytische Verfahren und standardisierte Referenzanwendungen.",
    gallery: ["/MOTS.png"],
    inStock: true,
  },

  {
    id: 96,
    title: "NAD+ 500mg Fertigpen",
    category: "NEU",
    price: "200.00 CHF",
    badge: "NEU",
    image: "/NAD.png",
    description:
      "NAD+ 500mg Fertigpen ausschließlich für Labor-, Analyse- und Referenzzwecke.",
    details:
      "Nur für Laborforschungszwecke. Nicht zur Anwendung am Menschen oder Tier.",
    gallery: ["/NAD.png"],
    inStock: true,
  },

  {
    id: 95,
    title: "IGF-1 LR3 1mg Fertigpen",
    category: "NEU",
    price: "230.00 CHF",
    badge: "NEU",
    image: "/IGF.png",
    description:
      "IGF-1 LR3 Fertigpen ausschließlich für Labor-, Analyse- und Referenzzwecke.",
    details:
      "IGF-1 LR3 ist ein rekombinantes Analogon von IGF-1 für präklinische Forschungszwecke.",
    gallery: ["/IGF.png"],
    inStock: true,
  },

  {
    id: 94,
    title: "Semax 30mg Fertigpen",
    category: "NEU",
    price: "140.00 CHF",
    badge: "NEU",
    image: "/semax.png",
    description:
      "Semax 30mg Fertigpen ausschließlich für Labor-, Analyse- und Referenzzwecke.",
    details:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    gallery: ["/semax.png"],
    inStock: true,
  },

  {
    id: 1,
    title: "GHK-CU 50mg",
    category: "PEPTIDE",
    price: "30.00 CHF",
    oldPrice: "110.00 CHF",
    badge: "BESTSELLER",
    image: "/GHK-CU.png",
    variants: ["Vial", "Kartusche"],
    description:
      "GHK-CU - Hochreiner Laborwirkstoff für Forschungszwecke.",
    details:
      "GHK-CU ist ein synthetischer kupfergebundener Peptidkomplex in lyophilisierter Pulverform.",
    gallery: ["/GHK-CU.png"],
    inStock: true,
  },

  {
    id: 2,
    title: "HGH FRAGMENT 176-191 5mg",
    category: "PEPTIDE",
    price: "110.00 CHF",
    oldPrice: "125.00 CHF",
    badge: "BESTSELLER",
    image: "/HGH-FRAG.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    details:
      "HGH Fragment 176–191 ist ein stabilisiertes Analogon für präklinische Forschungszwecke.",
    gallery: ["/HGH-FRAG.png"],
    inStock: true,
  },

  {
    id: 3,
    title: "RETATRUTIDE 10mg / 20mg",
    category: "PEPTIDE",
    price: "120.00 CHF",
    oldPrice: "130.00 CHF",
    badge: "BESTSELLER",
    image: "/RETA10.png",
    doses: [
      { label: "10 mg", price: "120.00 CHF" },
      { label: "20 mg", price: "170.00 CHF" },
    ],
    variants: ["Vial", "Kartusche"],
    description:
      "Retatrutide ausschließlich für Labor-, Analyse- und Referenzzwecke.",
    details:
      "RETATRUTIDE ist ein synthetisches Peptid in Forschungsqualität für kontrollierte Forschungsumgebungen.",
    gallery: ["/RETA10.png"],
    inStock: true,
  },

  {
    id: 4,
    title: "MOTS-C 10mg",
    category: "PEPTIDE",
    price: "110.00 CHF",
    oldPrice: "120.00 CHF",
    badge: "BESTSELLER",
    image: "/MOTS1.png",
    variants: ["Vial", "Kartusche"],
    description:
      "MOTS-C 10mg ausschließlich für Labor-, Analyse- und Referenzzwecke.",
    details:
      "MOTS-C 10mg ausschließlich für Labor-, Analyse- und Referenzzwecke.",
    gallery: ["/MOTS1.png"],
    inStock: true,
  },

  {
    id: 5,
    title: "IGF-1 LR3 1mg",
    category: "PEPTIDE",
    price: "110.00 CHF",
    oldPrice: "120.00 CHF",
    badge: "SALE",
    image: "/igf-lr.png",
    variants: ["Vial", "Kartusche"],
    description:
      "IGF-1 LR3 ausschließlich für Labor-, Analyse- und Referenzzwecke.",
    details:
      "IGF-1 LR3 ausschließlich für Labor-, Analyse- und Referenzzwecke.",
    gallery: ["/igf-lr.png"],
    inStock: true,
  },

  {
    id: 6,
    title: "IPAMORELIN",
    category: "PEPTIDE",
    price: "70.00 CHF",
    oldPrice: "75.00 CHF",
    badge: "SALE",
    image: "/IPA.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    details:
      "Hinweis zur ausschließlichen Forschung.",
    gallery: ["/IPA.png"],
    inStock: true,
  },

  {
    id: 7,
    title: "THYMOSIN ALPHA",
    category: "PEPTIDE",
    price: "100.00 CHF",
    oldPrice: "109.00 CHF",
    badge: "SALE",
    image: "/THY.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Hinweis zur ausschließlichen Forschung.",
    details:
      "Thymosin Alpha-1 ist ein Peptid, das in präklinischer Forschung untersucht wird.",
    gallery: ["/THY.png"],
    inStock: true,
  },

  {
    id: 8,
    title: "KLOW",
    category: "PEPTIDE",
    price: "170.00 CHF",
    oldPrice: "180.00 CHF",
    badge: "SALE",
    image: "/KLOW.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Synthetische Peptid-Mischung. Hinweis zur ausschließlichen Forschung.",
    details:
      "Hinweis zur ausschließlichen Forschung.",
    gallery: ["/KLOW.png"],
    inStock: true,
  },

  {
    id: 9,
    title: "GLOW",
    category: "PEPTIDE",
    price: "125.00 CHF",
    oldPrice: "130.00 CHF",
    badge: "SALE",
    image: "/GLOW.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Synthetische Peptid-Mischung. Hinweis zur ausschließlichen Forschung.",
    details:
      "Hinweis zur ausschließlichen Forschung.",
    gallery: ["/GLOW.png"],
    inStock: true,
  },

  {
    id: 10,
    title: "SEMAX 30mg",
    category: "PEPTIDE",
    price: "90.00 CHF",
    oldPrice: "99.00 CHF",
    badge: "SALE",
    image: "/semaxx.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Semax 30mg ausschließlich für Labor-, Analyse- und Referenzzwecke.",
    details:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    gallery: ["/semaxx.png"],
    inStock: true,
  },

  {
    id: 11,
    title: "NAD+ 500mg",
    category: "PEPTIDE",
    price: "80.00 CHF",
    oldPrice: "85.00 CHF",
    badge: "SALE",
    image: "/nad++.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    details:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    gallery: ["/nad++.png"],
    inStock: true,
  },

  {
    id: 12,
    title: "GHRP-2",
    category: "PEPTIDE",
    price: "90.00 CHF",
    oldPrice: "99.00 CHF",
    badge: "SALE",
    image: "/GHRP.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    details:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    gallery: ["/GHRP.png"],
    inStock: true,
  },

  {
    id: 13,
    title: "GHRP-6",
    category: "PEPTIDE",
    price: "90.00 CHF",
    oldPrice: "99.00 CHF",
    badge: "SALE",
    image: "/GHRP6.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    details:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    gallery: ["/GHRP6.png"],
    inStock: true,
  },

  {
    id: 14,
    title: "BPC-157",
    category: "PEPTIDE",
    price: "79.00 CHF",
    oldPrice: "85.00 CHF",
    badge: "SALE",
    image: "/BPC.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    details:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    gallery: ["/BPC.png"],
    inStock: true,
  },

  {
    id: 15,
    title: "TB-500 10",
    category: "PEPTIDE",
    price: "80.00 CHF",
    oldPrice: "95.00 CHF",
    badge: "SALE",
    image: "/TB500.png",
    variants: ["Vial", "Kartusche"],
    description:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    details:
      "Nur für Laborforschungszwecke. Nicht für den menschlichen oder tierischen Verzehr.",
    gallery: ["/TB500.png"],
    inStock: true,
  },
];

const augustProducts = products.filter(
  (product) => product.category === "AUGUST NEWS"
);

export default function App() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Fehler beim Laden des Warenkorbs:", error);
      return [];
    }
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [ageConfirmed, setAgeConfirmed] = useState(() => {
    return (
      localStorage.getItem("swisspharmalab_age_confirmed") === "true"
    );
  });

  const [ageAccepted, setAgeAccepted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Fehler beim Speichern des Warenkorbs:", error);
    }
  }, [cart]);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    if (!q) {
      return products;
    }

    return products.filter((product) => {
      const haystack = [
        product.title,
        product.description,
        product.details,
        product.badge,
        product.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [searchTerm]);

  const peptideProducts = filteredProducts.filter(
    (product) => product.category === "PEPTIDE"
  );

  const muscleGainProducts = filteredProducts.filter(
    (product) => product.category === "Muskelaufbau"
  );

  const supportProducts = filteredProducts.filter(
    (product) => product.category === "Kundenservice"
  );

  const newProducts = filteredProducts.filter(
    (product) => product.badge === "NEU"
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart
    .reduce((sum, item) => {
      const numericPrice =
        typeof item.price === "string"
          ? Number(
              item.price
                .replace(" CHF", "")
                .replace(",", ".")
            )
          : Number(item.price);

      return sum + item.quantity * numericPrice;
    }, 0)
    .toFixed(2);

  const bestsellers = products.filter(
    (product) => product.badge === "BESTSELLER"
  );

  const addToCart = (product) => {
    if (product.inStock === false) {
      return;
    }

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.variant === product.variant &&
          item.dose === product.dose
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id &&
          item.variant === product.variant &&
          item.dose === product.dose
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  };

  const increaseQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

const renderProductCard = (product) => (
  <div className="card" key={product.id}>
    <div className="image-wrap">
      <img
        src={product.image}
        alt={product.title}
        className={`card-image ${
          product.id === 31 || product.id === 32
            ? "amino-mt2-image"
            : ""
        }`}
      />
    </div>

      <div className="card-content">
        <div className="card-meta-row">
          <span className="card-category">
            {product.category}
          </span>
        </div>
<h3>{product.title}</h3>

<div className="price-row">
  <span
    className={
      product.category === "AUGUST NEWS"
        ? "price august-price"
        : "price"
    }
  >
    {product.price}
  </span>

  {product.oldPrice && (
    <span
      className={
        product.category === "AUGUST NEWS"
          ? "old-price august-old-price"
          : "old-price"
      }
    >
      {product.oldPrice}
    </span>
  )}
</div>

        <p>{product.description}</p>

        {product.variants && (
          <div className="variant-select">
            <label htmlFor={`variant-${product.id}`}>
              Ausführung
            </label>

            <select
              id={`variant-${product.id}`}
              defaultValue={product.variants[0]}
            >
              {product.variants.map((variant) => (
                <option
                  key={variant}
                  value={variant}
                >
                  {variant}
                </option>
              ))}
            </select>
          </div>
        )}

        {product.doses && (
          <div className="variant-select">
            <label htmlFor={`dose-${product.id}`}>
              Dosierung
            </label>

            <select
              id={`dose-${product.id}`}
              defaultValue={product.doses[0].label}
            >
              {product.doses.map((dose) => (
                <option
                  key={dose.label}
                  value={dose.label}
                >
                  {dose.label} – {dose.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {product.inStock === false && (
          <p className="out-of-stock-text">
            Nicht verfügbar
          </p>
        )}

        <div className="card-actions">
          <Link to={`/produkt/${product.id}`}>
            <button className="buy-btn full">
              Produkt Details
            </button>
          </Link>

          {product.inStock === false ? (
            <button
              className="secondary-btn full"
              disabled
            >
              Ausverkauft
            </button>
          ) : (
            <button
              className="buy-btn full"
              onClick={(e) => {
                const card =
                  e.currentTarget.closest(".card");

                const selects =
                  card.querySelectorAll("select");

                const variant =
                  selects[0]?.value ||
                  product.variants?.[0] ||
                  null;

                const dose =
                  selects[1]?.value || null;

                let price = product.price;

                if (product.doses && dose) {
                  const selectedDose =
                    product.doses.find(
                      (d) => d.label === dose
                    );

                  if (selectedDose) {
                    price = selectedDose.price;
                  }
                }

                addToCart({
                  ...product,
                  variant,
                  dose,
                  price,
                  title: dose
                    ? `${product.title} ${dose}`
                    : product.title,
                });
              }}
            >
              In den Warenkorb
              <span className="cart-icon">
                🛒
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <div className="page">

              {/* =========================
                  ALTERSBESTÄTIGUNG
              ========================= */}

              {!ageConfirmed && (
                <div className="age-overlay">
                  <div className="age-modal">

                    <img
                      src="/logo1.png"
                      alt="SwissPharmaLab"
                      className="age-logo"
                    />

                    <div className="age-badge">
                      18+
                    </div>

                    <h2>
                      Willkommen bei SwissPharmaLab
                    </h2>

                    <p className="age-title">
                      Alters- und Nutzungshinweis
                    </p>

                    <p>
                      Diese Website richtet sich
                      ausschließlich an Personen ab
                      18 Jahren.
                    </p>

                    <p>
                      Die angebotenen Produkte sind
                      ausschließlich für
                      Forschungszwecke bestimmt.
                    </p>

                    <label className="age-check">
                      <input
                        type="checkbox"
                        checked={ageAccepted}
                        onChange={(e) =>
                          setAgeAccepted(
                            e.target.checked
                          )
                        }
                      />

                      <span>
                        Ich bestätige, dass ich
                        mindestens 18 Jahre alt bin
                        und verstanden habe, dass es
                        sich um Forschungsprodukte
                        handelt.
                      </span>
                    </label>

                    <button
                      className="age-confirm-btn"
                      disabled={!ageAccepted}
                      onClick={() => {
                        localStorage.setItem(
                          "swisspharmalab_age_confirmed",
                          "true"
                        );

                        setAgeConfirmed(true);
                      }}
                    >
                      Zugang bestätigen
                    </button>

                    <button
                      className="age-leave-btn"
                      onClick={() => {
                        window.location.href =
                          "https://www.google.com";
                      }}
                    >
                      Website verlassen
                    </button>

                    <div className="age-secure">
                      🔒 Verantwortungsvoller Zugang
                    </div>

                  </div>
                </div>
              )}

              {/* =========================
                  TOPBAR
              ========================= */}

              <div className="topbar">
                Alle unsere Produkte sind Labor geprüft.
              </div>

              {/* =========================
                  HEADER
              ========================= */}

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

              {/* =========================
                  NAVIGATION
              ========================= */}

              {/* =========================
                  NAVIGATION
              ========================= */}

              <nav className="nav">

                <a
                  href="#peptide"
                  className="nav-link"
                >
                  Peptide
                </a>

                <a
                  href="#Muskelaufbau"
                  className="nav-link"
                >
                  Muskelaufbau
                </a>

                <Link
                  to="/support"
                  className="nav-link"
                >
                  Kundenservice
                </Link>

                <Link
                  to="/business"
                  className="nav-link"
                >
                  Business
                </Link>

                <Link
                  to="/warenkorb"
                  className="nav-link cart-link"
                >
                  🛒 Warenkorb ({cartCount})
                </Link>

                <div className="payment-security">

                  <div className="payment-icons">

                    <div className="payment-card visa">
                      <img
                        src="/visa.svg"
                        alt="Visa"
                      />
                    </div>

                    <div className="payment-card mastercard">
                      <img
                        src="/ma_symbol.svg"
                        alt="Mastercard"
                      />
                    </div>

                    <div className="payment-card apple-pay">
                      <img
                        src="/Apple_Pay_Mark_RGB_041619.svg"
                        alt="Apple Pay"
                      />
                    </div>

                    <div className="payment-card klarna">
                      <img
                        src="/Marketing Badge With Clear Space.png"
                        alt="Klarna"
                      />
                    </div>

                    <div className="payment-card amazon-pay">
                      <img
                        src="/amazonpay.png"
                        alt="Amazon Pay"
                      />
                    </div>

                  </div>

                  <div className="payment-secure">

                    <span className="secure-lock">
                      🔒
                    </span>

                    <div>
                      <strong>
                        Sichere Zahlung
                      </strong>

                      <small>
                        SSL · Secure Checkout
                      </small>
                    </div>

                  </div>

                </div>

              </nav>

              {/* =========================
                  HERO
              ========================= */}

              <section
                className="hero-section"
                id="neu"
              >
                <div className="hero-inner">

                  <div className="hero-badge">
                    Schweizer Qualität • Laborgeprüft
                    • Diskreter Versand
                  </div>

                  <h1 className="hero-title">
                    Premium Performance
                    Forschungs Produkte
                    <br />
                    mit klarem Fokus auf Qualität
                  </h1>

                  <p className="hero-subtitle">
                    Entdecke ausgewählte
                    Forschungs Peptide und
                    Performance-Produkte in einem
                    klaren, diskreten und modernen
                    Bestellprozess mit Versand aus
                    der Schweiz
                  </p>

                  <div className="hero-actions">

                    <a
                      href="#peptide"
                      className="hero-btn hero-btn-primary"
                    >
                      Bestseller ansehen
                    </a>

                    <Link
                      to="/warenkorb"
                      className="hero-btn hero-btn-secondary"
                    >
                      Zum Warenkorb
                    </Link>

                  </div>

                </div>
              </section>

              {/* =========================
                  SUCHLEISTE
              ========================= */}

              <div className="search-bar hero-search">
                <input
                  type="text"
                  placeholder="Produkte suchen..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>

              {/* =========================
                  PRODUKTE
              ========================= */}

              {filteredProducts.length === 0 ? (

                <section className="product-section">

                  <h2 className="section-title">
                    SUCHERGEBNIS
                  </h2>

                  <div className="empty-search-box">

                    <h3>
                      Keine Produkte gefunden
                    </h3>

                    <p>
                      Versuche einen anderen
                      Suchbegriff oder prüfe deine
                      Schreibweise.
                    </p>

                  </div>

                </section>

 ) : (

  <>

    {/* =========================
        AUGUST NEWS
    ========================= */}

    {augustProducts.length > 0 && (
      <section
        className="product-section"
        id="august-news"
      >

        <div className="section-heading-wrap">

          <span className="section-kicker">
            August
          </span>

          <h2 className="section-title">
            AUGUST NEWS
          </h2>

        </div>

        <div className="product-grid august-grid">

          {augustProducts.map((product) => (
            <div
              id={`product-${product.id}`}
              key={product.id}
            >
              {renderProductCard(product)}
            </div>
          ))}

        </div>

      </section>
    )}

    {/* =========================
        NEUE PRODUKTE
    ========================= */}
                  {newProducts.length > 0 && (
                    <section
                      className="product-section"
                      id="new-products"
                    >
                      <div className="section-heading-wrap">

                        <span className="section-kicker">
                          Neu
                        </span>

                        <h2 className="section-title">
                          SwissPharmaLab Fertigpen
                        </h2>

                      </div>

                      <div className="product-grid new-grid">

                        {newProducts.map(
                          (product) => (
                            <div
                              id={`product-${product.id}`}
                              key={product.id}
                            >
                              {renderProductCard(
                                product
                              )}
                            </div>
                          )
                        )}

                      </div>
                    </section>
                  )}

                  {/* =========================
                      PEPTIDE
                  ========================= */}

                  {peptideProducts.length > 0 && (
                    <section
                      className="product-section"
                      id="peptide"
                    >

                      <div className="section-heading-wrap">

                        <span className="section-kicker">
                          Kategorie
                        </span>

                        <h2 className="section-title">
                          PEPTIDE
                        </h2>

                      </div>

                      <div className="product-grid">

                        {peptideProducts.map(
                          (product) => (
                            <div
                              id={`product-${product.id}`}
                              key={product.id}
                            >
                              {renderProductCard(
                                product
                              )}
                            </div>
                          )
                        )}

                      </div>

                    </section>
                  )}

                  {/* =========================
                      MUSKELAUFBAU
                  ========================= */}

                  <section
                    className="product-section"
                    id="Muskelaufbau"
                  >

                    <div className="section-heading-wrap">

                      <span className="section-kicker">
                        Kategorie
                      </span>

                      <h2 className="section-title">
                        Muskelaufbau
                      </h2>

                    </div>

                    <div className="muscle-whatsapp-box">

                      <h3>
                        Muskelaufbau-Produkte
                      </h3>

                      <p>
                        Informationen zu unseren
                        Produkten für den Bereich
                        Muskelaufbau erhalten Sie
                        gerne direkt über WhatsApp.
                      </p>

                      <p>
                        Für eine individuelle
                        Anfrage kontaktieren Sie uns
                        bitte direkt.
                      </p>

                      <a
                        href="https://wa.me/19543389150?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Produkte%20im%20Bereich%20Muskelaufbau."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="muscle-whatsapp-btn"
                      >
                        💬 Muskelaufbau via WhatsApp
                        anfragen
                      </a>

                    </div>

                  </section>

                  {/* =========================
                      SUPPORT
                  ========================= */}

                  {supportProducts.length > 0 && (
                    <section
                      className="product-section"
                      id="support"
                    >

                      <div className="section-heading-wrap">

                        <span className="section-kicker">
                          Kategorie
                        </span>

                        <h2 className="section-title">
                          SUPPORT
                        </h2>

                      </div>

                      <div className="product-grid">

                        {supportProducts.map(
                          (product) => (
                            <div
                              id={`product-${product.id}`}
                              key={product.id}
                            >
                              {renderProductCard(
                                product
                              )}
                            </div>
                          )
                        )}

                      </div>

                    </section>
                  )}

                  {/* =========================
                      FOOTER
                  ========================= */}

                  <footer className="site-footer">

                    <div className="footer-content">

                      <div className="footer-column">

                        <h3>
                          About Us
                        </h3>

                        <Link
                          to="/about-us"
                          className="footer-link"
                        >
                          Über uns
                        </Link>

                      </div>

                      <div className="footer-column footer-info">

                        <h3>
                          Informationen
                        </h3>

                        <Link
                          to="/faqs"
                          className="footer-link"
                        >
                          FAQs
                        </Link>

                        <Link
                          to="/terms"
                          className="footer-link"
                        >
                          Terms & Conditions
                        </Link>

                        <Link
                          to="/privacy-policy"
                          className="footer-link"
                        >
                          Privacy Policy
                        </Link>

                        <Link
                          to="/shipping-policy"
                          className="footer-link"
                        >
                          Shipping Policy
                        </Link>

                        <Link
                          to="/refund-policy"
                          className="footer-link"
                        >
                          Refund Policy
                        </Link>

                      </div>

                      <div className="footer-column">

                        <h3>
                          Kontakt
                        </h3>

                        <a
                          href="mailto:info@swisspharmalab.ch"
                          className="footer-link"
                        >
                          Mail:
                          {" "}
                          info@swisspharmalab.ch
                        </a>

                        <a
                          href="https://wa.me/19543389150"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="footer-link"
                        >
                          WhatsApp
                        </a>

                        <div className="footer-link footer-address">

                          <strong>
                            Adresse
                          </strong>

                          <br />

                          Lindenstrasse 22

                          <br />

                          8008 Zürich

                        </div>

                      </div>

                    </div>

                    <div className="footer-bottom">
                      © {new Date().getFullYear()}
                      {" "}
                      SwissPharmaLab. Alle Rechte
                      vorbehalten.
                    </div>

                  </footer>

                </>

              )}

            </div>
          }
        />

        {/* =========================
            PRODUKT
        ========================= */}

        <Route
          path="/produkt/:id"
          element={
            <ProductPage
              products={products}
              addToCart={addToCart}
              cart={cart}
            />
          }
        />

        {/* =========================
            WEITERE SEITEN
        ========================= */}

        <Route
          path="/support"
          element={
            <SupportPage cart={cart} />
          }
        />

        <Route
          path="/business"
          element={
            <BusinessPage cart={cart} />
          }
        />

        <Route
          path="/about-us"
          element={
            <AboutUsPage cart={cart} />
          }
        />

        <Route
          path="/faqs"
          element={
            <FAQPage cart={cart} />
          }
        />

        <Route
          path="/terms"
          element={
            <TermsPage cart={cart} />
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <PrivacyPolicyPage cart={cart} />
          }
        />

        <Route
          path="/shipping-policy"
          element={
            <ShippingPolicyPage cart={cart} />
          }
        />

        <Route
          path="/refund-policy"
          element={
            <RefundPolicyPage cart={cart} />
          }
        />

        {/* =========================
            WARENKORB
        ========================= */}

        <Route
          path="/warenkorb"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
          }
        />

        {/* =========================
            CHECKOUT
        ========================= */}

        <Route
          path="/checkout"
          element={
            <CheckoutPage cart={cart} />
          }
        />

        {/* =========================
            SUCCESS
        ========================= */}

        <Route
          path="/success"
          element={<SuccessPage />}
        />

        <Route
          path="/bestellung-erfolgreich"
          element={
            <StripeTestSuccessPage />
          }
        />

      </Routes>

      {/* =========================
          WHATSAPP BUTTON
      ========================= */}

      <a
        href="https://wa.me/19543389150?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zu%20Ihrer%20Webseite."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-button"
        aria-label="WhatsApp"
      >

        <svg
          className="whatsapp-icon"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >

          <path
            fill="currentColor"
            d="M19.11 17.19c-.27-.14-1.59-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.18-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.65.21 1.59-.65 1.81-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"
          />

          <path
            fill="currentColor"
            d="M16.01 3C8.83 3 3 8.83 3 16.01c0 2.3.6 4.46 1.66 6.34L3 29l6.83-1.62a12.94 12.94 0 0 0 6.18 1.57h.01C23.19 28.95 29 23.12 29 15.99 29 8.82 23.18 3 16.01 3zm0 23.68h-.01c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-4.05.96.98-3.95-.25-.41a10.93 10.93 0 0 1-1.67-5.84C5.15 9.72 10.03 4.84 16.01 4.84c5.99 0 10.85 4.88 10.85 10.86 0 5.99-4.87 10.98-10.85 10.98z"
          />

        </svg>

        <span className="whatsapp-text">
          WhatsApp
        </span>

      </a>

      {/* =========================
          REPORT POPUP
      ========================= */}

      {showPopup && (
        <div className="popup-overlay">

          <div className="popup-box">

            <button
              className="popup-close-btn"
              onClick={() =>
                setShowPopup(false)
              }
            >
              ✕
            </button>

            <img
              src={reportImage}
              alt="SwissPharmaLab Report"
            />

          </div>

        </div>
      )}

      {/* =========================
          CART OVERLAY
      ========================= */}

      {isCartOpen && (
        <div
          className="cart-overlay"
          onClick={() =>
            setIsCartOpen(false)
          }
        />
      )}

      {/* =========================
          CART DRAWER
      ========================= */}

      <div
        className={`cart-drawer ${
          isCartOpen ? "open" : ""
        }`}
      >

        <div className="cart-drawer-content">

          <button
            className="close-btn"
            onClick={() =>
              setIsCartOpen(false)
            }
          >
            ✕
          </button>

          <h2>
            Warenkorb
          </h2>

          {cart.length === 0 ? (

            <div className="cart-drawer-empty">
              Dein Warenkorb ist leer.
            </div>

          ) : (

            <>

              <div className="cart-drawer-list">

                {cart.map((item) => (

                  <div
                    key={`${item.id}-${item.variant || ""}-${item.dose || ""}`}
                    className="cart-drawer-item"
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                    />

                    <div>

                      <p>
                        {item.title}

                        {item.variant &&
                          ` – ${item.variant}`}
                      </p>

                      <p>
                        {item.quantity} x{" "}
                        {item.price}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              <div className="cart-drawer-footer">

                <div className="cart-total">
                  Gesamt: {cartTotal} CHF
                </div>

                <div className="cart-drawer-actions">

                  <button
                    className="buy-btn secondary"
                    onClick={() =>
                      setIsCartOpen(false)
                    }
                  >
                    Weiter einkaufen
                  </button>

                  <button
                    className="buy-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate("/warenkorb");

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Zum Warenkorb
                  </button>

                </div>

              </div>

            </>

          )}

        </div>

      </div>

    </>
  );
}