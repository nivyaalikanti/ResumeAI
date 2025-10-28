import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompleteProfile.css';

function CompleteProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    // Personal Details
    personalInfo: {
      fullName: '',
      phone: '',
      address: '',
      email: '',
      linkedin: '',
      github: '',
      portfolio: '',
      leetcode: '',
      hackerrank: ''
    },
    // Professional Summary
    summary: '',
    // Work Experience
    experience: [{
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      currentlyWorking: false
    }],
    // Education
    education: [{
      degree: '',
      field: '',
      institution: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }],
    // Skills
    skills: {
      technical: [],
      soft: [],
      languages: []
    },
    // Projects
    projects: [{
      name: '',
      description: '',
      technologies: [],
      projectUrl: '',
      githubUrl: '',
      startDate: '',
      endDate: ''
    }],
    // Certifications
    certifications: [{
      name: '',
      issuer: '',
      date: '',
      url: ''
    }],
    // Achievements
    achievements: ['']
  });

  const navigate = useNavigate();

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Fetched user data:', userData);
        
        // Transform the backend data to match our form structure
        const transformedData = transformBackendData(userData);
        setFormData(transformedData);
      } else {
        console.log('No existing profile data found, starting with empty form');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Transform backend data to match form structure
  // Transform backend data to match form structure - UPDATED
const transformBackendData = (backendData) => {
  console.log('Transforming backend data:', backendData);
  
  const transformed = {
    personalInfo: {
      fullName: backendData.personalInfo?.fullName || '',
      phone: backendData.personalInfo?.phone || '',
      address: backendData.personalInfo?.address || '',
      email: backendData.email || backendData.personalInfo?.email || '',
      linkedin: backendData.personalInfo?.linkedin || '',
      github: backendData.personalInfo?.github || '',
      portfolio: backendData.personalInfo?.portfolio || '',
      leetcode: backendData.personalInfo?.leetcode || '',
      hackerrank: backendData.personalInfo?.hackerrank || ''
    },
    summary: backendData.summary || '',
    experience: backendData.experience && backendData.experience.length > 0 
      ? backendData.experience
      : [{
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          description: '',
          currentlyWorking: false
        }],
    education: backendData.education && backendData.education.length > 0
      ? backendData.education
      : [{
          degree: '',
          field: '',
          institution: '',
          startDate: '',
          endDate: '',
          gpa: ''
        }],
    skills: {
      technical: backendData.skills?.technical || [],
      soft: backendData.skills?.soft || [],
      languages: backendData.skills?.languages || []
    },
    projects: backendData.projects && backendData.projects.length > 0
      ? backendData.projects
      : [{
          name: '',
          description: '',
          technologies: [],
          projectUrl: '',
          githubUrl: '',
          startDate: '',
          endDate: ''
        }],
    certifications: backendData.certifications && backendData.certifications.length > 0
      ? backendData.certifications
      : [{
          name: '',
          issuer: '',
          date: '',
          url: ''
        }],
    achievements: backendData.achievements && backendData.achievements.length > 0
      ? backendData.achievements
      : ['']
  };

  console.log('Transformed data:', transformed);
  return transformed;
};

  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e, section, index = null) => {
    if (index !== null) {
      // For arrays (experience, education, etc.)
      const updatedArray = [...formData[section]];
      updatedArray[index] = {
        ...updatedArray[index],
        [e.target.name]: e.target.value
      };
      setFormData({
        ...formData,
        [section]: updatedArray
      });
    } else if (section === 'personalInfo') {
      // For personal info
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          [e.target.name]: e.target.value
        }
      });
    } else {
      // For simple fields (summary, etc.)
      setFormData({
        ...formData,
        [section]: e.target.value
      });
    }
  };

  // Add new item to arrays
  const addItem = (section) => {
    const newItem = section === 'experience' ? {
      jobTitle: '', company: '', startDate: '', endDate: '', description: '', currentlyWorking: false
    } : section === 'education' ? {
      degree: '', field: '', institution: '', startDate: '', endDate: '', gpa: ''
    } : section === 'projects' ? {
      name: '', description: '', technologies: [], projectUrl: '', githubUrl: '', startDate: '', endDate: ''
    } : section === 'certifications' ? {
      name: '', issuer: '', date: '', url: ''
    } : section === 'achievements' ? '' : '';

    setFormData({
      ...formData,
      [section]: [...formData[section], newItem]
    });
  };

  // Remove item from arrays
  const removeItem = (section, index) => {
    const updatedArray = formData[section].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [section]: updatedArray
    });
  };

  // Handle skills input
  const handleSkillAdd = (skillType, e) => {
    if (e.key === 'Enter') {
      const skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
      setFormData({
        ...formData,
        skills: {
          ...formData.skills,
          [skillType]: [...formData.skills[skillType], ...skills]
        }
      });
      e.target.value = '';
    }
  };

  // Remove skill
  const removeSkill = (skillType, index) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [skillType]: formData.skills[skillType].filter((_, i) => i !== index)
      }
    });
  };

  // Handle technologies for projects
  const handleProjectTechnologies = (index, e) => {
    if (e.key === 'Enter') {
      const technologies = e.target.value.split(',').map(t => t.trim()).filter(t => t);
      const updatedProjects = [...formData.projects];
      updatedProjects[index] = {
        ...updatedProjects[index],
        technologies: [...updatedProjects[index].technologies, ...technologies]
      };
      setFormData({
        ...formData,
        projects: updatedProjects
      });
      e.target.value = '';
    }
  };

  // Remove project technology
  const removeProjectTechnology = (projectIndex, techIndex) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      technologies: updatedProjects[projectIndex].technologies.filter((_, i) => i !== techIndex)
    };
    setFormData({
      ...formData,
      projects: updatedProjects
    });
  };

  // Save to backend
  // Save to backend - UPDATED VERSION
