<template>
  <div class="chat-widget" v-if="isOpen">
    <div class="chat-header" @click="toggleChat">
      Suporte
    </div>
    <div class="chat-messages">

    </div>
    <div class="chat-input">
      <input type="text" placeholder="Digite sua pergunta aqui..." v-model="message">
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      message: ''
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
    },
    sendMessage() {
      console.log(this.message);
      this.message = '';
    }
  }
}
</script>

<style scoped>
.chat-widget {

}

.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background-color: #202020;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
}

.chat-header {
  background-color: #D32F2F;
  padding: 10px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}

.chat-messages {
  padding: 10px;
  height: 200px;
  overflow-y: auto;
}

.chat-input {
  padding: 10px;
  display: flex;
}

.chat-input input {
  flex-grow: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-right: 8px;
}

.chat-input button {
  padding: 8px 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #45a049;
}

</style>
