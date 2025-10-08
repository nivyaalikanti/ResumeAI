import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About ResumeBuilder</h1>
      <p className="about-description">
        ResumeBuilder is a user-friendly web application designed to help you create professional resumes effortlessly.
        Whether you’re a student, job seeker, or career professional, our tool provides easy-to-use templates, customization options,
        and expert tips to build your perfect resume in minutes.
      </p>
      <p className="about-description">
        Our mission is to empower everyone to present their skills and experiences in the best light, making the job application
        process smoother and more effective.
      </p>
      <p className="about-description">
        Built with React and a modern design approach, ResumeBuilder focuses on simplicity, usability, and performance.
      </p>
    </div>
  );
};

export default About;
