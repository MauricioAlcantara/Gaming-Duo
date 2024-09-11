<template>
  <div class="notification-container" @click.stop="toggleDropdown">
    <font-awesome-icon icon="bell" class="notification-icon" />
    <div v-if="dropdownOpen" class="dropdown-content" ref="dropdown">
      <div class="arrow-up"></div>
      <ul>
        <li v-for="(notification, index) in notifications" :key="index" @click="openModal(notification)">
          {{ notification.message }}
        </li>
      </ul>
    </div>
    <!-- Modal Component -->
    <ModalComponent v-if="isModalOpen" @close="isModalOpen = false" :notification="selectedNotification" />
  </div>
</template>

<script>
// import axios from 'axios'; // Comentando a importação de axios por enquanto
import ModalComponent from './ConnectionModal.vue'; // Importar o modal

export default {
  components: {
    ModalComponent, // Registrar o modal
  },
  data() {
    return {
      dropdownOpen: false,
      isModalOpen: false, // Controle para abrir ou fechar o modal
      selectedNotification: null, // Guarda a notificação clicada
      notifications: [
        { message: 'Mauricio se conectou com você para jogarem juntos!' },
        { message: 'Italo se conectou com você para jogarem juntos!' },
        { message: 'Renan se conectou com você para jogarem juntos!' },
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
    },
    openModal(notification) {
      this.selectedNotification = notification; // Define a notificação selecionada
      this.isModalOpen = true; // Abre o modal
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
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
  cursor: pointer;
}

li:hover {
  background-color: #444;
}
</style>
