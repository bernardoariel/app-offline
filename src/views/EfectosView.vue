<script lang="ts" setup>
import { ref, watch } from 'vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';

import { categoriasDropdown, marcasCategoriasDropdown, modelosCategoriasDropdown, subcategoriasDropdown, tipoCategoriasDropdown } from '@/helpers/getDropItems';
import type { EfectosForm } from '../interfaces/efecto.interface';
import type{ Efectos } from '../interfaces/efecto.interface';
import useEfectos from '@/composables/useEfectos';
import useItemValue from '@/composables/useItemValue';

const { agregar,efectos,initialValues,selectedCategoria,selectedMarca,selectedModelo,selectedSubcategoria,selectedTipo} = useEfectos()
const { selectedItem } = useItemValue()
const formData = ref<EfectosForm>({ ...initialValues });

const getInputValue = (campo: keyof EfectosForm) => {
  return formData.value[campo];
};
const handleInputChange = (campo: keyof EfectosForm, event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  // Verificar si el campo es 'jerarquia' o 'dependencia'
//   if (campo === 'jerarquia' || campo === 'dependencia') {
    // Asegurarse de que formData.value[campo] sea del tipo adecuado
    const field = formData.value[campo] as { name: string };
    field.name = value;
 /*  } else {
    // Si no es 'jerarquia' ni 'dependencia', asignar directamente el valor
    formData.value[campo] = value;
  } */
};

const handleBlur = (campo: string) => {
  // Aquí podrías hacer algo adicional si lo necesitas
};

const handleAgregarElemento = () => {

    const nuevoEfecto: Efectos = {
        categoria: selectedCategoria.value.name,
        marca: selectedMarca.value.name,
        modelo: selectedModelo.value.name,
        subcategoria: selectedSubcategoria.value.name,
        tipo: selectedTipo.value.name
    };

    agregar(nuevoEfecto)
};

watch(selectedItem, (newVal:any) => {
    
    if (!newVal)  formData.value = ({ ...initialValues })
    formData.value = ({...newVal})
    
   
 });
</script>
<template>
    <Card>
        <template #content>
            <div class="grid">
                <div class="col-6">
                    <label for="categoriaDropdown">Seleccione Categoría</label>
                    <MyDropdown
                      class="mt-2"
                      :items="categoriasDropdown"
                      v-model="selectedCategoria"
                      placeholder="Seleccione Categoría" />
                </div>
                <div class="col-6">
                    <label for="subcategoriaDropdown">Seleccione Sub-Categoría</label>
                    <MyDropdown
                      class="mt-2"
                      :items="subcategoriasDropdown"
                      v-model="selectedSubcategoria"
                      placeholder="Seleccione Sub-Categoría" />
                </div>
                <div class="col-6">
                    <label for="tipoDropdown">Seleccione Tipo</label>
                    <MyDropdown
                      class="mt-2"
                      :items="tipoCategoriasDropdown"
                      v-model="selectedTipo"
                      placeholder="Seleccione Tipo" />
                </div>
                <div class="col-6">
                    <label for="marcaDropdown">Seleccione Marca</label>
                    <MyDropdown
                      class="mt-2"
                      :items="marcasCategoriasDropdown"
                      v-model="selectedMarca"
                      placeholder="Seleccione Marca" />
                </div>
                <div class="col-6">
                    <label for="modeloDropdown">Seleccione Modelo</label>
                    <MyDropdown
                      class="mt-2"
                      :items="modelosCategoriasDropdown"
                      v-model="selectedModelo"
                      placeholder="Seleccione Modelo"
                      />
                </div>
                <div class="ml-auto mt-2 p-0">
                    <Button label="Agregar" @click="handleAgregarElemento"></Button>
                </div>
            </div>
            <pre>
             
            </pre>
        </template>
    </Card>
</template>

