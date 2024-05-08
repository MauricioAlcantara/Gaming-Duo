<template>
  <div class="chat-widget" v-if="isOpen">
    <div class="chat-header" @click="toggleMinimize">
      <span>Suporte</span>
      <div class="controls">
        <button v-if="!isMinimized" @click.stop="minimizeChat" class="chat-minimize">-</button>
        <button @click.stop="closeChat" class="chat-close">x</button>
      </div>
    </div>
    <div class="chat-messages" v-show="!isMinimized">
      <!-- Mensagens aqui -->
    </div>
    <div class="chat-input" v-show="!isMinimized">
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
      isMinimized: false,
      message: ''
    };
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      this.isMinimized = false;
    },
    toggleMinimize() {
      if (this.isMinimized) {
        this.isMinimized = false;
      } else {
        this.minimizeChat();
      }
    },
    minimizeChat() {
      this.isMinimized = !this.isMinimized;
    },
    closeChat() {
      this.isOpen = false;
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
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 290px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #D32F2F;
  padding: 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.chat-header span {
  text-align: center;
}

.controls {
  position: absolute;
  right: 10px;
  display: flex;
}

.chat-minimize, .chat-close {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

.chat-minimize:hover, .chat-close:hover {
  color: #ccc;
}

.chat-messages {
  padding: 10px;
  height: 260px;
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
  font-size: 15px;
}

.chat-input button:hover {
  background-color: #45a049;
}
</style>
