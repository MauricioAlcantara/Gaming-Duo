<template>
  <div class="dashboard-container">
    <div class="filters-container">
      <div class="filter">
        <label for="game">Jogo</label>
        <div class="custom-select">
          <select id="game" v-model="filters.game">
            <option value="Valorant">Valorant</option>
          </select>
        </div>
      </div>
      <div class="filter">
        <label for="ranking">Ranking</label>
        <RankingSelect :options="rankings" v-model="filters.ranking" />
      </div>
      <div class="filter">
        <label for="role">Função</label>
        <div class="custom-select">
          <select id="role" v-model="filters.role">
            <option value="Não Selecionado">Não Selecionado</option>
            <option value="Controlador">Controlador</option>
            <option value="Duelista">Duelista</option>
            <option value="Iniciador">Iniciador</option>
            <option value="Sentinela">Sentinela</option>
          </select>
        </div>
      </div>
      <button @click="searchDuos">Buscar</button>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/api';
import RankingSelect from './RankingSelect.vue';

export default {
  name: 'UserDashboard',
  components: {
    RankingSelect
  },
  data() {
    return {
      user: null,
      filters: {
        game: 'Valorant',
        ranking: 'Não Selecionado',
        role: 'Não Selecionado'
      },
      rankings: [
        { value: 'Não Selecionado', text: 'Não Selecionado', image: '' },
        { value: 'Ferro I', text: 'Ferro I', image: '/images/Ferro1.png' },
        { value: 'Ferro II', text: 'Ferro II', image: '/images/Ferro2.png' },
        { value: 'Ferro III', text: 'Ferro III', image: '/images/Ferro3.png' },
        // Adicione outros rankings aqui
      ]
    };
  },
  created() {
    this.fetchUserData();
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
    searchDuos() {
      console.log('Buscando duos com filtros:', this.filters);
      // Aqui você pode adicionar a lógica para buscar duos com base nos filtros selecionados.
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
  background-color: #282c34;
  color: white;
  min-height: 100vh;
}

.filters-container {
  display: flex;
  gap: 20px;
  margin-top: 60px;
}

.filter {
  display: flex;
  align-items: center;
}

.filter label {
  margin-right: 10px; /* Espaçamento entre o label e o select */
  white-space: nowrap; /* Garante que o label não quebra em várias linhas */
}

.custom-select {
  position: relative;
  width: 200px; /* Largura desejada do select */
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
  -webkit-appearance: none;
  -moz-appearance: none;
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

button {
  background-color: #f90404;
  border: none;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 15px;
}

button:hover {
  background-color: #c20303;
}
</style>
