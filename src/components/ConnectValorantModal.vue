<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>Conectar Conta do Valorant</h2>
      <label for="nickname-input" class="input-label">GameName#TAG</label>
      <input id="nickname-input" v-model="nickname" placeholder="Nickname#Tag" />
      <label class="input-label">Ranking</label>
      <div class="ranking-select-wrapper">
        <RankingSelect :options="rankings" v-model="selectedRank" />
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
      <div class="button-group">
        <button @click="connect">Salvar</button>
        <button @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import RankingSelect from './RankingSelect.vue';

export default {
  components: {
    RankingSelect
  },
  data() {
    return {
      nickname: '',
      selectedRank: 'Não Selecionado',
      error: '',
      rankings: [
        { value: 'Não Selecionado', text: 'Não Selecionado', image: '' },
        { value: 'Ferro I', text: 'Ferro I', image: '/images/Ferro1.png' },
        { value: 'Ferro II', text: 'Ferro II', image: '/images/Ferro2.png' },
        { value: 'Ferro III', text: 'Ferro III', image: '/images/Ferro3.png' },
        { value: 'Bronze I', text: 'Bronze I', image: '/images/Bronze1.png' },
        { value: 'Bronze II', text: 'Bronze II', image: '/images/Bronze2.png' },
        { value: 'Bronze III', text: 'Bronze III', image: '/images/Bronze3.png' },
        { value: 'Prata I', text: 'Prata I', image: '/images/Prata1.png' },
        { value: 'Prata II', text: 'Prata II', image: '/images/Prata2.png' },
        { value: 'Prata III', text: 'Prata III', image: '/images/Prata3.png' },
        { value: 'Ouro I', text: 'Ouro I', image: '/images/Ouro1.png' },
        { value: 'Ouro II', text: 'Ouro II', image: '/images/Ouro2.png' },
        { value: 'Ouro III', text: 'Ouro III', image: '/images/Ouro3.png' },
        { value: 'Platina I', text: 'Platina I', image: '/images/Platina1.png' },
        { value: 'Platina II', text: 'Platina II', image: '/images/Platina2.png' },
        { value: 'Platina III', text: 'Platina III', image: '/images/Platina3.png' },
        { value: 'Diamante I', text: 'Diamante I', image: '/images/Diamante1.png' },
        { value: 'Diamante II', text: 'Diamante II', image: '/images/Diamante2.png' },
        { value: 'Diamante III', text: 'Diamante III', image: '/images/Diamante3.png' },
        { value: 'Ascendente I', text: 'Ascendente I', image: '/images/Ascendente1.png' },
        { value: 'Ascendente II', text: 'Ascendente II', image: '/images/Ascendente2.png' },
        { value: 'Ascendente III', text: 'Ascendente III', image: '/images/Ascendente3.png' },
        { value: 'Imortal I', text: 'Imortal I', image: '/images/Imortal1.png' },
        { value: 'Imortal II', text: 'Imortal II', image: '/images/Imortal2.png' },
        { value: 'Imortal III', text: 'Imortal III', image: '/images/Imortal3.png' },
        { value: 'Radiante', text: 'Radiante', image: '/images/Radiante.png' },
      ]
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    connect() {
      if (!this.nickname.includes('#')) {
        this.error = 'Formato inválido. Use o formato Nickname#Tag.';
        return;
      }
      // Emit the nickname and selected rank to the parent component
      const player = {
        gamename: this.nickname,
        rank: this.selectedRank
      };
      this.$emit('connect', player);
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
  max-width: 400px;
}

.input-label {
  align-self: flex-start;
  margin-bottom: 5px;
}

.ranking-select-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.modal-content input {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #222;
  color: #fff;
  width: 95%;
}

.error-message {
  color: #f90404;
  margin-bottom: 10px;
}

.button-group {
  margin-top: 5px;
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
