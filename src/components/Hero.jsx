import React from "react";
import "../styles/Hero.css";
import heroImg from "../assets/hero-laptop.png";
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';

function Hero() {
  const scrollTo = (section) => {
    if (window.location.pathname === '/') {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
      });
    } else {
      // If not on home page, navigate to home first then scroll
      window.location.href = `/#${section}`;
    }
  };

  return (
    <section className="hero">
      {/* Left Side */}
      <div className="hero-text">
        {/* Top stats */}
        <div className="stats">
          <span className="rating">🤖AI Powered</span>
          <span> 📝Build Your resume</span>
          <span>🏆 ATS Optimized</span>
        </div>

        {/* Heading */}
        <h1>
          Craft your <span className="highlight">Best Resume</span> in Minutes
          with AI
        </h1>

        {/* Subtext */}
        <p>
          Create professional, ATS-optimized resumes with real-time AI guidance,
          instant feedback, and proven templates trusted by top companies.
        </p>

        {/* Buttons */}
        <div className="hero-buttons">
          <a href="http://localhost:5173/ats-score">
            <button className="primary-btn">
              Build an ATS-Ready Resume →
            </button>
          </a>
          <button 
            className="secondary-btn" 
            onClick={() => scrollTo('templates')}
          >
            View Templates
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="hero-image">
        <img src={heroImg} alt="Resume Mockup" />
        <div className="badge">✅ ATS Score: 95%</div>
        <div className="badge ai-optimized-badge">✨ AI Optimized</div>
      </div>
    </section>
  );
}

export default Hero;