import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import UserLogin from "@/components/Login.vue";
import Cadastro from "@/components/Cadastro.vue";

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
            name: 'cadastro',
            component: Cadastro
        },
    ]
});

export default router;
