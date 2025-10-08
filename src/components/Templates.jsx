import React, { useState } from "react";
import "../styles/Templates.css";
import modernTemplate from "../assets/images/HorizontalResume.png";
import executiveTemplate from "../assets/images/VerticalResume.png";
import creativeTemplate from "../assets/images/ModernResume.png";
import minimalistTemplate from "../assets/images/vertical2.png";
import academicTemplate from "../assets/images/lastsecond.png";
import startupTemplate from "../assets/images/last.png";
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';

const templates = [
  {
    name: "Simple Professional",
    description: "Clean, modern design perfect for tech and corporate roles",
    rating: 4.9,
    downloads: "12K+",
    tag: "Popular",
    image: modernTemplate,
    type: "horizontal"
  },
  {
    name: "The Balanced Layout",
    description: " A well-structured design that uses two distinct columns to neatly organize your professional history and skills.",
    rating: 4.8,
    downloads: "8K+",
    tag: null,
    image: executiveTemplate,
    type: "vertical"
  },
  {
    name: " The Classic Professional",
    description: "A clean, no-frills layout that puts your information first, ensuring your resume is clear and easy to read for any hiring manager.",
    rating: 4.9,
    downloads: "15K+",
    tag: "Popular",
    image: creativeTemplate,
    type: "modern"
  },
  {
    name: "Minimalist Pro",
    description: "Stylish and sleek, focusing on clear content and readability",
    rating: 4.7,
    downloads: "10K+",
    tag: null,
    image: minimalistTemplate,
    type: "vertical2"
  },
  {
    name: "Academic Scholar",
    description: "Structured and formal, ideal for academics and researchers",
    rating: 4.8,
    downloads: "5K+",
    tag: null,
    image: academicTemplate,
    type: "academic"
  },
  {
    name: "The Detailed Professional",
    description: "A highly organized layout with clear sections for every part of your experience, from work history to interests and training.",
    rating: 4.9,
    downloads: "12K+",
    tag: null,
    image: startupTemplate,
    type: "detailed-pro"
  },
];

function Templates({ onTemplateSelect }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTemplateClick = (template) => {
    onTemplateSelect(template.name);
  };

  const handlePreviewClick = (template, event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const getTemplateRoute = (templateType) => {
    switch(templateType) {
      case "horizontal":
        return "/simple-professional";
      case "vertical":
        return "/vertical-resume";
      case "modern":
        return "/modern-resume";
      case "vertical2":
        return "/vertical2-resume";
      case "academic": // Add this case
        return "/academic-scholar";
      case "detailed-pro":
            return "/detailed-pro";
      default:
        return "/";
    }
  };

  return (
    <Element name="templates">
      <section className="templates-section">
        <div className="section-header">
          <h2>
            Choose from <span className="highlight-blue">Professional Templates</span>
          </h2>
          <p>All our templates are ATS-optimized and designed by career experts to help you land your dream job.</p>
        </div>
        <div className="template-cards-grid">
          {templates.map((t, i) => (
            <div className="template-card" key={i}>
              <div className="template-image-container">
                <img src={t.image} alt={`${t.name} template`} />
                {t.tag && <span className="tag">{t.tag}</span>}
                <div className="preview-overlay">
                  <button 
                    className="preview-btn"
                    onClick={(e) => handlePreviewClick(t, e)}
                  >
                    Preview
                  </button>
                </div>
              </div>
              <div className="card-content">
                <div className="title-row">
                  <h3>{t.name}</h3>
                  <div className="rating">
                    <span>⭐️</span> {t.rating}
                  </div>
                </div>
                <p className="description">{t.description}</p>
                <div className="downloads-row">
                  <p>{t.downloads} downloads</p>
                  <Link
                    to={getTemplateRoute(t.type)}
                    onClick={() => handleTemplateClick(t)}
                    className="use-template-btn"
                  >
                    Use Template
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Modal */}
        {isModalOpen && selectedTemplate && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{selectedTemplate.name} - Preview</h3>
                <button className="close-btn" onClick={closeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <img 
                  src={selectedTemplate.image} 
                  alt={`${selectedTemplate.name} template preview`}
                  className="template-preview-image"
                />
                <div className="template-info">
                  <p className="template-description">{selectedTemplate.description}</p>
                  <div className="template-stats">
                    <div className="stat">
                      <span className="stat-label">Rating:</span>
                      <span className="stat-value">⭐️ {selectedTemplate.rating}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Downloads:</span>
                      <span className="stat-value">{selectedTemplate.downloads}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Layout:</span>
                      <span className="stat-value">{selectedTemplate.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  to={getTemplateRoute(selectedTemplate.type)}
                  onClick={() => {
                    handleTemplateClick(selectedTemplate);
                    closeModal();
                  }}
                  className="use-template-btn large"
                >
                  Use This Template
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </Element>
  );
}

export default Templates;