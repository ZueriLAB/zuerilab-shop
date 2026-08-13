import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function AboutUsPage({ cart }) {
  return (
    <div className="page">

      <header className="header">
        <Link to="/" className="brand">
          <img
            src="/logo1.png"
            alt="SwissPharmaLab"
            className="logo"
          />
        </Link>
      </header>

      <nav className="nav">
        <Link to="/" className="nav-link">Peptide</Link>
        <Link to="/support" className="nav-link">Kundenservice</Link>
        <Link to="/business" className="nav-link">Business</Link>
        <Link to="/warenkorb" className="nav-link cart-link">
          🛒 Warenkorb ({cart?.reduce((sum, item) => sum + item.quantity, 0) || 0})
        </Link>
      </nav>

      <main className="about-page">

        <div className="about-badge">
          SWISS QUALITY • TRUST • PRECISION
        </div>

        <h1>About Us</h1>

        <h2>About Peptigen</h2>

        <h3>Premium Peptide Research Solutions from Switzerland</h3>

        <p>
          At Peptigen, we focus on delivering premium-quality research
          peptides, laboratory essentials, and trusted peptide solutions
          for professional research purposes.
        </p>

        <p>
          Based in Switzerland, we combine quality, reliability, and fast
          international shipping to support laboratories and researchers
          worldwide.
        </p>

        <p>
          Our mission is simple: precision, trust, and excellence in every
          order.
        </p>

        <Link to="/" className="hero-btn hero-btn-primary">
          Explore Products
        </Link>

      </main>

    </div>
  );
}