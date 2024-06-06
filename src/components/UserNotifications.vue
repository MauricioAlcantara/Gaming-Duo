<template>
  <div class="notification-container" @click.stop="toggleDropdown">
    <font-awesome-icon icon="bell" class="notification-icon" />
    <div v-if="dropdownOpen" class="dropdown-content" ref="dropdown">
      <div class="arrow-up"></div>
      <ul>
        <li v-for="(notification, index) in notifications" :key="index">{{ notification.message }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'; // Comentando a importação de axios por enquanto

export default {
  data() {
    return {
      dropdownOpen: false,
      notifications: [
        { message: 'Mauricio se conectou com você para jogarem juntos!' }, // qunado estiver conectado restirar isso
        { message: 'Italo se conectou com você para jogarem juntos!' }, // qunado estiver conectado restirar isso
        { message: 'Renan se conectou com você para jogarem juntos!' }, // qunado estiver conectado restirar isso
      ]
    };
  },
  methods: {
    addNotification(username) {
      const message = `${username} se conectou com você para jogarem juntos!`;
      this.notifications.push({ message });
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    handleClickOutside(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.closeDropdown();
      }
    }
    // Método para buscar dados do usuário, deixar comentado até precisar
    /*
    async fetchUsername() {
      try {
        const response = await axios.get('http://localhost:8000/api/user'); // Altere para o endpoint correto da sua API
        const username = response.data.username; // Ajuste conforme a estrutura da resposta da sua API
        this.addNotification(username);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    },
    */
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    // this.fetchUsername(); // Chamada ao método para adicionar notificação com dados do usuário, deixar comentado até precisar
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.notification-container {
  position: relative;
  display: inline-block;
}

.notification-icon {
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  right: 67%;
  top: 160%;
  background-color: #222;
  padding: 12px;
  border: 2px solid #444;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 250px;
  z-index: 1000;
  transform: translateX(50%);
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #444;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

li {
  background: #333;
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 5px;
  text-align: left;
  width: calc(100% - 30px);
}
</style>
