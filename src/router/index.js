import { createRouter, createWebHistory } from 'vue-router';
import UserDashboard from "@/components/Dashboard.vue";
import LandingPage from '../components/LandingPage.vue';
import UserLogin from "@/components/UserLogin.vue";
import CadastroForm from "@/components/Cadastro.vue";
import UserProfile from '@/components/UserProfile.vue';
import PasswordReset from "@/components/PasswordReset.vue";

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
            component: CadastroForm
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: UserDashboard
        },
        {
            path: '/profile',
            name: 'UserProfile',
            component: UserProfile
        },
        {
            path: '/password-reset/:token',
            name: 'PasswordReset',
            component: PasswordReset
        },
    ]
});

export default router;
