import React, { useState, useEffect } from 'react';

function VerticalLeftPanel2({
  resumeData,
  onInputChange,
  onArrayItemChange,
  onRemoveSectionItem,
  onAddSectionItem,
  margins,
  onMarginChange,
  fontSize,
  onFontSizeChange,
  lineHeight,
  onLineHeightChange,
  // ADDED PROPS FOR AI FUNCTIONALITY
  onAIGenerateText,
  isGenerating
}) {

  const [isLoading, setIsLoading] = useState(false);

  // Fetch only essential user data from backend
  const fetchEssentialUserData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Fetched essential user data for vertical resume 2:', userData);
        
        // Fill only the 5 essential fields if they are empty
        if (userData.personalInfo) {
          // Full Name
          if (userData.personalInfo.fullName && !resumeData.personalDetails.name) {
            onInputChange('personalDetails', 'name', userData.personalInfo.fullName);
          }
          
          // Phone Number
          if (userData.personalInfo.phone && !resumeData.personalDetails.phone) {
            onInputChange('personalDetails', 'phone', userData.personalInfo.phone);
          }
          
          // Email
          if (userData.personalInfo.email && !resumeData.personalDetails.email) {
            onInputChange('personalDetails', 'email', userData.personalInfo.email);
          }
          
          // Address
          if (userData.personalInfo.address && !resumeData.personalDetails.address) {
            onInputChange('personalDetails', 'address', userData.personalInfo.address);
          }
        }

        // Summary/Profile
        if (userData.summary && !resumeData.summary) {
          onInputChange('summary', null, userData.summary);
        }

        // NOTE: We are NOT fetching skills, languages, experience, or education
        // Let the user enter these manually

      } else {
        console.log('No user data found for vertical resume 2');
      }
    } catch (error) {
      console.error('Error fetching user data for vertical resume 2:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch essential data on component mount
  useEffect(() => {
    fetchEssentialUserData();
  }, []);

  const handleDetailChange = (section, field, value) => {
    onInputChange(section, field, value);
  };

  const handleArrayChange = (section, index, field, value) => {
    onArrayItemChange(section, index, field, value);
  };

  const handleAddRemove = (section, action, index) => {
    if (action === 'add') {
      onAddSectionItem(section);
    } else {
      onRemoveSectionItem(section, index);
    }
  };

  return (
    <div className="vertical-left-panel">
      <h2>Enter Your Details</h2>

      {/* Loading indicator */}
      {isLoading && (
        <div className="loading-indicator">
          <p>Loading your profile data...</p>
        </div>
      )}

      {/* Personal Details Section (No AI here) */}
      <div className="input-section">
        <h3>Personal Details</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={resumeData.personalDetails.name}
          onChange={(e) => handleDetailChange('personalDetails', 'name', e.target.value)}
        />
        <input
          type="text"
          placeholder="Headline (e.g., Marketing Manager)"
          value={resumeData.personalDetails.headline}
          onChange={(e) => handleDetailChange('personalDetails', 'headline', e.target.value)}
        />
      </div>

      {/* Contact Section (No AI here) */}
      <div className="input-section">
        <h3>Contact</h3>
        <input
          type="tel"
          placeholder="Phone Number"
          value={resumeData.personalDetails.phone}
          onChange={(e) => handleDetailChange('personalDetails', 'phone', e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={resumeData.personalDetails.email}
          onChange={(e) => handleDetailChange('personalDetails', 'email', e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={resumeData.personalDetails.address}
          onChange={(e) => handleDetailChange('personalDetails', 'address', e.target.value)}
        />
        <input
          type="url"
          placeholder="Website/Portfolio URL"
          value={resumeData.personalDetails.website}
          onChange={(e) => handleDetailChange('personalDetails', 'website', e.target.value)}
        />
      </div>

      {/* Profile/Summary Section WITH AI */}
      <div className="input-section">
        <h3>Profile</h3>
        <div className="textarea-with-ai-btn">
          <textarea
            placeholder="Write a brief professional profile..."
            rows="5"
            value={resumeData.summary}
            onChange={(e) => onInputChange('summary', null, e.target.value)}
          />
          <button
            type="button"
            className="ai-btn"
            onClick={() => onAIGenerateText('summary', null, null, resumeData.summary)}
            disabled={isGenerating}
          >
            {isGenerating ? '...' : 'AI'}
          </button>
        </div>
      </div>

      {/* Work Experience Section WITH AI */}
      <div className="input-section">
        <h3>Work Experience</h3>
        {resumeData.experience.map((job, index) => (
          <div key={index} className="array-item-group">
            <input
              type="text"
              placeholder="Job Title"
              value={job.title}
              onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)}
            />
            <input
              type="text"
              placeholder="Company Name"
              value={job.company}
              onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
            />
            <div className="input-row">
              <input
                type="text"
                placeholder="Start Date"
                value={job.startDate}
                onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
              />
              <input
                type="text"
                placeholder="End Date"
                value={job.endDate}
                onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
              />
            </div>
            {/* AI button for responsibilities */}
            <div className="textarea-with-ai-btn">
              <textarea
                placeholder="Key Responsibilities (one per line)"
                rows="4"
                value={job.responsibilities}
                onChange={(e) => handleArrayChange('experience', index, 'responsibilities', e.target.value)}
              />
              <button
                type="button"
                className="ai-btn"
                onClick={() => onAIGenerateText('experience', index, 'responsibilities', job.responsibilities)}
                disabled={isGenerating}
              >
                {isGenerating ? '...' : 'AI'}
              </button>
            </div>
            <button type="button" onClick={() => handleAddRemove('experience', 'remove', index)}>
              Remove
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRemove('experience', 'add')}>
          + Add Work Experience
        </button>
      </div>

      {/* Skills Section */}
      <div className="input-section">
        <h3>Skills</h3>
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="array-item-group">
            <input
              type="text"
              placeholder="Skill"
              value={skill.name}
              onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
            />
            <button type="button" onClick={() => handleAddRemove('skills', 'remove', index)}>
              Remove Skill
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRemove('skills', 'add')}>
          + Add Skill
        </button>
      </div>

      {/* Languages Section */}
      <div className="input-section">
        <h3>Languages</h3>
        {resumeData.languages.map((lang, index) => (
          <div key={index} className="array-item-group">
            <input
              type="text"
              placeholder="Language (e.g., English (Fluent))"
              value={lang.name}
              onChange={(e) => handleArrayChange('languages', index, 'name', e.target.value)}
            />
            <button type="button" onClick={() => handleAddRemove('languages', 'remove', index)}>
              Remove Language
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRemove('languages', 'add')}>
          + Add Language
        </button>
      </div>

      {/* Education Section */}
      <div className="input-section">
        <h3>Education</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="array-item-group">
            <input
              type="text"
              placeholder="Degree/Field of Study"
              value={edu.degree}
              onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
            />
            <input
              type="text"
              placeholder="Institution Name"
              value={edu.institution}
              onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
            />
            <div className="input-row">
              <input
                type="text"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)}
              />
              <input
                type="text"
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)}
              />
            </div>
            <button type="button" onClick={() => handleAddRemove('education', 'remove', index)}>
              Remove Education
            </button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRemove('education', 'add')}>
          + Add Education
        </button>
      </div>
      
      {/* Layout & Font Options Section */}
      <div className="input-section">
        <h3>Layout & Font Options</h3>
        <div className="margin-inputs">
          <label>Top Margin (cm):</label>
          <input type="number" step="0.1" value={margins.top} onChange={(e) => onMarginChange('top', e.target.value)} />
          <label>Bottom Margin (cm):</label>
          <input type="number" step="0.1" value={margins.bottom} onChange={(e) => onMarginChange('bottom', e.target.value)} />
          <label>Left Margin (cm):</label>
          <input type="number" step="0.1" value={margins.left} onChange={(e) => onMarginChange('left', e.target.value)} />
          <label>Right Margin (cm):</label>
          <input type="number" step="0.1" value={margins.right} onChange={(e) => onMarginChange('right', e.target.value)} />
        </div>
        <hr />
        <label>Font Size (pt):</label>
        <input type="number" step="1" min="8" max="16" value={fontSize} onChange={onFontSizeChange} />
        <label>Line Height:</label>
        <input type="number" step="0.1" min="1.0" max="2.0" value={lineHeight} onChange={onLineHeightChange} />
      </div>

    </div>
  );
}

export default VerticalLeftPanel2;