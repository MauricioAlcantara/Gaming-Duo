// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://4.228.224.56:8000/api',
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

export async function updateValorantStats(gamename, rank, token) {
    return api.put('/valorant', { gamename, rank }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const requestPasswordReset = (email) => {
    return api.post('/password/email', { email });
};

export const resetPassword = (data) => {
    return api.post('/password/reset', data);
};

export const sendConnectionRequest = (receiverId, token) => {
    return api.post('/notifications/send', { receiver_id: receiverId }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getNotifications = (token) => {
    return api.get('/notifications', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const deleteNotification = (notificationId, token) => {
    return api.delete(`/notifications/${notificationId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Adicionando a função acceptNotification
// Atualizando a função acceptNotification para usar PUT
export const acceptNotification = (notificationId, token) => {
    return api.put(`/notifications/${notificationId}/accept`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const sendNotification = (data) => {
    return api.post('/sendNotification', data);
};

export const getMatchesHistory = (token) => {
    return api.get('/matches', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const revokeMatch = (notificationId, token) => {
    return api.put(`/notifications/${notificationId}/revoke`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


export default api;
