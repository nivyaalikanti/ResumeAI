import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TemplateSelector.css';

// Import all the images
import modernTemplate from "../assets/images/HorizontalResume.png";
import executiveTemplate from "../assets/images/VerticalResume.png";
import creativeTemplate from "../assets/images/ModernResume.png";
import minimalistTemplate from "../assets/images/vertical2.png";
import academicTemplate from "../assets/images/lastsecond.png";
import startupTemplate from "../assets/images/last.png";

const TemplateSelector = ({ isOpen, onClose, currentTemplate }) => {
  const navigate = useNavigate();

  const templates = [
    { 
      id: 'horizontal', 
      name: 'Simple Professional', 
      description: 'Simple Professional',
      route: '/simple-professional',
      thumbnail: modernTemplate
    },
    { 
      id: 'vertical', 
      name: 'The Balanced Layout', 
      description: 'Classic vertical resume layout',
      route: '/vertical-resume',
      thumbnail: executiveTemplate
    },
    { 
      id: 'modern', 
      name: 'The Classic Professional', 
      description: 'Contemporary design with modern elements',
      route: '/modern-resume',
      thumbnail: creativeTemplate
    },
    { 
      id: 'vertical2', 
      name: 'Minimalist Pro', 
      description: 'Alternative vertical layout',
      route: '/vertical2-resume',
      thumbnail: minimalistTemplate
    },
    { 
      id: 'academic', 
      name: 'Academic', 
      description: 'Designed for academic and research roles',
      route: '/academic-resume',
      thumbnail: academicTemplate
    },
    { 
      id: 'startup', 
      name: 'Startup', 
      description: 'Modern and bold for tech and startups',
      route: '/startup-resume',
      thumbnail: startupTemplate
    }
  ];

  const handleTemplateSelect = (template) => {
    navigate(template.route);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="template-selector-overlay" onClick={onClose}>
      <div className="template-selector-modal" onClick={(e) => e.stopPropagation()}>
        <div className="template-selector-header">
          <h2>🎨 Choose Your Resume Template</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="templates-grid">
          {templates.map(template => (
            <div 
              key={template.id}
              className={`template-card ${currentTemplate === template.id ? 'active' : ''}`}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="template-thumbnail">
                {/* Fixed the image size using inline CSS */}
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                />
              </div>
              <div className="template-info">
                <h3 className="template-name">{template.name}</h3>
                <p className="template-description">{template.description}</p>
              </div>
              <div className="template-badge">
                {currentTemplate === template.id ? 'Current' : 'Select'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;