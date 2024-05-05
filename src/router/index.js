import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import UserLogin from "@/components/Login.vue";
import Cadastro from "@/components/Cadastro.vue";  // Adicione esta linha para importar o componente Cadastro

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LandingPage
        },
        {
            path: '/login',
            name: 'login',
            component: UserLogin
        },
        {
            path: '/cadastro',
            name: 'Cadastro',
            component: Cadastro  // Agora o componente Cadastro está definido corretamente
        },
    ]
});

export default router;
