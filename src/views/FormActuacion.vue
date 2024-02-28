<script setup lang="ts">


import ListBoxItems from '@/components/ListBoxItems.vue';

import useAfectadosForm from '@/composables/useAfectadosForm';
import useNewActuacion from '@/composables/useNewActuacion';

import {  ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import EfectosView from './EfectosView.vue';
import FechaUbicacionView from './FechaUbicacionView.vue';
import VinculadosView from './VinculadosView.vue';
import AfectadosView from './AfectadosView.vue';
import PersonalInterviniente from './PersonalInterviniente.vue';


const { prepararNuevoItem } = useNewActuacion()

const route = useRoute();
const router = useRouter()
const tipo = ref(route.params.tipo);


const handleNuevoItem = () => {

  prepararNuevoItem();
};
const handleVolver = () => {
    router.go(-1); 
}

watch(() => route.params.tipo, (newTipo) => {
  if (newTipo !== tipo.value) {
    tipo.value = newTipo; 
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
                <AfectadosView v-if="tipo ==='afectados'" />
                <VinculadosView v-if="tipo ==='vinculados'" />
                <EfectosView v-if="tipo ==='efectos'" />
                <FechaUbicacionView v-if="tipo ==='fecha'" />
                <PersonalInterviniente v-if="tipo ==='personalInterviniente'" />
        </div>
    </div>
</template>
