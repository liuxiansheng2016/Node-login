// src/apiService.js

import axiosInstance from './axiosConfig';

const apiService = {
    login: async(username, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                username,
                password,
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || '登录失败');
        }
    },

    register: async(username, password) => {
        try {
            const response = await axiosInstance.post('/auth/register', {
                username,
                password,
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || '注册失败');
        }
    },

    verifyToken: async(token) => {
        try {
            const response = await axiosInstance.post('/auth/verify-token', {
                token
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || '验证失败');
        }
    },

    fetchData: async() => {
        try {
            const response = await axiosInstance.get('/users');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || '获取数据失败');
        }
    },
};

export default apiService;