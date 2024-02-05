<script setup lang="ts">

import PersonaView from './PersonaView.vue';
import ListBoxItems from '@/components/ListBoxItems.vue';
import useAfectadosForm from '@/composables/useAfectadosForm';

const { selectedPersona }= useAfectadosForm()
const handleNuevoItem = () =>{
    selectedPersona.value = null
}
</script>
<template>
    <div class="grid">
        <div class="col-3">
            <div class="card mb-2">
                <Toolbar>
                    <template #start>   
                        <Button icon="pi pi-arrow-left" title="Volver"  rounded></Button>
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
