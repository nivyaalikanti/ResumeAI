// components/ATSScoreChecker.jsx
import React, { useState, useRef } from 'react';
import '../styles/ATSScoreChecker.css';

const ATSScoreChecker = () => {
  const [resumeText, setResumeText] = useState("");
  const [score, setScore] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Common ATS keywords for different categories
  const atsKeywords = {
    technical: ['javascript', 'react', 'node.js', 'python', 'java', 'sql', 'mongodb', 'aws', 'docker', 'git'],
    softSkills: ['leadership', 'communication', 'teamwork', 'problem solving', 'adaptability', 'time management'],
    actionVerbs: ['developed', 'managed', 'implemented', 'created', 'improved', 'optimized', 'led', 'analyzed'],
    education: ['bachelor', 'master', 'phd', 'degree', 'certification', 'university', 'college'],
    contact: ['email', 'phone', 'linkedin', 'github', 'portfolio']
  };

  const calculateATSScore = (text) => {
    const lowerText = text.toLowerCase();
    let totalScore = 0;
    let feedback = [];

    // Check for keywords presence (40 points)
    let keywordScore = 0;
    Object.values(atsKeywords).forEach(category => {
      const foundKeywords = category.filter(keyword => 
        lowerText.includes(keyword.toLowerCase())
      );
      if (foundKeywords.length > 0) {
        keywordScore += (foundKeywords.length / category.length) * 10;
      }
    });
    totalScore += Math.min(keywordScore, 40);

    if (keywordScore < 20) {
      feedback.push("Add more relevant keywords from your industry");
    }

    // Check length (15 points)
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount >= 400 && wordCount <= 800) {
      totalScore += 15;
    } else if (wordCount >= 300 && wordCount < 400) {
      totalScore += 10;
      feedback.push("Consider adding more details to reach 400-800 words");
    } else {
      feedback.push("Resume should be between 400-800 words for optimal length");
    }

    // Check sections (20 points)
    const sections = ['experience', 'education', 'skills', 'projects'];
    const foundSections = sections.filter(section => 
      lowerText.includes(section)
    );
    totalScore += (foundSections.length / sections.length) * 20;

    if (foundSections.length < sections.length) {
      feedback.push(`Add missing sections: ${sections.filter(s => !foundSections.includes(s)).join(', ')}`);
    }

    // Check contact info (10 points)
    const hasEmail = /\S+@\S+\.\S+/.test(text);
    const hasPhone = /(\+\d{1,3}[-.]?)?\(?(\d{3})\)?[-.]?(\d{3})[-.]?(\d{4})/.test(text);
    if (hasEmail && hasPhone) {
      totalScore += 10;
    } else {
      feedback.push("Make sure to include both email and phone number");
    }

    // Check formatting (15 points)
    const hasBulletPoints = text.includes('•') || text.includes('-') || text.includes('*');
    const hasDates = /\d{4}/.test(text);
    if (hasBulletPoints && hasDates) {
      totalScore += 15;
    } else {
      feedback.push("Use bullet points and include dates for better readability");
    }

    return {
      score: Math.round(totalScore),
      feedback,
      wordCount,
      sectionsFound: foundSections.length,
      totalSections: sections.length
    };
  };

  const handleTextAnalyze = () => {
    if (!resumeText.trim()) {
      alert('Please paste your resume text');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = calculateATSScore(resumeText);
      setScore(result.score);
      setAnalysis(result);
      setIsLoading(false);
    }, 1000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
      alert('Please upload a .txt file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setResumeText(e.target.result);
    };
    reader.readAsText(file);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent! Your resume is ATS-friendly';
    if (score >= 60) return 'Good, but there is room for improvement';
    return 'Needs significant improvements for ATS systems';
  };

  return (
    <div className="ats-container">
      <div className="ats-header">
        <h1>ATS Resume Score Checker</h1>
        <p>Analyze how well your resume performs with Applicant Tracking Systems</p>
      </div>

      <div className="ats-content">
        <div className="input-section">
          <div className="upload-options">
            <button 
              type="button"
              className="upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload .txt File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt"
              style={{ display: 'none' }}
            />
            <span className="or-text">OR</span>
          </div>

          <div className="text-input-section">
            <label htmlFor="resume-text">Paste your resume text:</label>
            <textarea
              id="resume-text"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here... (Recommended: 400-800 words)"
              rows={15}
            />
          </div>

          <button 
            onClick={handleTextAnalyze}
            disabled={isLoading || !resumeText.trim()}
            className="analyze-btn"
          >
            {isLoading ? 'Analyzing...' : 'Check ATS Score'}
          </button>
        </div>

        {score !== null && analysis && (
          <div className="results-section">
            <div className="score-card">
              <div className="score-circle" style={{ borderColor: getScoreColor(score) }}>
                <span className="score-number" style={{ color: getScoreColor(score) }}>
                  {score}
                </span>
                <span className="score-label">ATS Score</span>
              </div>
              <div className="score-message">
                <h3 style={{ color: getScoreColor(score) }}>
                  {getScoreMessage(score)}
                </h3>
                <p>Out of 100 points</p>
              </div>
            </div>

            <div className="analysis-details">
              <h4>Detailed Analysis</h4>
              
              <div className="metrics-grid">
                <div className="metric">
                  <span className="metric-value">{analysis.wordCount}</span>
                  <span className="metric-label">Words</span>
                </div>
                <div className="metric">
                  <span className="metric-value">{analysis.sectionsFound}/{analysis.totalSections}</span>
                  <span className="metric-label">Key Sections</span>
                </div>
                <div className="metric">
                  <span className="metric-value">
                    {analysis.score >= 60 ? 'Good' : analysis.score >= 40 ? 'Fair' : 'Poor'}
                  </span>
                  <span className="metric-label">Overall</span>
                </div>
              </div>

              {analysis.feedback.length > 0 && (
                <div className="feedback-section">
                  <h5>Improvement Suggestions:</h5>
                  <ul>
                    {analysis.feedback.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="tips-section">
                <h5>Tips to Improve ATS Score:</h5>
                <ul>
                  <li>Use standard section headings (Experience, Education, Skills)</li>
                  <li>Include relevant keywords from the job description</li>
                  <li>Use bullet points for readability</li>
                  <li>Keep resume length between 1-2 pages</li>
                  <li>Avoid images, tables, and complex formatting</li>
                  <li>Include quantifiable achievements</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSScoreChecker;