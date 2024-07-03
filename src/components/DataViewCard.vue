<script setup lang="ts">
import { computed } from "vue";
import DataView from "primevue/dataview";

import ButtonOptions from '@/components/ButtonOptions.vue'
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import { getTitleCase, getUpperCase } from "@/helpers/stringUtils";
import { formatFecha } from "@/helpers/getFormatFecha";
import useActuacion from "@/composables/useActuacion";
import useItemValue from "@/composables/useItemValue";


const props = defineProps<{
  itemsCardValue: { titulo: string; items: any[] };
  dataKey: string; 
}>();

const condicion: boolean = false;
const { agregarNuevoItem} = useActuacion();
const { selectedItem } = useItemValue()


const items = computed(() => {

  if (props.dataKey === 'personalInterviniente') {
    console.log('Items de personalInterviniente:', props.itemsCardValue.items); // Inspecciona específicamente los items de 'fecha'
  }
  return props.itemsCardValue.items;
});

const editProduct = (productId: any) => {
  const itemToEdit = items.value.find(item => item.id === productId);
  selectedItem.value = itemToEdit;
  agregarNuevoItem(props.dataKey);
};

const deleteProduct = (productId:any) => {
    // Lógica para eliminar el producto con el ID proporcionado
};

const copyProduct = (productId:any) => {
    // Lógica para copiar el producto con el ID proporcionado
};

</script>

<template>
  
  <div v-if="items && items.length !== 0">   
    
    <DataView :value="items" dataKey="id">
      
      <template #list="slotProps">
    
            <div v-for="(item, index) in items" :key="index" >
              <!-- Afectados y Vinculados -->
              <div v-if="dataKey=='afectados' || dataKey=='vinculados'">
                
                <div class="flex-container"  :class="{ 'border-top-1 surface-border': index !== 0 }">

                  <div class="flex-items" >
                    <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
                  </div>

                  <div class="flex-items">
                    <span class="font-bold">{{ item.apellido ? getUpperCase(item.apellido) + ',' : '' }}</span>
                    <span class="ml-2">{{ item.nombre ? getTitleCase(item.nombre) : 'Nuevo' }}</span>
                    <span v-if="item.typeDocumento && item.nroDocumento" class="ml-5">
                      <i>{{ item.typeDocumento + ': ' }}</i>
                      <i>{{ item.nroDocumento }}</i>
                    </span>
                    <span v-if="item.typeAfectado && item.typeAfectado" >
                      <Tag :value="item.typeAfectado" class="ml-5" :severity="getColorByAfectado(item.typeAfectado)"></Tag>
                    </span>
                  </div>

                  <div class="flex-items">
                    <ButtonOptions  :tarjetaNombre="item.title" :item="item"/>
                  </div>

                </div> 
                <div class="linea-2"> 
                  <p class="text-xs">{{ item.domicilioResidencia }}</p>
                </div>
              </div>
              <!-- personal Interviniente -->  
             
              <div v-else-if="dataKey === 'personalInterviniente'">

                <div class="flex-container"  :class="{ 'border-top-1 surface-border': index !== 0 }">

                  <div class="flex-items">
                    <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
                  </div>

                  <div class="flex-items">
                    <span class="font-bold">{{ item.apellido ? getUpperCase(item.apellido) + ',' : '' }}</span>
                    <span class="ml-2">{{ item.nombre ? getTitleCase(item.nombre) : 'Nuevo' }}</span>
                    
                    <span v-if="item.jerarquia && item.jerarquia" >
                      <Tag :value="item.jerarquia" class="ml-5" :severity="getColorByAfectado(item.jerarquia)"></Tag>
                    </span>
                  </div>

                  <div class="flex-items">
                    <ButtonOptions :tarjetaNombre="item.title" :item="item"/>
                  </div>

                </div> 
                <div class="linea-2"> 
                  <p class="text-xs">{{ item.dependencia }}</p>
                </div>
              </div>
              <!-- Fecha -->
              <div v-else-if="dataKey=='fecha'">
                <div class="flex-container"  :class="{ 'border-top-1 surface-border': index !== 0 }">

                  <div class="flex-items">
                    <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
                  </div>

                  <div class="flex-items">
                    
                    <span class="font-bold">Entre </span>
                    <span>{{ formatFecha(item.desdeFechaHora) }}</span>
                    <span class="font-bold"> Y </span>
                    <span>{{ formatFecha(item.hastaFechaHora) }}</span>
                    <i class="pi pi-map-marker ml-5" :style="{ color: 'red', opacity: condicion ? 1 : 0.3 }"></i>


                    <span v-if="item.departamento && item.departamento" >
                      <Tag :value="item.departamento" class="ml-2" :severity="getColorByAfectado(item.departamento)"></Tag>
                    </span>

                  </div>

                  <div class="flex-items">
                    <ButtonOptions :tarjetaNombre="item.title" :item="item"/>
                  </div>

                </div> 
                <div class="linea-2"> 
                  <p class="text-xs">{{ item.calle +' '+ item.numero }}</p>
                </div>
              </div>
            
             <div v-else-if="dataKey=='efectos'">
                
                <div class="flex-container"  :class="{ 'border-top-1 surface-border': index !== 0 }">

                  <div class="flex-items">
                    <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
                  </div>

                  <div class="flex-items">
                    <span class="font-bold">{{ getUpperCase(item.subcategoria)  }}</span>
                    <span class="ml-2">{{ getTitleCase(item.tipo) }}-{{getTitleCase(item.marca)}}-{{ getTitleCase(item.modelo) }}</span>
                    
                    <span v-if="item.categoria" >
                      <Tag :value="item.categoria" class="ml-5" :severity="getColorByAfectado(item.categoria)"></Tag>
                    </span>
                  </div>

                  <div class="flex-items">
                    <ButtonOptions :tarjetaNombre="item.title" :item="item"/>
                  </div>

                </div> 
                <div class="linea-2"> 
                  <p class="text-xs">{{ item.dependencia }}</p>
                </div>
             </div>

            </div>
          
   
      </template>
      
    </DataView>
  
  </div>
  <div v-else class="flex justify-content-end">
    <span class="text-right">Sin Registros</span>
  </div>
    
</template>
  
<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center; /* Centra los elementos verticalmente */
  align-content: normal;
  margin-bottom: 8px;
}

.flex-items:nth-child(1), .flex-items:nth-child(3) {
  flex: 0 1 auto;
}

.flex-items:nth-child(2) {
  flex: 1 1 auto;
  align-self: center;
}
.linea-2 {
  margin-top: -20px; 
  margin-left: 50px;
}
</style>
