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
          <colgroup>
            <col style="width: 30%;">
            <col style="width: 20%;">
            <col style="width: 20%;">
            <col style="width: 30%;">
          </colgroup>
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
                <div
                  class="actions-dropdown"
                  @click.stop="toggleDropdown(match.id)"
                >
                  <span class="ellipsis">&#x22EE;</span>
                  <div v-if="dropdownOpen[match.id]" class="dropdown-menu">
                    <button
                      v-if="match.status === 'Confirmado'"
                      @click="goToUserProfile(match.username)"
                      class="dropdown-button"
                    >
                      Ver Perfil
                    </button>
                    <button
                      v-else
                      class="dropdown-button disabled"
                      disabled
                    >
                      Indisponível
                    </button>
                    <button
                      @click="revokeDuo(match.id)"
                      class="dropdown-button revoke-button"
                    >
                      Revogar Duo
                    </button>
                  </div>
                </div>
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
  import { getMatchesHistory, revokeMatch } from "@/api";
  
  export default {
    data() {
      return {
        matches: [],
        search: "",
        dropdownOpen: {},
      };
    },
    computed: {
      filteredMatches() {
        return this.matches.filter(
          (match) =>
            match.status.toLowerCase() !== "recusado" && // Exclui 'Recusado'
            (match.nick.toLowerCase().includes(this.search.toLowerCase()) ||
              match.status.toLowerCase().includes(this.search.toLowerCase()))
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
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
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
        switch (status) {
          case "accepted":
            return "Confirmado";
          case "pending":
            return "Pendente";
          case "rejected":
            return "Recusado";
          default:
            return status;
        }
      },
      toggleDropdown(matchId) {
        this.dropdownOpen = { [matchId]: !this.dropdownOpen[matchId] };
      },
      closeDropdowns() {
        this.dropdownOpen = {};
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.closeDropdowns();
        }
      },
      async revokeDuo(matchId) {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado");
          return;
        }
        try {
          const response = await revokeMatch(matchId, token);
          if (response.status === 200) {
            // Atualiza o status do match para 'Recusado'
            const match = this.matches.find((m) => m.id === matchId);
            if (match) {
              match.status = "Recusado";
            }
          } else {
            console.error("Erro ao revogar duo:", response.data);
          }
        } catch (error) {
          console.error("Erro ao revogar duo:", error);
        }
      },
    },
    mounted() {
      this.fetchMatches();
      document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
      document.removeEventListener("click", this.handleClickOutside);
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
    table-layout: fixed;
  }
  
  th,
  td {
    padding: 12px;
    border-bottom: 1px solid #444;
    word-wrap: break-word;
  }
  
  th {
    background-color: #333;
  }
  
  /* Alinhamento da coluna "Nick" à esquerda */
  th:nth-child(1),
  td:nth-child(1) {
    text-align: left;
  }
  
  /* Alinhamento das colunas "Status" e "Data" ao centro */
  th:nth-child(2),
  td:nth-child(2),
  th:nth-child(3),
  td:nth-child(3) {
    text-align: center;
  }
  
  /* Alinhamento da coluna "Ações" à direita */
  th:nth-child(4),
  td:nth-child(4) {
    text-align: right;
  }
  
  .status-confirmed {
    color: #4caf50;
    font-weight: bold;
  }
  
  .status-pending {
    color: #ff9800;
    font-weight: bold;
  }
  
  .status-rejected {
    color: #f44336;
    font-weight: bold;
  }
  
  td {
    color: #fff;
  }
  
  .title {
    margin-top: 100px;
  }
  
  /* Styles for actions dropdown */
  .actions-dropdown {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  
  .ellipsis {
    font-size: 24px;
    color: #fff;
  }
  
  .dropdown-menu {
    position: absolute;
    right: 0;
    background-color: #222;
    padding: 10px;
    border: 1px solid #444;
    border-radius: 5px;
    z-index: 1000;
    min-width: 150px;
  }
  
  .dropdown-button {
    display: block;
    background: none;
    border: none;
    color: #fff;
    padding: 8px;
    text-align: left;
    width: 100%;
    cursor: pointer;
    font-size: 14px;
  }
  
  .dropdown-button:hover {
    background-color: #333;
  }
  
  .dropdown-button.disabled {
    color: #666;
    cursor: not-allowed;
  }
  
  .revoke-button {
    color: #f44336;
  }
  </style>
  