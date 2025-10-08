import React, { useState } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import './ResumeBuilder.css';
import TemplateSelector from '../../TemplateSelector';
function ResumeBuilder() {
  const initialJob = {
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    responsibilities: ''
  };
  const initialEducation = {
    degree: '',
    institution: '',
    startDate: '',
    endDate: ''
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
      email: '',
      phone: '',
      address: '',
    },
    summary: '',
    experience: [initialJob],
    education: [initialEducation],
    skills: [initialSkillCategory],
    achievements: [initialAchievement],
    certifications: [initialCertification],
    projects: [initialProject],
  });

  const [margins, setMargins] = useState({
    top: 2.5,
    bottom: 2.5,
    left: 2.5,
    right: 2.5,
  });

  const [isCompressed, setIsCompressed] = useState(false);
  const [accentColor, setAccentColor] = useState('#1a73e8');
  // New state to manage AI loading
  const [isGenerating, setIsGenerating] = useState(false);
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

  const handleSkillCategoryChange = (index, field, value) => {
    setResumeData(prevData => {
      const updatedSkills = prevData.skills.map((category, i) => {
        if (i === index) {
          return {
            ...category,
            [field]: value,
          };
        }
        return category;
      });
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const handleAchievementChange = (index, value) => {
    setResumeData(prevData => {
      const updatedAchievements = prevData.achievements.map((item, i) => {
        if (i === index) {
          return value;
        }
        return item;
      });
      return {
        ...prevData,
        achievements: updatedAchievements,
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
        newItem = initialSkillCategory;
      } else if (section === 'achievements') {
        newItem = initialAchievement;
      } else if (section === 'certifications') {
        newItem = initialCertification;
      } else if (section === 'projects') {
        newItem = initialProject;
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

  // Helper function for exponential backoff delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // NEW: AI generation function using Gemini API
  // NEW: AI generation function using Gemini API
const handleAIGenerateText = async (section, index, field, currentText) => {
  if (isGenerating) return;

  if (!currentText || currentText.trim().length < 10) {
    console.error("Please enter at least 10 characters before using AI generation.");
    alert("Please enter at least 10 characters before using AI generation.");
    return;
  }

  setIsGenerating(true);

  try {
    let prompt = '';
    const basePrompt = `You are a professional resume writer. Provide a concise response that directly replaces the user's input, focusing on impact and results. Do not include conversational text or greetings.`;

    if (section === 'summary') {
      prompt = `Rewrite the following professional summary to be more impactful and concise, focusing on achievements and skills. Keep it to 1-2 sentences.\n\nText to rewrite: "${currentText}"`;
    } else if (section === 'experience') {
      prompt = `Rewrite the following job responsibilities into bullet points, using strong action verbs and quantifying achievements where possible.\n\nText to rewrite: "${currentText}"`;
    } else if (section === 'achievements') {
      prompt = `Rewrite the following achievement to be more professional and results-oriented. Use a strong action verb to start.\n\nText to rewrite: "${currentText}"`;
    } else if (section === 'projects') {
      prompt = `Rewrite the following project description to highlight technical skills and the project's impact. Use bullet points.\n\nText to rewrite: "${currentText}"`;
    }

    // Use the API key from Vite environment variables
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    // Add validation for the API key
    if (!apiKey) {
      throw new Error('API key not found. Please check your environment variables.');
    }

    const model = 'gemini-2.5-flash'; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const maxRetries = 3;
    let generatedText = null;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: {
        parts: [{ text: basePrompt }]
      },
    };

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          const errorBody = await response.json();
          if (attempt < maxRetries - 1) {
            const waitTime = Math.pow(2, attempt) * 1000;
            console.warn(`Attempt ${attempt + 1} failed with status ${response.status}. Retrying in ${waitTime / 1000}s. Error details:`, errorBody);
            await delay(waitTime);
            continue;
          } else {
            throw new Error(`API call failed after ${maxRetries} attempts with status ${response.status}.`);
          }
        }

        const result = await response.json();
        generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (generatedText) {
          break;
        } else {
          throw new Error('AI response was empty or malformed.');
        }

      } catch (e) {
        if (attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000;
          console.warn(`Attempt ${attempt + 1} failed. Retrying in ${waitTime / 1000}s.`, e);
          await delay(waitTime);
          continue;
        }
        throw e;
      }
    }

    if (!generatedText) {
      throw new Error('AI generation failed to return text after all retries.');
    }

    // Update the resume data with the generated text
    if (section === 'summary') {
      handleInputChange(section, null, generatedText);
    } else if (section === 'achievements') {
      handleAchievementChange(index, generatedText);
    } else {
      handleArrayItemChange(section, index, field, generatedText);
    }

  } catch (error) {
    console.error('Error generating text:', error);
    alert(`Failed to generate text: ${error.message}`);
  } finally {
    setIsGenerating(false);
  }
};

  return (
    <div className="resume-builder-container">
       {/* Template selector button */}
      <div className="template-selector-btn-container">
        <button 
          className="btn btn-template"
          onClick={() => setShowTemplateSelector(true)}
        >
          🎨 Change Template
        </button>
      </div>
      <LeftPanel
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
        // NEW props for AI feature
        onAIGenerateText={handleAIGenerateText}
        isGenerating={isGenerating}
      />
      <RightPanel
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

export default ResumeBuilder;
