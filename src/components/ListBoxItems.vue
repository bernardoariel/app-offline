<script setup lang="ts">
//listBoxItems
import { computed, ref, watch, watchEffect } from "vue";

import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import { getUpperCase, getTitleCase } from "@/helpers/stringUtils";
import useNewActuacion from "@/composables/useNewActuacion";
import { useRoute } from "vue-router";
import type { AfectadosForm } from '../interfaces/afectadosForm.interface';

const route = useRoute();
const tipo  = ref(route.params.tipo);

// Usando useNewActuacion en lugar de useAfectadosForm
const { items, selectedItem, eliminar,afectados, vinculados } = useNewActuacion();
const statePristineForm = false;
// Computa los items basados en el tipo de la ruta
const itemsComputados = computed(() => {
  return tipo.value === 'afectados' ? afectados.value : vinculados.value;
});
// Asumiendo que "afectados" es la lista que quieres mostrar
// const items = computed(() => afectados.value);

const eliminarItem = (itemId: AfectadosForm) => {
  eliminar( itemId , tipo.value as string); // Asumiendo que necesitas especificar el 'tipo'
};
watch(() => route.params.tipo, (nuevoTipo) => {
  tipo.value = nuevoTipo;
  
});

</script>
<template>
  <div class="card flex flex-column justify-content-center">
    <Listbox
      v-model="selectedItem"
      :options="itemsComputados"
      optionLabel="name" optionValue="id"
      class="w-full listbox-lower">
      
      <template #option="{ option }">
        <div class="listbox-item fixed-height">
          <div class="left-column">
            <div class="text-row">
              <span class="font-bold">{{ option.apellido ? getUpperCase(option.apellido) + ',' : '' }}</span>
              <span class="ml-2">{{ option.name ? getTitleCase(option.name) : 'Nuevo' }}</span>
              <!-- Agregar condicionales según tu modelo de datos -->
            </div>
            <div class="tag-row">
              <Tag :value="option.typeAfectado.name" :severity="getColorByAfectado(option.typeAfectado.name)" />
            </div>
          </div>
          <div class="right-column">
            <Button icon="pi pi-trash" severity="danger" @click="eliminarItem(option.id)" />
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