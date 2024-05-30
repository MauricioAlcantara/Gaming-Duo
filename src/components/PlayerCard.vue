<template>
  <div class="player-card">
    <img :src="player.avatar" alt="Avatar" class="player-avatar" />
    <div class="player-info">
      <h3>{{ player.username }}</h3>
      <p>Ranking: {{ player.ranking }}</p>
      <p>Função: {{ player.role }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerCard',
  props: {
    player: Object
  }
};
</script>

<style scoped>
.player-card {
  background-color: #333;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 20px;
  width: 400px; /* Ajusta a largura do card */
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; /* Espaço entre os cards */
}

.player-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.player-info h3 {
  margin: 10px 0 5px;
  font-size: 18px;
}

.player-info p {
  margin: 5px 0;
  font-size: 14px;
}
</style>
