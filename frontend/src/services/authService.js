import api from './api';

const login = async (loginData) => {
    const response = await api.post('/auth/login', loginData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const register = async (registerData) => {
    const response = await api.post('/auth/register', registerData);
    return response.data;
};

const authService = {
    login,
    register,
};

export default authService;