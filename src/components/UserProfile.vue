<template>
  <div class="profile">
    <div class="profile-container">
      <div class="profile-info">
        <div class="avatar-container">
          <img :src="user.avatar ? user.avatar : '/path/to/default/avatar.jpg'" alt="User Avatar" class="avatar">
          <font-awesome-icon icon="edit" class="edit-icon" @click="openModal('avatar')" />
        </div>
        <p class="username">{{ user.username }}</p>
        <hr class="separator" />
        <div class="info-item">
          <p class="player"><strong>Jogador:</strong> {{ user.player }}</p>
        </div>
        <div class="info-item">
          <p class="ranking"><strong>Ranking:</strong> {{ user.ranking }}</p>
        </div>
        <div class="info-item">
          <p class="preferred-agent">
            <strong>Agente Preferido:&nbsp;</strong>{{ user.preferredAgent }}
            <font-awesome-icon icon="edit" class="edit-icon-small" @click="openModal('preferredAgent')" />
          </p>
        </div>
        <div class="info-item">
          <strong>Função Preferida:&nbsp;</strong>
          <div class="select-container">
            <select v-model="user.preferredFunction">
              <option value="Não Escolhida">Não Escolhida</option>
              <option value="Controlador">Controlador</option>
              <option value="Duelista">Duelista</option>
              <option value="Iniciador">Iniciador</option>
              <option value="Sentinela">Sentinela</option>
            </select>
          </div>
        </div>
        <button class="connect-button" @click="openModal('connectValorant')">Conectar-se</button>
      </div>
    </div>
    <edit-profile-modal v-if="isAvatarModalOpen" @close="isAvatarModalOpen = false" @save="updateAvatar" />
    <edit-preferred-agent-modal v-if="isAgentModalOpen" @close="isAgentModalOpen = false" @save="updatePreferredAgent" />
    <connect-valorant-modal v-if="isConnectModalOpen" @close="isConnectModalOpen = false" @connect="connectValorantAccount" />
  </div>
</template>

<script>
import EditProfileModal from './EditProfileModal.vue';
import EditPreferredAgentModal from './EditPreferredAgentModal.vue';
import ConnectValorantModal from './ConnectValorantModal.vue';
import { getUser, updateAvatar } from '@/api';

export default {
  name: 'UserProfile',
  components: {
    EditProfileModal,
    EditPreferredAgentModal,
    ConnectValorantModal
  },
  data() {
    return {
      user: {
        username: '',
        player: 'Não Encontrado',
        avatar: '/path/to/default/avatar.jpg',
        ranking: 'Não Encontrado',
        preferredAgent: 'Não Escolhido',
        preferredFunction: 'Não Escolhida'
      },
      isAvatarModalOpen: false,
      isAgentModalOpen: false,
      isConnectModalOpen: false
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getUser(token);
          const userData = response.data.usuario;

          this.user = {
            username: userData.username,
            player: userData.player || 'Não Encontrado',
            avatar: userData.avatar ? `http://localhost:8000/avatars/${userData.avatar}` : '/path/to/default/avatar.jpg',
            ranking: userData.ranking || 'Não Encontrado',
            preferredAgent: userData.preferredAgent || 'Não Escolhido',
            preferredFunction: userData.preferredFunction || 'Não Escolhida'
          };
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      } else {
        this.$router.push({ name: 'login' });
      }
    },
    openModal(type) {
      if (type === 'avatar') {
        this.isAvatarModalOpen = true;
      } else if (type === 'preferredAgent') {
        this.isAgentModalOpen = true;
      } else if (type === 'connectValorant') {
        this.isConnectModalOpen = true;
      }
    },
    async updateAvatar(file) {
      const token = localStorage.getItem('token');
      if (file) {
        try {
          const formData = new FormData();
          formData.append('avatar', file);

          const response = await updateAvatar(formData, token);
          if (response.data.success) {
            this.user.avatar = response.data.avatar_url;
            this.isAvatarModalOpen = false;
          } else {
            alert('Erro ao fazer upload do avatar.');
          }
        } catch (error) {
          console.error('Erro ao fazer upload do avatar:', error);
        }
      }
    },
    updatePreferredAgent(agent) {
      this.user.preferredAgent = agent;
    },
    connectValorantAccount(player) {
      this.user.player = player.name;
      this.user.ranking = player.rank;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid #f90404;
}

.username {
  font-size: 18px;
  margin-bottom: 20px;
  text-align: center;
}

.edit-icon {
  position: absolute;
  top: 48%;
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

.info-item {
  width: 100%;
  padding: 5px 0;
}

.username, .player, .ranking, .preferred-agent, .preferred-function {
  font-size: 18px;
  text-align: left;
}

.preferred-agent {
  display: flex;
  align-items: center;
}

.edit-icon-small {
  margin-left: 10px;
  cursor: pointer;
}

.select-container {
  display: inline-block;
  position: relative;
}

select {
  appearance: none;
  background-color: #171717;
  color: #fff;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 5px 30px 5px 10px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  margin-left: 10px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

select:hover {
  background-color: #222;
}

.select-container::after {
  content: '▼';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #fff;
  font-size: 12px;
}

.connect-button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #f90404;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  align-self: flex-end;
}

.connect-button:hover {
  background-color: #d32f2f;
}
</style>
