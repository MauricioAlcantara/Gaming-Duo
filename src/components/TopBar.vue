<template>
  <div class="top-bar">
    <img src="/images/logo.png" alt="Logo" class="logo" @click="goToHome">
    <span class="site-name" @click="goToHome">Gaming Duo</span>
    <nav v-if="!['dashboard', 'login', 'cadastro', 'UserProfile'].includes(this.$route.name)">
      <button @click="scrollToSection('quem-somos-section')">Sobre Nós</button>
      <button @click="$emit('toggle-chat')">Ajuda</button>
      <button class="button-login" @click="goToRoute('login')">Entrar</button>
      <button class="button-register" @click="goToRoute('cadastro')">Cadastrar-se</button>
    </nav>
    <nav v-else-if="['dashboard', 'UserProfile'].includes(this.$route.name)">
      <UserNotifications />
      <button @click="$emit('toggle-chat')">Ajuda</button>
      <div class="dropdown">
        <button class="button-profile" @click="toggleDropdown">
          <font-awesome-icon icon="user" class="profile-icon" />
          {{ user.username }}
        </button>
        <div class="dropdown-content" v-if="dropdownOpen">
          <button @click="goToProfile">Perfil</button>
          <button @click="logout">Sair</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { getUser } from '@/api';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import UserNotifications from './UserNotifications.vue';

library.add(faBell, faUser);

export default {
  components: {
    FontAwesomeIcon,
    UserNotifications
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        avatar: '/path/to/default/avatar.jpg'
      },
      dropdownOpen: false,
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getUser(token);
          const userData = response.data.usuario;

          this.user = {
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar ? `http://localhost:8000/avatars/${userData.avatar}` : '/path/to/default/avatar.jpg'
          };
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    },
    goToHome() {
      if (this.$route.name === 'dashboard') {
        window.scrollTo(0, 0);
      } else if (this.$route.name === 'UserProfile') {
        this.$router.push({ name: 'dashboard' });
      } else {
        this.$router.push({ name: 'home' });
      }
    },
    goToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
    openHelpChat() {
      this.$parent.$refs.chatComponent.openChat();
    },
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
    goToProfile() {
      this.$router.push({ name: 'UserProfile' });
      this.dropdownOpen = false;
    },
    logout() {
      localStorage.removeItem('token');
      this.user = { username: '', email: '', avatar: '/path/to/default/avatar.jpg' };
      this.$router.push({ name: 'home' });
      this.dropdownOpen = false;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  }
};
</script>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: rgba(51, 51, 51, 0.95);
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
  color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.logo {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
}

.site-name {
  font-size: 17px;
  font-weight: bold;
  color: #dcdcdc;
  margin-right: auto;
  cursor: pointer;
}

nav {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 30px;
}

nav button {
  background: none;
  border: 2px solid transparent;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
}

.button-login, .button-register, .button-profile {
  font-weight: bold;
}

.button-login {
  background-color: #4CAF50;
  border-color: #4CAF50;
}

.button-register {
  background-color: #f44336;
  border-color: #f44336;
}

.button-profile {
  background-color: #2196F3;
  border-color: #2196F3;
  display: flex;
  align-items: center;
}

.profile-icon {
  margin-right: 8px;
}

.notification-icon {
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;
}

nav button:hover {
  background-color: #555;
  border-color: #555;
}

.button-login:hover {
  background-color: #45a049;
}

.button-register:hover {
  background-color: #d32f2f;
}

.button-profile:hover {
  background-color: #1976D2;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  background-color: #222;
  min-width: 107px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 1;
  overflow: hidden;
}

.dropdown-content button {
  color: white;
  padding: 12px 16px;
  border-radius: 0px;
  margin: 0px;
  text-align: left;
  text-decoration: none;
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
}

.dropdown-content button:hover {
  background-color: #333;
}
</style>
