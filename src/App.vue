<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterView, useRoute } from 'vue-router'


import { usePrimeVue } from 'primevue/config';
import ToolbarComponent from './components/ToolbarComponent.vue';
import useThemeColor from './composables/useThemeColor';
import { useFontSize } from './composables/useFontSize';

const PrimeVue = usePrimeVue();
const { changeThemeCurrent } = useThemeColor()
const { loadFontSize } = useFontSize(); 
const isLoading = ref(false);
const themeLink = document.querySelector('link#theme-link');
const route = useRoute()
if (themeLink) {
    // Verificar si el atributo href está presente y no está vacío
    const themeHref = themeLink.getAttribute('href');

    if (themeHref) {
        // El CSS del tema se ha cargado correctamente
        console.log('El tema se ha cargado correctamente:', themeHref);
    } else {
        console.error('El atributo href del enlace del tema está vacío.');
    }
} else {
    console.error('No se encontró el enlace del tema en el DOM.');
}



onMounted(() => {
  
  loadFontSize();
  // Cargar el nombre del tema del almacenamiento local
  const savedTheme = localStorage.getItem('currentTheme');
  const themeName = savedTheme ? JSON.parse(savedTheme).name : 'lara-light-blue';
  changeThemeCurrent(themeName);
  
 
  // Aplicar el tema utilizando PrimeVue.changeTheme
  PrimeVue.changeTheme('lara-light-blue', themeName, 'theme-link', () => {
    isLoading.value = false; 
  }); 
});
</script>

<template>
  <div v-if="!isLoading">
    <template v-if="route.name !== 'denegado'">
        <div class="toolbar-container">
          <ToolbarComponent />
        </div>
      </template>
    <div class="router-view-container">
      <RouterView v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </RouterView>
    </div>
  </div>
  
  <div v-else class="loader-container">
    <ProgressSpinner style="width:100px; height: 100px" strokeWidth="5" fill="var(--surface-ground)"
      animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    <h1 class="loading-message">Iniciando sistema offline...</h1>
  </div>
</template>

<style>
html {
  font-size: 14px;
}
body {
  font-family: var(--font-family);
  font-weight: normal;
  background: var(--surface-ground);
  color: var(--text-color);
  padding: 1rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
p {
  line-height: 1.75;
}
.toolbar-container .p-toolbar {
  width: 100%;
  margin: 0;
  border-radius: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
.p-toolbar {
  padding: 0.5rem;
}
.router-view-container {
  margin-top: 70px;
}
.button {
  width: 2rem;
  height: 2rem;
  padding: 0;
  position: relative;
}
.button .pi {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.p-button.p-button-icon-only.p-button-rounded {
  border-radius: 50%;
  height: auto;
}
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loading-message {
  margin-top: 1rem;
}
</style>
