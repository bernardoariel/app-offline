<script lang="ts" setup>
import SidebarMenu from './SidebarMenu.vue';
import SidebarRight from './SidebarRight.vue';
import useActuacion from '../composables/useActuacion';
import MyCalendar from './elementos/MyCalendar.vue';
import { ref, onMounted, watch } from 'vue';

const { fechaCreacion, toogleDateActuacion } = useActuacion();
const showCalendar = ref(false);

onMounted(() => toogleDateActuacion());

const toggleCalendar = () => {
  showCalendar.value = !showCalendar.value;
};

// Convertir `fechaCreacion` a `Date`
const today = ref<Date | null>(fechaCreacion.value ? new Date(fechaCreacion.value) : null);

watch(fechaCreacion, (newValue) => {
  today.value = newValue ? new Date(newValue) : null;
});
</script>

<template>
  <Toolbar>
    <template #start>
      <SidebarMenu icono="pi-microsoft" position="left" color-icono="primary" />
    </template>

    <template #center>
      <div v-if="today" class="flex align-items-center gap-2">
        <div class="text-3xl">Actuación en fecha:</div>
        <MyCalendar v-model="today"/>
      </div>
      <div v-else class="p-d-flex p-flex-column text-3xl">Actuaciones</div>
    </template>
    <template #end>
      <SidebarRight icono="pi-bars" position="right" color-icono="secondary" />
    </template>
  </Toolbar>
</template>
