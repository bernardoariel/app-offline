<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';

import { ListBoxItems } from '@/components/index';
import { AfectadosForm, VinculadosForm, FechaUbicacionComponent, EfectosForm, PersonalIntervinienteComponent } from '@/components/formularios/index';
import { useItemValue } from '@/composables/index';
import { getTitleCase } from '@/helpers/index';
import isPersonSaved from '@/guards/isPersonSaved';

const { prepararNuevoItem } = useItemValue();

const route = useRoute();
const router = useRouter();
const tipo = ref(route.params.tipo);
const id = ref(route.params.id);

const handleNuevoItem = () => prepararNuevoItem();
const handleVolver = () => router.go(-1);

watch(
    () => route.params.tipo,
    (newTipo) => {
        if (newTipo === tipo.value) return;
        tipo.value = newTipo;
    }
);

watch(
    () => route.params.id,
    (newId) => {
        if (newId === id.value) return;
        id.value = newId;
    }
);

onBeforeRouteLeave((to, from) => {
    if (from.name === 'formulario') {
        return isPersonSaved(to, from);
    }
});
</script>
<template>
    <div class="grid">
        <div class="col-12 lg:col-3">
            <!-- de lg en adelante se mostrara este toolbar  -->
            <div class="mb-2 hidden lg:block">
                <Toolbar class="flex flex-nowrap justify-content-between">
                    <template #start>
                        <Button icon="pi pi-arrow-left" title="Volver" rounded @click="handleVolver"></Button>
                    </template>
                    <template #center>
                        <h3>
                            {{
                                tipo != 'personalInterviniente'
                                    ? getTitleCase(tipo as string)
                                    : getTitleCase('Personal Interviniente')
                            }}
                        </h3>
                    </template>
                    <template #end>
                        <Button icon="pi pi-plus" title="Nuevo Item" outlined rounded class="ml-3"
                            @click="handleNuevoItem"></Button>
                    </template>
                </Toolbar>
            </div>

            <!-- de lg para abajo se mostrara este toolbar  con el listado de personas-->
            <div
                class="grid align-items-center justify-content-center bg-gray-100 m-0 border-round-lg lg:hidden w-full pr-4 ">
                <div class="col-1">
                    <Button icon="pi pi-arrow-left" title="Volver" rounded @click="handleVolver"></Button>
                </div>
                <div class="col-10 flex flex-column align-items-center ">
                    <h3>
                        {{
                            tipo != 'personalInterviniente'
                                ? getTitleCase(tipo as string)
                                : getTitleCase('Personal Interviniente')
                        }}
                    </h3>
                    <ListBoxItems />
                </div>
                <div class="col-1">
                    <Button icon="pi pi-plus" title="Nuevo Item" outlined rounded @click="handleNuevoItem"></Button>
                </div>
            </div>

            <!-- de lg en adelante se mostrara este listado de personas  -->
            <div class="hidden lg:block">
                <ListBoxItems />
            </div>
        </div>
        <div class="col-12 lg:col-9">
            <AfectadosForm v-if="tipo === 'afectados'" />
            <VinculadosForm v-if="tipo === 'vinculados'" />
            <EfectosForm v-if="tipo === 'efectos'" />
            <FechaUbicacionComponent v-if="tipo === 'fecha'" />
            <PersonalIntervinienteComponent v-if="tipo === 'personalInterviniente'" />
        </div>
    </div>
</template>
