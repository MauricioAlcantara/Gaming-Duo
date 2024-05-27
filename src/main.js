import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Adiciona os ícones à biblioteca
library.add(faEdit, faUser);

const app = createApp(App);

// Registra o componente FontAwesomeIcon globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

// Usa o router
app.use(router);

// Monta o aplicativo
app.mount('#app');
