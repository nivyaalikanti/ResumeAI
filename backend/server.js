const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route without database
app.get('/test', (req, res) => {
  res.json({ message: '✅ Server is working without database!' });
});

// Connect to database first
connectDB();

// Then add your routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Main route
app.get('/', (req, res) => {
  res.json({ message: '🎉 Resume Builder API is running with Database!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});