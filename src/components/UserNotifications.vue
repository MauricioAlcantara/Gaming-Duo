<template>
  <div class="notification-container" @click.stop="toggleDropdown">
    <font-awesome-icon icon="bell" class="notification-icon" />
    <div v-if="dropdownOpen" class="dropdown-content" ref="dropdown">
      <div class="arrow-up"></div>
      <ul>
        <li v-for="(notification, index) in notifications" :key="notification.id">
          <div class="notification-item">
            <span @click.stop="handleNotificationClick(notification, index)">
              {{ notification.sender_nick }} se conectou com você para jogarem juntos!
            </span>
            <button class="close-btn" @click.stop="removeNotification(notification.id, index)">X</button>
          </div>
        </li>
      </ul>
    </div>
    <!-- Modal de Decisão -->
    <div v-if="isDecisionModalOpen" class="modal">
      <div class="modal-content">
        <p class="modal-title">Você deseja se conectar com este jogador?</p>
        <button class="accept-btn" @click="acceptConnection()">Aceitar</button>
        <button class="reject-btn" @click="rejectConnection()">Recusar</button>
      </div>
    </div>

    <!-- Modal de Conexão -->
    <ModalComponent
        v-if="isConnectionModalOpen"
        @close="closeConnectionModal"
        :notification="selectedNotification"
        :connectedPlayerNick="connectedPlayerNick"
    />
  </div>
</template>

<script>
import { getNotifications, deleteNotification } from '../api'; // Importa os métodos da API
import ModalComponent from './ConnectionModal.vue'; // Importa o modal

export default {
  components: {
    ModalComponent,
  },
  data() {
    return {
      dropdownOpen: false,
      isDecisionModalOpen: false,
      isConnectionModalOpen: false,
      decisionNotification: null,
      decisionIndex: null,
      selectedNotification: null,
      connectedPlayerNick: '', // Guarda o nick do jogador conectado
      notifications: [],
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
    handleNotificationClick(notification, index) {
      if (notification.isAccepted) {
        // Já aceito, vai diretamente para o modal de conexão
        this.openConnectionModal(notification);
      } else {
        // Exibe o modal de decisão
        this.connectedPlayerNick = notification.sender_nick; // Salva o nick do jogador conectado
        this.showDecisionModal(notification, index);
      }
    },
    showDecisionModal(notification, index) {
      this.closeDropdown();
      this.decisionNotification = notification;
      this.decisionIndex = index;
      this.isDecisionModalOpen = true;
    },
    acceptConnection() {
      this.decisionNotification.isAccepted = true;
      this.isDecisionModalOpen = false;
      this.openConnectionModal(this.decisionNotification);
    },
    async rejectConnection() {
      try {
        await this.removeNotification(this.decisionNotification.id, this.decisionIndex);
        this.isDecisionModalOpen = false;
      } catch (error) {
        console.error('Erro ao rejeitar notificação:', error);
      }
    },
    openConnectionModal(notification) {
      this.closeDropdown();
      this.connectedPlayerNick = notification.sender_nick; // Garante que o nick do jogador conectado seja carregado
      this.selectedNotification = notification;
      this.isConnectionModalOpen = true;
    },
    closeConnectionModal() {
      this.isConnectionModalOpen = false;
      this.closeDropdown();
    },
    async fetchNotifications() {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      try {
        const response = await getNotifications(token);

        // Adiciona a propriedade `isAccepted` às notificações
        this.notifications = response.data.notifications.map((notification) => ({
          ...notification,
          isAccepted: false,
        }));

        console.log('Notificações carregadas:', this.notifications);
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
      }
    },
    async removeNotification(notificationId, index) {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token não encontrado');
          return;
        }

        const response = await deleteNotification(notificationId, token);
        if (response.status === 200) {
          console.log(response.data.message);
          this.notifications.splice(index, 1); // Remove a notificação localmente
        }
      } catch (error) {
        console.error('Erro ao deletar notificação:', error.response ? error.response.data : error);
      }
    },
  },
  watch: {
    'EventBus.newNotification': {
      handler(newNotification) {
        if (newNotification) {
          this.notifications.push(newNotification);
          console.log('Notificação adicionada:', newNotification);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    this.fetchNotifications();
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>



<style scoped>
/* Seu CSS permanece o mesmo */
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

.notification-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  background: #333;
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 5px;
  text-align: left;
  width: calc(100% - 30px);
}

.notification-item span {
  flex-grow: 1;
  color: #fff;
  padding-right: 15px;
}

.close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  background: transparent;
  border: none;
  color: #c20303;
  font-size: 14px;
  cursor: pointer;
}

.close-btn:hover {
  color: #f00;
}

li:hover .notification-item {
  background-color: #444;
}

/* Estilos para o modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.modal-content {
  background: #171717;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-title {
  color: #fff;
  font-size: 18px;
  margin-bottom: 20px;
}

.modal-content button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.accept-btn {
  background-color: #28a745;
  color: #fff;
}

.reject-btn {
  background-color: #dc3545;
  color: #fff;
}
</style>
