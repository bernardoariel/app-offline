<script setup lang="ts">
import { RouterView } from 'vue-router'

</script>

<template>
  
  <RouterView v-slot="{ Component, route }"> 

    <keep-alive>
      <component :is="Component" :key="route.name" />
    </keep-alive>

  </RouterView>

</template>
<style>
html {
  font-size: 14px; /* Menor que el predeterminado de 16px */
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


