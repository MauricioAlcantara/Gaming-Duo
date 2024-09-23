<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content" @click.stop>
      <!-- Seção de informações dos jogadores -->
      <div class="player-info">
        <!-- Nome e imagem do usuário logado -->
        <div class="user-info">
          <img :src="loggedUserImage ? loggedUserImage : '/path/to/default/avatar.jpg'" alt="Sua Imagem" class="user-image" />
          <p>{{ loggedUserName }}</p>
        </div>

        <!-- Ícones de setas para conexão -->
        <div class="connection-arrows">
          <font-awesome-icon icon="arrow-up" class="arrow-icon" />
          <font-awesome-icon icon="arrow-down" class="arrow-icon" />
        </div>

        <!-- Nome e imagem do jogador que enviou a notificação -->
        <div class="user-info">
          <img :src="notification.userImage ? notification.userImage : '/path/to/default/avatar.jpg'" alt="Imagem do Jogador" class="user-image" />
          <p>{{ notification.userName }}</p>
        </div>
      </div>

      <!-- Seção do chat -->
      <div class="chat-section">
        <div class="chat-messages">
          <p v-for="(message, index) in chatMessages" :key="index" class="chat-message">{{ message }}</p>
        </div>
        <div class="chat-input">
          <input type="text" v-model="newMessage" placeholder="Digite sua mensagem..." @keyup.enter="sendMessage" />
          <button @click="sendMessage">Enviar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Importa FontAwesomeIcon
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'; // Importa ícones de setas
import { library } from '@fortawesome/fontawesome-svg-core'; // Biblioteca do FontAwesome
import { getUser } from '@/api'; // Certifique-se de que getUser está importado corretamente

// Adiciona os ícones à biblioteca
library.add(faArrowUp, faArrowDown);

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loggedUserName: '',
      loggedUserImage: '',
      chatMessages: [], // Armazena as mensagens trocadas
      newMessage: '', // Armazena a nova mensagem que está sendo digitada
    };
  },
  methods: {
    async fetchLoggedUser() {
      try {
        const response = await getUser(localStorage.getItem('token')); // Pega o usuário logado pelo token
        const userData = response.data.usuario;
        this.loggedUserName = userData.username; // Atualiza o nome
        this.loggedUserImage = userData.avatar ? `http://localhost:8000/avatars/${userData.avatar}` : '/path/to/default/avatar.jpg'; // Atualiza a imagem
      } catch (error) {
        console.error('Erro ao buscar o usuário logado:', error);
      }
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        this.chatMessages.push(`${this.loggedUserName}: ${this.newMessage}`); // Adiciona a nova mensagem à lista de mensagens
        this.newMessage = ''; // Limpa o campo de entrada
      }
    },
    closeModal() {
      this.$emit('close');
    }
  },
  mounted() {
    this.fetchLoggedUser();
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #171717;
  padding: 20px;
  border-radius: 10px;
  color: white;
  display: flex; /* Alinhamento horizontal dos itens */
  width: 64%;
  max-width: 622px; /* Aumenta a largura do modal */
}

.player-info {
  width: 60%; /* Área de informações dos jogadores ocupa 60% do modal */
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.user-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.connection-arrows {
  margin: 20px 0;
  text-align: center;
}

.arrow-icon {
  font-size: 24px;
  color: white;
  margin: 5px;
}

.chat-section {
  background: #1e1e1e;
  border-radius: 10px;
  padding: 15px;
  width: 40%; /* Chat ocupa 40% do modal */
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  height: 235px;
  overflow-y: scroll;
  margin-bottom: 15px;
  border: 1px solid #333;
  padding: 10px;
  border-radius: 5px;
  font-size: 15px;
}

.chat-message {
  padding: 5px 0;
}

.chat-input {
  display: flex;
  padding-top: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  margin-right: 10px;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #4caf50;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #45a049;
}
</style>
