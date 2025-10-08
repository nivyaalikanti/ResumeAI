import React from 'react';
import './VerticalResumeBuilder3.css';

// Make sure you have react-icons installed: npm install react-icons
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

function VerticalRightPanel3({ resumeData, isCompressed, onToggleCompress, margins, fontSize, lineHeight }) {
  const handlePrint = () => window.print();

  const a4PageStyle = {
    padding: `${margins.top}cm ${margins.right}cm ${margins.bottom}cm ${margins.left}cm`,
    fontSize: `${fontSize}pt`,
    lineHeight: lineHeight,
  };

  return (
    <div className="vertical-right-panel">
      <div id="a4-page-container" className="a4-page-vertical" style={a4PageStyle}>
        
        {/* HEADER: Name, Title, and Summary */}
        <div className="header-section">
          <h1>{resumeData.personalDetails.name || 'Your Name'}</h1>
          <p className="header-headline">{resumeData.personalDetails.headline || 'Your Professional Title'}</p>
          <p className="summary-text">{resumeData.summary || 'A brief summary about your professional background goes here.'}</p>
        </div>

        {/* MAIN CONTENT WRAPPER */}
        <div className="main-content-wrapper">
          {/* Main Column (Left Side) */}
          <div className="main-column">
            <div className="resume-section">
              <h2>WORK EXPERIENCE</h2>
              <hr />
              {resumeData.experience.map((job, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <h3>{job.title}</h3>
                    <p className="job-dates">{job.dates}</p>
                  </div>
                  <p className="company-details">{job.company}, <em>{job.location}</em></p>
                  <ul>
                    {job.responsibilities.split('\n').map((res, i) => res.trim() && <li key={i}>{res}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Column (Right Side) */}
          <div className="sidebar-column">
            {/* Contact */}
            <div className="resume-section">
              <h2>CONTACT</h2>
              <hr />
              <div className="contact-item"><FaMapMarkerAlt /><p>{resumeData.personalDetails.location}</p></div>
              <div className="contact-item"><FaPhone /><p>{resumeData.personalDetails.phone}</p></div>
              <div className="contact-item"><FaEnvelope /><p>{resumeData.personalDetails.email}</p></div>
              <div className="contact-item"><FaLinkedin /><p>{resumeData.personalDetails.website}</p></div>
              <div className="contact-item"><FaGithub /><p>{resumeData.personalDetails.github}</p></div>
            </div>

            {/* Skills */}
            <div className="resume-section">
              <h2>SKILLS</h2>
              <hr />
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="skill-category">
                  <h4>{skill.category}</h4>
                  <p>{skill.items}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="resume-section">
                <h2>EDUCATION</h2>
                <hr />
                {resumeData.education.map((edu, index) => (
                    <div key={index} className="education-item">
                        <h3>{edu.degree}</h3>
                        <p className="institution-name">{edu.institution}</p>
                        <p className="education-dates">{edu.dates}</p>
                        <p className="education-details">{edu.details}</p>
                    </div>
                ))}
            </div>

            {/* Other */}
            <div className="resume-section">
                <h2>OTHER</h2>
                <hr />
                {resumeData.other.map((item, index) => (
                    <div key={index} className="other-item">
                        <h3>{item.title}</h3>
                        <p>{item.details}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={onToggleCompress} className="compress-btn">
          {isCompressed ? 'Expand' : 'Compress'}
        </button>
        <button onClick={handlePrint} className="download-btn">
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default VerticalRightPanel3;