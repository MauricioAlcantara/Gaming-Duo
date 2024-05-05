<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Usuário:</label>
        <input type="text" id="username" v-model="loginData.username" required>
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="loginData.password" required>
      </div>
      <button type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      loginData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      console.log('Login attempt with:', this.loginData);
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #212121;
}

.login-form {
  width: 100%;
  max-width: 300px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  background: #171717;
  border: 1px solid #f90404;
  border-radius: 8px;
  color: #FFF;
}

.login-form button {
  width: 100%;
  padding: 12px 20px;
  background-color: #f90404;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
  font-size: 15px;
}

.login-form button:hover {
  background-color: #cc0303;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #ccc;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #4c4c4c;
  background-color: #212121;
  border-radius: 4px;
  box-sizing: border-box;
  color: #fff;
  transition: border-color 0.3s, box-shadow 0.3s;
}
</style>

