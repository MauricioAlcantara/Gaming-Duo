<template>
    <div class="profile">
      <div class="profile-container">
        <div class="profile-info">
          <div class="avatar-container">
            <img :src="user.avatar ? user.avatar : '/path/to/default/avatar.jpg'" alt="User Avatar" class="avatar">
          </div>
          <p class="username">{{ user.username }}</p>
          <hr class="separator" />
          <div class="info-item">
            <p class="player"><strong>Jogador:</strong> {{ user.gamename }}</p>
          </div>
          <div class="info-item">
            <p class="ranking"><strong>Rank:</strong> {{ user.rank }}</p>
          </div>
          <div class="info-item">
            <p class="preferred-agent"><strong>Agente Preferido:&nbsp;</strong>{{ user.preferred_agent }}</p>
          </div>
          <div class="info-item">
            <strong>Função Preferida:&nbsp;</strong>{{ user.preferred_function }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "UserProfileView",
    data() {
      return {
        user: {
          username: "",
          gamename: "Não Encontrado",
          avatar: "/path/to/default/avatar.jpg",
          rank: "Não Encontrado",
          preferred_agent: "Não Escolhido",
          preferred_function: "Não Escolhida",
        },
        isOwnProfile: false, // Gambiarra para verificar se é o perfil do usuário logado
      };
    },
    created() {
      this.fetchUserProfileView();
    },
    methods: {
      async fetchUserProfileView() {
        const username = this.$route.params.username; // Obtém o username da URL
        const token = localStorage.getItem("token"); // Obtém o token do localStorage
        const loggedInUsername = localStorage.getItem("username"); // Gambiarra: pega o username salvo no localStorage durante o login
  
        // Verifica se o token está presente
        if (!token) {
          console.error("Token não encontrado! Redirecionando para login.");
          this.$router.push({ name: "login" }); // Redireciona para a página de login
          return;
        }
  
        // Verifica se o perfil acessado é do próprio usuário logado
        if (username === loggedInUsername) {
          console.log("Acessando o próprio perfil.");
          this.isOwnProfile = true;
        } else {
          console.log("Acessando o perfil de outro usuário.");
          this.isOwnProfile = false;
        }
  
        try {
          // Realiza a requisição para buscar o perfil do usuário com base no username
          const response = await axios.get(
            `http://4.228.224.56:8000/api/usuario/${username}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
              },
            }
          );
  
          const userData = response.data.usuario;
  
          // Atualiza os dados do usuário exibido no perfil
          this.user = {
            username: userData.username,
            gamename: userData.gamename || "Não Encontrado",
            avatar: userData.avatar
              ? `http://4.228.224.56:8000/avatars/${userData.avatar}`
              : "/path/to/default/avatar.jpg",
            rank: userData.rank || "Não Encontrado",
            preferred_agent: userData.preferred_agent || "Não Escolhido",
            preferred_function: userData.preferred_function || "Não Escolhida",
          };
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
  
          if (error.response?.status === 401) {
            alert(
              "Você precisa estar autenticado para acessar esta página. Por favor, faça login novamente."
            );
            this.$router.push({ name: "login" }); // Redireciona para login se não autenticado
          } else if (error.response?.status === 404) {
            alert("Usuário não encontrado.");
            this.$router.push({ name: "notFound" }); // Redireciona para "Not Found" se o usuário não existir
          } else {
            alert(
              "Erro ao carregar os dados do perfil. Por favor, tente novamente."
            );
          }
        }
      },
    },
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
    position: relative;
  }
  
  .profile-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .avatar-container {
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
  
  .separator {
    width: 100%;
    border: none;
    border-top: 2px solid rgba(51, 51, 51, 0.95);
    margin: 10px 0;
  }
  
  .info-item {
    width: 100%;
    padding: 5px 0;
    font-size: 18px;
  }
  </style>
  