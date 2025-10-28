import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://localhost:5000/api' 
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth APIs
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// User Data APIs
export const getUserProfile = () => API.get('/user/profile');
export const updatePersonalInfo = (data) => API.put('/user/personal-info', data);
export const addEducation = (data) => API.post('/user/education', data);
export const addExperience = (data) => API.post('/user/experience', data);
export const updateSkills = (data) => API.put('/user/skills', data);
export const addProject = (data) => API.post('/user/projects', data);

export default API;