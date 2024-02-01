<script setup lang="ts">
import DataView from "primevue/dataview";

import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import ButtonOptions from '@/components/ButtonOptions.vue'

import { getComposableForType } from "@/composables/composableFactory";

interface Props {
  itemsCardValue: { titulo: string; valor: (string[] | null) };
  itemKey:string
} 
/* const getComposableForType = (type: string) => {

  switch (type) {
    case 'afectados':
      return useAfectados;
    case 'vinculados':
      return useVinculados;
    case 'fecha':
      return useFecha;
    case 'efectos':
      return useEfectos;
    case 'personalInterviniente':
      return useInterviniente;
    default:
      throw new Error(`getComposableForType Tipo de elemento desconocido: ${type}`);
  }
}; */
/* construccion del titulo */
const {itemsCardValue,itemKey} = defineProps<Props>();


const composable = getComposableForType(itemKey);
const items = composable.items;
// console.log('itemCardValue::: ', itemsCardValue);

// let { afectados } = useActuacion( params.actuacion as string  )
// let itemsCardValue:any[] = [];
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
      <div v-if="items.length !==0">
      
      <DataView :value="items">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
              <div 
                class="flex flex-column xl:flex-row xl:align-items-start p-1 flex-wrap" 
                :class="{ 'border-top-1 surface-border': index !== 0 }">
  
                <!-- Icono de lápiz y nombre centrados verticalmente sin gap -->
                <div class="flex align-items-center">
                  <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
                  <p class="text-xl pl-2">{{ item.name }}</p>
                </div>
  
                <!-- Tipo en un tag sin gap -->
                <Tag :value="item.type" class="mt-3 ml-5" :severity="getColorByAfectado(item.type)"></Tag>
  
                <!-- Icono de desbordamiento (ellipsis) -->
                <div class="flex items-center ml-auto mt-1">
                <ButtonOptions :tarjetaNombre="itemKey" :item="item"/>
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
      <div v-else class="flex justify-content-end">
      <span class="text-right">No existen  nadda</span>
      </div>
    
</template>
  
<style scoped>
.card {
  display: flex;
  justify-content: space-between;
}

.hidden-card {
  display: none;
}
</style>
