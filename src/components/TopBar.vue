<template>
  <div class="top-bar">
    <img src="/images/logo.png" alt="Logo" class="logo">
    <span class="site-name">Gaming Duo</span>
    <nav>
      <button @click="scrollToSection('quem-somos-section')">Sobre Nós</button>
      <button @click="goToRoute('help')">Ajuda</button>
      <button class="button-login" @click="goToRoute('login')">Entrar</button>
      <button class="button-register" @click="goToRoute('register')">Cadastrar-se</button>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    goToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
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

.button-login, .button-register {
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
</style>
