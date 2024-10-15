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
      <div v-if="route.name === 'actuaciones'" class="flex align-items-center gap-2">
        <div class="text-3xl">Actuaciones</div>
      </div>
      <div v-else-if="isNewActuacion" class="p-d-flex p-flex-column text-3xl">
        Nueva Actuación
      </div>
      <div v-else class="p-d-flex p-flex-column text-3xl">
        Edición de actuación
      </div>
    </template>

    <!-- <template #end>
      <SidebarRight icono="pi-bars" position="right" color-icono="secondary" />
    </template> -->
    <template #end>
      <div v-tooltip.bottom="{
        value: 'Se ha perdido la conexión a internet. Es posible que algunas funcionalidades no esten disponibles. Solamente podrá crear actuaciones de manera offline, y requerirá de su parte subirlas al Online.',
        pt: {
          arrow: {
            style: {
              borderBottomColor: 'var(--primary-color)'
            }
          },
          text: 'bg-primary font-medium'
        }
      }" class="flex justify-center align-items-center mr-5">
        <i class="pi pi-wifi" style="font-size: 2rem; position: relative">
          <span style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          width: 2.3rem;
          height: 2px;
          background-color: #343a40;">
          </span>
        </i>
        <span class="ml-2 md:block hidden">Modo Offline</span>
      </div>
    </template>
  </Toolbar>
</template>
