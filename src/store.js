import { createStore } from 'vuex';

const store = createStore({
    state: {
        token: localStorage.getItem('token') || '', // Obtém o token do localStorage
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token); // Armazena o token no localStorage
        },
        clearToken(state) {
            state.token = '';
            localStorage.removeItem('token'); // Remove o token do localStorage
        }
    },
    actions: {
        login({ commit }, token) {
            commit('setToken', token); // Salva o token ao fazer login
        },
        logout({ commit }) {
            commit('clearToken'); // Limpa o token ao fazer logout
        }
    },
    getters: {
        isAuthenticated: state => !!state.token, // Verifica se o usuário está autenticado
    }
});

export default store;
