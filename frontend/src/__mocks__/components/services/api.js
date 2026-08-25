import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for JWT injection
API.interceptors.request.use((config) => {
    const user = localStorage.getItem('user');
    if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser && parsedUser.token) {
            config.headers.Authorization = `Bearer ${parsedUser.token}`;
        }
    }
    return config;
});

// Response interceptor for handling 401 Unauthorized
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default API;