<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import  {actuaciones} from '@/data/tipoActuaciones';
import type { Actuacion } from '@/interfaces/tipoActuaciones.interface';
import DataViewCard from '@/components/DataViewCard.vue';

import { getComposableForType } from '@/composables/composableFactory';

const { params } = useRoute();
const atributosActuacion: Actuacion | undefined = actuaciones[params.actuacion as string];
const { tarjetas } = atributosActuacion;

const tarjetasKeys: (keyof typeof tarjetas)[] = Object.keys(tarjetas);


const nuevoItem = ref({
  id: '1200',
  name: 'Nuevo Afectado',
  description: 'Ubicación desconocida',
  type: 'Desconocido',
});

const agregarNuevoItem = (key: string) => {
  const composable = getComposableForType(key);
  composable.agregar(nuevoItem.value);
};
</script>

<template>
  <div class="grid">
    <div class="col-5">
      
      <Card :pt="{ title: { class: 'custom-title' }, content: { style: 'padding: 0!important;' } }" class="p-fluid mb-2" v-for="key in tarjetasKeys" :key="key" :tarjeta="tarjetas[key]">
        <template #title>
          <div class="title-container">
            <span class="custom-title">{{ tarjetas[key].titulo }}</span>
            
            <Button icon="pi pi-plus" severity="secondary" rounded outlined @click="agregarNuevoItem(key)"/>
          </div>
        </template>
        <template #content >
           <DataViewCard  :itemsCardValue="tarjetas[key]" :itemKey="key" />
        </template>
      </Card>
    </div>

    <div class="col">
      <div class="text-center p-3 border-round-sm bg-primary font-bold">3</div>
    </div>
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
}
.custom-title {
  font-size: 28px; /* Ajusta el tamaño de la fuente según tus preferencias */
  font-weight: 500; /* Puedes ajustar el peso de la fuente según tus preferencias */
  color: #333; /* Cambia el color del texto según tus preferencias */
  /* Otros estilos que desees aplicar al título */
}
</style>