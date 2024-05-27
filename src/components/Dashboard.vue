<template>
  <div class="dashboard-container">
    <h1>Bem-vindo ao Dashboard</h1>
  </div>
</template>

<script>
import { getUser } from '@/api';

export default {
  name: 'UserDashboard',
  data() {
    return {
      user: null
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
    }
  },
  mounted() {
    console.log('Dashboard carregado com sucesso.');
  }
}
</script>


<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #282c34;
  color: white;
}
</style>
