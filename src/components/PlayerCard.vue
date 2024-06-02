<template>
  <div class="player-card">
    <img :src="player.avatar" alt="Avatar" class="player-avatar" />
    <div class="player-info">
      <div class="player-username">{{ player.username }}</div>
      <div class="player-details">
        <div>Ranking: {{ player.ranking }}</div>
        <div>Função: {{ player.role }}</div>
      </div>
      <button class="connect-button" @click="connectWithPlayer">Conectar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',
  props: {
    player: Object
  },
  methods: {
    connectWithPlayer() {
      console.log(`Conectando com ${this.player.username}`);
      // Lógica de conexão será implementada por outra pessoa
    }
  }
};
</script>

<style scoped>
.player-card {
  display: flex;
  align-items: center;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  position: relative;
}

.player-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.player-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.player-username {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.player-details {
  font-size: 14px;
}

.connect-button {
  background-color: #f90404;
  border: none;
  padding: 8px 16px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 13px;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.connect-button:hover {
  background-color: #c20303;
}
</style>
