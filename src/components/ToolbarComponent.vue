<script lang="ts" setup>
import SidebarMenu from './SidebarMenu.vue';
import SidebarRight from './SidebarRight.vue';
import useActuacion from '../composables/useActuacion';
import { onMounted } from 'vue';

const {fechaCreacion,toogleDateActuacion,refreshDate} = useActuacion()
onMounted(()=>toogleDateActuacion())

const toogleDate = () =>{
  refreshDate()
}
</script>
<template>
     <Toolbar>
      <template #start>
        <SidebarMenu  icono="pi-microsoft" position="left" color-icono="primary" />
      </template>

      <template #center>
       
        <div v-if="fechaCreacion"  class="flex align-items-center ">
          <div class="text-3xl"> Denuncia en fecha:</div>
          <div class="text-3xl ml-5">{{ fechaCreacion }}</div>
          <div class="flex items-center ml-3">
            <Button icon="pi pi-calendar" severity="primary" text rounded />
            <Button @click="toogleDate()"  icon="pi pi-refresh" severity="primary" text rounded />
          </div>
        </div>
        <div v-else class="p-d-flex p-flex-column text-3xl">Actuaciones</div>
     
      </template>

    <template #end>
        <SidebarRight  icono="pi-bars" position="right" color-icono="secondary"/>
      </template>
    </Toolbar>
</template>



