import React, { useState } from 'react';
import LeftPanel2 from './LeftPanel2';
import RightPanel2 from './RightPanel2';
import './ResumeBuilder2.css';

import TemplateSelector from '../../TemplateSelector'; 

function ResumeBuilder2() {
  // Define initial state items (REQUIRED for handleAddSectionItem)
  const initialJob = {
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
  };
  const initialEducation = {
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
  };
  const initialSkillCategory = {
    heading: '',
    skills: '',
  };
  const initialAchievement = '';
  const initialCertification = {
    name: '',
    issuer: '',
    date: '',
  };
  const initialProject = {
    name: '',
    startDate: '',
    endDate: '',
    description: '',
  };

  const [resumeData, setResumeData] = useState({
    personalDetails: {
      name: '',
      headline: '',
      email: '',
      phone: '',
      address: '',
      website: '',
    },
    
    experience: [initialJob],
    education: [initialEducation],
    skills: [initialSkillCategory],
    achievements: [initialAchievement],
    certifications: [initialCertification],
    projects: [initialProject],
  });

  const [margins, setMargins] = useState({ top: 2.5, bottom: 2.5, left: 2, right: 0 });
  const [accentColor, setAccentColor] = useState('#2C3E50');
  const [isCompressed, setIsCompressed] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // --- IMPLEMENTED HANDLERS ---

  // Handles updates to single fields (e.g., name, email)
  const handleInputChange = (section, field, value) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Handles updates to object items in arrays (e.g., job title, project name)
  const handleArrayItemChange = (section, index, field, value) => {
    const newArray = [...resumeData[section]];
    newArray[index] = {
      ...newArray[index],
      [field]: value,
    };
    setResumeData(prevData => ({
      ...prevData,
      [section]: newArray,
    }));
  };

  // Handles updates to the skills array items (which are objects: heading/skills)
  const handleSkillCategoryChange = (index, field, value) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = {
      ...newSkills[index],
      [field]: value,
    };
    setResumeData(prevData => ({
      ...prevData,
      skills: newSkills,
    }));
  };
  
  // Handles updates to the achievements array items (which are simple strings)
  const handleAchievementChange = (index, value) => {
    const newAchievements = [...resumeData.achievements];
    newAchievements[index] = value;
    setResumeData(prevData => ({
      ...prevData,
      achievements: newAchievements,
    }));
  };

  // Handles adding a new item to any array section (Called by 'Add Project', 'Add Certificate')
  const handleAddSectionItem = (section) => {
    let newItem;
    switch (section) {
      case 'experience':
        newItem = initialJob;
        break;
      case 'education':
        newItem = initialEducation;
        break;
      case 'skills':
        newItem = initialSkillCategory;
        break;
      case 'achievements':
        newItem = initialAchievement;
        break;
      case 'certifications':
        newItem = initialCertification;
        break;
      case 'projects':
        newItem = initialProject;
        break;
      default:
        return;
    }
    setResumeData(prevData => ({
      ...prevData,
      [section]: [...prevData[section], newItem],
    }));
  };

  // Handles removing an item from any array section (Called by 'Remove Job', etc.)
  const handleRemoveSectionItem = (section, index) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };
  
  // --- EXISTING HANDLERS ---

  const handleMarginChange = (field, value) => setMargins(prev => ({ ...prev, [field]: parseFloat(value) }));
  const handleColorChange = (e) => setAccentColor(e.target.value);
  const handleToggleCompress = () => setIsCompressed(prev => !prev);
  const getCurrentTemplate = () => 'detailed-pro'; 
  

  const handleAIGenerateText = async (section, index, field, existingText) => {
    console.log(`AI called for: ${section}, index: ${index}, field: ${field}`);
    // Placeholder for AI implementation
  };

  // --- RETURN STATEMENT ---

  return (
    <div className="resume-builder-container-2">
      <div className="template-selector-btn-container">
        <button 
          className="btn btn-template"
          onClick={() => setShowTemplateSelector(true)}
        >
          🎨 Change Template
        </button>
      </div>
      <LeftPanel2
        resumeData={resumeData}
        onInputChange={handleInputChange}
        onArrayItemChange={handleArrayItemChange}
        onSkillCategoryChange={handleSkillCategoryChange}
        onAchievementChange={handleAchievementChange}
        onAddSectionItem={handleAddSectionItem}
        onRemoveSectionItem={handleRemoveSectionItem}
        margins={margins}
        onMarginChange={handleMarginChange}
        accentColor={accentColor}
        onColorChange={handleColorChange}
        onAIGenerateText={handleAIGenerateText}
        isGenerating={isGenerating}
      />
      <RightPanel2
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

export default ResumeBuilder2;