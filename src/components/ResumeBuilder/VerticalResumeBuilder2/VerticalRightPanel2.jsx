import React from 'react';
import './VerticalResumeBuilder2.css';

function VerticalRightPanel2({ resumeData, isCompressed, onToggleCompress, margins, fontSize, lineHeight }) {
  // Function to handle the print action
  const handlePrint = () => {
    window.print();
  };

  const a4PageClass = `a4-page-vertical ${isCompressed ? 'compressed-mode-2' : ''}`;

  // Apply the dynamic styles here
  const a4PageStyle = {
    paddingTop: `${margins.top}cm`,
    paddingBottom: `${margins.bottom}cm`,
    paddingLeft: `${margins.left}cm`,
    paddingRight: `${margins.right}cm`,
    fontSize: `${fontSize}pt`,
    lineHeight: lineHeight,
  };

  return (
    <div className="vertical-right-panel">
      <div id="a4-page-container" className={a4PageClass} style={a4PageStyle}>
        <div className="header-section">
          <h1>{resumeData.personalDetails.name || 'Your Name'}</h1>
          <p className="header-headline">{resumeData.personalDetails.headline || 'Your Headline'}</p>
          <hr className="header-divider" />
        </div>

        <div className="main-content-wrapper">
          {/* Left Column */}
          <div className="left-column">
            {/* Contact Info */}
            <div className="contact-section">
              <h2>CONTACT</h2>
              <hr />
              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <p>{resumeData.personalDetails.phone || '+124-4236-7894'}</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <p>{resumeData.personalDetails.email || 'hello@your.com'}</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>{resumeData.personalDetails.address || '123 Fake St, Anytown'}</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-globe"></i>
                <p>{resumeData.personalDetails.website || 'www.yourwebsite.com'}</p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="skills-section">
              <h2>SKILLS</h2>
              <hr />
              <ul>
                {resumeData.skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </div>

            {/* Languages Section */}
            <div className="languages-section">
              <h2>LANGUAGES</h2>
              <hr />
              <ul>
                {resumeData.languages.map((lang, index) => (
                  <li key={index}>{lang.name}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Profile Section */}
            {resumeData.summary && (
              <div className="resume-section">
                <h2>PROFILE</h2>
                <hr />
                <p className="profile-text">{resumeData.summary}</p>
              </div>
            )}

            {/* Work Experience */}
            {resumeData.experience.length > 0 && (
              <div className="resume-section">
                <h2>WORK EXPERIENCE</h2>
                <hr />
                {resumeData.experience.map((job, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <div>
                        <h3>{job.title}</h3>
                        <p className="company-name">{job.company}</p>
                      </div>
                      <p className="job-dates">{job.startDate} - {job.endDate}</p>
                    </div>
                    <ul>
                      {job.responsibilities.split('\n').map((res, i) => res.trim() && <li key={i}>{res}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {resumeData.education.length > 0 && (
              <div className="resume-section">
                <h2>EDUCATION</h2>
                <hr />
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-header">
                      <div>
                        <h3>{edu.degree}</h3>
                        <p className="institution-name">{edu.institution}</p>
                      </div>
                      <p className="education-dates">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  </div>
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
        <button onClick={handlePrint} className="download-btn">
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default VerticalRightPanel2;