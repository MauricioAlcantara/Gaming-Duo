<template>
  <div class="card">
    <img :src="player.avatar ? `http://localhost:8000/avatars/${player.avatar}` : '/path/to/default/avatar.jpg'" alt="Avatar" class="avatar" />
    <div class="card-info">
      <p><strong>{{ player.username }}</strong></p>
      <p><strong>Ranking:</strong> {{ player.rank }}</p>
      <p><strong>Função:</strong> {{ player.preferred_function }}</p>
    </div>
    <button @click="connectPlayer(player.id)" class="connect-btn">Conectar</button>
  </div>
</template>

<script>
import { sendNotification } from '../api'; // Função para enviar a notificação

export default {
  name: 'PlayerCard',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  methods: {
    async connectPlayer(playerId) {
      console.log(`Conectando com o jogador ${playerId}`);

      // Enviar a notificação via API
      try {
        const response = await sendNotification({ sender: this.$store.state.username, receiver: playerId });
        console.log(response.data.message);
      } catch (error) {
        console.error('Erro ao conectar:', error);
      }
    }
  }
}
</script>

<style scoped>
.card {
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
}

.card-info {
  flex: 1;
}

.card-info p {
  margin: 5px 0;
}

.connect-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.connect-btn:hover {
  background-color: #c0392b;
}
</style>
