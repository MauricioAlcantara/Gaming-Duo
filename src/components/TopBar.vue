<template>
  <div class="top-bar">
    <img src="/images/logo.png" alt="Logo" class="logo" @click="goToHome">
    <span class="site-name" @click="goToHome">Gaming Duo</span>
    <nav v-if="!['dashboard', 'login', 'cadastro', 'Profile'].includes(this.$route.name)">
      <button @click="scrollToSection('quem-somos-section')">Sobre Nós</button>
      <button @click="$emit('toggle-chat')">Ajuda</button>
      <button class="button-login" @click="goToRoute('login')">Entrar</button>
      <button class="button-register" @click="goToRoute('cadastro')">Cadastrar-se</button>
    </nav>
    <nav v-else-if="['dashboard', 'Profile'].includes(this.$route.name)">
      <button @click="$emit('toggle-chat')">Ajuda</button>
      <button class="button-profile" @click="goToProfile">Perfil</button>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    showNavigationButtons() {
      return !['login', 'cadastro', 'Profile'].includes(this.$route.name);
    }
  },
  methods: {
    goToHome() {
      if (this.$route.name === 'Profile') {
        this.$router.push({ name: 'dashboard' });
      } else if (this.$route.name === 'home') {
        window.scrollTo(0, 0);
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
      this.$router.push({ name: 'Profile' });
    }
  }
}
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
</style>
