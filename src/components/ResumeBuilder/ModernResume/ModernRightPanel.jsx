import React from 'react';
import html2pdf from 'html2pdf.js';
import './ModernResumeBuilder.css';

function ModernRightPanel({ resumeData, margins, isCompressed, onToggleCompress, accentColor }) {
  const handleDownloadPdf = () => {
    const element = document.getElementById('modern-a4-page-container');
    
    const options = {
      margin: [margins.top, margins.left, margins.bottom, margins.right],
      filename: 'modern-resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false
      },
      jsPDF: { 
        unit: 'cm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };
    
    html2pdf()
      .from(element)
      .set(options)
      .save()
      .catch(error => {
        console.error('PDF generation error:', error);
      });
  };

  const a4PageStyle = {
    paddingTop: `${margins.top}cm`,
    paddingBottom: `${margins.bottom}cm`,
    paddingLeft: `${margins.left}cm`,
    paddingRight: `${margins.right}cm`,
    width: '21cm',
    minHeight: '29.7cm',
    boxSizing: 'border-box'
  };

  const a4PageClass = `modern-a4-page ${isCompressed ? 'compressed-mode' : ''}`;

  const accentStyle = {
    color: accentColor,
  };

  // Split skills into two columns for display
  const splitSkillsIntoColumns = (skills) => {
    const midIndex = Math.ceil(skills.length / 2);
    return {
      leftColumn: skills.slice(0, midIndex),
      rightColumn: skills.slice(midIndex)
    };
  };

  const skillColumns = splitSkillsIntoColumns(resumeData.skills.filter(skill => skill.trim()));

  return (
    <div className="modern-right-panel">
      <div id="modern-a4-page-container" className={a4PageClass} style={a4PageStyle}>
        
        {/* Header Section */}
        <div className="modern-header">
          <div className="name-title">
            <h1>{resumeData.personalDetails.name || 'Your Name'}</h1>
            <p className="professional-title" style={accentStyle}>
              {resumeData.personalDetails.title || 'Professional Title'}
            </p>
          </div>
          <div className="contact-info">
            <p>{resumeData.personalDetails.phone || 'Phone'}</p>
            <p>{resumeData.personalDetails.address || 'Address'}</p>
            <p>{resumeData.personalDetails.email || 'Email'}</p>
          </div>
        </div>

        {/* About Me Section */}
        {resumeData.about && (
          <div className="modern-section">
            <h3 style={accentStyle}>ABOUT ME</h3>
            <div className="section-content">
              <p className="about-text">{resumeData.about}</p>
            </div>
          </div>
        )}

        <div className="two-column-layout">
          {/* Left Column */}
          <div className="left-column">
            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className="modern-section">
                <h3 style={accentStyle}>EDUCATION</h3>
                <div className="section-content">
                  {resumeData.education.map((edu, index) => (
                    <div key={index} className="education-item">
                      <div className="date-range">
                        {edu.startDate} - {edu.endDate}
                      </div>
                      <h4>{edu.institution}</h4>
                      <p className="degree">{edu.degree}</p>
                      {edu.description && <p className="description">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div className="modern-section">
                <h3 style={accentStyle}>SKILLS</h3>
                <div className="section-content">
                  <div className="skills-grid">
                    <div className="skills-column">
                      {skillColumns.leftColumn.map((skill, index) => (
                        <div key={index} className="skill-item">
                          • {skill}
                        </div>
                      ))}
                    </div>
                    <div className="skills-column">
                      {skillColumns.rightColumn.map((skill, index) => (
                        <div key={index} className="skill-item">
                          • {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <div className="modern-section">
                <h3 style={accentStyle}>EXPERIENCE</h3>
                <div className="section-content">
                  {resumeData.experience.map((job, index) => (
                    <div key={index} className="experience-item">
                      <div className="date-range">
                        {job.startDate} - {job.endDate}
                      </div>
                      <h4>{job.company}</h4>
                      <p className="job-title">{job.title}</p>
                      {job.description && <p className="description">{job.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {resumeData.references.length > 0 && (
              <div className="modern-section">
                <h3 style={accentStyle}>REFERENCES</h3>
                <div className="section-content">
                  {resumeData.references.map((ref, index) => (
                    <div key={index} className="reference-item">
                      <h4>{ref.name}</h4>
                      <p className="reference-position">{ref.position} of {ref.company}</p>
                      <p className="reference-contact">
                        Phone: {ref.phone}<br />
                        Social: {ref.social}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <button onClick={onToggleCompress} className="compress-btn">
          {isCompressed ? 'Expand' : 'Compress to One Page'}
        </button>
        <button onClick={handleDownloadPdf} className="download-btn">
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ModernRightPanel;