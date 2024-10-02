<template>
  <div class="notification-container" @click.stop="toggleDropdown">
    <font-awesome-icon icon="bell" class="notification-icon" />
    <div v-if="dropdownOpen" class="dropdown-content" ref="dropdown">
      <div class="arrow-up"></div>
      <ul>
        <li v-for="(notification, index) in notifications" :key="index" @click="openModal(notification)">
          {{ notification.sender_nick }} se conectou com você para jogarem juntos!
        </li>
      </ul>
    </div>
    <!-- Modal Component -->
    <ModalComponent v-if="isModalOpen" @close="isModalOpen = false" :notification="selectedNotification" />
  </div>
</template>

<script>
import { getNotifications } from '../api'; // Importa a função para buscar as notificações
import ModalComponent from './ConnectionModal.vue'; // Importa o modal

export default {
  components: {
    ModalComponent, // Registrar o modal
  },
  data() {
    return {
      dropdownOpen: false,
      isModalOpen: false, // Controle para abrir ou fechar o modal
      selectedNotification: null, // Guarda a notificação clicada
      notifications: [] // Inicializa como um array vazio
    };
  },
  methods: {
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
    },
    async fetchNotifications() {
      // Obtém o token armazenado
      const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no localStorage

      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      try {
        const response = await getNotifications(token);
        this.notifications = response.data.notifications; // Recebe as notificações pendentes
        console.log('Notificações carregadas:', this.notifications);
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);

    // Carregar notificações quando o componente for montado
    this.fetchNotifications();
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
/* Seu CSS permanece igual */
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
