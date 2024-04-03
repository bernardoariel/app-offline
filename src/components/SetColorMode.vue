<script setup lang="ts">
import { watch,  computed, ref } from 'vue';
import useThemeColor from '@/composables/useThemeColor';
import { usePrimeVue } from 'primevue/config';

const PrimeVue = usePrimeVue();
const {currentTheme,changeThemeCurrent } = useThemeColor();
const isDark = ref<boolean>(currentTheme.value.isDark);

watch(isDark, (newValue, oldValue) => {
  // Aquí debes iniciar themeName con el valor actual del tema, no como una cadena vacía.
  let themeName: string = currentTheme.value.name;

  // Cambia entre 'dark' y 'light' en el nombre del tema.
  if (themeName.includes('dark')) {
    themeName = themeName.replace('dark', 'light');
  } else if (themeName.includes('light')) {
    themeName = themeName.replace('light', 'dark');
  }

  // Asume que PrimeVue.changeTheme es una función que necesita ser llamada para cambiar el tema.
  // La sintaxis y lógica exacta pueden variar dependiendo de cómo esté implementada esta función en tu proyecto.
  PrimeVue.changeTheme(currentTheme.value.name, themeName, 'theme-link', () => {
    console.log("Tema cambiado a:", themeName);
    console.log("currentTheme", currentTheme.value);
  });

  // Luego actualiza el estado global de tu tema en la aplicación.
  changeThemeCurrent(themeName);
});

</script>
<template>
  <section
    class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
    <span  class="text-xl font-semibold">DarkMode</span>
  
    <h4><small>{{ currentTheme.hasModeDark ? 'Tiene':'No tiene' }} DarkMode </small></h4>
    <InputSwitch v-model="isDark" :disabled="!currentTheme.hasModeDark" />
    
  </section>

</template>


<style scoped>

</style>