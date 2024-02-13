<script setup lang="ts">
//PersonaView
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useAfectadosForm from '@/composables/useAfectadosForm';
import useVinculadosForm from '@/composables/useVinculadosForm';

import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';
import MyTextArea from '@/components/elementos/MyTextArea.vue';

import useFieldState from '../composables/useFiledsState';
import { mapToDropdownItems } from '@/helpers/dropUtils';
import { afectados, documentos, sexo, nacionalidad, estadoCivil, instruccion } from '@/data/actuacionNew';


const afectadosDropdown = ref(mapToDropdownItems(afectados));
const documentosDropdown = ref(mapToDropdownItems(documentos));
const sexoDropdown = ref(mapToDropdownItems(sexo));
const nacionalidadDropdown = ref(mapToDropdownItems(nacionalidad));
const estadoCivilDropdown = ref(mapToDropdownItems(estadoCivil));
const instruccionDropdown = ref(mapToDropdownItems(instruccion));

const { statesID, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();
const { persona, agregar, editar, selectedPersona, resetInput } = useAfectadosForm();

const isEditing = ref(!persona.value.id);

const route = useRoute();
const tipo  = ref(route.params.tipo); // Ejemplo: 'afectados' o 'vinculados'

const composablesMap = {
  afectados: useAfectadosForm,
  vinculados: useVinculadosForm,
  // Puedes agregar más aquí según sea necesario
};
// Selecciona dinámicamente el composable basado en el tipo
const composableDinamico = computed(() => {
  const composable = composablesMap[tipo.value as keyof typeof composablesMap];
  return composable ? composable() : null;
});
const getInputValue = (campo: string) => {
  if (campo in persona.value) {
    const modifiedData = statesID.find((state) => state.id === selectedPersona.value)?.modifiedData;
    return modifiedData && modifiedData[campo] !== undefined ? modifiedData[campo] : persona.value[campo];
  } else {
    console.error(`Campo "${campo}" no es una propiedad válida en AfectadosForm.`);
    return null; // O cualquier otro valor por defecto que desees devolver en este caso
  }
};
const modificarElemento = () => {
//   if (persona.value.apellido.length < 3 || persona.value.name.length < 3) return;
  editar(persona.value);
};
const handleBlur = (campo: string) => {
  const valor = getInputValue(campo);
  // Guarda las modificaciones al perder el foco
//   guardarModificaciones(selectedPersona.value!);
  // También puedes usar el valor del campo si lo necesitas
  console.log(`Campo: ${campo}, Valor: ${valor}`);
  // Llama a la función setModifiedData
  setModifiedData(selectedPersona.value!, campo, valor);
};
const handleModificarElemento = () => {
  modificarElemento();
  guardarModificaciones(selectedPersona.value!);
};

const handleAgregarElemento = () => {
  const modifiedData = { ...persona.value };
  agregar(modifiedData);
  resetInput();
  setPristineById(selectedPersona.value!, true);
};


const getPristineById = (id: string) => {
  const found = statesID.find((state) => state.id === id);
  return found ? found.pristine : false;
};

const handleInputChange = (campo: string, event: Event) => {
  const valor = (event.target as HTMLInputElement).value;
  persona.value = { ...persona.value, [campo]: valor };

  // Actualiza el estado pristine para el ID específico
  setPristineById(persona.value.id, false);

  // Llama a la función setModifiedData
  setModifiedData(persona.value.id, campo, valor);
};

// Watcher para manejar cambios en el ID seleccionado
watch(() => persona.value.id, (newId) => {
  isEditing.value = !newId;
});
watch(() => route.params.tipo, (nuevoTipo) => {
  tipo.value = nuevoTipo;
});
</script>
<template>
   <Card>
    <!-- <template #title> Afectados </template> -->
    <template #content>
        <div class="grid">
            <div class="col-12">
               <label for="dropdown" >Seleccione tipo de Denunciante</label>
               <MyDropdown class="mt-2" :items="afectadosDropdown" v-model="persona.typeAfectado" placeholder="Seleccione tipo de Denunciante" />
            </div>
            <div class="col-4">
               <label for="dropdown" >Tipo de doc.</label>
               <MyDropdown class="mt-2" :items="documentosDropdown" v-model="persona.typeDocumento" placeholder="Tipo de doc." />
            </div>
            <div class="col-4">
                <label for="dropdown" >N° de doc.</label>
                <MyInput type="number" class="mt-2" v-model="persona.nroDocumento"  />
            </div>
            <div class="col-4">
               <label for="dropdown" >Sexo</label>
               <MyDropdown class="mt-2" :items="sexoDropdown" v-model="persona.typeSexo"  placeholder="Sexo" />
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
                <MyInput type="text" class="mt-2" v-model="persona.name"  @input="handleInputChange('name', $event)"/>
            </div>
            <div class="col-3">
                <label for="dropdown" >Fecha de nac.</label>
                <MyInput type="text" class="mt-2" v-model="persona.fecha" />
            </div>
            <div class="col-3">
               <label for="dropdown" >Nacionalidad</label>
               <MyDropdown class="mt-2" :items="nacionalidadDropdown" placeholder="Nacionalidad" v-model="persona.nacionalidad"/>
            </div>
            <div class="col-3">
               <label for="dropdown" >Estado Civil</label>
               <MyDropdown class="mt-2" :items="estadoCivilDropdown" placeholder="Estado Civil" v-model="persona.estadoCivil" />
            </div>
            <div class="col-12">
                <label for="dropdown" >Domicilio de residencia</label>
                <MyTextArea class="mt-2 w-full" placeholder="Domicilio de residencia" v-model="persona.domicilioResidencia" />
            </div>
            <div class="col-3">
                <label for="dropdown">Teléfono</label>
                <MyInput type="text" class="mt-2" placeholder="Teléfono" v-model="persona.telefono"/>
            </div>
            <div class="col-3">
                <label for="dropdown">Email</label>
                <MyInput type="text" class="mt-2" placeholder="Email" v-model="persona.email"/>
            </div>
            <div class="col-3">
                <label for="dropdown">Profesión</label>
                <MyInput type="text" class="mt-2" placeholder="Profesión" v-model="persona.profesion"/>
            </div>
            <div class="col-3">
                <label for="dropdown" >Instrucción</label>
               <MyDropdown class="mt-2" :items="instruccionDropdown" placeholder="Instrucción" v-model="persona.instruccion" />
            </div>

            <div class="ml-auto mt-2 p-0">
                <Button label="Agregar" v-if="isEditing" @click="handleAgregarElemento()"></Button>
                <div v-else>
                
                    <Button 
                    :disabled="selectedPersona ? getPristineById(selectedPersona) : false" label="Cancelar"
                     icon="pi pi-times" severity="secondary" outlined aria-label="Cancel" class="mr-3"
                     @click="guardarModificaciones(persona.id)"
                     ></Button>        
                    <Button
                        label="Guardar Cambios"
                        :disabled="selectedPersona ? getPristineById(selectedPersona) : false"
                        @click="handleModificarElemento()"
                        severity="warning"
                      ></Button>        </div>
      
      
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
