import { createRouter, createWebHistory } from 'vue-router';
import UserDashboard from "@/components/Dashboard.vue";
import LandingPage from '../components/LandingPage.vue';
import UserLogin from "@/components/UserLogin.vue";
import CadastroForm from "@/components/Cadastro.vue";
import UserProfile from '@/components/UserProfile.vue';
import PasswordReset from "@/components/PasswordReset.vue";
import UserProfileView from '@/components/UserProfileView.vue';
import MatchesHistory from '@/components/MatchesHistory.vue';

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
        {
            path: '/:username',
            name: 'userProfileView',
            component: UserProfileView,
            props: true,
          },

          {
            path: '/:username', // Define o parâmetro username na URL
            name: 'UserProfileView',
            component: () => import('@/components/UserProfileView.vue')
          },
        
          {
            path: '/matches',
            name: 'MatchesHistory',
            component: MatchesHistory
        },
    ]
});

export default router;
