<template>
  <div id="app">
    <TopBar @toggle-chat="toggleChat"/>
    <router-view/>
    <ChatHelp ref="chatHelp"></ChatHelp>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'
import ChatHelp from './components/ChatHelp.vue'

export default {
  components: {
    TopBar,
    ChatHelp
  },
  methods: {
    toggleChat() {
      this.$refs.chatHelp.toggleChat();
    }
  }
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
}

body {
  font-family: 'Your Font Family', sans-serif;
}

:root {
  --primary-color: #333;
  --secondary-color: #555;
}

body {
  background-color: #121212; /* Fundo escuro */
  color: #ffffff; /* Texto claro */
  font-family: Arial, sans-serif; /* Fonte legível */
}

.container {
  width: 80%;
  margin: 0 auto;
}

h2 {
  color: #f39c12; /* Cor laranja suave para os títulos */
  text-align: center;
  margin-bottom: 20px;
}
</style>