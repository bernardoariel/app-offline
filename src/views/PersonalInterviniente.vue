<script lang="ts" setup>
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';
import useFieldState from '@/composables/useFiledsState';
import useNewActuacion from '@/composables/useNewActuacion';
import { dependenciaDropdown, jerarquiaDropdown } from '@/helpers/getDropItems';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { item ,selectedItem ,editar, agregar, resetInput, prepararNuevoItem } = useNewActuacion()
const { statesID, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();
const isEditing = ref(!item.value.id);
const route = useRoute();
const tipo = ref(route.params.tipo);
const getInputValue = (campo: string) => {
  if (campo in item.value) {

    const modifiedData = statesID.find((state) => state.id === selectedItem.value)?.modifiedData;
    return modifiedData && modifiedData[campo] !== undefined ? modifiedData[campo] : item.value[campo];
  } else {
    console.error(`Campo "${campo}" no es una propiedad válida en AfectadosForm.`);
    return null; // O cualquier otro valor por defecto que desees devolver en este caso
  }
};
const handleInputChange = (campo: string, event: Event) => {
  const valor = (event.target as HTMLInputElement).value;
  item.value = { ...item.value, [campo]: valor };

  // Actualiza el estado pristine para el ID específico
  setPristineById(item.value.id, false);

  // Llama a la función setModifiedData
  setModifiedData(item.value.id, campo, valor);
};
const handleBlur = (campo: string) => {
  const valor = getInputValue(campo);
  // Guarda las modificaciones al perder el foco

  console.log(`Campo: ${campo}, Valor: ${valor}`);

  setModifiedData(selectedItem.value!, campo, valor);
};
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
const handleModificarElemento = () => {
  let itemStateEncontrado = guardarModificaciones(selectedItem.value!);
  let itemAEditar = {
      ...item.value,
      ...itemStateEncontrado
    };
  editar(itemAEditar,tipo.value as string);
};
</script>
<template>
    <Card>
        <template #content>
            <div class="grid">
                <div class="col-6">
                <label for="dropdown" >Apellido</label>
                <MyInput 
                        type="text" class="mt-2 uppercase" 
                        :value="getInputValue('apellido')"
                        @input="handleInputChange('apellido', $event)"
                        @blur="() => handleBlur('apellido')"
                    />
                    
                </div>
                <div class="col-6">
                    <label for="dropdown" >Nombre</label>
                    <MyInput type="text" class="mt-2" v-model="item.name"  @input="handleInputChange('name', $event)"/>
                </div>
                <div class="col-6">
                <label for="dropdown" >Seleccione Jerarquia</label>
                <MyDropdown class="mt-2" :items="jerarquiaDropdown" v-model="item.typeAfectado" placeholder="Seleccione tipo de Denunciante" />
                </div>
                <div class="col-6">
                <label for="dropdown" >Seleccione Dependencia</label>
                <MyDropdown class="mt-2" :items="dependenciaDropdown" v-model="item.typeAfectado" placeholder="Seleccione tipo de Denunciante" />
                </div>

                <div class="ml-auto mt-2 p-0">
                    <Button label="Agregar" v-if="isEditing" @click="handleAgregarElemento()"></Button>
                    <div v-else>
                    <Button 
                        :disabled="selectedItem ? getPristineById(selectedItem) : false" label="Cancelar"
                        icon="pi pi-times" severity="secondary" outlined aria-label="Cancel" class="mr-3"
                        @click="guardarModificaciones(item.id)"
                        ></Button>        
                        <Button
                            label="Guardar Cambios"
                            :disabled="selectedItem ? getPristineById(selectedItem) : false"
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
