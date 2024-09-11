<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- Nome e imagem do usuário logado -->
      <div class="user-info">
        <img :src="loggedUserImage" alt="Sua Imagem" class="user-image" />
        <p>{{ loggedUserName }}</p>
      </div>

      <!-- Setas de conexão -->
      <div class="connection-arrows">
        <img src="/images/setas.png" alt="Setas" class="arrows-image" />
      </div>

      <!-- Nome e imagem do jogador que enviou a notificação -->
      <div class="user-info">
        <img :src="notification.userImage" alt="Imagem do Jogador" class="user-image" />
        <p>{{ notification.userName }}</p>
      </div>

      <button @click="closeModal">Fechar</button>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/api'; // Supondo que tenha um método para buscar o usuário logado

export default {
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
    };
  },
  methods: {
    async fetchLoggedUser() {
      try {
        const response = await getUser(localStorage.getItem('token')); // Pega o usuário logado pelo token
        this.loggedUserName = response.data.username; // Atualiza o nome
        this.loggedUserImage = response.data.avatar || '/path/to/default-avatar.png'; // Atualiza a imagem
      } catch (error) {
        console.error('Erro ao buscar o usuário logado:', error);
      }
    },
    closeModal() {
      this.$emit('close');
    }
  },
  mounted() {
    this.fetchLoggedUser(); // Busca os dados do usuário logado ao montar o componente
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
  text-align: center;
  width: 90%;
  max-width: 400px;
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
}

.arrows-image {
  width: 60px;
  height: auto;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
