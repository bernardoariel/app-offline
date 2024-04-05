<script lang="ts" setup>
import SidebarMenu from './SidebarMenu.vue';
import SidebarRight from './SidebarRight.vue';


</script>
<template>
     <Toolbar>
      <template #start>
        <SidebarMenu  icono="pi-microsoft" position="left" color-icono="primary" />
      </template>

      <template #center>
        <h2>Sumario por Oficio</h2>
      </template>

    <template #end>
        <SidebarRight  icono="pi-bars" position="right" color-icono="secondary"/>
      </template>
    </Toolbar>
</template>



