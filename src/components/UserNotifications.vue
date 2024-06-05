<template>
  <div class="notification-container" @click.stop="toggleDropdown">
    <font-awesome-icon icon="bell" class="notification-icon" />
    <div v-if="dropdownOpen" class="dropdown-content" ref="dropdown">
      <h2>Notificações</h2>
      <ul>
        <li v-for="(notification, index) in notifications" :key="index">{{ notification.message }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
      notifications: [
        { message: 'Pedrinho quer se conectar com você!' },
        { message: 'Você tem uma nova mensagem.' }
      ]
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    }
  }
};
</script>

<style scoped>
.notification-container {
  position: relative;
  display: inline-block;
}

.notification-icon {
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;
}

.dropdown-content {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #222;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
  color: #fff;
  width: 250px;
  z-index: 1000;
}

.dropdown-content h2 {
  margin-top: 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

li {
  background: #333;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  text-align: left;
  width: 100%;
}
</style>
