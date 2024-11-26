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
      <button type="submit" class="login-button" :disabled="isLoading">
        <span v-if="isLoading" class="spinner"></span>
        <span v-else>Cadastrar</span>
      </button>
    </form>
    <div v-if="notification.message" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
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
      showConfirmPasswordRequired: false,
      isLoading: false,
      notification: {
        message: '',
        type: ''
      }
    };
  },
  methods: {
    async handleRegister() {
      this.showUsernameRequired = !this.registerData.username;
      this.showEmailRequired = !this.registerData.email;
      this.showPasswordRequired = !this.registerData.password;
      this.showConfirmPasswordRequired = this.registerData.password !== this.registerData.confirmPassword;

      if (!this.showUsernameRequired && !this.showEmailRequired && !this.showPasswordRequired && !this.showConfirmPasswordRequired) {
        this.isLoading = true;
        this.notification = { message: '', type: '' };

        try {
          const response = await register({
            username: this.registerData.username,
            email: this.registerData.email,
            senha: this.registerData.password
          });

          if (response.data.usuario) {
            this.notification = { message: 'Cadastro realizado com sucesso!', type: 'success' };
            setTimeout(() => {
              this.$router.push({ name: 'login' });
            }, 1500);
          } else {
            this.notification = { message: 'Erro ao cadastrar usuário.', type: 'error' };
          }
        } catch (error) {
          console.error('Erro ao cadastrar:', error);
          this.notification = { message: 'Erro ao cadastrar. Tente novamente mais tarde.', type: 'error' };
        } finally {
          this.isLoading = false;
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
};
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
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button[disabled] {
  background-color: #999;
  cursor: not-allowed;
}

.login-button:hover {
  background-color: #cc0303;
}

.spinner {
  border: 3px solid transparent;
  border-top: 3px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: fadeIn 0.5s ease-in-out, fadeOut 0.5s 3s ease-in-out;
}

.notification.success {
  background-color: #28a745;
  color: white;
}

.notification.error {
  background-color: #dc3545;
  color: white;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}


.form-group input {
  margin-top: 5px; /* Adicionado para criar espaço entre o rótulo e o campo */
}

.form-group p {
  margin-top: 5px; /* Adicionado para criar espaço entre o campo e a mensagem de erro */
}

input:focus {
  border-color: #f90404;
  box-shadow: 0 0 5px rgba(249, 4, 4, 0.5);
}

@media (max-width: 768px) {
  .login-form {
    padding: 15px 30px 30px;
    max-width: 100%;
  }
}
</style>
