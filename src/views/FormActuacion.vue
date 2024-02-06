<script setup lang="ts">

import PersonaView from './PersonaView.vue';
import ListBoxItems from '@/components/ListBoxItems.vue';
import useActuacion from '@/composables/useActuacion';
import useAfectadosForm from '@/composables/useAfectadosForm';
import { useRouter } from 'vue-router';

const router = useRouter();
const { atributosActuacion } = useActuacion();
const { selectedPersona }= useAfectadosForm()
const handleNuevoItem = () =>{
    selectedPersona.value = null
}
const handleVolver = () => {
    router.go(-1); // Navega hacia atrás en el historial
}
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
                        <h3>Afectados</h3>
                    </template>
                    <template #end> 
                        <Button icon="pi pi-plus" title="Nuevo Item" outlined rounded class="ml-3" @click="handleNuevoItem"></Button>
                        
                    </template>
                </Toolbar>
            </div>  

            <ListBoxItems />
        </div>
        <div class="col">
            <PersonaView />
        </div>
    </div>
</template>
