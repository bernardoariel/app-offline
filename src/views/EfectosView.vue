<script lang="ts" setup>
import { onActivated, ref, watch } from 'vue';
import useEfectos from '@/composables/useEfectos';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFiledsState';

import MyDropdown from '@/components/elementos/MyDropdown.vue';

import type{ Efectos } from '../interfaces/efecto.interface';
import type { EfectosForm } from '../interfaces/efecto.interface';
import { categoriasDropdown, marcasCategoriasDropdown, modelosCategoriasDropdown, subcategoriasDropdown, tipoCategoriasDropdown } from '@/helpers/getDropItems';

const { 
  editar,
  agregar,
  initialValues,
  selectedCategoria,
  selectedMarca,
  selectedModelo,
  selectedSubcategoria,
  selectedTipo} = useEfectos()


const { selectedItem } = useItemValue()

const { statesID, setPristineById, setModifiedData, guardarModificaciones,isEditing, cancelarModificaciones } = useFieldState();
const formData = ref<EfectosForm>({ ...initialValues });

onActivated(() => {
  selectedItem.value= null
});
const handleDropdownChange = (
  campo: keyof EfectosForm, 
  newValue: { value: any;name:string }
  ) => {

  const name = newValue.value.name

  if (campo in formData.value) {
    // Actualizar formData para que el campo específico tenga un objeto con la propiedad 'name' actualizada
    formData.value = { 
      ...formData.value, 
      [campo]: { name } // Asigna un objeto con 'name' a campo
    };

    const itemId = formData.value.id!;
    if (itemId) { 
      setPristineById(itemId, false);
      setModifiedData(itemId, campo,  name );
    }
  }
};

const getInputValue = (campo: keyof EfectosForm) => {
  if (campo in formData.value) {
    const modifiedData = statesID.find((state) => state.id === selectedItem.value?.id)?.modifiedData;
    return modifiedData && modifiedData[campo] !== undefined ? modifiedData[campo] : formData.value[campo];
  } 
};

const handleInputChange = (campo: string | number, event: Event) => {
  const valor = (event.target as HTMLInputElement).value;
  formData.value = { ...formData.value, [campo]: valor };

  const itemId = formData.value.id!;
  setPristineById(itemId, false);
  
  const campoStr = typeof campo === 'number' ? campo.toString() : campo;
  setModifiedData(itemId, campoStr, valor);
};

const handleBlur = (campo: keyof EfectosForm) => {
  const valor = getInputValue(campo);
  if (!selectedItem.value) return 

  setModifiedData(selectedItem.value!.id, campo, valor);
};


const handleAgregarElemento = () => {
  if(!formData.value) return 
  const nuevoEfecto: Efectos = {
      categoria: selectedCategoria.value!.name,
      marca: selectedMarca.value!.name,
      modelo: selectedModelo.value!.name,
      subcategoria: selectedSubcategoria.value!.name,
      tipo: selectedTipo.value!.name
  };

  agregar(nuevoEfecto)
  formData.value = ({ ...initialValues });
};

const handleCancelar = () => {
  if (!selectedItem.value) return;
  cancelarModificaciones(selectedItem.value.id);
  formData.value = formData.value = { ...initialValues, ...selectedItem.value };
};

const handleModificarElemento = () => {
  let itemStateEncontrado = guardarModificaciones(selectedItem.value!.id);
  let itemAEditar = {
      ...formData.value,
      categoria: selectedCategoria.value!.name,
      marca: selectedMarca.value!.name,
      modelo: selectedModelo.value!.name,
      subcategoria: selectedSubcategoria.value!.name,
      tipo: selectedTipo.value!.name,
      ...itemStateEncontrado
    };
  editar(itemAEditar);

};
watch(selectedItem, (newVal:any) => {
  if (!newVal) {
       formData.value = ({ ...initialValues });
   } else {
       formData.value = ({...newVal});
   }
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
                      @change="(newValue) => handleDropdownChange('categoria', newValue)"
                      placeholder="Seleccione Categoría" />
                </div>
                <div class="col-6">
                    <label for="subcategoriaDropdown">Seleccione Sub-Categoría</label>
                    <MyDropdown
                      class="mt-2"
                      :items="subcategoriasDropdown"
                      v-model="selectedSubcategoria"
                      @change="(newValue) => handleDropdownChange('marca', newValue)"
                      placeholder="Seleccione Sub-Categoría" />
                </div>
                <div class="col-6">
                    <label for="tipoDropdown">Seleccione Tipo</label>
                    <MyDropdown
                      class="mt-2"
                      :items="tipoCategoriasDropdown"
                      v-model="selectedTipo"
                      @change="(newValue) => handleDropdownChange('modelo', newValue)"
                      placeholder="Seleccione Tipo" />
                </div>
                <div class="col-6">
                    <label for="marcaDropdown">Seleccione Marca</label>
                    <MyDropdown
                      class="mt-2"
                      :items="marcasCategoriasDropdown"
                      v-model="selectedMarca"
                      @change="(newValue) => handleDropdownChange('subcategoria', newValue)"
                      placeholder="Seleccione Marca" />
                </div>
                <div class="col-6">
                    <label for="modeloDropdown">Seleccione Modelo</label>
                    <MyDropdown
                      class="mt-2"
                      :items="modelosCategoriasDropdown"
                      v-model="selectedModelo"
                      @change="(newValue) => handleDropdownChange('tipo', newValue)"
                      placeholder="Seleccione Modelo"
                      />
                </div>
                <div class="ml-auto mt-2 p-0">
              <Button
                label="Agregar"
                v-if="!selectedItem"
                @click="handleAgregarElemento()">
              </Button>                
              <div v-else>
                  <Button 
                    :disabled="isEditing(selectedItem!.id)" label="Cancelar"
                    icon="pi pi-times" severity="secondary" outlined aria-label="Cancel" class="mr-3"
                    @click="handleCancelar"
                    ></Button>        
                    <Button
                        label="Guardar Cambios"
                        :disabled="isEditing(selectedItem!.id)"
                        @click="handleModificarElemento()"
                        severity="warning"
                      ></Button>
                </div>
            </div>
            </div>
            <pre>
          <span v-for="(id, pristine) in statesID" key="id">
            ID: {{id}}, Pristine: {{ pristine }}
          </span>
        </pre>
        </template>
    </Card>
</template>

