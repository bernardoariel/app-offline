<script setup lang="ts">
import DataView from "primevue/dataview";

import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import ButtonOptions from '@/components/ButtonOptions.vue'

import { getComposableForType } from "@/composables/composableFactory";
import { getTitleCase, getUpperCase } from "@/helpers/stringUtils";

interface Props {
  itemsCardValue: { titulo: string; valor: string[] | null };
  itemKey: string;
}

/* construccion del titulo */
const {itemsCardValue,itemKey} = defineProps<Props>();


const composable = getComposableForType(itemKey);
const items = composable.items;
// console.log('itemCardValue::: ', itemsCardValue);

// let { afectados } = useActuacion( params.actuacion as string  )
// let itemsCardValue:any[] = [];
const editProduct = (productId:any) => {
    // Lógica para editar el producto con el ID proporcionado
};

const deleteProduct = (productId:any) => {
    // Lógica para eliminar el producto con el ID proporcionado
};

const copyProduct = (productId:any) => {
    // Lógica para copiar el producto con el ID proporcionado
};
</script>

<template>
      <div v-if="items && items.length !==0">
      
      <DataView :value="items" dataKey="id">
        <template #list="slotProps">
          <div class="grid grid-nogutter">
            <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
              <div 
                class="flex flex-column xl:flex-row xl:align-items-start p-1 flex-wrap" 
                :class="{ 'border-top-1 surface-border': index !== 0 }">
  
                <!-- Icono de lápiz y nombre centrados verticalmente sin gap -->
                <div class="flex align-items-center">
                  <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
                  <span class="font-bold">{{ item.apellido ? getUpperCase(item.apellido) + ',' : '' }}</span>
                  <span class="ml-2">{{ item.name ? getTitleCase(item.name) : 'Nuevo' }}</span>
                  <span v-if="item.typeDocumento && item.nroDocumento" class="ml-5">
                    <i>{{ item.typeDocumento.name + ': ' }}</i>
                    <i>{{ item.nroDocumento }}</i>
                  </span>
                </div>
                <!-- Tipo en un tag sin gap -->
                <span v-if="item.typeAfectado && item.typeAfectado.name" class="ml-5">
                <Tag  :value="item.typeAfectado.name" class="mt-2 ml-5" :severity="getColorByAfectado(item.typeAfectado.name)"></Tag>
                  </span>
                <!-- Icono de desbordamiento (ellipsis) -->
                <div class="flex items-center ml-auto mt-1">
                <ButtonOptions :tarjetaNombre="itemKey" :item="item"/>
              </div>
  
                <!-- Descripción con margen izquierdo de 2 unidades sin gap -->
                <div class="w-full" style="margin-top: -30px; margin-left: 55px">
                  <p class="text-xs">{{ item.domicilioResidencia }}</p>
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
