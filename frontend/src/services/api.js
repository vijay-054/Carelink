import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem('user');

        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                const token = parsedUser.token;

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Invalid user data in localStorage');
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;