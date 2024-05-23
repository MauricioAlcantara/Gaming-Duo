import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const register = (userData) => {
    return api.post('/register', userData);
};

export const login = (credentials) => {
    return api.post('/login', credentials);
};

export const getUser = (token) => {
    return api.get('/usuario', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const updateUser = (id, userData, token) => {
    return api.put(`/usuario/${id}`, userData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};


export const deleteUser = (id, token) => {
    return api.delete(`/usuario/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export default api;
