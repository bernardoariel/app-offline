<script setup lang="ts">
import { usePrimeVue } from 'primevue/config';
import useThemeColor from '@/composables/useThemeColor';

const PrimeVue = usePrimeVue();
const { themesLight, currentTheme, changeThemeCurrent } = useThemeColor();

const toggleTheme = (newThemeName: string) => {
  PrimeVue.changeTheme(currentTheme.value.name, newThemeName, 'theme-link', () => {
    changeThemeCurrent(newThemeName);
  });
};
</script>

<template>
  <section class="theme-selector">
    <span class="title">Colores</span>
    <div class="theme-row">
      <Tag 
        v-for="(theme, index) in themesLight" 
        :key="index" 
        @click="toggleTheme(theme.name)" 
        :style="{ backgroundColor: theme.color }"
        :value="theme.name"
        :title="theme.name"
      >
      </Tag>
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

</style>
