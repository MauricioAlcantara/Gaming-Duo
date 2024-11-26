<template>
  <div class="card">
    <img :src="player.avatar ? `http://4.228.224.56:8000/avatars/${player.avatar}` : '/path/to/default/avatar.jpg'" alt="Avatar" class="avatar" />
    <div class="card-info">
      <p><strong>{{ player.username }}</strong></p>
      <p><strong>Ranking:</strong> {{ player.rank }}</p>
      <p><strong>Função:</strong> {{ player.preferred_function }}</p>
    </div>
    <div class="card-actions">
      <button @click="connectPlayer(player.id)" class="connect-btn">Conectar</button>
    </div>
  </div>
  <div v-if="notification" class="notification success">
    {{ notification }}
  </div>
</template>

<script>
import { sendConnectionRequest } from '../api'; // Função para enviar a solicitação de conexão

export default {
  name: 'PlayerCard',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      notification: ''
    }
  },
  methods: {
    async connectPlayer(playerId) {
      console.log(`Conectando com o jogador ${playerId}`);
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Erro: Token não encontrado');
        return;
      }
      try {
        const response = await sendConnectionRequest(playerId, token);
        console.log('Resposta da API:', response);
        if (response.data && response.data.notification) {
          console.log('Notificação enviada:', response.data.notification);
        } else {
          console.log('Nenhuma notificação encontrada na resposta da API');
        }
        this.notification = 'Foi enviada sua solicitação de conexão';
        setTimeout(() => {
          this.notification = '';
        }, 3000);
      } catch (error) {
        console.error('Erro ao conectar:', error.response ? error.response.data : error);
      }
    },
    goToPlayerProfile(username) {
      this.$router.push({ name: 'UserProfileView', params: { username } });
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

.card-actions {
  display: flex;
  gap: 10px;
}

.connect-btn, .profile-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.connect-btn:hover, .profile-btn:hover {
  background-color: #c0392b;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.notification.success {
  background-color: #28a745;
}
</style>
