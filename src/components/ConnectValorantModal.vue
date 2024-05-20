<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>Conectar Conta do Valorant</h2>
      <input type="text" v-model="valorantAccount" placeholder="Digite o ID da conta do Valorant">
      <div class="button-group">
        <button @click="connect">Conectar</button>
        <button @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConnectValorantModal',
  data() {
    return {
      valorantAccount: ''
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    connect() {
      if (this.valorantAccount) {
        this.$emit('connect', this.valorantAccount);
        this.close();
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
  align-items: center;
  width: 90%;
  max-width: 400px;
}

.modal-content input {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #222;
  color: #fff;
  width: 100%;
}

.button-group {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
}

.modal-content button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.modal-content button:first-of-type {
  background-color: #4caf50;
}

.modal-content button:first-of-type:hover {
  background-color: #45a049;
}

.modal-content button:last-of-type {
  background-color: #f44336;
}

.modal-content button:last-of-type:hover {
  background-color: #d32f2f;
}
</style>
