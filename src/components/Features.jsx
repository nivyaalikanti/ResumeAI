import React from "react";
import "../styles/Features.css";
import aiIcon from '../assets/icons/ai-icon.png';
import atsIcon from '../assets/icons/ats-icon.png';
import quickIcon from '../assets/icons/quick-icon.png';
import { Element } from 'react-scroll';
function Features() {
  const features = [
    {
      title: "AI-Powered Recommendations",
      desc: "Get intelligent suggestions for content, keywords, and formatting based on your industry and role.",
      icon: aiIcon
    },
    {
      title: "Real-Time ATS Scoring",
      desc: "See your resume’s ATS compatibility score update in real-time as you make changes.",
      icon: atsIcon
    },
    {
      title: "Quick Builder",
      desc: "Create a professional resume in under 10 minutes with our streamlined step-by-step process.",
      icon: quickIcon
    }
  ];

  return (
     <Element name="features">
    <section className="features-section">
      <div className="features-header">
        <h2>Everything You Need to <span className="highlight-blue">Stand Out</span></h2>
        <p>Our AI-powered platform provides all the tools you need to create a resume that gets you noticed by recruiters and passes ATS systems.</p>
      </div>
      <div className="feature-cards-grid">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="icon-container">
              {/* Replace with a component or icon based on your design, e.g., an SVG */}
              {/* You can import the icons or use an icon library */}
              <img src={f.icon} alt={`${f.title} icon`} />
            </div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
    </Element>
  );
}

export default Features;