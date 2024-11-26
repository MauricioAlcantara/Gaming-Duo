<template>
  <div
    class="custom-select"
    :class="{ 'open': dropdownOpen }"
  >
    <div class="selected-option" @click="toggleDropdown">
      <img :src="selectedOption.image" class="role-icon" v-if="selectedOption.image" />
      {{ selectedOption.text }}
    </div>
    <div class="dropdown" v-if="dropdownOpen">
      <div
        class="option"
        v-for="(option, index) in filteredOptions"
        :key="option.value"
        @click.stop="selectOption(option)"
        :class="{ 'even': index % 2 === 0, 'odd': index % 2 !== 0, 'selected': option.value === selectedOption.value }"
      >
        <img :src="option.image" class="role-icon" v-if="option.image" />
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FuncaoSelect',
  props: {
    options: Array,
    modelValue: String
  },
  data() {
    return {
      dropdownOpen: false,
      selectedOption: this.options.find(option => option.value === this.modelValue) || this.options[0]
    };
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option => option.value !== 'Não Selecionado');
    }
  },
  watch: {
    modelValue(newValue) {
      this.selectedOption = this.options.find(option => option.value === newValue) || this.options[0];
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    closeDropdown(event) {
      if (this.$el && !this.$el.contains(event.target)) {
        this.dropdownOpen = false;
      }
    },
    selectOption(option) {
      if (option.value === this.selectedOption.value) {
        this.$emit('update:modelValue', 'Não Selecionado');
      } else {
        this.$emit('update:modelValue', option.value);
      }
      this.dropdownOpen = false;
    }
  }
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 200px;
  padding: 10px;
  background-color: #333;
  color: white;
  border: 1px solid #444;
  border-radius: 6px;
  cursor: pointer;
  transition: border-radius 0.3s ease;
}

.custom-select.open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.selected-option {
  display: flex;
  align-items: center;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: -1px;
  width: 100%;
  background-color: #333;
  border: 1px solid #444;
  border-top: none;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.option {
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.option.even {
  background-color: #444;
}

.option.odd {
  background-color: #333;
}

.option.selected {
  background-color: #666;
}

.option:hover {
  background-color: #555;
}

.role-icon {
  width: 20px;
  height: 20px;
  margin-right: 6px;
}
</style>
