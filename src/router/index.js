import { createRouter, createWebHistory } from 'vue-router';
import UserDashboard from "@/components/Dashboard.vue";
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
        {
            path: '/dashboard',
            name: 'dashboard',
            component: UserDashboard
        },
    ]
});

export default router;
