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
        <FuncaoSelect :options="roles" v-model="filters.role" />
      </div>
      <button @click="searchDuos">Buscar</button>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/api';
import RankingSelect from './RankingSelect.vue';
import FuncaoSelect from './FuncaoSelect.vue';

export default {
  name: 'UserDashboard',
  components: {
    RankingSelect,
    FuncaoSelect
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
  margin-right: 10px;
  white-space: nowrap;
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
