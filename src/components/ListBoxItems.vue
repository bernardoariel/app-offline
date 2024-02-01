<script setup lang="ts">
import { computed, ref, watch } from "vue";
import useAfectadosForm from '@/composables/useAfectadosForm';
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import { getUpperCase } from "@/helpers/stringUtils";
import { getTitleCase } from '../helpers/stringUtils';

const { selectedPersona, eliminar,afectados } = useAfectadosForm();


const items = computed(() => {
  return [
    ...afectados,
    // { name: 'Nuevo',code: 'new-item'}
  ];
});


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
            <Button v-else-if="selectedPersona === option.id" 
                    icon="pi pi-trash" 
                    severity="danger" 
                    @click="eliminarPersona(option.id)" />
            <Button v-else 
                  icon="pi pi-trash" 
                  severity="danger" 
                  disabled 
                  />
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

.text-row {
  /* Estilos para la fila de texto */
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