// Save to backend - UPDATED VERSION
const saveToBackend = async () => {
  try {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    
    // Prepare complete user data
    const userData = {
      personalInfo: {
        ...formData.personalInfo
      },
      summary: formData.summary,
      education: formData.education.filter(edu => edu.institution && edu.degree),
      experience: formData.experience.filter(exp => exp.company && exp.jobTitle),
      skills: formData.skills,
      projects: formData.projects.filter(proj => proj.name),
      certifications: formData.certifications.filter(cert => cert.name && cert.issuer),
      achievements: formData.achievements.filter(ach => ach.trim() !== '')
    };

    console.log('Sending user data to backend:', userData);

    // Send complete profile data in one request
    const response = await fetch('http://localhost:5000/api/user/complete-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Profile saved successfully:', result);
      alert('✅ Profile saved successfully!');
      navigate('/');
    } else {
      console.error('Save error response:', result);
      throw new Error(result.message || 'Failed to save profile');
    }

  } catch (error) {
    console.error('Save error:', error);
    alert('❌ Error saving profile: ' + error.message);
  } finally {
    setIsLoading(false);
  }
};

  // Loading state
  if (isLoading) {
    return (
      <div className="complete-profile-container">
        <div className="profile-card">
          <div className="loading-spinner">
            <h2>Loading your profile...</h2>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Personal Details & Summary
  const renderStep1 = () => (
    <div className="form-step">
      <h3>📝 Personal Details</h3>
      
      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.personalInfo.fullName}
          onChange={(e) => handleChange(e, 'personalInfo')}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.personalInfo.phone}
          onChange={(e) => handleChange(e, 'personalInfo')}
        />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={formData.personalInfo.email}
          onChange={(e) => handleChange(e, 'personalInfo')}
          required
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.personalInfo.address}
          onChange={(e) => handleChange(e, 'personalInfo')}
        />
      </div>

      <h3>🌐 Coding Profiles</h3>
      <div className="form-group">
        <label>LinkedIn URL</label>
        <input
          type="url"
          name="linkedin"
          value={formData.personalInfo.linkedin}
          onChange={(e) => handleChange(e, 'personalInfo')}
          placeholder="https://linkedin.com/in/yourname"
        />
      </div>

      <div className="form-group">
        <label>GitHub URL</label>
        <input
          type="url"
          name="github"
          value={formData.personalInfo.github}
          onChange={(e) => handleChange(e, 'personalInfo')}
          placeholder="https://github.com/yourusername"
        />
      </div>

      <div className="form-group">
        <label>Portfolio URL</label>
        <input
          type="url"
          name="portfolio"
          value={formData.personalInfo.portfolio}
          onChange={(e) => handleChange(e, 'personalInfo')}
          placeholder="https://yourportfolio.com"
        />
      </div>

      <div className="form-group">
        <label>LeetCode URL</label>
        <input
          type="url"
          name="leetcode"
          value={formData.personalInfo.leetcode}
          onChange={(e) => handleChange(e, 'personalInfo')}
          placeholder="https://leetcode.com/yourusername"
        />
      </div>

      <div className="form-group">
        <label>HackerRank URL</label>
        <input
          type="url"
          name="hackerrank"
          value={formData.personalInfo.hackerrank}
          onChange={(e) => handleChange(e, 'personalInfo')}
          placeholder="https://hackerrank.com/yourusername"
        />
      </div>

      <h3>💼 Professional Summary</h3>
      <div className="form-group">
        <textarea
          name="summary"
          value={formData.summary}
          onChange={(e) => handleChange(e, 'summary')}
          placeholder="Describe your professional background, skills, and career objectives..."
          rows="4"
        />
      </div>
    </div>
  );

  // Step 2: Work Experience
  const renderStep2 = () => (
    <div className="form-step">
      <h3>💼 Work Experience</h3>
      {formData.experience.map((exp, index) => (
        <div key={index} className="experience-item">
          <h4>Job {index + 1}</h4>
          
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="jobTitle"
              value={exp.jobTitle}
              onChange={(e) => handleChange(e, 'experience', index)}
              required
            />
          </div>

          <div className="form-group">
            <label>Company Name *</label>
            <input
              type="text"
              name="company"
              value={exp.company}
              onChange={(e) => handleChange(e, 'experience', index)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleChange(e, 'experience', index)}
                placeholder="MM/YYYY"
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleChange(e, 'experience', index)}
                placeholder="MM/YYYY or Present"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <textarea
              name="description"
              value={exp.description}
              onChange={(e) => handleChange(e, 'experience', index)}
              placeholder="Describe your responsibilities and achievements..."
              rows="3"
            />
          </div>

          {formData.experience.length > 1 && (
            <button 
              type="button" 
              className="remove-btn"
              onClick={() => removeItem('experience', index)}
            >
              ❌ Remove Job
            </button>
          )}
        </div>
      ))}

      <button 
        type="button" 
        className="add-btn"
        onClick={() => addItem('experience')}
      >
        ➕ Add Another Job
      </button>
    </div>
  );

  // Step 3: Education
  const renderStep3 = () => (
    <div className="form-step">
      <h3>🎓 Education</h3>
      {formData.education.map((edu, index) => (
        <div key={index} className="education-item">
          <h4>Education {index + 1}</h4>
          
          <div className="form-group">
            <label>Degree *</label>
            <input
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleChange(e, 'education', index)}
              required
              placeholder="e.g., Bachelor of Technology"
            />
          </div>

          <div className="form-group">
            <label>Field of Study *</label>
            <input
              type="text"
              name="field"
              value={edu.field}
              onChange={(e) => handleChange(e, 'education', index)}
              required
              placeholder="e.g., Computer Science"
            />
          </div>

          <div className="form-group">
            <label>Institution Name *</label>
            <input
              type="text"
              name="institution"
              value={edu.institution}
              onChange={(e) => handleChange(e, 'education', index)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                name="startDate"
                value={edu.startDate}
                onChange={(e) => handleChange(e, 'education', index)}
                placeholder="MM/YYYY"
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                name="endDate"
                value={edu.endDate}
                onChange={(e) => handleChange(e, 'education', index)}
                placeholder="MM/YYYY or Present"
              />
            </div>
          </div>

          <div className="form-group">
            <label>GPA</label>
            <input
              type="text"
              name="gpa"
              value={edu.gpa}
              onChange={(e) => handleChange(e, 'education', index)}
              placeholder="e.g., 3.8/4.0"
            />
          </div>

          {formData.education.length > 1 && (
            <button 
              type="button" 
              className="remove-btn"
              onClick={() => removeItem('education', index)}
            >
              ❌ Remove Education
            </button>
          )}
        </div>
      ))}

      <button 
        type="button" 
        className="add-btn"
        onClick={() => addItem('education')}
      >
        ➕ Add Another Education
      </button>
    </div>
  );

  // Step 4: Skills
  const renderStep4 = () => (
    <div className="form-step">
      <h3>🛠️ Skills</h3>
      
      <div className="form-group">
        <label>Technical Skills</label>
        <input
          type="text"
          placeholder="e.g., JavaScript, React, Node.js (comma separated, press Enter)"
          onKeyPress={(e) => handleSkillAdd('technical', e)}
        />
        <div className="skills-list" style={{color:'black', padding:'10px 3px', fontWeight:'bolder'}}>
          {formData.skills.technical.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
              <button style={{background:'#b9dce3', color:'black', padding:'10px 3px', fontWeight:'bolder'}}onClick={() => removeSkill('technical', index)}>×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Soft Skills</label>
        <input
          type="text"
          placeholder="e.g., Communication, Leadership, Teamwork (comma separated, press Enter)"
          onKeyPress={(e) => handleSkillAdd('soft', e)}
        />
        <div className="skills-list" style={{color:'black', fontWeight:'bolder'}}>
          {formData.skills.soft.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
              <button style={{background:'#b9dce3', color:'black',  fontWeight:'bolder'}}onClick={() => removeSkill('soft', index)}>×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Languages</label>
        <input
          type="text"
          placeholder="e.g., English, Spanish, Hindi (comma separated, press Enter)"
          onKeyPress={(e) => handleSkillAdd('languages', e)}
        />
        <div className="skills-list"style={{color:'black', padding:'10px 3px', fontWeight:'bolder'}} >
          {formData.skills.languages.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
              <button onClick={() => removeSkill('languages', index)} style={{background:'#b9dce3', color:'black', padding:'8px 3px', fontWeight:'bolder'}}>×</button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 5: Projects & Certifications
  const renderStep5 = () => (
    <div className="form-step">
      <h3>🚀 Projects</h3>
      {formData.projects.map((project, index) => (
        <div key={index} className="project-item">
          <h4>Project {index + 1}</h4>
          
          <div className="form-group">
            <label>Project Name *</label>
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={(e) => handleChange(e, 'projects', index)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="text"
                name="startDate"
                value={project.startDate}
                onChange={(e) => handleChange(e, 'projects', index)}
                placeholder="MM/YYYY"
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="text"
                name="endDate"
                value={project.endDate}
                onChange={(e) => handleChange(e, 'projects', index)}
                placeholder="MM/YYYY or Present"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Project Description</label>
            <textarea
              name="description"
              value={project.description}
              onChange={(e) => handleChange(e, 'projects', index)}
              placeholder="Describe the project, your role, technologies used, and outcomes..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Technologies Used</label>
            <input
              type="text"
              placeholder="e.g., React, Node.js, MongoDB (comma separated, press Enter)"
              onKeyPress={(e) => handleProjectTechnologies(index, e)}
            />
            <div className="skills-list">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="skill-tag">
                  {tech}
                  <button onClick={() => removeProjectTechnology(index, techIndex)}  style={{background:'#b9dce3', color:'black',  fontWeight:'bolder'}}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Project URL</label>
            <input
              type="url"
              name="projectUrl"
              value={project.projectUrl}
              onChange={(e) => handleChange(e, 'projects', index)}
              placeholder="https://yourproject.com"
            />
          </div>

          <div className="form-group">
            <label>GitHub Repository</label>
            <input
              type="url"
              name="githubUrl"
              value={project.githubUrl}
              onChange={(e) => handleChange(e, 'projects', index)}
              placeholder="https://github.com/yourusername/project"
            />
          </div>

          {formData.projects.length > 1 && (
            <button 
              type="button" 
              className="remove-btn"
              onClick={() => removeItem('projects', index)}
            >
              ❌ Remove Project
            </button>
          )}
        </div>
      ))}

      <button 
        type="button" 
        className="add-btn"
        onClick={() => addItem('projects')}
      >
        ➕ Add Another Project
      </button>

      <h3>🏆 Certifications</h3>
      {formData.certifications.map((cert, index) => (
        <div key={index} className="certification-item">
          <h4>Certification {index + 1}</h4>
          
          <div className="form-group">
            <label>Certification Name *</label>
            <input
              type="text"
              name="name"
              value={cert.name}
              onChange={(e) => handleChange(e, 'certifications', index)}
              required
            />
          </div>

          <div className="form-group">
            <label>Issuing Organization *</label>
            <input
              type="text"
              name="issuer"
              value={cert.issuer}
              onChange={(e) => handleChange(e, 'certifications', index)}
              required
            />
          </div>

          <div className="form-group">
            <label>Issue Date</label>
            <input
              type="text"
              name="date"
              value={cert.date}
              onChange={(e) => handleChange(e, 'certifications', index)}
              placeholder="MM/YYYY"
            />
          </div>

          <div className="form-group">
            <label>Certificate URL</label>
            <input
              type="url"
              name="url"
              value={cert.url}
              onChange={(e) => handleChange(e, 'certifications', index)}
              placeholder="https://certificate-url.com"
            />
          </div>

          {formData.certifications.length > 1 && (
            <button 
              type="button" 
              className="remove-btn"
              onClick={() => removeItem('certifications', index)}
            >
              ❌ Remove Certification
            </button>
          )}
        </div>
      ))}

      <button 
        type="button" 
        className="add-btn"
        onClick={() => addItem('certifications')}
      >
        ➕ Add Another Certification
      </button>

      <h3>⭐ Achievements</h3>
      {formData.achievements.map((achievement, index) => (
        <div key={index} className="achievement-item">
          <div className="form-group">
            <textarea
              value={achievement}
              onChange={(e) => handleChange(e, 'achievements', index)}
              placeholder="Describe your achievement, awards, or honors..."
              rows="2"
            />
          </div>
          {formData.achievements.length > 1 && (
            <button 
              type="button" 
              className="remove-btn"
              onClick={() => removeItem('achievements', index)}
            >
              ❌ Remove Achievement
            </button>
          )}
        </div>
      ))}

      <button 
        type="button" 
        className="add-btn"
        onClick={() => addItem('achievements')}
      >
        ➕ Add Another Achievement
      </button>
    </div>
  );

  return (
    <div className="complete-profile-container">
      <div className="profile-card">
        <h2>Complete Your Profile</h2>
        
        {/* Progress Steps */}
        <div className="progress-steps">
          {[1, 2, 3, 4, 5].map(step => (
            <div 
              key={step} 
              className={`step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && 'Personal'}
                {step === 2 && 'Experience'}
                {step === 3 && 'Education'}
                {step === 4 && 'Skills'}
                {step === 5 && 'Projects'}
              </div>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="form-content">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button 
              type="button" 
              className="nav-btn prev-btn"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              ← Previous
            </button>
          )}
          
          {currentStep < 5 ? (
            <button 
              type="button" 
              className="nav-btn next-btn"
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next →
            </button>
          ) : (
            <button 
              type="button" 
              className="nav-btn submit-btn"
              onClick={saveToBackend}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : '✅ Save Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;