
<script setup lang="ts">

import ButtonOptions from '@/components/ButtonOptions.vue'
import useActuacion from '@/composables/useActuacion';
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import DataView from "primevue/dataview";
import { useRoute } from 'vue-router';
const {params} = useRoute();
// let { afectados } = useActuacion( params.actuacion as string  )
const afectados:any = []
const editProduct = (productId) => {
    // Lógica para editar el producto con el ID proporcionado
};

const deleteProduct = (productId) => {
    // Lógica para eliminar el producto con el ID proporcionado
};

const copyProduct = (productId) => {
    // Lógica para copiar el producto con el ID proporcionado
};
</script>

<template>
    <div class="card">
      <DataView :value="afectados" v-if="afectados.length > 0">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
              <div class="flex flex-column xl:flex-row xl:align-items-start p-1 flex-wrap" :class="{ 'border-top-1 surface-border': index !== 0 }">
  
                <!-- Icono de lápiz y nombre centrados verticalmente sin gap -->
                <div class="flex align-items-center">
                  <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
                  <p class="text-xl pl-2">{{ item.name }}</p>
                </div>
  
                <!-- Tipo en un tag sin gap -->
                <Tag :value="item.type" class="mt-3 pl-2 ml-5" :severity="getColorByAfectado(item)"></Tag>
  
                <!-- Icono de desbordamiento (ellipsis) -->
                <div class="flex items-center ml-auto mt-1">
                <ButtonOptions />
              </div>
  
                <!-- Descripción con margen izquierdo de 2 unidades sin gap -->
                <div class="w-full" style="margin-top: -30px; margin-left: 55px">
                  <p class="text-xs">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
      <div v-else>
  <p>No hay opciones disponibles.</p>
</div>
    </div>
  </template>
  
