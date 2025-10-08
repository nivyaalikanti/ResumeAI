import React from 'react';

function VerticalLeftPanel3({
  resumeData,
  onInputChange,
  onArrayItemChange,
  onRemoveSectionItem,
  onAddSectionItem,
  // AI props are kept for functionality
  onAIGenerateText,
  isGenerating
}) {
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

      {/* Personal Details Section */}
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
          placeholder="Job Title / Headline"
          value={resumeData.personalDetails.headline}
          onChange={(e) => handleDetailChange('personalDetails', 'headline', e.target.value)}
        />
         <input
          type="text"
          placeholder="Location (e.g., Denver, OH)"
          value={resumeData.personalDetails.location}
          onChange={(e) => handleDetailChange('personalDetails', 'location', e.target.value)}
        />
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
          type="url"
          placeholder="LinkedIn URL or Website"
          value={resumeData.personalDetails.website}
          onChange={(e) => handleDetailChange('personalDetails', 'website', e.target.value)}
        />
        {/* ADDED: GitHub input */}
        <input
          type="url"
          placeholder="GitHub URL"
          value={resumeData.personalDetails.github}
          onChange={(e) => handleDetailChange('personalDetails', 'github', e.target.value)}
        />
      </div>

      {/* Summary Section */}
      <div className="input-section">
        <h3>Summary</h3>
        <textarea
          placeholder="Write a brief professional summary..."
          rows="5"
          value={resumeData.summary}
          onChange={(e) => onInputChange('summary', null, e.target.value)}
        />
        {/* AI Button can be added here if desired */}
      </div>

      {/* Work Experience Section */}
      <div className="input-section">
        <h3>Work Experience</h3>
        {resumeData.experience.map((job, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Job Title" value={job.title} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} />
            <div className="input-row">
              <input type="text" placeholder="Company" value={job.company} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
              <input type="text" placeholder="Location" value={job.location} onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)} />
            </div>
            <input type="text" placeholder="Dates (e.g., Nov 2015 – Present)" value={job.dates} onChange={(e) => handleArrayChange('experience', index, 'dates', e.target.value)} />
            <textarea placeholder="Key Responsibilities (one per line)" rows="4" value={job.responsibilities} onChange={(e) => handleArrayChange('experience', index, 'responsibilities', e.target.value)} />
            <button type="button" onClick={() => handleAddRemove('experience', 'remove', index)}>Remove</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRemove('experience', 'add')}>+ Add Work Experience</button>
      </div>
      
      {/* Education Section */}
      <div className="input-section">
          <h3>Education</h3>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="array-item-group">
              <input type="text" placeholder="Degree/Field of Study" value={edu.degree} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}/>
              <input type="text" placeholder="Institution Name" value={edu.institution} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}/>
              <input type="text" placeholder="Dates" value={edu.dates} onChange={(e) => handleArrayChange('education', index, 'dates', e.target.value)}/>
              <textarea placeholder="Details (e.g., GPA, Honors, Dean's List)" rows="2" value={edu.details} onChange={(e) => handleArrayChange('education', index, 'details', e.target.value)}/>
              <button type="button" onClick={() => handleAddRemove('education', 'remove', index)}>Remove</button>
              <hr />
            </div>
          ))}
          <button type="button" onClick={() => handleAddRemove('education', 'add')}>+ Add Education</button>
      </div>

      {/* UPDATED: Skills Section for Categories */}
      <div className="input-section">
        <h3>Skills</h3>
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Skill Category (e.g., Programming)" value={skill.category} onChange={(e) => handleArrayChange('skills', index, 'category', e.target.value)} />
            <textarea placeholder="Skills (comma-separated)" rows="3" value={skill.items} onChange={(e) => handleArrayChange('skills', index, 'items', e.target.value)} />
            <button type="button" onClick={() => handleAddRemove('skills', 'remove', index)}>Remove Category</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRemove('skills', 'add')}>+ Add Skill Category</button>
      </div>

      {/* ADDED: Other Section for Certifications etc. */}
      <div className="input-section">
        <h3>Other (Certifications, etc.)</h3>
        {resumeData.other.map((item, index) => (
          <div key={index} className="array-item-group">
            // CORRECTED CODE:
            <input type="text" placeholder="Title (e.g., AWS Certified)" value={item.title} onChange={(e) => handleArrayChange('other', index, 'title', e.target.value)} />
            <input type="text" placeholder="Details (e.g., Issued 2020)" value={item.details} onChange={(e) => handleArrayChange('other', index, 'details', e.target.value)} />
            <button type="button" onClick={() => handleAddRemove('other', 'remove', index)}>Remove Item</button>
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => handleAddRemove('other', 'add')}>+ Add Item</button>
      </div>

    </div>
  );
}

export default VerticalLeftPanel3;