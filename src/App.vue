<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router'
import SidebarMenu from './components/SidebarMenu.vue';
const visible = ref(false);

</script>

<template>
  <div class="toolbar-container">
    <Toolbar>
      <template #start>
        <SidebarMenu  icono="pi-microsoft" position="left" color-icono="warning" />
        <!-- <SidebarMenu  icono="pi-microsoft" position="left" color-icono="warning"/> -->
      </template>

      <template #center>
        <h2>Sumario por Oficio</h2>
      </template>

   <!--    <template #end>
        <SidebarMenu  icono="pi-wrench" position="right" color-icono="primary"/>
      </template> -->
    </Toolbar>
  </div>
  <div class="router-view-container">
    <RouterView v-slot="{ Component, route }"> 
        <keep-alive>
          <component :is="Component" :key="route.name" />
        </keep-alive>

    </RouterView>
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
  width: 100%; /* Asegura que el Toolbar ocupe toda la anchura */
  margin: 0; /* Elimina cualquier margen externo */
  border-radius: 0; /* Elimina los bordes redondeados */
  position: fixed; /* Mantiene el Toolbar fijo en la parte superior */
  top: 0;
  left: 0;
  z-index: 1000; /* Asegura que el Toolbar se mantenga sobre otros elementos */
  
}
.p-toolbar{
  padding: 0.5rem;
}
.router-view-container {
  margin-top: 70px; /* Ajusta este valor según sea necesario */
}

.button {
  width: 2rem;
  height: 2rem;
  padding: 0;
  position: relative; /* Establece la referencia para el posicionamiento absoluto del ícono */
}

.button .pi {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centrado preciso */
}
.p-button.p-button-icon-only.p-button-rounded {
    border-radius: 50%;
    height: auto;
}
</style>


