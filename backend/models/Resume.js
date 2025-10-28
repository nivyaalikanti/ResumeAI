

import React from 'react';
import { useResume } from '../context/ResumeContext';

const YourTemplateComponent = () => {
  const { resumeData, updateResumeData } = useResume();

  // Example for handling personal info changes
  const handlePersonalInfoChange = (field, value) => {
    updateResumeData({
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  // Example for adding education
  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      grade: '',
      description: ''
    };
    
    updateResumeData({
      education: [...resumeData.education, newEducation]
    });
  };

  // Add similar functions for experience, skills, etc.

  return (
    <div>
      {/* Your existing template UI */}
      <input 
        type="text" 
        placeholder="Full Name"
        value={resumeData.personalInfo.name}
        onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
      />
      
      <input 
        type="email" 
        placeholder="Email"
        value={resumeData.personalInfo.email}
        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
      />
      
      {/* Add more fields as needed */}
    </div>
  );
};

export default YourTemplateComponent;
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  templateId: { 
    type: String, 
    required: true 
  },
  resumeName: { 
    type: String, 
    required: true 
  },
  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    github: String
  },
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    gpa: String
  }],
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  skills: [String],
  projects: [{
    name: String,
    description: String,
    technologies: [String]
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);