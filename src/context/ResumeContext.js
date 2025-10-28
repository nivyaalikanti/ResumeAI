import React, { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      summary: ''
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    template: 'modern'
  });

  const updateResumeData = (newData) => {
    setResumeData(prev => ({ ...prev, ...newData }));
  };

  const getCurrentResumeData = () => {
    return resumeData;
  };

  const value = {
    resumeData,
    updateResumeData,
    getCurrentResumeData
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};