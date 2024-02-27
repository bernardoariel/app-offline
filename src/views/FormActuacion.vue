<script setup lang="ts">

import PersonaView from './PersonaView.vue';
import ListBoxItems from '@/components/ListBoxItems.vue';

import useAfectadosForm from '@/composables/useAfectadosForm';
import useNewActuacion from '@/composables/useNewActuacion';
import useVinculadosForm from '@/composables/useVinculadosForm';
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PersonalInterviniente from './PersonalInterviniente.vue';
import EfectosView from './EfectosView.vue';

const {prepararNuevoItem} = useNewActuacion()
/* interface ComposablesMap {
  afectados: () => ReturnType<typeof useAfectadosForm>;
  vinculados: () => ReturnType<typeof useVinculadosForm>;
  // Añade aquí el resto de tus composables
}
 */
/* const composablesMap: ComposablesMap = {
  afectados: useAfectadosForm,
  vinculados: useVinculadosForm,
  // Inicializa el resto de tus composables aquí
};
 */
const route = useRoute();
const router = useRouter()
const tipo = ref(route.params.tipo);

// Usando un método computado para acceder de forma segura a los composables
/* const composableDinamico = computed(() => {
  // Verifica que la clave existe en composablesMap antes de acceder a ella
  const composableFunc = composablesMap[tipo.value as keyof ComposablesMap];
  return composableFunc ? composableFunc() : undefined;
});
 */
const handleNuevoItem = () => {
  /* if (composableDinamico.value && 'selectedPersona' in composableDinamico.value) {
    composableDinamico.value.selectedPersona.value = null;
  } */
  prepararNuevoItem();
};
const handleVolver = () => {
    router.go(-1); // Navega hacia atrás en el historial
}
// Observa los cambios en el parámetro 'tipo' de la ruta.
watch(() => route.params.tipo, (newTipo) => {
  if (newTipo !== tipo.value) {
    tipo.value = newTipo; // Actualiza 'tipo' solo si el nuevo valor es diferente
  }
});

</script>
<template>
    <div class="grid">
        <div class="col-3">
            <div class="card mb-2">
                <Toolbar>
                    <template #start>   
                        <Button icon="pi pi-arrow-left" title="Volver"  rounded @click="handleVolver"></Button>
                    </template>
                    <template #center> 
                        <h3>{{tipo}}</h3>
                    </template>
                    <template #end> 
                        <Button icon="pi pi-plus" title="Nuevo Item" outlined rounded class="ml-3" @click="handleNuevoItem"></Button>
                        
                    </template>
                </Toolbar>
            </div>  

            <ListBoxItems />
        </div>
        <div class="col">
            <!-- <PersonaView /> -->
            <!-- <PersonalInterviniente/> -->
            <EfectosView/>
        </div>
    </div>
</template>
