import React from 'react';
import html2pdf from 'html2pdf.js';
import './VerticalResumeBuilder.css';

function VerticalRightPanel({ resumeData, margins, isCompressed, onToggleCompress, accentColor, sidebarColor }) {
  const handleDownloadPdf = () => {
    const element = document.getElementById('vertical-a4-page-container');
    
    const marginMm = {
      top: margins.top * 10,
      bottom: margins.bottom * 10,
      left: margins.left * 10,
      right: margins.right * 10,
    };

    const options = {
      margin: 0,
      filename: 'vertical-resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'avoid-all'] }
    };
    
    html2pdf().from(element).set(options).save();
  };

  const a4PageStyle = {
    paddingTop: `${margins.top}cm`,
    paddingBottom: `${margins.bottom}cm`,
    paddingLeft: `${margins.left}cm`,
    paddingRight: `${margins.right}cm`,
  };

  const a4PageClass = `vertical-a4-page ${isCompressed ? 'compressed-mode' : ''}`;

  const sidebarStyle = {
    backgroundColor: sidebarColor,
  };

  const accentStyle = {
    color: accentColor,
  };

  const sidebarHeaderStyle = {
    color: '#ffffff',
    borderBottom: `2px solid ${accentColor}`,
  };

  return (
    <div className="vertical-right-panel">
      <div id="vertical-a4-page-container" className={a4PageClass} style={a4PageStyle}>
        <div className="vertical-resume-layout">
          {/* Left Sidebar */}
          <div className="resume-sidebar" style={sidebarStyle}>
            
            {/* Profile Section */}
            <div className="sidebar-section">
              <div className="profile-header">
                <h1 style={{color: '#ffffff'}}>{resumeData.personalDetails.name || 'Your Name'}</h1>
                {resumeData.personalDetails.title && (
                  <p className="profile-title" style={accentStyle}>
                    {resumeData.personalDetails.title}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="sidebar-section">
              <h3 style={sidebarHeaderStyle}>Contact</h3>
              <div className="contact-info">
                {resumeData.personalDetails.email && (
                  <div className="contact-item">
                    <span className="contact-label">Email:&nbsp;&nbsp; </span>
                    <span>{resumeData.personalDetails.email}</span>
                  </div>
                )}
                {resumeData.personalDetails.phone && (
                  <div className="contact-item">
                    <span className="contact-label">Phone:&nbsp;&nbsp; </span>
                    <span>{resumeData.personalDetails.phone}</span>
                  </div>
                )}
                {resumeData.personalDetails.address && (
                  <div className="contact-item">
                    <span className="contact-label">Location:</span>
                    <span>{resumeData.personalDetails.address}</span>
                  </div>
                )}
                {resumeData.personalDetails.linkedin && (
                  <div className="contact-item">
                    <span className="contact-label">LinkedIn:&nbsp; </span>
                    <span>{resumeData.personalDetails.linkedin}</span>
                  </div>
                )}
                {resumeData.personalDetails.portfolio && (
                  <div className="contact-item">
                    <span className="contact-label">Portfolio:&nbsp;&nbsp; </span>
                    <span>{resumeData.personalDetails.portfolio}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {resumeData.skills.length > 0 && (
              <div className="sidebar-section">
                <h3 style={sidebarHeaderStyle}>Skills</h3>
                <div className="skills-list">
                  {resumeData.skills.map((category, index) => (
                    category.heading && category.skills && (
                      <div key={index} className="skill-category">
                        <h4 style={accentStyle}>{category.heading}</h4>
                        <p>{category.skills}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {resumeData.certifications.length > 0 && (
              <div className="sidebar-section">
                <h3 style={sidebarHeaderStyle}>Certifications</h3>
                <div className="certifications-list">
                  {resumeData.certifications.map((cert, index) => (
                    cert.name && (
                      <div key={index} className="certification-item">
                        <strong>{cert.name}</strong>
                        <p>{cert.issuer}</p>
                        <p className="cert-date">{cert.date}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {resumeData.achievements.length > 0 && (
              <div className="sidebar-section">
                <h3 style={sidebarHeaderStyle}>Achievements</h3>
                <ul className="achievements-list">
                  {resumeData.achievements.map((achievement, index) => (
                    achievement.trim() && <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Main Content */}
          <div className="resume-main">
            
            {/* Professional Summary */}
            {resumeData.summary && (
              <div className="main-section">
                <h3 style={accentStyle}>Professional Summary</h3>
                <p className="summary-text">{resumeData.summary}</p>
              </div>
            )}

            {/* Work Experience */}
            {resumeData.experience.length > 0 && (
              <div className="main-section">
                <h3 style={accentStyle}>Work Experience</h3>
                {resumeData.experience.map((job, index) => (
                  <div key={index} className="experience-item">
                    <div className="job-header">
                      <h4>{job.title}</h4>
                      <span className="duration" style={accentStyle}>
                        {job.startDate} - {job.endDate}
                      </span>
                    </div>
                    <p className="company-name">{job.company}</p>
                    <ul className="responsibilities">
                      {job.responsibilities.split('\n').map((responsibility, i) => (
                        responsibility.trim() && <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className="main-section">
                <h3 style={accentStyle}>Education</h3>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-header">
                      <h4>{edu.degree}</h4>
                      <span className="duration" style={accentStyle}>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="institution">{edu.institution}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {resumeData.projects.length > 0 && (
              <div className="main-section">
                <h3 style={accentStyle}>Projects</h3>
                {resumeData.projects.map((project, index) => (
                  project.name && (
                    <div key={index} className="project-item">
                      <div className="project-header">
                        <h4>{project.name}</h4>
                        <span className="duration" style={accentStyle}>
                          {project.startDate} - {project.endDate}
                        </span>
                      </div>
                      <ul className="project-description">
                        {project.description.split('\n').map((desc, i) => (
                          desc.trim() && <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  )
                ))}
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

export default VerticalRightPanel;