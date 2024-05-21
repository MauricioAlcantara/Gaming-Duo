<template>
  <div class="login-container">
    <form @submit.prevent="handleRegister" class="login-form">
      <h1 class="welcome-text">Cadastre-se</h1>
      <div class="form-group">
        <label for="username">
          <span v-if="showUsernameRequired" class="required">* </span>Usuário:
        </label>
        <input type="text" id="username" v-model="registerData.username" @input="clearErrors('username')"
               :style="showUsernameRequired ? 'border-color: #f90404' : ''">
        <p v-if="showUsernameRequired" class="error-message">É necessário informar um usuário.</p>
      </div>
      <div class="form-group">
        <label for="email">
          <span v-if="showEmailRequired" class="required">* </span>E-mail:
        </label>
        <input type="email" id="email" v-model="registerData.email" @input="clearErrors('email')"
               :style="showEmailRequired ? 'border-color: #f90404' : ''">
        <p v-if="showEmailRequired" class="error-message">É necessário informar um e-mail válido.</p>
      </div>
      <div class="form-group">
        <label for="password">
          <span v-if="showPasswordRequired" class="required">* </span>Senha:
        </label>
        <input type="password" id="password" v-model="registerData.password" @input="clearErrors('password')"
               :style="showPasswordRequired ? 'border-color: #f90404' : ''">
        <p v-if="showPasswordRequired" class="error-message">É necessário informar uma senha.</p>
      </div>
      <div class="form-group">
        <label for="confirmPassword">
          <span v-if="showConfirmPasswordRequired" class="required">* </span>Confirmar Senha:
        </label>
        <input type="password" id="confirmPassword" v-model="registerData.confirmPassword" @input="clearErrors('confirmPassword')"
               :style="showConfirmPasswordRequired ? 'border-color: #f90404' : ''">
        <p v-if="showConfirmPasswordRequired" class="error-message">As senhas não coincidem.</p>
      </div>
      <button type="submit" class="login-button">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import { register } from '@/api';

export default {
  name: 'CadastroForm',
  data() {
    return {
      registerData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      showUsernameRequired: false,
      showEmailRequired: false,
      showPasswordRequired: false,
      showConfirmPasswordRequired: false
    };
  },
  methods: {
    async handleRegister() {  // Adicione a palavra-chave async
      this.showUsernameRequired = !this.registerData.username;
      this.showEmailRequired = !this.registerData.email;
      this.showPasswordRequired = !this.registerData.password;
      this.showConfirmPasswordRequired = this.registerData.password !== this.registerData.confirmPassword;

      if (!this.showUsernameRequired && !this.showEmailRequired && !this.showPasswordRequired && !this.showConfirmPasswordRequired) {
        try {
          const response = await register({
            username: this.registerData.username,
            email: this.registerData.email,
            senha: this.registerData.password
          });

          if (response.data.usuario) {
            alert('Cadastro realizado com sucesso!');

          } else {
            alert('Erro ao cadastrar usuário.');
          }
        } catch (error) {
          console.error('Erro ao cadastrar:', error);
        }
      }
    },
    clearErrors(field) {
      if (field === 'username' && this.registerData.username) {
        this.showUsernameRequired = false;
      }
      if (field === 'email' && this.registerData.email) {
        this.showEmailRequired = false;
      }
      if (field === 'password' && this.registerData.password) {
        this.showPasswordRequired = false;
      }
      if (field === 'confirmPassword') {
        this.showConfirmPasswordRequired = false;
      }
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
  max-width: 310px;
  padding: 20px 40px 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  background: #171717;
  border: 1px solid #f90404;
  border-radius: 8px;
  color: #FFF;
}

.welcome-text {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 28px;
  color: #ffffff;
  text-align: center;
}

.form-group {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #ccc;
}

.error-message, .required {
  color: #f90404;
  font-size: 13px;
}

.input-error {
  border-color: #f90404;
}

input[type="text"], input[type="email"], input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #4c4c4c;
  background-color: #212121;
  border-radius: 4px;
  box-sizing: border-box;
  color: #fff;
  font-size: 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
  outline: none;
}

.login-button {
  width: 100%;
  padding: 12px 20px;
  background-color: #f90404;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
}

.login-button:hover {
  background-color: #cc0303;
}
</style>
