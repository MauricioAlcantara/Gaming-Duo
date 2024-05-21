import axios from 'axios';

// Cria uma instância do axios com a configuração base para o backend
const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Função para registrar um novo usuário
export const register = (userData) => {
    return api.post('/register', userData);
};

// Função para fazer login
export const login = (credentials) => {
    return api.post('/login', credentials);
};

// Função para obter os dados do usuário
export const getUser = (id, token) => {
    return api.get(`/usuario/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Função para atualizar os dados do usuário
export const updateUser = (id, userData, token) => {
    return api.put(`/usuario/${id}`, userData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// Função para deletar um usuário
export const deleteUser = (id, token) => {
    return api.delete(`/usuario/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export default api;
