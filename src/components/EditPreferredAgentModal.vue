<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>Agente Preferido</h2>
      <div class="agent-selection">
        <div v-for="agent in agents" :key="agent.name" class="agent-card" @click="selectAgent(agent)">
          <img :src="agent.image" :alt="agent.name" :class="{'agent-image': true, 'selected': selectedAgent === agent.name}">
        </div>
      </div>
      <div class="button-group">
        <button @click="save">Salvar</button>
        <button @click="close">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditPreferredAgentModal',
  data() {
    return {
      selectedAgent: '',
      agents: [
        { name: 'BRIMSTONE', image: '/images/brimstone.png' },
        { name: 'PHOENIX', image: '/images/phoenix.png' },
        { name: 'SAGE', image: '/images/sage.png' },
        { name: 'SOVA', image: '/images/sova.png' },
        { name: 'VIPER', image: '/images/viper.png' },
        { name: 'CYPHER', image: '/images/cypher.png' },
        { name: 'REYNA', image: '/images/reyna.png' },
        { name: 'KILLJOY', image: '/images/killjoy.png' },
        { name: 'BREACH', image: '/images/breach.png' },
        { name: 'OMEN', image: '/images/omen.png' },
        { name: 'JETT', image: '/images/jett.png' },
        { name: 'RAZE', image: '/images/raze.png' },
        { name: 'SKYE', image: '/images/skye.png' },
        { name: 'YORU', image: '/images/yoru.png' },
        { name: 'ASTRA', image: '/images/astra.png' },
        { name: 'KAY/O', image: '/images/kayo.png' },
        { name: 'CHAMBER', image: '/images/chamber.png' },
        { name: 'NEON', image: '/images/neon.png' },
        { name: 'FADE', image: '/images/fade.png' },
        { name: 'HARBOR', image: '/images/harbor.png' },
        { name: 'GEKKO', image: '/images/gekko.png' },
        { name: 'DEADLOCK', image: '/images/deadlock.png' },
        { name: 'ISO', image: '/images/iso.png' },
        { name: 'CLOVE', image: '/images/clove.png' },
      ]
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    selectAgent(agent) {
      this.selectedAgent = agent.name;
    },
    save() {
      if (this.selectedAgent) {
        this.$emit('save', this.selectedAgent);
        this.close();
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #171717;
  padding: 20px;
  border-radius: 10px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 400px;
}

.agent-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  border: 1px solid #f90404;
  padding: 6px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.agent-card {
  background: #222;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.agent-card:hover .agent-image {
  transform: scale(1.1);
}

.agent-image {
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.agent-image.selected {
  transform: scale(1.1);
  border: 2px solid #45a049;
}

.button-group {
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
}

.modal-content button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  width: 100px;
  border-radius: 5px;
  font-size: 12px;
  transition: background-color 0.3s ease;
}

.modal-content button:first-of-type {
  background-color: #4caf50;
}

.modal-content button:first-of-type:hover {
  background-color: #45a049;
}

.modal-content button:last-of-type {
  background-color: #f44336;
}

.modal-content button:last-of-type:hover {
  background-color: #d32f2f;
}
</style>
