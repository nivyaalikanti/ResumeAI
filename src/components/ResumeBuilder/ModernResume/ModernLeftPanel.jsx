import React from 'react';

function ModernLeftPanel({ 
  resumeData, 
  onInputChange, 
  onArrayItemChange,
  onSkillChange,
  onAddSectionItem, 
  onRemoveSectionItem, 
  margins, 
  onMarginChange,
  accentColor,
  onColorChange
}) {
  
  const handleDetailChange = (section, field, value) => {
    onInputChange(section, field, value);
  };

  const handleArrayChange = (section, index, field, value) => {
    onArrayItemChange(section, index, field, value); 
  };

  const handleSkillsChange = (index, value) => {
    onSkillChange(index, value);
  };

  return (
    <div className="modern-left-panel">
      <h2>Modern Resume Builder</h2>
      
      {/* Theme Section */}
      <div className="input-section">
        <h3>Theme</h3>
        <div className="color-input-group">
          <label>Accent Color:</label>
          <input 
            type="color" 
            value={accentColor} 
            onChange={onColorChange} 
            className="color-picker"
          />
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="input-section">
        <h3>Personal Details</h3>
        <input type="text" placeholder="Full Name" value={resumeData.personalDetails.name} onChange={(e) => handleDetailChange('personalDetails', 'name', e.target.value)} />
        <input type="text" placeholder="Professional Title" value={resumeData.personalDetails.title} onChange={(e) => handleDetailChange('personalDetails', 'title', e.target.value)} />
        <input type="tel" placeholder="Phone Number" value={resumeData.personalDetails.phone} onChange={(e) => handleDetailChange('personalDetails', 'phone', e.target.value)} />
        <input type="text" placeholder="Address" value={resumeData.personalDetails.address} onChange={(e) => handleDetailChange('personalDetails', 'address', e.target.value)} />
        <input type="email" placeholder="Email Address" value={resumeData.personalDetails.email} onChange={(e) => handleDetailChange('personalDetails', 'email', e.target.value)} />
      </div>

      {/* About Me Section */}
      <div className="input-section">
        <h3>About Me</h3>
        <textarea placeholder="Write a brief professional summary..." rows="6" value={resumeData.about} onChange={(e) => onInputChange('about', null, e.target.value)} />
      </div>

      {/* Experience Section */}
      <div className="input-section">
        <h3>Work Experience</h3>
        {resumeData.experience.map((job, index) => (
          <div key={index} className="array-item-group">
            <div className="input-row">
              <input type="text" placeholder="Start Date" value={job.startDate} onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} />
              <input type="text" placeholder="End Date" value={job.endDate} onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} />
            </div>
            <input type="text" placeholder="Company Name" value={job.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
            <input type="text" placeholder="Job Title" value={job.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} />
            <textarea placeholder="Job Description" rows="3" value={job.description} onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)} />
            <button type="button" onClick={() => onRemoveSectionItem('experience', index)}>Remove Experience</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('experience')}>+ Add Work Experience</button>
      </div>

      {/* Education Section */}
      <div className="input-section">
        <h3>Education</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="array-item-group">
            <div className="input-row">
              <input type="text" placeholder="Start Date" value={edu.startDate} onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)} />
              <input type="text" placeholder="End Date" value={edu.endDate} onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)} />
            </div>
            <input type="text" placeholder="Institution Name" value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} />
            <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
            <textarea placeholder="Description" rows="2" value={edu.description} onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)} />
            <button type="button" onClick={() => onRemoveSectionItem('education', index)}>Remove Education</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('education')}>+ Add Education</button>
      </div>

      {/* Skills Section */}
      <div className="input-section">
        <h3>Skills</h3>
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Skill (e.g., Leadership, Digital Marketing)" value={skill} onChange={(e) => handleSkillsChange(index, e.target.value)} />
            <button type="button" onClick={() => onRemoveSectionItem('skills', index)}>Remove Skill</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('skills')}>+ Add Skill</button>
      </div>

      {/* References Section */}
      <div className="input-section">
        <h3>References</h3>
        {resumeData.references.map((ref, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Reference Name" value={ref.name} onChange={(e) => handleArrayChange('references', index, 'name', e.target.value)} />
            <input type="text" placeholder="Position" value={ref.position} onChange={(e) => handleArrayChange('references', index, 'position', e.target.value)} />
            <input type="text" placeholder="Company" value={ref.company} onChange={(e) => handleArrayChange('references', index, 'company', e.target.value)} />
            <input type="text" placeholder="Phone" value={ref.phone} onChange={(e) => handleArrayChange('references', index, 'phone', e.target.value)} />
            <input type="text" placeholder="Social Media" value={ref.social} onChange={(e) => handleArrayChange('references', index, 'social', e.target.value)} />
            <button type="button" onClick={() => onRemoveSectionItem('references', index)}>Remove Reference</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('references')}>+ Add Reference</button>
      </div>

      {/* Margin Adjustment Section */}
      <div className="input-section">
        <h3>Adjust Margins (cm)</h3>
        <div className="margin-inputs">
          <div className="margin-input-group">
            <label>Top:</label>
            <input type="number" min="0.5" max="5" step="0.1" value={margins.top} onChange={(e) => onMarginChange('top', e.target.value)} />
          </div>
          <div className="margin-input-group">
            <label>Bottom:</label>
            <input type="number" min="0.5" max="5" step="0.1" value={margins.bottom} onChange={(e) => onMarginChange('bottom', e.target.value)} />
          </div>
          <div className="margin-input-group">
            <label>Left:</label>
            <input type="number" min="0.5" max="5" step="0.1" value={margins.left} onChange={(e) => onMarginChange('left', e.target.value)} />
          </div>
          <div className="margin-input-group">
            <label>Right:</label>
            <input type="number" min="0.5" max="5" step="0.1" value={margins.right} onChange={(e) => onMarginChange('right', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernLeftPanel;