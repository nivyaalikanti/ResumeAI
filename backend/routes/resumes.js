const express = require('express');
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');
const router = express.Router();

// Save resume
router.post('/save', auth, async (req, res) => {
  try {
    const { title, personalInfo, education, experience, skills, projects, template } = req.body;
    
    const resumeData = {
      userId: req.userId,
      title: title || 'My Resume',
      personalInfo,
      education,
      experience,
      skills,
      projects,
      template,
      lastModified: new Date()
    };

    // Check if resume exists, update or create
    let resume = await Resume.findOne({ userId: req.userId, title: resumeData.title });
    
    if (resume) {
      resume = await Resume.findByIdAndUpdate(
        resume._id,
        { $set: resumeData },
        { new: true }
      );
    } else {
      resume = new Resume(resumeData);
      await resume.save();
    }

    res.json({
      success: true,
      message: 'Resume saved successfully',
      resume: resume
    });
  } catch (error) {
    console.error('Save resume error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user's resumes
router.get('/user-resumes', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId }).sort({ lastModified: -1 });
    res.json({ success: true, resumes });
  } catch (error) {
    console.error('Get resumes error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;