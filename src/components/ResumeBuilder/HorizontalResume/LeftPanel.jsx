import React from 'react';

function LeftPanel({
  resumeData,
  onInputChange,
  onArrayItemChange,
  onSkillCategoryChange,
  onAchievementChange,
  onAddSectionItem,
  onRemoveSectionItem,
  margins,
  onMarginChange,
  accentColor,
  onColorChange,
  // NEW props for AI feature
  onAIGenerateText,
  isGenerating
}) {

  const handleDetailChange = (section, field, value) => {
    onInputChange(section, field, value);
  };

  const handleArrayChange = (section, index, field, value) => {
    onArrayItemChange(section, index, field, value);
  };

  const handleSkillsChange = (index, field, value) => {
    onSkillCategoryChange(index, field, value);
  };

  const handleAchievementsChange = (index, value) => {
    onAchievementChange(index, value);
  };

  return (
    <div className="left-panel">
      <br /><br /><br /><br />
      <h2>Enter Your Details</h2>
      <div className="input-section">
        <h3>Theme</h3>
        <label>Accent Color:</label>
        <input
          type="color"
          value={accentColor}
          onChange={onColorChange}
          className="color-picker"
        />
      </div>

      <div className="input-section">
        <h3>Personal Details</h3>
        <input type="text" placeholder="Full Name" value={resumeData.personalDetails.name} onChange={(e) => handleDetailChange('personalDetails', 'name', e.target.value)} />
        <input type="email" placeholder="Email Address" value={resumeData.personalDetails.email} onChange={(e) => handleDetailChange('personalDetails', 'email', e.target.value)} />
        <input type="tel" placeholder="Phone Number" value={resumeData.personalDetails.phone} onChange={(e) => handleDetailChange('personalDetails', 'phone', e.target.value)} />
        <input type="text" placeholder="Address (City, State)" value={resumeData.personalDetails.address} onChange={(e) => handleDetailChange('personalDetails', 'address', e.target.value)} />
      </div>

      <div className="input-section">
        <h3>Professional Summary</h3>
        <div className="textarea-with-ai-btn">
          <textarea placeholder="Write a brief professional summary..." rows="5" value={resumeData.summary} onChange={(e) => onInputChange('summary', null, e.target.value)} />
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

      <div className="input-section">
        <h3>Work Experience</h3>
        {resumeData.experience.map((job, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Job Title" value={job.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} />
            <input type="text" placeholder="Company Name" value={job.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
            <div className="input-row">
              <input type="text" placeholder="Start Date" value={job.startDate} onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} />
              <input type="text" placeholder="End Date" value={job.endDate} onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} />
            </div>
            <div className="textarea-with-ai-btn">
              <textarea placeholder="Key Responsibilities (one per line)" rows="4" value={job.responsibilities} onChange={(e) => handleArrayChange('experience', index, 'responsibilities', e.target.value)} />
              <button
                type="button"
                className="ai-btn"
                onClick={() => onAIGenerateText('experience', index, 'responsibilities', job.responsibilities)}
                disabled={isGenerating}
              >
                {isGenerating ? '...' : 'AI'}
              </button>
            </div>
            <button type="button" onClick={() => onRemoveSectionItem('experience', index)}>Remove Job</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('experience')}>+ Add Work Experience</button>
      </div>

      <div className="input-section">
        <h3>Education</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Degree/Field of Study" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
            <input type="text" placeholder="Institution Name" value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} />
            <div className="input-row">
              <input type="text" placeholder="Start Date" value={edu.startDate} onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)} />
              <input type="text" placeholder="End Date" value={edu.endDate} onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)} />
            </div>
            <button type="button" onClick={() => onRemoveSectionItem('education', index)}>Remove Education</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('education')}>+ Add Education</button>
      </div>

      <div className="input-section">
        <h3>Skills</h3>
        {resumeData.skills.map((category, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Skill Category (e.g., 'Programming Languages')" value={category.heading} onChange={(e) => handleSkillsChange(index, 'heading', e.target.value)} />
            <textarea placeholder="List your skills, separated by commas (e.g., React, JavaScript, Node.js, AWS)" rows="3" value={category.skills} onChange={(e) => handleSkillsChange(index, 'skills', e.target.value)} />
            <button type="button" onClick={() => onRemoveSectionItem('skills', index)}>Remove Category</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('skills')}>+ Add Skill Category</button>
      </div>

      <div className="input-section">
        <h3>Achievements</h3>
        {resumeData.achievements.map((achievement, index) => (
          <div key={index} className="array-item-group">
            <div className="textarea-with-ai-btn">
              <textarea placeholder="Describe an achievement (one per line)" rows="2" value={achievement} onChange={(e) => handleAchievementsChange(index, e.target.value)} />
              <button
                type="button"
                className="ai-btn"
                onClick={() => onAIGenerateText('achievements', index, null, achievement)}
                disabled={isGenerating}
              >
                {isGenerating ? '...' : 'AI'}
              </button>
            </div>
            <button type="button" onClick={() => onRemoveSectionItem('achievements', index)}>Remove Achievement</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('achievements')}>+ Add Achievement</button>
      </div>

      <div className="input-section">
        <h3>Certifications</h3>
        {resumeData.certifications.map((cert, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Certification Name" value={cert.name} onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)} />
            <input type="text" placeholder="Issuing Organization" value={cert.issuer} onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)} />
            <input type="text" placeholder="Date Acquired" value={cert.date} onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)} />
            <button type="button" onClick={() => onRemoveSectionItem('certifications', index)}>Remove Certification</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('certifications')}>+ Add Certification</button>
      </div>

      <div className="input-section">
        <h3>Projects</h3>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Project Name" value={project.name} onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)} />
            <div className="input-row">
              <input type="text" placeholder="Start Date" value={project.startDate} onChange={(e) => handleArrayChange('projects', index, 'startDate', e.target.value)} />
              <input type="text" placeholder="End Date" value={project.endDate} onChange={(e) => handleArrayChange('projects', index, 'endDate', e.target.value)} />
            </div>
            <div className="textarea-with-ai-btn">
              <textarea placeholder="Project Description (one per line)" rows="4" value={project.description} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} />
              <button
                type="button"
                className="ai-btn"
                onClick={() => onAIGenerateText('projects', index, 'description', project.description)}
                disabled={isGenerating}
              >
                {isGenerating ? '...' : 'AI'}
              </button>
            </div>
            <button type="button" onClick={() => onRemoveSectionItem('projects', index)}>Remove Project</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('projects')}>+ Add Project</button>
      </div>

      <div className="input-section">
        <h3>Adjust Margins (cm)</h3>
        <label>Top Margin:</label><input type="number" min="0.5" max="5" step="0.1" value={margins.top} onChange={(e) => onMarginChange('top', e.target.value)} />
        <label>Bottom Margin:</label><input type="number" min="0.5" max="5" step="0.1" value={margins.bottom} onChange={(e) => onMarginChange('bottom', e.target.value)} />
        <label>Left Margin:</label><input type="number" min="0.5" max="5" step="0.1" value={margins.left} onChange={(e) => onMarginChange('left', e.target.value)} />
        <label>Right Margin:</label><input type="number" min="0.5" max="5" step="0.1" value={margins.right} onChange={(e) => onMarginChange('right', e.target.value)} />
      </div>
    </div>
  );
}

export default LeftPanel;