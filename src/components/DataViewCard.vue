
<script setup lang="ts">

import { ref } from "vue";
import ButtonOptions from '@/components/ButtonOptions.vue'
import DataView from "primevue/dataview";

interface Afectados {
    id?: string;
    name: string;
    type: string;
    description:string
}
let data_api = [
                {
                    id: '1000',
                    name: 'Ariel Bernardo',
                    description: 'MZA 82 CASA 2, CP:3600 - Formosa, Formosa, Argentina',
                    type: 'Denunciante y Damnificado'
                  
                },
                {
                    id: '1100',
                    name: 'Juan Forengei',
                    description: 'Stella 1211, CP:2100 - Mendoza, Las Heras, Argentina',
                    type: 'Damnificado'
                  
                },
                {
                    id: '1100',
                    name: 'Juan Forengei',
                    description: 'Stella 1211, CP:2100 - Mendoza, Las Heras, Argentina',
                    type: 'Victima'
                  
                },
                 ]
let afectados = ref<Afectados[]>(data_api)


const getSeverity = (afectados:Afectados) => {
    switch (afectados.type) {
        case 'Denunciante y Damnificado':
            return 'success';

        case 'Damnificado':
            return 'warning';

        case 'Victima':
            return 'danger';

        default:
            return null;
    }
};
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
      <DataView :value="afectados">
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
                <Tag :value="item.type" class="mt-3 pl-2 ml-5" :severity="getSeverity(item)"></Tag>
  
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
    </div>
  </template>
  
