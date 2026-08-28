import { Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";

export default function CartPage({
  cart,
  removeFromCart,
  increaseQty,
  decreaseQty,
}) {
  console.log("CARTPAGE CART:", cart);
  const total = cart.reduce((sum, item) => {
    const numericPrice = Number(
      item.price.replace(" CHF", "").replace(",", ".")
    );
    return sum + numericPrice * item.quantity;
  }, 0);
const [discountCode, setDiscountCode] = useState("");

const [discount, setDiscount] = useState(() => {
  return Number(localStorage.getItem("discount")) || 0;
});

const [voucherCode, setVoucherCode] = useState(() => {
  return localStorage.getItem("voucherCode") || "";
});


const discountAmount = total * (discount / 100);

const afterPercentDiscount =
  total - discountAmount;

const voucherAmount =
  voucherCode === "SIBEL" ? 80 : 0;

const finalTotal = Math.max(
  0,
  afterPercentDiscount - voucherAmount
);
const applyDiscount = () => {
  const code = discountCode.trim().toUpperCase();

  // 80 CHF Gutschein
  if (code === "SIBEL") {
    setDiscount(0);
    setVoucherCode("SIBEL");

    localStorage.setItem("discount", "0");
    localStorage.setItem("voucherCode", "SIBEL");

    return;
  }

  // 10% Rabatt
  if (code === "RETA10") {
    setDiscount(10);
    setVoucherCode("");

    localStorage.setItem("discount", "10");
    localStorage.removeItem("voucherCode");

    return;
  }

  // 15% Rabatt
  if (code === "WELCOME15") {
    setDiscount(15);
    setVoucherCode("");

    localStorage.setItem("discount", "15");
    localStorage.removeItem("voucherCode");

    return;
  }

  // 20% Rabatt
  if (code === "ANNA") {
    setDiscount(20);
    setVoucherCode("");

    localStorage.setItem("discount", "20");
    localStorage.removeItem("voucherCode");

    return;
  }
  // Loic35 - 20% Rabatt
if (code === "LOIC35") {
  setDiscount(20);
  setVoucherCode("");

  localStorage.setItem("discount", "20");
  localStorage.removeItem("voucherCode");

  return;
}
// Deal10 - 10% Rabatt
if (code === "DEAL10") {
  setDiscount(10);
  setVoucherCode("");

  localStorage.setItem("discount", "10");
  localStorage.removeItem("voucherCode");

  return;
}

  // Bojan06 - 30% Rabatt
  if (code === "BOJAN06") {
    setDiscount(30);
    setVoucherCode("");

    localStorage.setItem("discount", "30");
    localStorage.removeItem("voucherCode");

    return;
  }

  // Thien10 - 10% Rabatt
  if (code === "THIEN10") {
    setDiscount(10);
    setVoucherCode("");

    localStorage.setItem("discount", "10");
    localStorage.removeItem("voucherCode");

    return;
  }

  // Ungültiger Code
  setDiscount(0);
  setVoucherCode("");

  localStorage.removeItem("discount");
  localStorage.removeItem("voucherCode");

  alert("Ungültiger Rabattcode");
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
        <Link to="/" className="nav-link">
          Zurück zum Shop
        </Link>
      </nav>

      <section className="cart-page">
        <h2 className="section-title">WARENKORB</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Dein Warenkorb ist leer.</p>
        ) : (
          <div className="cart-layout">
            <div className="cart-left">
              <div className="cart-list">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img
  src={item.image}
  alt={item.title}
  className={`cart-item-image ${
    item.id === 31 || item.id === 32
      ? "cart-special-image"
      : ""
  }`}
/>

                    <div className="cart-item-info">
                    <h3>
  {item.title}
  {item.variant && ` – ${item.variant}`}
</h3>
                      <p className="cart-item-price">{item.price}</p>

                      <div className="cart-actions">
                        <button onClick={() => decreaseQty(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)}>+</button>
                      </div>
                    </div>

                    <button
                      className="secondary-btn remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Entfernen
                    </button>
                  </div>
                ))}
              </div>
            </div>
<div className="cart-right">
  <div className="cart-summary-box">
    <h3 className="cart-summary-title">Bestellübersicht</h3>

    <div className="cart-summary-row">
      <span>Zwischensumme</span>
      <span>{total.toFixed(2)} CHF</span>
    </div>

    {discount > 0 && (
      <div className="cart-summary-row">
        <span>Rabatt ({discount}%)</span>
        <span>-{discountAmount.toFixed(2)} CHF</span>
      </div>
    )}
    {voucherAmount > 0 && (
  <div className="cart-summary-row">
    <span>Gutschein SIBEL</span>
    <span>-80.00 CHF</span>
  </div>
)}

    <div className="cart-summary-row">
      <span>Versand</span>
      <span>Inklusive</span>
    </div>

    <div className="discount-box">
      <input
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        placeholder="Rabattcode eingeben"
      />
      <button onClick={applyDiscount}>Einlösen</button>
    </div>

    <div className="cart-summary-divider" />

    <div className="cart-summary-row cart-summary-total">
      <span>Gesamt</span>
      <span>{finalTotal.toFixed(2)} CHF</span>
    </div>

    <div className="shipping-info shipping-row">
      <span>Lieferzeit: 1–7 Tage</span>
      <img src="/POST.png" alt="Swiss Post" className="post-logo" />
    </div>

    <div className="shipping-sub">Versand aus der Schweiz</div>

    <Link to="/checkout">
      <button className="buy-btn checkout-btn">Zur Kasse</button>
    </Link>
  </div>
</div>
      </div>
        )}
      </section>
    </div>
  );
}