import React, { useState } from 'react';
import ModernLeftPanel from './ModernLeftPanel';
import ModernRightPanel from './ModernRightPanel';
import './ModernResumeBuilder.css';
import TemplateSelector from '../../TemplateSelector';
function ModernResumeBuilder() {
  const initialJob = { 
    title: '', 
    company: '', 
    startDate: '', 
    endDate: '', 
    description: '' 
  };
  const initialEducation = { 
    degree: '', 
    institution: '', 
    startDate: '', 
    endDate: '',
    description: ''
  };
  const initialSkill = '';
  const initialReference = {
    name: '',
    position: '',
    company: '',
    phone: '',
    social: ''
  };

  const [resumeData, setResumeData] = useState({
    personalDetails: {
      name: '',
      title: '',
      phone: '',
      address: '',
      email: '',
    },
    about: '',
    experience: [initialJob],
    education: [initialEducation],
    skills: [initialSkill],
    references: [initialReference],
  });

  const [margins, setMargins] = useState({
    top: 2.5,
    bottom: 2.5,
    left: 2.5,
    right: 2.5,
  });

  const [isCompressed, setIsCompressed] = useState(false);
  const [accentColor, setAccentColor] = useState('#2c3e50');
   const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  
  // Determine current template based on route/component
  const getCurrentTemplate = () => {
    // You can set this based on the component name or route
    if (window.location.pathname.includes('modern')) return 'modern';
    if (window.location.pathname.includes('vertical2')) return 'vertical2';
    if (window.location.pathname.includes('vertical')) return 'vertical';
    return 'horizontal';
  };
  const handleInputChange = (section, field, value) => {
    setResumeData(prevData => {
      if (typeof prevData[section] === 'object' && prevData[section] !== null && !Array.isArray(prevData[section])) {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [field]: value,
          },
        };
      }
      return {
        ...prevData,
        [section]: value,
      };
    });
  };

  const handleArrayItemChange = (section, index, field, value) => {
    setResumeData(prevData => {
      const updatedArray = prevData[section].map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      });

      return {
        ...prevData,
        [section]: updatedArray,
      };
    });
  };

  const handleSkillChange = (index, value) => {
    setResumeData(prevData => {
      const updatedSkills = prevData.skills.map((skill, i) => {
        if (i === index) {
          return value;
        }
        return skill;
      });
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const handleAddSectionItem = (section) => {
    setResumeData(prevData => {
      let newItem;
      if (section === 'experience') {
        newItem = initialJob;
      } else if (section === 'education') {
        newItem = initialEducation;
      } else if (section === 'skills') {
        newItem = initialSkill;
      } else if (section === 'references') {
        newItem = initialReference;
      } else {
        return prevData;
      }

      return {
        ...prevData,
        [section]: [...prevData[section], newItem],
      };
    });
  };

  const handleRemoveSectionItem = (section, index) => {
    setResumeData(prevData => {
      const updatedArray = prevData[section].filter((_, i) => i !== index);
      return {
        ...prevData,
        [section]: updatedArray,
      };
    });
  };

  const handleMarginChange = (side, value) => {
    const numberValue = parseFloat(value);
    if (!isNaN(numberValue)) {
      setMargins(prevMargins => ({
        ...prevMargins,
        [side]: numberValue,
      }));
    }
  };

  const handleToggleCompress = () => {
    setIsCompressed(prev => !prev);
  };

  const handleColorChange = (e) => {
    setAccentColor(e.target.value);
  };

  return (
    <div className="modern-resume-builder-container">
      {/* Template selector button */}
      <div className="template-selector-btn-container">
        <button 
          className="btn btn-template"
          onClick={() => setShowTemplateSelector(true)}
        >
          🎨 Change Template
        </button>
      </div>
      <ModernLeftPanel 
        resumeData={resumeData} 
        onInputChange={handleInputChange} 
        onArrayItemChange={handleArrayItemChange}
        onSkillChange={handleSkillChange}
        onAddSectionItem={handleAddSectionItem}
        onRemoveSectionItem={handleRemoveSectionItem}
        margins={margins} 
        onMarginChange={handleMarginChange} 
        accentColor={accentColor}
        onColorChange={handleColorChange}
      />
      <ModernRightPanel 
        resumeData={resumeData} 
        margins={margins}
        isCompressed={isCompressed}
        onToggleCompress={handleToggleCompress}
        accentColor={accentColor}
      />
      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        currentTemplate={getCurrentTemplate()}
      />
    </div>
  );
}

export default ModernResumeBuilder;