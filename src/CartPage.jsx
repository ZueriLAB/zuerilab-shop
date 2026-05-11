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
const [discount, setDiscount] = useState(0);

const applyDiscount = () => {
  const code = discountCode.trim().toUpperCase();

  if (code === "RETA10") {
    setDiscount(10);
  } else {
    setDiscount(0);
    alert("Ungültiger Rabattcode");
  }
};

const discountAmount = total * (discount / 100);
const finalTotal = total - discountAmount;

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
                      className="cart-item-image"
                    />

                    <div className="cart-item-info">
                      <h3>{item.title}</h3>
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
      <span>Lieferzeit: 2–7 Tage</span>
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