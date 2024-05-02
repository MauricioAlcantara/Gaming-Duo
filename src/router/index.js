import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LandingPage
        },
        // Adicione mais rotas conforme necessário
    ]
});

export default router;
