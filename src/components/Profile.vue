<template>
  <div class="profile">
    <div class="profile-container">
      <div class="profile-info">
        <div class="avatar-container">
          <img :src="user.avatar" alt="User Avatar" class="avatar">
          <font-awesome-icon icon="edit" class="edit-icon" @click="openModal" />
        </div>
        <p class="username">{{ user.username }}</p>
      </div>
    </div>
    <edit-profile-modal v-if="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<script>
import EditProfileModal from './EditProfileModal.vue';

export default {
  name: 'UserProfile',
  components: {
    EditProfileModal
  },
  data() {
    return {
      user: {
        username: 'johndoe',
        avatar: '/path/to/avatar.jpg'
      },
      isModalOpen: false
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    }
  }
};
</script>

<style scoped>
.profile {
  padding: 20px;
  background-color: #212121;
  color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-container {
  background-color: #171717;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 2px solid #f90404;
}

.edit-icon {
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: #f90404;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  display: none;
}

.avatar-container:hover .edit-icon {
  display: block;
}

.username {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
</style>
