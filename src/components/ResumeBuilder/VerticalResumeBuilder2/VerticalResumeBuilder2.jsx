import React, { useState } from 'react';
import VerticalLeftPanel2 from './VerticalLeftPanel2';
import VerticalRightPanel2 from './VerticalRightPanel2';
import './VerticalResumeBuilder2.css';
import TemplateSelector from '../../TemplateSelector';

function VerticalResumeBuilder2() {
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
  const initialSkill = {
    name: '',
  };
  const initialLanguage = {
    name: '',
  };
  // Initialize resumeData with empty fields
  const [resumeData, setResumeData] = useState({
    personalDetails: {
      name: '',
      headline: '',
      phone: '',
      email: '',
      address: '',
      website: '',
    },
    summary: '',
    experience: [initialJob],
    education: [initialEducation],
    skills: [initialSkill],
    languages: [initialLanguage],
  });

  const [isCompressed, setIsCompressed] = useState(false);
  
  // State variables for customization
  const [margins, setMargins] = useState({ top: 1.5, bottom: 1.5, left: 1.5, right: 1.5 });
  const [fontSize, setFontSize] = useState(12);
  const [lineHeight, setLineHeight] = useState(1.4);
  
  // NEW: AI-related state
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  
  const getCurrentTemplate = () => {
    if (window.location.pathname.includes('modern')) return 'modern';
    if (window.location.pathname.includes('vertical2')) return 'vertical2';
    if (window.location.pathname.includes('vertical')) return 'vertical';
    return 'horizontal';
  };

  const handleInputChange = (section, field, value) => {
    setResumeData((prevData) => {
      if (typeof prevData[section] === 'object' && !Array.isArray(prevData[section])) {
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
    setResumeData((prevData) => {
      const updatedArray = prevData[section].map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [field]: value,
          };
        }
        return item;
      });
      return { ...prevData, [section]: updatedArray };
    });
  };

  const handleAddSectionItem = (section) => {
    setResumeData((prevData) => {
      let newItem;
      if (section === 'experience') {
        newItem = initialJob;
      } else if (section === 'education') {
        newItem = initialEducation;
      } else if (section === 'skills') {
        newItem = initialSkill;
      } else if (section === 'languages') {
        newItem = initialLanguage;
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
    setResumeData((prevData) => {
      const updatedArray = prevData[section].filter((_, i) => i !== index);
      return {
        ...prevData,
        [section]: updatedArray,
      };
    });
  };

  const handleToggleCompress = () => {
    setIsCompressed((prev) => !prev);
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

  const handleFontSizeChange = (e) => {
    setFontSize(parseFloat(e.target.value));
  };
  
  const handleLineHeightChange = (e) => {
    setLineHeight(parseFloat(e.target.value));
  };

  // Helper function for exponential backoff delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // NEW: AI generation function using Gemini API
  const handleAIGenerateText = async (section, index, field, currentText) => {
    if (isGenerating) return;
  
    if (!currentText || currentText.trim().length < 10) {
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
      }
      // Note: Achievements and Projects sections are not present in VerticalLeftPanel2.jsx
      // If you add them, you'll need to add their corresponding prompt logic here.
  
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
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
    <div className="vertical-resume-builder-container">
      <div className="template-selector-btn-container">
        <button 
          className="btn btn-template"
          onClick={() => setShowTemplateSelector(true)}
        >
          🎨 Change Template
        </button>
      </div>
      <VerticalLeftPanel2
        resumeData={resumeData}
        onInputChange={handleInputChange}
        onArrayItemChange={handleArrayItemChange}
        onAddSectionItem={handleAddSectionItem}
        onRemoveSectionItem={handleRemoveSectionItem}
        margins={margins}
        onMarginChange={handleMarginChange}
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
        lineHeight={lineHeight}
        onLineHeightChange={handleLineHeightChange}
        // ADDED PROPS FOR AI FUNCTIONALITY
        onAIGenerateText={handleAIGenerateText}
        isGenerating={isGenerating}
      />
      <VerticalRightPanel2
        resumeData={resumeData}
        isCompressed={isCompressed}
        onToggleCompress={handleToggleCompress}
        margins={margins}
        fontSize={fontSize}
        lineHeight={lineHeight}
      />
      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        currentTemplate={getCurrentTemplate()}
      />
    </div>
  );
}

export default VerticalResumeBuilder2;