import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import store from './store'; // Importa a store do Vuex
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

import EventBus from './eventBus';

// Adiciona os ícones à biblioteca
library.add(faEdit, faUser);

// Configura o Laravel Echo
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'local', // Deve ser igual ao configurado no backend
    cluster: 'mt1', // Cluster padrão
    forceTLS: false,
    wsHost: '127.0.0.1', // Host do WebSocket
    wsPort: 8081, // Porta configurada no backend
    wssPort: 8081, // Porta segura para WebSocket (se aplicável)
    disableStats: true,
    encrypted: false,
    enabledTransports: ['ws', 'wss'], // Protocolos habilitados
});

// Obtém o ID do usuário logado do Vuex ou localStorage
const receiverId = store.state.user?.id || localStorage.getItem('userId');

if (receiverId) {
    // Adiciona um listener para verificar se o WebSocket está conectado
    window.Echo.connector.pusher.connection.bind('connected', function() {
        console.log('WebSocket conectado com sucesso!');
    });

    window.Echo.private(`notifications.${receiverId}`)
        .listen('.ConnectionRequestSent', (e) => {
            console.log('Nova solicitação de conexão recebida:', e);

            // Adiciona a notificação ao Event Bus para ser exibida em tempo real
            EventBus.newNotification = {
                sender_nick: e.sender_nick, // Nome do remetente
                id: e.notification_id, // ID da notificação
                isAccepted: false, // Estado inicial de aceitação
            };
        });
} else {
    console.error('ID do usuário não encontrado. Não foi possível escutar o canal de notificações.');
}


const app = createApp(App);

// Registra o componente FontAwesomeIcon globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

// Usa o router
app.use(router);

// Usa o Vuex store
app.use(store); // Adiciona o Vuex store à aplicação

// Monta o aplicativo
app.mount('#app');
