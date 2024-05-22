<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>Conectar Conta do Valorant</h2>
      <input v-model="nickname" placeholder="Nickname#Tag" />
      <p v-if="error" class="error-message">{{ error }}</p>
      <div class="button-group">
        <button @click="connect">Conectar</button>
        <button @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
      error: ''
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async connect() {
      if (!this.nickname.includes('#')) {
        this.error = 'Formato inválido. Use o formato Nickname#Tag.';
        return;
      }

      try {
        const response = await fetch(`https://public-api.tracker.gg/v2/valorant/standard/profile/riot/${this.nickname.replace('#', '%23')}`, {
          headers: {
            'TRN-Api-Key': '406e8c2a-11f3-4fa6-bc53-547695ee13be'
          }
        });
        const data = await response.json();

        if (response.ok) {
          const player = {
            name: data.data.platformInfo.platformUserHandle,
            rank: data.data.segments[0].stats.rank.metadata.tierName
          };
          this.$emit('connect', player);
          this.close();
        } else {
          console.log('API response:', data);
          this.error = data.errors ? data.errors[0].message : 'Erro ao conectar.';
        }
      } catch (error) {
        console.error('Connection error:', error);
        this.error = 'Erro ao conectar. Tente novamente.';
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

.error-message {
  color: #f90404;
  margin-bottom: 10px;
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
