<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePrimeVue } from 'primevue/config';
import useTheme from '@/composables/useTheme';

const PrimeVue = usePrimeVue();
const { themesLight, currentTheme, changeThemeCurrent } = useTheme();

const isDark = ref<boolean>(currentTheme.value.isDark);

const toggleTheme = (newThemeName: string) => {
  PrimeVue.changeTheme(currentTheme.value.name, newThemeName, 'theme-link', () => {
    changeThemeCurrent(newThemeName);
  });
};

watch(currentTheme, (newValue) => {
  isDark.value = newValue.isDark;
});
</script>

<template>
  <section class="theme-selector">
    <span class="title">Colores</span>
    <Tag class="mb-3"
      :value="currentTheme.name"
      :title="currentTheme.name"
    />
    <div class="theme-row">
      <Button 
        v-for="(theme, index) in themesLight" 
        :key="index" 
        @click="toggleTheme(theme.name)" 
        :style="{ backgroundColor: theme.color }"
        :value="theme.name"
        :title="theme.name"
        :class="{ 'selected': currentTheme.name === theme.name }"
      >
      </Button>
    </div>
  </section>
</template>

<style scoped>
.theme-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.theme-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px; /* Espacio entre los botones */
}

.theme-tag {
  width: 30px;
  height: 30px;
  padding: 0;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;
}

.theme-tag.selected {
  border: 2px solid #000; /* Ajusta el estilo para indicar el tema seleccionado */
  transform: scale(1.1); /* Ajuste visual para resaltar el tema seleccionado */
}
</style>
