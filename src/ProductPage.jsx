import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./App.css";

export default function ProductPage({ products, addToCart, cart }) {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  if (!product) {
    return (
      <div className="page">
        <div className="topbar">Alle unsere Produkte sind Labor geprüft.</div>

        <header className="header">
          <div className="brand">
            <img src="/logo1.png" alt="SwissPharmaLab" className="logo" />
          </div>
        </header>

        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>Produkt nicht gefunden</h1>
          <Link to="/">
            <button className="buy-btn">Zurück zum Shop</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="topbar">Alle unsere Produkte sind Labor geprüft.</div>

      <header className="header">
        <div className="brand">
          <img src="/logo1.png" alt="SwissPharmaLab" className="logo" />
        </div>
      </header>

      <nav className="nav">
        <Link to="/" className="cart-link">
          Shop
        </Link>
        <Link to="/warenkorb" className="cart-link">
          Warenkorb ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Link>
      </nav>

      <section className="product-detail">
        <div className="detail-gallery">
          <img
            src={product.image}
            alt={product.title}
            className="detail-main-image"
          />
        </div>

        <div className="detail-info">
          <h1>{product.title}</h1>

          <div className="price-row">
            <span className="price">{product.price}</span>
            {product.oldPrice && (
              <span className="old-price">{product.oldPrice}</span>
            )}
          </div>

          <p className="description">
            {product.details || product.description}
          </p>

          <div className="info-box">✔ Sofort verfügbar</div>
          <div className="info-box">✔ Lieferzeit 2–7 Tage</div>
          <div className="info-box">✔ Sichere Bestellung</div>
 {product.category === "PEPTIDE" && (
  <div className="bonus-box">
    <img
      src="/BAC.png"
      alt="10ml Bakteriostatisches Wasser"
      className="bonus-image"
    />

    <div className="bonus-content">
      <h3>Kostenlos dabei, im Preis inbegriffen!</h3>

      <p>
        Zu diesem Peptid erhältst du 10ml Bakteriostatisches Wasser (BAC) gratis dazu.
      </p>

      <ul className="bonus-list">
        <li>Steriles Wasser (für Injektionszwecke, keimfrei und endotoxinfrei)</li>
        <li>0,9% Benzylalkohol (9 mg/ml) – wirkt als Bakteriostatikum</li>
      </ul>
    </div>
  </div>
)}

          <div className="button-row">
            {product.inStock === false ? (
              <button className="secondary-btn" disabled>
                Ausverkauft
              </button>
            ) : (
              <button className="buy-btn" onClick={() => addToCart(product)}>
                In den Warenkorb
              </button>
            )}

            <Link to="/">
              <button className="secondary-btn">Zurück</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}