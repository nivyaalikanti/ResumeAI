// Update your App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import Header from "./components/Navbar";
import Hero from "./components/Hero";
import About from './components/About';
import Features from "./components/Features";
import Templates from "./components/Templates";
import Footer from "./components/Footer";
import ATSScoreChecker from './components/ATSScoreChecker';
import ResumeBuilder from "./components/ResumeBuilder/HorizontalResume/ResumeBuilder";
// import VerticalResumeBuilder from "./components/ResumeBuilder/VeticalResumeBuilder/VerticalResumeBuilder";
import ModernResumeBuilder from "./components/ResumeBuilder/ModernResume/ModernResumeBuilder";
import Signup from "./components/Signup"; // NEW
import Login from "./components/Login";   // NEW
import VerticalResumeBuilder from "./components/ResumeBuilder/VerticalResumeBuilder/VeticalResumeBuilder";
import PricingPage from "./components/PricingPage";
import VerticalResumeBuilder2 from "./components/ResumeBuilder/VerticalResumeBuilder2/VerticalResumeBuilder2";
import ResumeBuilder2 from './components/ResumeBuilder/HorizontalResume2/ResumeBuilder2';
import VerticalResumeBuilder3 from "./components/ResumeBuilder/VerticalResumeBuilder3/VerticalResumeBuilder3";

const LandingPage = ({ onTemplateSelect }) => (
  <>
    <Hero />
    <Features />
    <Templates onTemplateSelect={onTemplateSelect} />
    <Footer />
  </>
);

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateSelect = (templateName) => {
    setSelectedTemplate(templateName);
  };

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage onTemplateSelect={handleTemplateSelect} />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/ats-score" element={<ATSScoreChecker />} />
            <Route path="/about" element={<About />} />
            <Route path="/simple-professional" element={<ResumeBuilder selectedTemplate={selectedTemplate} />} />
            <Route path="/vertical-resume" element={<VerticalResumeBuilder selectedTemplate={selectedTemplate} />} />
            <Route path="/modern-resume" element={<ModernResumeBuilder selectedTemplate={selectedTemplate} />} />
            <Route path="/vertical2-resume" element={<VerticalResumeBuilder2 selectedTemplate={selectedTemplate} />} />
            <Route path="/academic-scholar" element={<VerticalResumeBuilder3 />} />
            <Route path="/detailed-pro" element={<ResumeBuilder2 />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;