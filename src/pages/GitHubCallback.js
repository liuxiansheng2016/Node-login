import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/appService';
const GitHubCallback = ({ onLogin }) => {
    const navigate = useNavigate();
    useEffect(() => {
      const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        try {
          const response = await apiService.verifyToken(token);
          if (response.success) {
            localStorage.setItem('token', token);
            onLogin();
            navigate('/dashboard');
          } else {
            navigate('/login');
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          navigate('/login');
        }
      };
  
      fetchData();
    }, [navigate, onLogin]);
  
    return <div>Loading...</div>;
  };
  
  export default GitHubCallback;