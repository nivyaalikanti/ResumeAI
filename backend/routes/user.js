const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// Get complete user profile (UPDATED)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId) // Changed from req.user.id
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Transform the data to match frontend structure
    const profileData = {
      personalInfo: {
        fullName: user.personalInfo?.fullName || '',
        phone: user.personalInfo?.phone || '',
        address: user.personalInfo?.address || '',
        email: user.email || user.personalInfo?.email || '',
        linkedin: user.personalInfo?.linkedin || '',
        github: user.personalInfo?.github || '',
        portfolio: user.personalInfo?.portfolio || '',
        leetcode: user.personalInfo?.leetcode || '',
        hackerrank: user.personalInfo?.hackerrank || ''
      },
      summary: user.summary || '',
      experience: user.experience || [],
      education: user.education || [],
      skills: user.skills || { technical: [], soft: [], languages: [] },
      projects: user.projects || [],
      certifications: user.certifications || [],
      achievements: user.achievements || ['']
    };

    res.json(profileData);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

// Complete Profile Update Route (UPDATED)
router.put('/complete-profile', auth, async (req, res) => {
  try {
    const {
      personalInfo,
      summary,
      education,
      experience,
      skills,
      projects,
      certifications,
      achievements
    } = req.body;

    console.log('Received profile update data:', req.body);

    // Find user and update all fields
    const updatedUser = await User.findByIdAndUpdate(
      req.userId, // Changed from req.user.id
      {
        $set: {
          personalInfo,
          summary,
          skills,
          achievements,
          education: education || [],
          experience: experience || [],
          projects: projects || [],
          certifications: certifications || []
        }
      },
      { 
        new: true, 
        runValidators: true 
      }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove these duplicate routes since we're using complete-profile now:
// - /personal-info (PUT)
// - /education (POST) 
// - /experience (POST)
// - /skills (PUT)
// - /projects (POST)

// Keep only these for now:
module.exports = router;