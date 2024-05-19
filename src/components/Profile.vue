<template>
  <div class="profile">
    <div class="profile-container">
      <div class="profile-info">
        <div class="avatar-container">
          <img :src="user.avatar" alt="User Avatar" class="avatar">
          <font-awesome-icon icon="edit" class="edit-icon" @click="openModal('avatar')" />
        </div>
        <hr class="separator" />
        <p class="username"><strong>Usuário:</strong> {{ user.username }}</p>
        <p class="ranking"><strong>Ranking:</strong> {{ user.ranking }}</p>
        <p class="preferred-agent">
          <strong>Agente Preferido:&nbsp;</strong>{{ user.preferredAgent }}
          <font-awesome-icon icon="edit" class="edit-icon-small" @click="openModal('preferredAgent')" />
        </p>
      </div>
    </div>
    <edit-profile-modal v-if="isAvatarModalOpen" @close="isAvatarModalOpen = false" @save="updateAvatar" />
    <edit-preferred-agent-modal v-if="isAgentModalOpen" @close="isAgentModalOpen = false" @save="updatePreferredAgent" />
  </div>
</template>

<script>
import EditProfileModal from './EditProfileModal.vue';
import EditPreferredAgentModal from './EditPreferredAgentModal.vue';

export default {
  name: 'UserProfile',
  components: {
    EditProfileModal,
    EditPreferredAgentModal
  },
  data() {
    return {
      user: {
        username: 'Dashe',
        avatar: '/path/to/avatar.jpg',
        ranking: 'Não Encontrado',
        preferredAgent: 'Não Escolhido' // Inicialmente definido como "Não Escolhido"
      },
      isAvatarModalOpen: false,
      isAgentModalOpen: false
    };
  },
  methods: {
    openModal(type) {
      if (type === 'avatar') {
        this.isAvatarModalOpen = true;
      } else if (type === 'preferredAgent') {
        this.isAgentModalOpen = true;
      }
    },
    updateAvatar(file) {
      // Cria uma URL temporária para mostrar a imagem selecionada
      this.user.avatar = URL.createObjectURL(file);
    },
    updatePreferredAgent(agent) {
      this.user.preferredAgent = agent;
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

.separator {
  width: 100%;
  border: none;
  border-top: 2px solid rgba(51, 51, 51, 0.95);
  margin: 10px 0;
}

.username, .ranking, .preferred-agent {
  font-size: 18px;
  margin-bottom: 10px;
  text-align: left;
  width: 100%;
}

.preferred-agent {
  display: flex;
  align-items: center;
}

.edit-icon-small {
  margin-left: 10px;
  cursor: pointer;
}
</style>
