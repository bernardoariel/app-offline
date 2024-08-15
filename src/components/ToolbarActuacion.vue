<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SidebarMenu from './SidebarMenu.vue';
import SidebarRight from './SidebarRight.vue';
import useActuacion from '../composables/useActuacion';
import MyCalendar from './elementos/MyCalendar.vue';
import { ref, watch, onActivated } from 'vue';
import useItem from '@/composables/useItems';
import useDatosLegales from '@/composables/useDatosLegales';
import useFieldState from '@/composables/useFieldsState';
import useDatosDiligencia from '@/composables/useDatosDiligencia';
import useActuacionData from '@/composables/useActuacionData';

const route = useRoute();
const { fechaCreacion, setFechaCreacion } = useActuacion();
const { setAll } = useItem();
const { addDataFake, nroLegajo } = useDatosLegales();
const { markNewRecordCreated } = useFieldState();
const { relato } = useDatosDiligencia('sumario-denuncia');
const { actuacionData } = useActuacionData();
const showCalendar = ref(false);
const today = ref<Date | null>(null);

onActivated(() => {
  checkRoute();
});

watch(fechaCreacion, (newValue) => {
  today.value = newValue ? new Date(newValue) : null;
});

watch(route, () => {
  checkRoute();
});

const checkRoute = () => {
  showCalendar.value =
    route.name !== 'actuaciones' && route.name !== 'editActuacion';
};
const actualizarFechaCreacion = (fechaSeleccionada: Date) => {
  setFechaCreacion(fechaSeleccionada);
};

const handleClick = (event: { ctrlKey: any; altKey: any }) => {
  if (event.ctrlKey && event.altKey) {
    setAll();
    addDataFake();
    markNewRecordCreated();
    relato.value = 'esto es una prueba del relato';
  }
};
</script>

<template>
  <Toolbar class="toolbar-custom">
    <template #start>
      <div class="flex">
        <Button
          label="Cancelar"
          icon="pi pi-arrow-circle-left"
          severity="secondary"
          rounded
          @click="$router.replace({ name: 'actuaciones' })"
        />
        <small
          :class="{
            'text-orange-500': !nroLegajo,
            'text-gray-500': nroLegajo,
          }"
          class="text-sm font-bold"
        >
          <i class="">{{ actuacionData?.datosLegales?.items[0] }}</i>
          {{ nroLegajo ? ': ' + nroLegajo : '' }}
        </small>
      </div>
    </template>

    <template #center>
      <div
        class="font-medium text-center text-3xl text-900"
        @click="handleClick"
      >
        <div class="text-3xl font-bold">
          {{ actuacionData?.titulo }}
        </div>
      </div>
    </template>

    <template #end>
      <div class="header-end">
        <MyCalendar
          v-if="showCalendar"
          v-model="today"
          :fechaDesde="null"
          :fechaHasta="'today'"
          @update:modelValue="actualizarFechaCreacion"
        />
        <Button label="Registrar" class="p-button" severity="warning" />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: #f8f9fa;
}

.header-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.cancel-button {
  background-color: #5a5a5a;
  color: white;
}

.header-end {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-end .ml-2 {
  margin-left: 1rem;
}

.flex {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
