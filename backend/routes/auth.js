const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  try {
    console.log('🔍 [DEBUG] === REGISTRATION STARTED ===');
    console.log('🔍 [DEBUG] Request body received:', req.body);
    
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      console.log('❌ [DEBUG] Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log('🔍 [DEBUG] Checking if user exists in database...');
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log('❌ [DEBUG] User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('🔍 [DEBUG] Creating new user object...');
    const user = new User({
      email,
      password
    });

    console.log('🔍 [DEBUG] Saving user to database...');
    await user.save();
    console.log('✅ [DEBUG] User saved successfully! User ID:', user._id);

    console.log('🔍 [DEBUG] Creating JWT token...');
    // Create token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log('✅ [DEBUG] JWT token created successfully');

    console.log('✅ [DEBUG] === REGISTRATION COMPLETED SUCCESSFULLY ===');
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    console.error('❌ [DEBUG] === REGISTRATION ERROR ===');
    console.error('❌ [DEBUG] Error name:', error.name);
    console.error('❌ [DEBUG] Error message:', error.message);
    console.error('❌ [DEBUG] Error stack:', error.stack);
    
    // Specific error handling
    if (error.name === 'ValidationError') {
      console.error('❌ [DEBUG] Mongoose validation error');
      return res.status(400).json({ message: 'Validation error: ' + error.message });
    }
    
    if (error.name === 'MongoServerError') {
      console.error('❌ [DEBUG] MongoDB server error');
      return res.status(400).json({ message: 'Database error' });
    }
    
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// User Login
router.post('/login', async (req, res) => {
  try {
    console.log('🔍 [DEBUG] === LOGIN ATTEMPT ===');
    console.log('🔍 [DEBUG] Request body:', req.body);
    
    const { email, password } = req.body;

    console.log('🔍 [DEBUG] Finding user in database...');
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ [DEBUG] User not found:', email);
      return res.status(400).json({ message: 'User not found' });
    }

    console.log('🔍 [DEBUG] User found, checking password...');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('❌ [DEBUG] Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('🔍 [DEBUG] Creating JWT token...');
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ [DEBUG] === LOGIN SUCCESSFUL ===');
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('❌ [DEBUG] Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Test route to check if auth routes are working
router.get('/test', (req, res) => {
  console.log('🔍 [DEBUG] Auth test route hit');
  res.json({ message: 'Auth routes are working!' });
});

module.exports = router;