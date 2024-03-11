<script setup lang="ts">
//listBoxItems
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { getUpperCase, getTitleCase } from "@/helpers/stringUtils";
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import useItem from '@/composables/useItems';

const route = useRoute();
const tipo = ref(route.params.tipo); // Asume que la ruta tiene un parámetro "tipo"

const { afectados, vinculados, fechaUbicacion, efectos, intervinientes } = useItem();
const cargando = ref(true);

const itemsComputados = computed(() => {
  cargando.value = true; // Comienza a cargar
  // Aquí deberías implementar la lógica para cargar los datos de manera asíncrona y luego...
  let data: any[];
  switch (tipo.value) {
    case 'afectados':
      data = afectados.value;
      break;
    case 'vinculados':
      data = vinculados.value;
      break;
    case 'fecha':
      data = [fechaUbicacion.value]; // Convierte el objeto en un array
      break;
    case 'efectos':
      data = efectos.value;
      break;
    case 'personalInterviniente':
      data = intervinientes.value;
      break;
    default:
      data = [];
  }
  cargando.value = false; // Finaliza la carga
  return data;
});
const selectedItem = ref(null); // Asume un v-model para el Listbox

watch(() => route.params.tipo, (nuevoTipo) => {
  tipo.value = nuevoTipo;
});
</script>
<template>
  <div class="card flex flex-column justify-content-center">
    <Listbox
      v-model="selectedItem"
      :options="itemsComputados"
      optionLabel="name"
      optionValue="id"
      class="w-full listbox-lower">
      <template #option="{ option }">
        <div class="listbox-item fixed-height">
          <div class="left-column">
            <div class="text-row">
                <span class="font-bold">{{ option.apellido ? getUpperCase(option.apellido) + ',' : '' }}</span>
                <span class="ml-2">{{ option.name ? getTitleCase(option.name) : 'Nuevo' }}</span>
                <span v-if="option.typeDocumento && option.nroDocumento" class="ml-5">
                  <i>{{ option.typeDocumento.name + ': ' }}</i>
                  <i>{{ option.nroDocumento }}</i>
                </span>
              </div>
            <div class="tag-row">
                <Tag :value="option.typeAfectado?.name" :severity="getColorByAfectado(option.typeAfectado?.name)" />
            </div>
          </div>
          <div class="right-column">
            <!-- <Button icon="pi pi-trash" severity="danger" @click="eliminarItem(option.id)" /> -->
            <Button v-if="option.code === 'new-item'" 
              icon="pi pi-plus" 
              rounded 
              aria-label="Agregar" 
              outlined 
              severity="primary" />
          <div class="button-and-dot-container" v-else-if="selectedItem === option.id">
            <!-- <div v-if="!getPristineById(option.id)" class="uncommited-dot bg-blue-400"></div> -->
            <!-- <Button icon="pi pi-trash" 
              severity="danger" 
              @click="eliminarItem(option.id)" /> -->
          </div>
          <div class="button-and-dot-container" v-else >
           <!--  <div class="uncommited-dot bg-blue-400" v-if="!getPristineById(option.id)"></div>
            <Button 
                icon="pi pi-trash" 
                severity="danger" 
                disabled 
            /> -->
          </div>
          </div>
        </div>
      </template>
    </Listbox>
  </div>
</template>


<style scoped>
.fixed-height {
  height: 60px; /* o cualquier otro alto fijo que necesites */
}
.listbox-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Alinea los elementos al principio del contenedor */
  padding: 8px;
}

.left-column {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.right-column {
  /* Estilos para la columna de botones, si es necesario */
  flex-shrink: 0;
  display: flex;
  align-items: center; /* Centra el botón verticalmente */
}

.button-and-dot-container {
  display: flex;
  align-items: center; /* Alinea verticalmente el botón y el círculo */
}

.uncommited-dot {
  width: 12px; /* Tamaño del círculo */
  height: 12px; /* Tamaño del círculo */
  /* Color del círculo */
  border-radius: 50%; /* Hace que sea redondo */
  margin-right:15px; /* Espacio entre el botón y el círculo */
  
}
.tag-row {
  margin-top: 4px; /* Espacio arriba del tag */
}

.right-column {
  /* Estilos para la columna de botones, si es necesario */
  flex-shrink: 0;
  display: flex;
  align-items: center; /* Centra el botón verticalmente */
}
</style>