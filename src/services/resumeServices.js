import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const resumeService = {
  saveResume: async (resumeData, token) => {
    try {
      const response = await axios.post(`${API_URL}/resumes/save`, resumeData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error saving resume:', error);
      throw error;
    }
  },

  getUserResumes: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/resumes/user-resumes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching resumes:', error);
      throw error;
    }
  }
};

export default resumeService;