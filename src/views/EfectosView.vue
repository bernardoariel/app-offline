<script lang="ts" setup>
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import useFieldState from '@/composables/useFiledsState';
import useNewActuacion from '@/composables/useNewActuacion';
import { categorias } from '@/data/actuacionNew';
import { categoriasDropdown, marcasCategoriasDropdown, modelosCategoriasDropdown, subcategoriasDropdown, tipoCategoriasDropdown } from '@/helpers/getDropItems';

import { ref } from 'vue';
import { useRoute } from 'vue-router';
const { item ,selectedItem ,editar, agregar, resetInput, prepararNuevoItem } = useNewActuacion()
const { statesID, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();
const isEditing = ref(!item.value.id);
const route = useRoute();
const tipo = ref(route.params.tipo);

type TipoLista = 'afectados' | 'vinculados' | 'fecha' | 'efectos' | 'personalInterviniente';

const handleAgregarElemento = () => {
  const modifiedData = { ...item.value };
  agregar(modifiedData,tipo.value as TipoLista);
  resetInput();
  setPristineById(selectedItem.value!, true);
};
const getPristineById = (id: string) => {
  const found = statesID.find((state) => state.id === id);
  return found ? found.pristine : false;
};
let selectedCategoria:any = ref()
let selectedSubcategoria:any = ref()
let selectedTipo:any = ref()
let selectedMarca:any = ref()
let selectedModelo:any = ref()
const handleChangeDropdown = (tipo:string,modelo: string) => {
    console.log('handleChangeDropdown::: ', handleChangeDropdown);
    tipo = modelo;
};

</script>
<template>
    <Card>
        <template #content>
            <div class="grid">
                <div class="col-6">
                    <label for="categoriaDropdown">Seleccione Categoría</label>
                    <MyDropdown class="mt-2" :items="categoriasDropdown" v-model="selectedCategoria" placeholder="Seleccione Categoría" />
                </div>
                <div class="col-6">
                    <label for="subcategoriaDropdown">Seleccione Sub-Categoría</label>
                    <MyDropdown class="mt-2" :items="subcategoriasDropdown" v-model="selectedSubcategoria" placeholder="Seleccione Sub-Categoría"  />
                </div>
                <div class="col-6">
                    <label for="tipoDropdown">Seleccione Tipo</label>
                    <MyDropdown class="mt-2" :items="tipoCategoriasDropdown" v-model="selectedTipo" placeholder="Seleccione Tipo"  />
                </div>
                <div class="col-6">
                    <label for="marcaDropdown">Seleccione Marca</label>
                    <MyDropdown class="mt-2" :items="marcasCategoriasDropdown" v-model="selectedMarca" placeholder="Seleccione Marca"  />
                </div>
                <div class="col-6">
                    <label for="modeloDropdown">Seleccione Modelo</label>
                    <MyDropdown class="mt-2" :items="modelosCategoriasDropdown" v-model="selectedModelo" placeholder="Seleccione Modelo" @change="handleChangeDropdown('modelo', selectedModelo)" />
                </div>
                <div class="ml-auto mt-2 p-0">
                    <Button label="Agregar" v-if="isEditing" @click="handleAgregarElemento()"></Button>
                    <div v-else>
                        <Button :disabled="selectedItem ? getPristineById(selectedItem) : false" label="Cancelar" icon="pi pi-times" severity="secondary" outlined aria-label="Cancel" class="mr-3" @click="guardarModificaciones(item.id)"></Button>        
                        <!-- <Button :disabled="selectedItem ? getPristineById(selectedItem) : false" label="Guardar Cambios" @click="handleModificarElemento()" severity="warning"></Button> -->
                    </div>
                </div>
            </div>
            <pre>
                <span v-for="(id, pristine) in statesID" key="id">
                    ID: {{ id }}, Pristine: {{ pristine }}
                </span>
            </pre>
        </template>
    </Card>
</template>

