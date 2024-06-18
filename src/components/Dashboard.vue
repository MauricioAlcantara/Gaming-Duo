<template>
  <div class="dashboard-container">
    <div class="filters-container">
      <div class="filter">
        <label for="game">Jogo</label>
        <GameSelect :options="games" v-model="filters.game" />
      </div>
      <div class="filter">
        <label for="ranking">Ranking</label>
        <RankingSelect :options="rankings" v-model="filters.ranking" />
      </div>
      <div class="filter">
        <label for="role">Função</label>
        <FuncaoSelect :options="roles" v-model="filters.role" />
      </div>
      <button @click="searchDuos" class="search-btn">Buscar</button>
    </div>

    <div class="recommended-section">
      <h2 class="recommended-title">Jogadores Recomendados</h2>
      <div class="recommended-players-container">
        <div class="recommended-players">
          <PlayerCard v-for="player in recommendedPlayers" :key="player.id" :player="player" />
        </div>
      </div>
    </div>

    <div class="filtered-section">
      <h2 class="filtered-title">Jogadores Filtrados</h2>
      <div class="filtered-players-container">
        <div class="filtered-players">
          <PlayerCard v-for="player in filteredPlayers" :key="player.id" :player="player" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getUser } from '@/api';
import RankingSelect from './RankingSelect.vue';
import FuncaoSelect from './FuncaoSelect.vue';
import GameSelect from './GameSelect.vue';
import PlayerCard from './PlayerCard.vue';

export default {
  name: 'UserDashboard',
  components: {
    RankingSelect,
    FuncaoSelect,
    GameSelect,
    PlayerCard
  },
  data() {
    return {
      user: null,
      filters: {
        game: 'Valorant',
        ranking: 'Não Selecionado',
        role: 'Não Selecionado'
      },
      recommendedPlayers: [],
      filteredPlayers: [],
      rankings: [
        { value: 'Não Selecionado', text: 'Não Selecionado', image: '' },
        { value: 'Ferro I', text: 'Ferro I', image: '/images/Ferro1.png' },
        { value: 'Ferro II', text: 'Ferro II', image: '/images/Ferro2.png' },
        { value: 'Ferro III', text: 'Ferro III', image: '/images/Ferro3.png' },
        { value: 'Bronze I', text: 'Bronze I', image: '/images/Bronze1.png' },
        { value: 'Bronze II', text: 'Bronze II', image: '/images/Bronze2.png' },
        { value: 'Bronze III', text: 'Bronze III', image: '/images/Bronze3.png' },
        { value: 'Prata I', text: 'Prata I', image: '/images/Prata1.png' },
        { value: 'Prata II', text: 'Prata II', image: '/images/Prata2.png' },
        { value: 'Prata III', text: 'Prata III', image: '/images/Prata3.png' },
        { value: 'Ouro I', text: 'Ouro I', image: '/images/Ouro1.png' },
        { value: 'Ouro II', text: 'Ouro II', image: '/images/Ouro2.png' },
        { value: 'Ouro III', text: 'Ouro III', image: '/images/Ouro3.png' },
        { value: 'Platina I', text: 'Platina I', image: '/images/Platina1.png' },
        { value: 'Platina II', text: 'Platina II', image: '/images/Platina2.png' },
        { value: 'Platina III', text: 'Platina III', image: '/images/Platina3.png' },
        { value: 'Diamante I', text: 'Diamante I', image: '/images/Diamante1.png' },
        { value: 'Diamante II', text: 'Diamante II', image: '/images/Diamante2.png' },
        { value: 'Diamante III', text: 'Diamante III', image: '/images/Diamante3.png' },
        { value: 'Ascendente I', text: 'Ascendente I', image: '/images/Ascendente1.png' },
        { value: 'Ascendente II', text: 'Ascendente II', image: '/images/Ascendente2.png' },
        { value: 'Ascendente III', text: 'Ascendente III', image: '/images/Ascendente3.png' },
        { value: 'Imortal I', text: 'Imortal I', image: '/images/Imortal1.png' },
        { value: 'Imortal II', text: 'Imortal II', image: '/images/Imortal2.png' },
        { value: 'Imortal III', text: 'Imortal III', image: '/images/Imortal3.png' },
        { value: 'Radiante', text: 'Radiante', image: '/images/Radiante.png' },
      ],
      roles: [
        { value: 'Não Selecionado', text: 'Não Selecionado', image: '' },
        { value: 'Controlador', text: 'Controlador', image: '/images/IconControlador.png' },
        { value: 'Duelista', text: 'Duelista', image: '/images/IconDuelista.png' },
        { value: 'Iniciador', text: 'Iniciador', image: '/images/IconIniciador.png' },
        { value: 'Sentinela', text: 'Sentinela', image: '/images/IconSentinela.png' }
      ],
      games: [
        { value: 'Valorant', text: 'Valorant', image: '/images/IconValorant.png' }
      ]
    };
  },
  created() {
    this.fetchUserData();
    this.fetchRecommendedPlayers();
  },
  methods: {
    async fetchUserData() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getUser(token);
          this.user = response.data.usuario;
          this.$root.$emit('user-updated', this.user);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    },
    async fetchRecommendedPlayers() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/usuario/recommended', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.recommendedPlayers = response.data;
        } catch (error) {
          console.error('Erro ao buscar jogadores recomendados:', error);
        }
      }
    },
    async searchDuos() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.post('http://localhost:8000/api/usuario/filter', this.filters, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.filteredPlayers = response.data;
        } catch (error) {
          console.error('Erro ao buscar jogadores filtrados:', error);
        }
      }
    }
  },
  mounted() {
    console.log('Dashboard carregado com sucesso.');
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #202020;
  color: white;
  min-height: 100vh;
}

.filters-container {
  display: flex;
  gap: 20px;
  margin-top: 60px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.filter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.filter label {
  margin-bottom: 5px;
}

.custom-select {
  position: relative;
  width: 200px;
}

.custom-select select {
  width: 100%;
  padding: 10px;
  font-size: 15px;
  border-radius: 6px;
  border: 1px solid #444;
  background-color: #333;
  color: white;
  appearance: none;
  height: 40px;
  line-height: 40px;
}

.custom-select::after {
  content: '▼';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: white;
  font-size: 12px;
}

.recommended-section,
.filtered-section {
  margin-top: 25px;
  width: 100%;
  max-width: 800px;
}

.recommended-title,
.filtered-title {
  margin: 20px 0 10px;
  color: white;
  text-align: center;
}

.recommended-players-container,
.filtered-players-container {
  border: 1px solid #444;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recommended-players,
.filtered-players {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

button {
  background-color: #f90404;
  border: none;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 15px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #c20303;
}

button.search-btn {
  padding: 10px 15px;
  width: auto;
  white-space: nowrap;
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 25px;
}
</style>