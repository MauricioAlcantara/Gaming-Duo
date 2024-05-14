<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>Editar Foto de Perfil</h2>
      <input type="file" @change="uploadFile">
      <div class="button-group">
        <button @click="save">Salvar</button>
        <button @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfileModal',
  data() {
    return {
      selectedFile: null
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    uploadFile(event) {
      this.selectedFile = event.target.files[0];
    },
    save() {
      if (this.selectedFile) {
        console.log('Saving file:', this.selectedFile);
      }
      this.close();
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
  max-width: 300px;
}

.modal-content input {
  margin-bottom: 20px;
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
  width: 100px;
  border-radius: 5px;
  font-size: 12px;
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
