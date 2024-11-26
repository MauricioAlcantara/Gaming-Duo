<template>
    <div class="matches-history">
      <h1 class="title">Histórico de Conexões</h1>
      <div class="filters">
        <div class="search-container">
          <input
            type="text"
            v-model="search"
            placeholder="Buscar por nick ou status"
            class="search-input"
          />
          <span class="search-icon">&#128269;</span>
        </div>
      </div>
      <div class="matches-list">
        <table>
          <thead>
            <tr>
              <th>Nick</th>
              <th>Status</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="match in filteredMatches" :key="match.id">
              <td>{{ match.nick }}</td>
              <td>
                <span :class="statusClass(match.status)">
                  {{ match.status }}
                </span>
              </td>
              <td>{{ formatDate(match.created_at) }}</td>
              <td>
                <button
                  v-if="match.status === 'Confirmado'"
                  @click="goToUserProfile(match.username)"
                  class="view-profile-button"
                >
                  Ver Perfil
                </button>
                <button
                  v-else
                  class="disabled-button"
                  disabled
                >
                  Não Disponível
                </button>
              </td>
            </tr>
            <tr v-if="filteredMatches.length === 0">
              <td colspan="4">Nenhum histórico encontrado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { getMatchesHistory } from "@/api";
  
  export default {
    data() {
      return {
        matches: [],
        search: "",
      };
    },
    computed: {
      filteredMatches() {
        return this.matches.filter(
          (match) =>
            match.nick
              .toLowerCase()
              .includes(this.search.toLowerCase()) ||
            match.status.toLowerCase().includes(this.search.toLowerCase())
        );
      },
    },
    methods: {
      async fetchMatches() {
        const token = localStorage.getItem("token");
  
        if (!token) {
          console.error("Token não encontrado");
          return;
        }
  
        try {
          const response = await getMatchesHistory(token);
          this.matches = response.data.matches.map((match) => ({
            ...match,
            status: this.translateStatus(match.status),
          }));
        } catch (error) {
          console.error("Erro ao carregar o histórico de conexões:", error);
        }
      },
      goToUserProfile(username) {
        if (!username) {
          console.error("Username ausente");
          return;
        }
        this.$router.push({ name: "UserProfileView", params: { username } });
      },
      formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("pt-BR", options);
      },
      statusClass(status) {
        return {
          "status-confirmed": status === "Confirmado",
          "status-pending": status === "Pendente",
          "status-rejected": status === "Recusado",
        };
      },
      translateStatus(status) {
        switch(status) {
            case 'accepted':
                return 'Confirmado';
            case 'pending':
                return 'Pendente';
            case 'rejected':
                return 'Recusado';
            default:
                return status;
        }
      },
    },
    mounted() {
      this.fetchMatches();
    },
  };
  </script>
  
  <style scoped>
  .matches-history {
    padding: 20px;
    margin-top: 30px;
    background-color: #212121;
    color: white;
    min-height: 100vh;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
  }
  
  .filters {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .search-container {
    position: relative;
    width: 300px;
  }
  
  .search-input {
    text-align: center;
    padding: 10px 40px 10px 40px;
    width: 72%;
    border-radius: 25px;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: #333;
    color: #fff;
  }
  
  .search-icon {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    font-size: 20px;
    color: #fff;
  }
  
  .search-input::placeholder {
    color: #ccc;
  }
  
  .search-input:focus {
    background-color: #444;
  }
  
  .matches-list {
    max-width: 900px;
    margin: 0 auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    text-align: left;
    padding: 12px;
    border-bottom: 1px solid #444;
  }
  
  th {
    background-color: #333;
  }
  
  .view-profile-button {
    padding: 8px 12px;
    background-color: #4caf50;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .view-profile-button:hover {
    background-color: #45a049;
  }
  
  .disabled-button {
    padding: 8px 12px;
    background-color: #666;
    border: none;
    border-radius: 5px;
    color: #ccc;
    cursor: not-allowed;
  }
  
  .status-confirmed {
    color: #4caf50;
  }
  
  .status-pending {
    color: #ff9800;
  }
  
  .status-rejected {
    color: #f44336;
  }
  
  td {
    color: #fff;
  }
  
  .title {
    margin-top: 100px;
  }
  </style>
