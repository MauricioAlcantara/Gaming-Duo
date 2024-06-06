<template>
  <div class="player-card">
    <img :src="player.avatar ? `http://localhost:8000/avatars/${player.avatar}` : '/path/to/default/avatar.jpg'" alt="Avatar" class="avatar" />
    <div class="player-info">
      <p class="username">{{ player.username }}</p>
      <p class="ranking"><strong>Ranking:</strong> {{ player.rank }}</p>
      <p class="role"><strong>Função:</strong> {{ player.preferred_function }}</p>
    </div>
    <button @click="connectPlayer(player.id)">Conectar</button>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  methods: {
    connectPlayer(playerId) {
      // Adicione aqui a lógica para conectar com o jogador
      console.log(`Conectando com o jogador ${playerId}`);
    }
  }
}
</script>

<style scoped>
.player-card {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #333;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.player-info {
  flex: 1;
}

.username, .ranking, .role {
  margin: 5px 0;
}

button {
  background-color: #f90404;
  border: none;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #c20303;
}
</style>
