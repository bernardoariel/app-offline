<script setup lang="ts">
import { onActivated, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';
import MyTextArea from '@/components/elementos/MyTextArea.vue';

import useFieldState from '@/composables/useFiledsState';
import useNewActuacion from '@/composables/useNewActuacion';
import { afectadosDropdown,documentosDropdown,sexoDropdown,nacionalidadDropdown,estadoCivilDropdown,instruccionDropdown } from '@/helpers/getDropItems';

const { item ,selectedItem ,editar, agregar, resetInput, prepararNuevoItem } = useNewActuacion()
const { statesID, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();

const isEditing = ref(!item.value.id);
const route = useRoute();
const tipo  = ref(route.params.tipo);

const getInputValue = (campo: string) => {
  if (campo in item.value) {
    const modifiedData = statesID.find((state) => state.id === selectedItem.value)?.modifiedData;
    return modifiedData && modifiedData[campo] !== undefined ? modifiedData[campo] : item.value[campo];
  } else {
    console.error(`Campo "${campo}" no es una propiedad válida en AfectadosForm.`);
    return null; // O cualquier otro valor por defecto que desees devolver en este caso
  }
};
const handleBlur = (campo: string) => {
  const valor = getInputValue(campo);
  // Guarda las modificaciones al perder el foco
//   guardarModificaciones(selectedPersona.value!);
  // También puedes usar el valor del campo si lo necesitas
  console.log(`Campo: ${campo}, Valor: ${valor}`);
  // Llama a la función setModifiedData
  setModifiedData(selectedItem.value!, campo, valor);
};

const handleModificarElemento = () => {
  editar(item.value!,tipo.value as string);
  // guardarModificaciones(selectedItem.value!);
};
const handleInputChange = (campo: string, event: Event) => {
  const valor = (event.target as HTMLInputElement).value;
  item.value = { ...item.value, [campo]: valor };

  // Actualiza el estado pristine para el ID específico
  setPristineById(item.value.id, false);

  // Llama a la función setModifiedData
  setModifiedData(item.value.id, campo, valor);
};
const handleAgregarElemento = () => {
  const modifiedData = { ...item.value };
  agregar(modifiedData,tipo.value as string);
  resetInput();
  setPristineById(selectedItem.value!, true);
};
const getPristineById = (id: string) => {
  const found = statesID.find((state) => state.id === id);
  return found ? found.pristine : false;
};
// Watcher para manejar cambios en el ID seleccionado
watch(() => item.value.id, (newId) => {
  isEditing.value = !newId;
});
watch(() => route.params.tipo, (nuevoTipo) => {
  tipo.value = nuevoTipo;
});
onActivated(() => {
  prepararNuevoItem();
});
</script>
<template>
   <Card>
    <!-- <template #title> Afectados </template> -->
    <template #content>
        <div class="grid">
            <div class="col-12">
               <label for="dropdown" >Seleccione tipo de Denunciante</label>
               <MyDropdown class="mt-2" :items="afectadosDropdown" v-model="item.typeAfectado" placeholder="Seleccione tipo de Denunciante" />
            </div>
            <div class="col-4">
               <label for="dropdown" >Tipo de doc.</label>
               <MyDropdown class="mt-2" :items="documentosDropdown" v-model="item.typeDocumento" placeholder="Tipo de doc." />
            </div>
            <div class="col-4">
                <label for="dropdown" >N° de doc.</label>
                <MyInput type="number" class="mt-2" v-model="item.nroDocumento"  />
            </div>
            <div class="col-4">
               <label for="dropdown" >Sexo</label>
               <MyDropdown class="mt-2" :items="sexoDropdown" v-model="item.typeSexo"  placeholder="Sexo" />
            </div>
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
            <div class="col-3">
                <label for="dropdown" >Fecha de nac.</label>
                <MyInput type="text" class="mt-2" v-model="item.fecha" />
            </div>
            <div class="col-3">
               <label for="dropdown" >Nacionalidad</label>
               <MyDropdown class="mt-2" :items="nacionalidadDropdown" placeholder="Nacionalidad" v-model="item.nacionalidad"/>
            </div>
            <div class="col-3">
               <label for="dropdown" >Estado Civil</label>
               <MyDropdown class="mt-2" :items="estadoCivilDropdown" placeholder="Estado Civil" v-model="item.estadoCivil" />
            </div>
            <div class="col-12">
                <label for="dropdown" >Domicilio de residencia</label>
                <MyTextArea class="mt-2 w-full" placeholder="Domicilio de residencia" v-model="item.domicilioResidencia" />
            </div>
            <div class="col-3">
                <label for="dropdown">Teléfono</label>
                <MyInput type="text" class="mt-2" placeholder="Teléfono" v-model="item.telefono"/>
            </div>
            <div class="col-3">
                <label for="dropdown">Email</label>
                <MyInput type="text" class="mt-2" placeholder="Email" v-model="item.email"/>
            </div>
            <div class="col-3">
                <label for="dropdown">Profesión</label>
                <MyInput type="text" class="mt-2" placeholder="Profesión" v-model="item.profesion"/>
            </div>
            <div class="col-3">
                <label for="dropdown" >Instrucción</label>
               <MyDropdown class="mt-2" :items="instruccionDropdown" placeholder="Instrucción" v-model="item.instruccion" />
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


<style scoped>

</style>
