<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h1 class="welcome-text">Bem-vindo de Volta! </h1>
      <div class="form-group">
        <label for="username">
          <span v-if="showUsernameRequired" class="required">* </span>E-mail:
        </label>
        <input type="text" id="username" v-model="loginData.username" @input="clearErrors('username')"
               :style="showUsernameRequired ? 'border-color: #f90404' : ''">
        <p v-if="showUsernameRequired" class="error-message">É necessário informar um e-mail.</p>
      </div>
      <div class="form-group">
        <label for="password">
          <span v-if="showPasswordRequired" class="required">* </span>Senha:
        </label>
        <input type="password" id="password" v-model="loginData.password" @input="clearErrors('password')"
               :style="showPasswordRequired ? 'border-color: #f90404' : ''">
        <p v-if="showPasswordRequired" class="error-message">É necessário informar uma senha.</p>
      </div>
      <button type="submit">Entrar</button>
      <div class="footer-links">
        <p class="password-reset" @click="toggleResetPasswordModal">Esqueceu sua senha?</p>
        <p class="register-link" @click="goToRegister">Cadastre-se</p>
      </div>
    </form>
    <div v-if="showResetPasswordModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="toggleResetPasswordModal">&times;</span>
        <h2>Redefinir Senha</h2>
        <p>Por favor, insira seu e-mail para receber um link de redefinição de senha.</p>
        <input type="email" v-model="resetEmail" placeholder="Seu e-mail">
        <button @click="sendResetLink">Enviar</button>
      </div>
    </div>
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
      },
      showUsernameRequired: false,
      showPasswordRequired: false,
      showResetPasswordModal: false,
      resetEmail: ''
    };
  },
  methods: {
    handleLogin() {
      this.showUsernameRequired = !this.loginData.username;
      this.showPasswordRequired = !this.loginData.password;

      if (!this.showUsernameRequired && !this.showPasswordRequired) {
        console.log('Login attempt with:', this.loginData);
      }
    },
    clearErrors(field) {
      if (field === 'username' && this.loginData.username) {
        this.showUsernameRequired = false;
      }
      if (field === 'password' && this.loginData.password) {
        this.showPasswordRequired = false;
      }
    },
    toggleResetPasswordModal() {
      this.showResetPasswordModal = !this.showResetPasswordModal;
    },
    sendResetLink() {
      console.log('Enviar link de redefinição para:', this.resetEmail);
      this.toggleResetPasswordModal();
    },
    goToRegister() {
      this.$router.push({ name: 'cadastro' });
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
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #ccc;
}

.footer-links {
  display: flex;
  justify-content: space-between;
}

.password-reset, .register-link {
  color: #CCC;
  font-size: 13px;
  cursor: pointer;
  text-decoration: underline;
}

.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  margin-top: 50px;
  box-sizing: border-box;
}

.close {
  float: right;
  cursor: pointer;
  font-size: 28px;
}

.close:hover {
  color: red;
}

input[type="email"] {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 15px;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #f90404;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

.required {
  color: #f90404;
}

.error-message {
  color: #f90404;
  margin-top: 6px;
  font-size: 13px;
}

input[type="text"], input[type="password"] {
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
</style>