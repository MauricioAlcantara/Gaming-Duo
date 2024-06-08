<template>
  <div class="reset-container">
    <form @submit.prevent="handleReset" class="reset-form">
      <h1>Redefinir Senha</h1>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required>
      </div>
      <div class="form-group">
        <label for="password">Nova Senha:</label>
        <input type="password" id="password" v-model="form.password" required>
      </div>
      <div class="form-group">
        <label for="password_confirmation">Confirme a Nova Senha:</label>
        <input type="password" id="password_confirmation" v-model="form.password_confirmation" required>
      </div>
      <input type="hidden" v-model="form.token">
      <button type="submit">Redefinir Senha</button>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="message" class="success-message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import { resetPassword } from '@/api';

export default {
  name: 'PasswordReset',
  data() {
    return {
      form: {
        email: this.$route.query.email || '',
        password: '',
        password_confirmation: '',
        token: this.$route.params.token,
      },
      error: '',
      message: ''
    };
  },
  methods: {
    async handleReset() {
      try {
        const response = await resetPassword(this.form);
        this.message = response.data.message;
        this.error = '';
      } catch (error) {
        if (error.response && error.response.data) {
          this.error = error.response.data.errors || 'Erro ao redefinir a senha. Por favor, tente novamente.';
        } else {
          this.error = 'Erro ao redefinir a senha. Por favor, tente novamente.';
        }
        this.message = '';
      }
    }
  }
};
</script>

<style scoped>
.reset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #212121;
}

.reset-form {
  width: 100%;
  max-width: 400px;
  padding: 20px 40px 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  background: #171717;
  border: 1px solid #f90404;
  border-radius: 8px;
  color: #FFF;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #ccc;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #4c4c4c;
  background-color: #212121;
  color: #fff;
  box-sizing: border-box;
  font-size: 15px;
  outline: none;
}

button {
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

button:hover {
  background-color: #cc0303;
}

.error-message {
  color: #f90404;
  margin-top: 10px;
}

.success-message {
  color: #4caf50;
  margin-top: 10px;
}
</style>
