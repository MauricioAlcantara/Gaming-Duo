<template>
  <div class="dashboard-container">
    <h1>Bem-vindo ao Dashboard</h1>
  </div>
</template>

<script>
export default {
  name: 'UserDashboard',
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
