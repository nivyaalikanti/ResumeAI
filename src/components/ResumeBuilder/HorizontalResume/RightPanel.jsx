import React from 'react';
import html2pdf from 'html2pdf.js';
import './ResumeBuilder.css';

function RightPanel({ resumeData, margins, isCompressed, onToggleCompress, accentColor }) {
    const [showRatingModal, setShowRatingModal] = React.useState(false);
const [selectedRating, setSelectedRating] = React.useState(0);
const [hoverRating, setHoverRating] = React.useState(0);
  const handleDownloadPdf = () => {
    const element = document.getElementById('a4-page-container');
    
    // Remove the padding styles for PDF generation to avoid double margins
    const originalStyle = element.style.cssText;
    element.style.padding = '0';
    
    // Convert margin values from cm to millimeters for jsPDF
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
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123 // A4 height in pixels at 96 DPI
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Use the new library to generate the PDF
    html2pdf().set(options).from(element).save().then(() => {
      // Restore original styles after PDF generation
      element.style.cssText = originalStyle;
       setShowRatingModal(true);
    });
  };

  const a4PageStyle = {
    paddingTop: `${margins.top}cm`,
    paddingBottom: `${margins.bottom}cm`,
    paddingLeft: `${margins.left}cm`,
    paddingRight: `${margins.right}cm`,
    width: '21cm',
    minHeight: '29.7cm',
    backgroundColor: 'white',
    margin: '0 auto',
    boxSizing: 'border-box',
    position: 'relative'
  };

  const a4PageClass = `a4-page ${isCompressed ? 'compressed-mode' : ''}`;

  const headerStyle = {
    color: accentColor,
  };

  return (
    <div className="right-panel">
      <div id="a4-page-container" className={a4PageClass} style={a4PageStyle}>
        
        {/* Personal Details */}
        <div className="resume-section header">
          <h1 style={{margin: '0 0 5px 0', fontSize: '24pt'}}>{resumeData.personalDetails.name || 'Your Name'}</h1>
          <div className="contact-info">
            {resumeData.personalDetails.email && <span>{resumeData.personalDetails.email}</span>}
            {resumeData.personalDetails.phone && <span> | {resumeData.personalDetails.phone}</span>}
            {resumeData.personalDetails.address && <span> | {resumeData.personalDetails.address}</span>}
          </div>
        </div>
        
        {/* Professional Summary */}
        {resumeData.summary && (
          <div className="resume-section">
            <h3 style={headerStyle}>Professional Summary</h3>
            <p style={{textAlign: 'justify', lineHeight: '1.4'}}>{resumeData.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.title || exp.company) && (
          <div className="resume-section">
            <h3 style={headerStyle}>Work Experience</h3>
            {resumeData.experience.map((job, index) => (
              (job.title || job.company) && (
                <div key={index} className="experience-item">
                  <div className="section-header-right-aligned">
                    <h4>{job.title} {job.company && `at ${job.company}`}</h4>
                    {(job.startDate || job.endDate) && (
                      <p className="duration">{job.startDate} - {job.endDate}</p>
                    )}
                  </div>
                  {job.responsibilities && (
                    <ul>
                      {job.responsibilities.split('\n').map((responsibility, i) => (
                        responsibility.trim() && <li key={i} style={{lineHeight: '1.3'}}>{responsibility}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education */}
        {resumeData.education.length > 0 && resumeData.education.some(edu => edu.degree || edu.institution) && (
          <div className="resume-section">
            <h3 style={headerStyle}>Education</h3>
            {resumeData.education.map((edu, index) => (
              (edu.degree || edu.institution) && (
                <div key={index} className="education-item">
                  <div className="section-header-right-aligned">
                    <h4>{edu.degree} {edu.institution && `- ${edu.institution}`}</h4>
                    {(edu.startDate || edu.endDate) && (
                      <p className="duration">{edu.startDate} - {edu.endDate}</p>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
        
        {/* Skills */}
        {resumeData.skills.length > 0 && resumeData.skills.some(skill => skill.heading || skill.skills) && (
          <div className="resume-section">
            <h3 style={headerStyle}>Skills</h3>
            {resumeData.skills.map((category, index) => (
              (category.heading || category.skills) && (
                <div key={index} className="skill-category">
                  <p><strong>{category.heading}:</strong> {category.skills}</p>
                </div>
              )
            ))}
          </div>
        )}

        {/* Achievements */}
        {resumeData.achievements.length > 0 && resumeData.achievements.some(ach => ach.trim()) && (
          <div className="resume-section">
            <h3 style={headerStyle}>Achievements</h3>
            <ul>
              {resumeData.achievements.map((achievement, index) => (
                achievement.trim() && <li key={index} style={{lineHeight: '1.3'}}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Certifications */}
        {resumeData.certifications.length > 0 && resumeData.certifications.some(cert => cert.name) && (
          <div className="resume-section">
            <h3 style={headerStyle}>Certifications</h3>
            {resumeData.certifications.map((cert, index) => (
              cert.name && (
                <div key={index} className="certification-item">
                  <p><strong>{cert.name}</strong> {cert.issuer && `- ${cert.issuer}`}{cert.date && `, ${cert.date}`}</p>
                </div>
              )
            ))}
          </div>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && resumeData.projects.some(proj => proj.name) && (
          <div className="resume-section">
            <h3 style={headerStyle}>Projects</h3>
            {resumeData.projects.map((project, index) => (
              project.name && (
                <div key={index} className="project-item">
                  <div className="section-header-right-aligned">
                    <h4>{project.name}</h4>
                    {(project.startDate || project.endDate) && (
                      <p className="duration">{project.startDate} - {project.endDate}</p>
                    )}
                  </div>
                  {project.description && (
                    <ul>
                      {project.description.split('\n').map((desc, i) => (
                        desc.trim() && <li key={i} style={{lineHeight: '1.3'}}>{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            ))}
          </div>
        )}
        {showRatingModal && (
  <div className="rating-modal">
    <div className="rating-content">
      <h3>Rate your experience</h3>
      <div className="stars">
  {[1,2,3,4,5].map((star) => {
    const filled = star <= (hoverRating || selectedRating);
    return (
      <span
        key={star}
        className={filled ? 'filled-star' : 'empty-star'}
        onClick={() => setSelectedRating(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
      >
        ★
      </span>
    );
  })}
</div>

      <button onClick={() => {
        alert(`Thanks for rating us ${selectedRating} star${selectedRating > 1 ? 's' : ''}!`);
        setShowRatingModal(false);
        setSelectedRating(0);
        // optionally send rating to server here
      }}>
        Submit
      </button>
    </div>
  </div>
)}

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

export default RightPanel;