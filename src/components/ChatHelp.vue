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
      <ul>
        <li v-for="(item, index) in predefinedMessages" :key="index">
          <span class="predefined-message" @click="sendPredefinedMessage(index)">{{ item.label }}</span>
          <div v-if="item.expanded" class="message-content">{{ item.message }}</div>
        </li>
      </ul>
    </div>
    <div class="chat-input" v-show="!isMinimized">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isMinimized: false,
      message: '',
      messages: [],
      predefinedMessages: [
        {
          label: "Como faço um cadastro?",
          message: "Para se cadastrar, clique em 'Cadastrar-se' na barra superior. Preencha os campos solicitados, como nome de usuário, e-mail e senha. Confirme sua senha e clique em 'Cadastrar' para finalizar seu cadastro. Após isso, um e-mail de confirmação será enviado para o endereço de e-mail fornecido. Siga as instruções no e-mail para ativar sua conta.",
          expanded: false
        },
        {
          label: "Esqueci minha senha, o que fazer?",
          message: "Se você esqueceu sua senha, clique no link 'Esqueceu sua senha?' na página de login. Forneça o e-mail associado à sua conta e envie. Você receberá um e-mail com instruções para redefinir sua senha.",
          expanded: false
        },
        {
          label: "Como altero informações da minha conta?",
          message: "Para alterar as informações da sua conta, acesse o painel de usuário e selecione 'Configurações'. Lá você pode editar seus dados pessoais, como nome de usuário e e-mail.",
          expanded: false
        },
        {
          label: "Não consigo acessar minha conta, o que fazer?",
          message: "Se você está tendo problemas para acessar sua conta, certifique-se de que o e-mail e a senha estão corretos. Se o problema persistir, tente redefinir sua senha ou entre em contato com nosso suporte para mais assistência.",
          expanded: false
        },
        {
          label: "Preciso de suporte técnico, como proceder?",
          message: "Se você está enfrentando problemas técnicos, por favor, descreva o problema detalhadamente através do nosso formulário de contato ou envie um e-mail diretamente para suporte@seudominio.com. Nossa equipe de suporte técnico entrará em contato o mais breve possível.",
          expanded: false
        }
      ]
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
      this.messages = [];
      this.predefinedMessages.forEach(msg => {
        msg.expanded = false;
      });
    },
    sendMessage() {
      if (this.message.trim()) {
        this.messages.push({ text: this.message, from: 'user' });
        this.message = '';
      }
    },
    sendPredefinedMessage(index) {
      // Alterna o estado de 'expanded' da pergunta clicada e fecha todas as outras
      this.predefinedMessages.forEach((item, idx) => {
        if (idx === index) {
          item.expanded = !item.expanded; // Alterna o estado de 'expanded' da pergunta clicada
        } else {
          item.expanded = false; // Fecha todas as outras perguntas
        }
      });
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

.predefined-message {
  border: 1px solid #f44336;
  background-color: #444;
  padding: 5px;
  margin-bottom: 6px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
}

ul {
  list-style: none;
  padding: 0;
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

.message-content {
  background-color:#666;
  color:white;
  padding:8px;
  border-radius:4px;
  margin-top:4px;
  margin-bottom:12px;
}
</style>
