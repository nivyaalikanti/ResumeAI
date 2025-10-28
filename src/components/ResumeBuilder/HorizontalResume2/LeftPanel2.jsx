import React, { useState, useEffect } from 'react';

function LeftPanel2({
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
  onAIGenerateText,
  isGenerating
}) {
  const [loading, setLoading] = useState(true);

  // ✅ AUTO-LOAD ONLY ESSENTIAL USER DATA WHEN COMPONENT MOUNTS
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('🔍 Loading essential user data in LeftPanel2...');
        
        if (!token) {
          console.log('No token found, using empty data');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          console.log('✅ Essential user data loaded in LeftPanel2:', userData);
          
          // ✅ AUTO-FILL ONLY ESSENTIAL PERSONAL DETAILS
          if (userData.personalInfo) {
            const personalInfo = userData.personalInfo;
            if (personalInfo.fullName && !resumeData.personalDetails.name) {
              onInputChange('personalDetails', 'name', personalInfo.fullName);
            }
            if (personalInfo.email && !resumeData.personalDetails.email) {
              onInputChange('personalDetails', 'email', personalInfo.email);
            }
            if (personalInfo.phone && !resumeData.personalDetails.phone) {
              onInputChange('personalDetails', 'phone', personalInfo.phone);
            }
            if (personalInfo.address && !resumeData.personalDetails.address) {
              onInputChange('personalDetails', 'address', personalInfo.address);
            }
            // LinkedIn/Website - only fill if empty
            if (personalInfo.linkedin && !resumeData.personalDetails.website) {
              onInputChange('personalDetails', 'website', personalInfo.linkedin);
            }
          }

          // ✅ AUTO-FILL SUMMARY IF AVAILABLE
          if (userData.summary && !resumeData.summary) {
            onInputChange('summary', null, userData.summary);
          }

          // ❌ REMOVED AUTO-FILLING FOR ALL OTHER SECTIONS:
          // - Experience
          // - Education
          // - Skills
          // - Projects
          // - Certifications
          // - Achievements
          // Let user enter these manually

          console.log('✅ Essential user data auto-filled in template 2!');
        } else {
          console.log('❌ Failed to load user data');
        }
      } catch (error) {
        console.error('❌ Error loading user data in LeftPanel2:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [onInputChange, onArrayItemChange, onSkillCategoryChange, onAchievementChange, onAddSectionItem, onRemoveSectionItem]);

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

  // ✅ SHOW LOADING STATE
  if (loading) {
    return (
      <div className="left-panel-2">
        <br /><br /><br /><br />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px',
          fontSize: '16px',
          color: '#666',
          flexDirection: 'column'
        }}>
          <div style={{ marginBottom: '15px' }}>🔄</div>
          <div>Loading your saved data...</div>
          <div style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
            Please wait while we fetch your information
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="left-panel-2">
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
        <input type="text" placeholder="Full Name" value={resumeData.personalDetails.name || ''} onChange={(e) => handleDetailChange('personalDetails', 'name', e.target.value)} />
        <input type="text" placeholder="Job Title / Headline" value={resumeData.personalDetails.headline || ''} onChange={(e) => handleDetailChange('personalDetails', 'headline', e.target.value)} />
        <input type="text" placeholder="Email" value={resumeData.personalDetails.email || ''} onChange={(e) => handleDetailChange('personalDetails', 'email', e.target.value)} />
        <input type="text" placeholder="Phone" value={resumeData.personalDetails.phone || ''} onChange={(e) => handleDetailChange('personalDetails', 'phone', e.target.value)} />
        <input type="text" placeholder="Address (City, State)" value={resumeData.personalDetails.address || ''} onChange={(e) => handleDetailChange('personalDetails', 'address', e.target.value)} />
        <input type="text" placeholder="LinkedIn/Website URL" value={resumeData.personalDetails.website || ''} onChange={(e) => handleDetailChange('personalDetails', 'website', e.target.value)} />
      </div>

      {/* Summary Section - Note: This template doesn't have a summary field in the UI but we fetch it */}
      {/* If you want to add a summary section, you can add it here */}

      <div className="input-section">
        <h3>Professional Experience</h3>
        {resumeData.experience.map((job, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Job Title" value={job.title || ''} onChange={(e) => handleArrayChange('experience', index, 'title', e.target.value)} />
            <input type="text" placeholder="Company Name" value={job.company || ''} onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)} />
            <div style={{display: 'flex', gap: '10px'}}>
                <input type="text" placeholder="Start Date" value={job.startDate || ''} onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)} />
                <input type="text" placeholder="End Date" value={job.endDate || ''} onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)} />
            </div>
            <div className="ai-input-group">
              <textarea placeholder="Responsibilities (one per line)" rows="4" value={job.responsibilities || ''} onChange={(e) => handleArrayChange('experience', index, 'responsibilities', e.target.value)} />
              <button type="button" className="ai-btn" onClick={() => onAIGenerateText('experience', index, 'responsibilities', job.responsibilities)} disabled={isGenerating}>{isGenerating ? '...' : 'AI'}</button>
            </div>
            {resumeData.experience.length > 1 && (
              <button type="button" onClick={() => onRemoveSectionItem('experience', index)}>Remove Job</button>
            )}
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('experience')}>+ Add Experience</button>
      </div>
      
      <div className="input-section">
        <h3>Education</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Degree/Certificate" value={edu.degree || ''} onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)} />
            <input type="text" placeholder="Institution" value={edu.institution || ''} onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)} />
            <div style={{display: 'flex', gap: '10px'}}>
              <input type="text" placeholder="Start Date" value={edu.startDate || ''} onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)} />
              <input type="text" placeholder="End Date" value={edu.endDate || ''} onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)} />
            </div>
            {resumeData.education.length > 1 && (
              <button type="button" onClick={() => onRemoveSectionItem('education', index)}>Remove Education</button>
            )}
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('education')}>+ Add Education</button>
      </div>

      <div className="input-section">
        <h3>Skills (Categorized)</h3>
        {resumeData.skills.map((skillCat, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Category Heading (e.g., Languages)" value={skillCat.heading || ''} onChange={(e) => handleSkillsChange(index, 'heading', e.target.value)} />
            <textarea placeholder="Skills (comma-separated)" rows="3" value={skillCat.skills || ''} onChange={(e) => handleSkillsChange(index, 'skills', e.target.value)} />
            {resumeData.skills.length > 1 && (
              <button type="button" onClick={() => onRemoveSectionItem('skills', index)}>Remove Category</button>
            )}
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('skills')}>+ Add Skill Category</button>
      </div>

      <div className="input-section">
        <h3>Certifications</h3>
        {resumeData.certifications.map((cert, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Certification Name" value={cert.name || ''} onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)} />
            <input type="text" placeholder="Issuer" value={cert.issuer || ''} onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)} />
            <input type="text" placeholder="Date Acquired" value={cert.date || ''} onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)} />
            {resumeData.certifications.length > 1 && (
              <button type="button" onClick={() => onRemoveSectionItem('certifications', index)}>Remove Certification</button>
            )}
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('certifications')}>+ Add Certification</button>
      </div>

      <div className="input-section">
        <h3>Projects</h3>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="array-item-group">
            <input type="text" placeholder="Project Name" value={project.name || ''} onChange={(e) => handleArrayChange('projects', index, 'name', e.target.value)} />
            <div style={{display: 'flex', gap: '10px'}}>
              <input type="text" placeholder="Start Date" value={project.startDate || ''} onChange={(e) => handleArrayChange('projects', index, 'startDate', e.target.value)} />
              <input type="text" placeholder="End Date" value={project.endDate || ''} onChange={(e) => handleArrayChange('projects', index, 'endDate', e.target.value)} />
            </div>
            <div className="ai-input-group">
              <textarea placeholder="Project Details (one per line)" rows="3" value={project.description || ''} onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)} />
              <button type="button" className="ai-btn" onClick={() => onAIGenerateText('projects', index, 'description', project.description)} disabled={isGenerating}>{isGenerating ? '...' : 'AI'}</button>
            </div>
            {resumeData.projects.length > 1 && (
              <button type="button" onClick={() => onRemoveSectionItem('projects', index)}>Remove Project</button>
            )}
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('projects')}>+ Add Project</button>
      </div>

      <div className="input-section">
        <h3>Key Achievements (Brief, one per line)</h3>
        {resumeData.achievements.map((ach, index) => (
          <div key={index} className="array-item-group">
            <div className="ai-input-group">
              <textarea placeholder="e.g., Awarded 'Employee of the Year' 2023" rows="1" value={ach || ''} onChange={(e) => handleAchievementsChange(index, e.target.value)} />
              <button type="button" className="ai-btn" onClick={() => onAIGenerateText('achievements', index, null, ach)} disabled={isGenerating}>{isGenerating ? '...' : 'AI'}</button>
            </div>
            {resumeData.achievements.length > 1 && (
              <button type="button" onClick={() => onRemoveSectionItem('achievements', index)}>Remove Achievement</button>
            )}
            <hr />
          </div>
        ))}
        <button type="button" onClick={() => onAddSectionItem('achievements')}>+ Add Achievement</button>
      </div>

      <div className="input-section">
        <h3>Adjust Margins (cm)</h3>
        <div className="margin-inputs">
          <label>Top Margin:</label><input type="number" min="0.5" max="5" step="0.1" value={margins.top} onChange={(e) => onMarginChange('top', e.target.value)} />
          <label>Bottom Margin:</label><input type="number" min="0.5" max="5" step="0.1" value={margins.bottom} onChange={(e) => onMarginChange('bottom', e.target.value)} />
          <label>Left Margin:</label><input type="number" min="0.5" max="5" step="0.1" value={margins.left} onChange={(e) => onMarginChange('left', e.target.value)} />
          <label>Right Margin:</label><input type="number" min="0.5" max="5" step="0.1" value={margins.right} onChange={(e) => onMarginChange('right', e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default LeftPanel2;