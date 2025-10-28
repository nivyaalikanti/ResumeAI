const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  gpa: { type: String },
  description: { type: String }
});

const experienceSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true }, // Changed from position
  company: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  currentlyWorking: { type: Boolean, default: false },
  description: { type: String }
  // Removed technologies from experience as it's not in frontend
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  technologies: [String],
  projectUrl: { type: String },
  githubUrl: { type: String },
  startDate: { type: String },
  endDate: { type: String }
});

const certificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String },
  url: { type: String }
});

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  personalInfo: {
    fullName: { type: String },
    phone: { type: String },
    address: { type: String },
    email: { type: String },
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
    leetcode: { type: String },
    hackerrank: { type: String }
  },
  summary: { type: String }, // Added professional summary
  education: [educationSchema],
  experience: [experienceSchema],
  skills: {
    technical: [String],
    soft: [String],
    languages: [String]
  },
  projects: [projectSchema],
  certifications: [certificationSchema], // Added certifications
  achievements: [String] // Added achievements
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);