<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SidebarMenu from './SidebarMenu.vue';
import SidebarRight from './SidebarRight.vue';
import useActuacion from '../composables/useActuacion';
import MyCalendar from './elementos/MyCalendar.vue';
import { ref, onMounted, watch } from 'vue';

const route = useRoute();
const { fechaCreacion , setFechaCreacion } = useActuacion();
const showCalendar = ref(false);
const today = ref<Date | null>(null);

onMounted(() => {
  checkRoute();
});

watch(fechaCreacion, (newValue) => {
  today.value = newValue ? new Date(newValue) : null;
});

watch(route, () => {
  checkRoute();
});

const checkRoute = () => showCalendar.value = route.name != 'actuaciones';
const actualizarFechaCreacion = (fechaSeleccionada: Date) => {
  console.log('fechaSeleccionada::: ', fechaSeleccionada);
  setFechaCreacion(fechaSeleccionada);
};
</script>

<template>
  <Toolbar>
    <template #start>
      <SidebarMenu icono="pi-microsoft" position="left" color-icono="primary" />
    </template>

    <template #center>
      <div v-if="showCalendar && today" class="flex align-items-center gap-2">
        <div class="text-3xl">Actuación en fecha:</div>
        <MyCalendar v-model="today" @update:modelValue="actualizarFechaCreacion"/>
      </div>
      <div v-else-if="showCalendar" class="p-d-flex p-flex-column text-3xl">Actuaciones</div>
      <div v-else class="p-d-flex p-flex-column text-3xl">Actuaciones</div>
    </template>

    <template #end>
      <SidebarRight icono="pi-bars" position="right" color-icono="secondary" />

    </template>
  </Toolbar>
</template>
