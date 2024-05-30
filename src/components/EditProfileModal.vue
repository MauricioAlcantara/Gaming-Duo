<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2 class="modal-title">Editar Perfil</h2>
      <form @submit.prevent="save">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Nova Senha:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmar Nova Senha:</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" required />
        </div>
        <div class="button-group">
          <button type="submit">Salvar</button>
          <button type="button" @click="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { updateUser } from '@/api';
export default {
  name: 'EditProfileModal',
  props: {
    user: Object
  },
  data() {
    return {
      email: this.user.email,
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async save() {
      if (this.password !== this.confirmPassword) {
        alert('As senhas não coincidem.');
        return;
      }
      const updatedUser = {
        email: this.email,
        senha: this.password, // Ajuste o nome do campo para 'senha'
        senha_confirmation: this.confirmPassword // Adicione o campo de confirmação de senha
      };
      const token = localStorage.getItem('token');
      try {
        await updateUser(this.user.id, updatedUser, token);
        this.$emit('save', updatedUser);
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #171717;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 400px;
}

.modal-title {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 94%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #222;
  color: #fff;
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.modal-content button {
  padding: 10px 20px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.modal-content button[type="submit"] {
  background-color: #4caf50;
}

.modal-content button[type="submit"]:hover {
  background-color: #45a049;
}

.modal-content button[type="button"] {
  background-color: #f44336;
}

.modal-content button[type="button"]:hover {
  background-color: #d32f2f;
}
</style>
