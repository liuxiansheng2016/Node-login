// src/apiService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/auth';

const apiService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to login');
    }
  },

  register: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        username,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to login');
    }
  },

  verifyToken: async (token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-token`, {
        token
      }, );
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  },

  fetchData: async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  },
};

export default apiService;