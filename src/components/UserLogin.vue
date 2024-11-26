<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h1 class="welcome-text">Bem-vindo de Volta!</h1>
      <div class="form-group">
        <label for="email">
          <span v-if="showEmailRequired" class="required">* </span>E-mail:
        </label>
        <input type="email" id="email" v-model="loginData.email" @input="clearErrors('email')"
               :style="showEmailRequired ? 'border-color: #f90404' : ''">
        <p v-if="showEmailRequired" class="error-message">É necessário informar um e-mail.</p>
      </div>
      <div class="form-group">
        <label for="password">
          <span v-if="showPasswordRequired" class="required">* </span>Senha:
        </label>
        <input type="password" id="password" v-model="loginData.password" @input="clearErrors('password')"
               :style="showPasswordRequired ? 'border-color: #f90404' : ''">
        <p v-if="showPasswordRequired" class="error-message">É necessário informar uma senha.</p>
      </div>
      <button type="submit" :disabled="isLoading">
        <span v-if="isLoading" class="spinner"></span>
        <span v-else>Entrar</span>
      </button>
      <div class="footer-links">
        <p class="password-reset" @click="toggleResetPasswordModal">Esqueceu sua senha?</p>
        <p class="register-link" @click="goToRegister">Cadastre-se</p>
      </div>
    </form>
    <div v-if="notification.message" :class="['notification', notification.type]">
      {{ notification.message }}
    </div>
    <div v-if="showResetPasswordModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="toggleResetPasswordModal">&times;</span>
        <h2>Redefinir Senha</h2>
        <p>Por favor, insira seu e-mail para receber um link de redefinição de senha.</p>
        <input type="email" v-model="resetEmail" placeholder="Seu e-mail">
        <button @click="sendResetLink" class="reset-button">Enviar</button>
        <p v-if="resetStatus" class="status-message">{{ resetStatus }}</p>
        <p v-if="resetError" class="error-message">{{ resetError }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { login, requestPasswordReset } from '@/api';

export default {
  name: 'UserLogin',
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      showEmailRequired: false,
      showPasswordRequired: false,
      showResetPasswordModal: false,
      resetEmail: '',
      resetStatus: '',
      resetError: '',
      isLoading: false,
      notification: {
        message: '',
        type: ''
      }
    };
  },
  methods: {
    async handleLogin() {
      this.showEmailRequired = !this.loginData.email;
      this.showPasswordRequired = !this.loginData.password;

      if (!this.showEmailRequired && !this.showPasswordRequired) {
        this.isLoading = true;
        this.notification = { message: '', type: '' };

        try {
          const response = await login({
            email: this.loginData.email,
            senha: this.loginData.password
          });

          if (response.data.success) {
            this.notification = { message: 'Login realizado com sucesso!', type: 'success' };
            localStorage.setItem('token', response.data.token);
            setTimeout(() => {
              this.$router.push({ name: 'dashboard' });
            }, 1500);
          } else {
            this.notification = { message: 'Erro ao fazer login. Verifique suas credenciais.', type: 'error' };
          }
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          this.notification = { message: 'Erro ao fazer login. Por favor, tente novamente mais tarde.', type: 'error' };
        } finally {
          this.isLoading = false;
        }
      }
    },
    clearErrors(field) {
      if (field === 'email' && this.loginData.email) {
        this.showEmailRequired = false;
      }
      if (field === 'password' && this.loginData.password) {
        this.showPasswordRequired = false;
      }
    },
    toggleResetPasswordModal() {
      this.showResetPasswordModal = !this.showResetPasswordModal;
      this.resetStatus = '';
      this.resetError = '';
    },
    async sendResetLink() {
      try {
        await requestPasswordReset(this.resetEmail);
        this.resetStatus = 'Link de redefinição de senha enviado para o e-mail fornecido.';
        this.resetError = '';
        // Mantém o modal aberto para exibir a mensagem de sucesso
      } catch (error) {
        console.error('Erro ao enviar link de redefinição de senha:', error);
        this.resetError = 'Erro ao enviar link de redefinição de senha. Verifique o e-mail e tente novamente.';
        this.resetStatus = '';
      }
    },
    goToRegister() {
      this.$router.push({ name: 'cadastro' });
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
  max-width: 350px;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form button[disabled] {
  background-color: #999;
  cursor: not-allowed;
}

.spinner {
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.notification.success {
  background-color: #28a745;
}

.notification.error {
  background-color: #dc3545;
}

.password-reset,
.register-link {
  color: #CCC;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
}

.password-reset:hover,
.register-link:hover {
  color: white;
}

input[type="email"],
input[type="password"] {
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

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #f90404;
  box-shadow: 0 0 5px rgba(249, 4, 4, 0.5);
}

.form-group {
  margin-bottom: 20px;
}

.error-message {
  color: #f90404;
  margin-top: 6px;
  font-size: 13px;
}

.footer-links {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #ccc;
}

/* Estilos para o Modal de Redefinição de Senha */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75); /* Fundo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background-color: #171717;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #f90404;
  width: 90%;
  max-width: 400px;
  box-sizing: border-box;
  position: relative;
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}

.modal-content h2 {
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
}

.modal-content p {
  color: #ccc;
  margin-bottom: 20px;
  text-align: center;
}

.modal-content input[type="email"] {
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #4c4c4c;
  background-color: #212121;
  color: #fff;
  font-size: 15px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.modal-content input[type="email"]::placeholder {
  color: #999;
}

.modal-content input[type="email"]:focus {
  border-color: #f90404;
  box-shadow: 0 0 5px rgba(249, 4, 4, 0.5);
  outline: none;
}

.reset-button {
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

.reset-button:hover {
  background-color: #cc0303;
}

.status-message {
  color: #4caf50;
  margin-top: 20px;
  text-align: center;
}

.error-message {
  color: #f90404;
  margin-top: 10px;
  text-align: center;
}

/* Responsividade do Modal */
@media screen and (max-width: 480px) {
  .modal-content {
    padding: 20px;
    width: 90%;
  }
  .modal-content h2 {
    font-size: 24px;
  }
}
</style>
