import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import store from './store'; // Importa a store do Vuex

// Adiciona os ícones à biblioteca
library.add(faEdit, faUser);

const app = createApp(App);

// Registra o componente FontAwesomeIcon globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

// Usa o router
app.use(router);

// Usa o Vuex store
app.use(store); // Adiciona o Vuex store à aplicação

// Monta o aplicativo
app.mount('#app');
