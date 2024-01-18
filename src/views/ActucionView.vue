<script lang="ts" setup>
import CardsActuacion from '@/components/CardsActuacion.vue';
import  {actuaciones} from '@/data/tipoActuaciones';
import type { Actuacion } from '@/interfaces/tipoActuaciones.interface';
import { useRoute } from 'vue-router';


const {params} = useRoute();
const atributosActuacion: Actuacion | undefined = actuaciones[params.actuacion as string];
const { tarjetas } = atributosActuacion;
const tarjetasKeys: (keyof typeof tarjetas)[] = Object.keys(tarjetas);





</script>

<template>
  <div class="grid">
    <div class="col">
      <CardsActuacion v-for="key in tarjetasKeys" :key="key" :tarjeta="tarjetas[key]" class="mb-2"/>

    </div>

    <div class="col">
      <div class="text-center p-3 border-round-sm bg-primary font-bold">3</div>
    </div>
  </div>
</template>

