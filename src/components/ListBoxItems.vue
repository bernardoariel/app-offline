<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import useAfectadosForm from '@/composables/useAfectadosForm';
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import { getUpperCase } from "@/helpers/stringUtils";
import { getTitleCase } from '../helpers/stringUtils';
import useFieldState from "@/composables/useFiledsState";

const { selectedPersona, eliminar,afectados } = useAfectadosForm();
const { statesID,setPristineById } = useFieldState();
const statePristineForm = false

const items = computed(() => {
  return [
    ...afectados,
    // { name: 'Nuevo',code: 'new-item'}
  ];
});

const getPristineById = (id: string) => {
  const found = statesID.find((state) => state.id === id);
  return found ? found.pristine : false;
};
const eliminarPersona = (personaId:string) => {
  eliminar(personaId)
};

</script>
<template>
  <div class="card flex flex-column justify-content-center">

    <!-- Listbox principal -->
    <Listbox
      v-model="selectedPersona"
      :options="items"
      optionLabel="name" optionValue="id"
      class="w-full listbox-lower">
    
      <template #option="{ option }">
        <div class="listbox-item fixed-height">
          <!-- Columna Izquierda -->
          <div class="left-column">
            <!-- Fila de Texto -->
            <div class="text-row">
              <span class="font-bold">{{ option.apellido ? getUpperCase(option.apellido) + ',' : '' }}</span>
              <span class="ml-2">{{ option.name ? getTitleCase(option.name) : 'Nuevo' }}</span>
              <span v-if="option.typeDocumento && option.nroDocumento" class="ml-5">
                <i>{{ option.typeDocumento.name + ': ' }}</i>
                <i>{{ option.nroDocumento }}</i>
              </span>
            </div>
            <!-- Fila de Tag -->
            <div class="tag-row">
              <Tag  v-if="option.code !== 'new-item'" :value="option.typeAfectado.name" :severity="getColorByAfectado(option.typeAfectado.name)" />
            </div>
          </div>
          <!-- Columna Derecha -->
          <div class="right-column">
            <Button v-if="option.code === 'new-item'" 
          icon="pi pi-plus" 
          rounded 
          aria-label="Agregar" 
          outlined 
          severity="primary" />
  <div class="button-and-dot-container" v-else-if="selectedPersona === option.id">
    <div v-if="!getPristineById(option.id)" class="uncommited-dot bg-blue-400"></div>
    <Button icon="pi pi-trash" 
      severity="danger" 
      @click="eliminarPersona(option.id)" />
  </div>
  <div class="button-and-dot-container" v-else >
    <div class="uncommited-dot bg-blue-400" v-if="!getPristineById(option.id)"></div>
    <Button 
        icon="pi pi-trash" 
        severity="danger" 
        disabled 
    />
  </div>
            <!-- <pre>  Estado Actual: {{ statePristineForm ? 'True' : 'False' }}</pre> -->
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