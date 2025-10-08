import React from 'react';
import html2pdf from 'html2pdf.js';
import './ResumeBuilder2.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';

function RightPanel2({ resumeData, margins, isCompressed, onToggleCompress, accentColor }) {
  const handleDownloadPdf = () => {
    const element = document.getElementById('a4-page-container-2');
    const originalStyle = element.style.cssText;
    element.style.padding = '0';
    
   
    const marginMm = {
      top: margins.top * 10,
      right: margins.right * 10,
      bottom: margins.bottom * 10,
      left: margins.left * 10,
    };

    const options = {
      margin: [marginMm.top, marginMm.right, marginMm.bottom, marginMm.left],
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        width: 794, 
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
    
    
    element.style.cssText = originalStyle;
  };

  const a4PageStyle = {
    padding: `${margins.top}cm ${margins.right}cm ${margins.bottom}cm ${margins.left}cm`,
    borderColor: accentColor,
  };

  return (
    <div className="right-panel-2">
      <div id="a4-page-container-2" className="a4-page" style={a4PageStyle}>
        
        <div className="main-content-grid">
          
         
          <div className="main-column">
            
       
            <div className="header-section-2">
              <h1 style={{color: accentColor}}>{resumeData.personalDetails.name || 'Your Name'}</h1>
              <p className="header-headline-2">{resumeData.personalDetails.headline || 'Your Professional Headline'}</p>
            </div>

            
            {resumeData.experience.length > 0 && (
              <div className="resume-section-2">
                <h2>Experience</h2>
                {resumeData.experience.map((job, index) => (
                  <div key={index} className="job-item-2">
                    <div className="job-header-2">
                      <div>
                        <h3>{job.title}</h3>
                        <p className="company-name-2">{job.company}</p>
                      </div>
                      <p className="job-dates-2">{job.startDate} - {job.endDate}</p>
                    </div>
                    {job.responsibilities && (
                      <ul>
                        {job.responsibilities.split('\n').map((res, i) => res.trim() && <li key={i}>{res}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

           
            {resumeData.projects.length > 0 && (
              <div className="resume-section-2">
                <h2>Projects</h2>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="project-item-2">
                    <div className="job-header-2">
                      <div>
                        <h3>{project.name}</h3>
                      </div>
                      <p className="job-dates-2">{project.startDate} - {project.endDate}</p>
                    </div>
                    {project.description && (
                      <ul>
                        {project.description.split('\n').map((desc, i) => desc.trim() && <li key={i}>{desc}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div> 
          
        
          <div className="sidebar-column">

           
            <div className="resume-section-2">
              <h2>Contact</h2>
              {resumeData.personalDetails.phone && (
                <div className="contact-item-2">
                  <FaPhone /> <p>{resumeData.personalDetails.phone}</p>
                </div>
              )}
              {resumeData.personalDetails.email && (
                <div className="contact-item-2">
                  <FaEnvelope /> <p>{resumeData.personalDetails.email}</p>
                </div>
              )}
              {resumeData.personalDetails.address && (
                <div className="contact-item-2">
                  <FaMapMarkerAlt /> <p>{resumeData.personalDetails.address}</p>
                </div>
              )}
              {resumeData.personalDetails.website && (
                <div className="contact-item-2">
                  <FaLinkedin /> <p>{resumeData.personalDetails.website}</p>
                </div>
              )}
            </div>

           
            {resumeData.skills.length > 0 && (
              <div className="resume-section-2">
                <h2>Skills</h2>
                {resumeData.skills.map((skillCat, index) => (
                  <div key={index} className="skill-category-2">
                    <h4 style={{color: accentColor}}>{skillCat.heading}</h4>
                    <p>{skillCat.skills}</p>
                  </div>
                ))}
              </div>
            )}

          
            {resumeData.education.length > 0 && (
              <div className="resume-section-2">
                <h2>Education</h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="edu-item-2">
                    <h4 style={{color: accentColor}}>{edu.degree}</h4>
                    <p>{edu.institution}</p>
                    <p className="job-dates-2">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            )}
            
            
            {resumeData.certifications.length > 0 && (
              <div className="resume-section-2">
                <h2>Certifications</h2>
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="cert-item-2">
                    <h4 style={{color: accentColor}}>{cert.name}</h4>
                    <p>{cert.issuer} ({cert.date})</p>
                  </div>
                ))}
              </div>
            )}

    
            {resumeData.achievements.length > 0 && (
              <div className="resume-section-2">
                <h2>Achievements</h2>
                <ul>
                  {resumeData.achievements.map((ach, index) => ach.trim() && <li key={index} className="achievement-item-2">{ach}</li>)}
                </ul>
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

export default RightPanel2;