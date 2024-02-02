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



