import React from "react";
import "../styles/PricingPage.css";

function PricingPage() {
  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Our Pricing</h1>
      <p className="pricing-subtitle">Build your resume with ResumeAI — 100% Free Forever 🎉</p>

      <div className="pricing-card">
        <div className="free-badge">Completely Free</div>
        <h2 className="plan-name">Free Plan</h2>
        <p className="plan-price">₹0 <span>/ forever</span></p>
        <ul className="plan-features">
          <li>Unlimited resume downloads</li>
          <li>All templates included</li>
          <li>No hidden charges</li>
          <li> Lifetime free access</li>
        </ul>
        <button className="get-started-btn">Start Building Free</button>
      </div>
    </div>
  );
}

export default PricingPage;
