<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SidebarMenu from './SidebarMenu.vue';
import SidebarRight from './SidebarRight.vue';
import { ref, watch, onActivated } from 'vue';

const route = useRoute();
const isNewActuacion = ref(false);
const today = ref<Date | null>(null);

onActivated(() => {
  checkRoute();
});

watch(route, () => {
  checkRoute();
});

const checkRoute = () => {
  isNewActuacion.value = route.name === 'newActuacion';
};
</script>

<template>
  <Toolbar>
    <template #start>
      <SidebarMenu icono="pi-microsoft" position="left" color-icono="primary" />
    </template>

    <template #center>
      <div
        v-if="route.name === 'actuaciones'"
        class="flex align-items-center gap-2"
      >
        <div class="text-3xl">Actuaciones</div>
      </div>
      <div v-else-if="isNewActuacion" class="p-d-flex p-flex-column text-3xl">
        Nueva Actuación
      </div>
      <div v-else class="p-d-flex p-flex-column text-3xl">
        Edición de actuación
      </div>
    </template>

    <template #end>
      <SidebarRight icono="pi-bars" position="right" color-icono="secondary" />
    </template>
  </Toolbar>
</template>
