import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api'
});

// 不需要token的白名单路径
const whiteList = [
    '/auth/login',
    '/auth/register',
    '/auth/verify-token'
];

instance.interceptors.request.use(
    (config) => {
        // 检查请求路径是否在白名单中
        const isWhitelisted = whiteList.some(path => config.url.includes(path));

        // 如果不在白名单中，才添加token
        if (!isWhitelisted) {
            const token = sessionStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // 如果不是白名单路径，且返回401，则跳转到登录页
        const isWhitelisted = whiteList.some(path =>
            error.config.url.includes(path)
        );

        if (!isWhitelisted && error.response?.status === 401) {
            sessionStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;