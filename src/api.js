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

export async function updateUser(userId, updatedUser, token) {
    return api.put(`/usuario/${userId}`, updatedUser, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const deleteUser = (id, token) => {
    return api.delete(`/usuario/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const updateAvatar = (formData, token) => {
    return api.post('/usuario/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
};

export default api;
