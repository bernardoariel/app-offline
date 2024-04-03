<script setup lang="ts">
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import useThemeColor from '@/composables/useThemeColor';

const PrimeVue = usePrimeVue();
const { themesLight,currentTheme,changeThemeCurrent } = useThemeColor()
const toggleTheme = (newThemeName: string) => {
 
  PrimeVue.changeTheme(currentTheme.value.name, newThemeName, 'theme-link', () => {
    console.log("Tema cambiado a:", newThemeName);
  });
   // Luego actualiza el estado global de tu tema en la aplicación.
   changeThemeCurrent(newThemeName);
}



</script>
<template>
   <section class="theme-selector">
    <span class="title">Colores</span>
    <div class="theme-row">
      
      <button 
        v-for="(theme, index) in themesLight" 
        :key="index" 
        @click="toggleTheme(theme.name)" 
        class="theme-button" 
        :style="{ backgroundColor: theme.color }"
        :title="theme.name"> 
      </button>
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

.theme-button {
  width: 30px;
  height: 30px;
  padding: 0;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
</style>