<template>
  <div id="app">
    <TopBar/>
    <router-view/>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue'

export default {
  components: {
    TopBar
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
</style>
