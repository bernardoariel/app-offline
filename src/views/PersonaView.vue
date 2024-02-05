<script setup lang="ts">
import { ref, watch } from 'vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';
import MyTextArea from '@/components/elementos/MyTextArea.vue';
import useAfectadosForm from '@/composables/useAfectadosForm';
import useFieldState from '../composables/useFiledsState';
import { mapToDropdownItems } from '@/helpers/dropUtils';
import { afectados, documentos, sexo, nacionalidad, estadoCivil, instruccion } from '@/data/actuacionNew';


const afectadosDropdown = ref(mapToDropdownItems(afectados));
const documentosDropdown = ref(mapToDropdownItems(documentos));
const sexoDropdown = ref(mapToDropdownItems(sexo));
const nacionalidadDropdown = ref(mapToDropdownItems(nacionalidad));
const estadoCivilDropdown = ref(mapToDropdownItems(estadoCivil));
const instruccionDropdown = ref(mapToDropdownItems(instruccion));

const { statesID,setPristineById } = useFieldState();
const { persona, agregar, editar } = useAfectadosForm();

const isEditing = ref(!persona.value.id);


const modificarElemento = () =>{
    if( persona.value.apellido.length < 3 || persona.value.name.length < 3) return;
    editar(persona.value);
}
const handleModificarElemento = () => {
    modificarElemento(); // Tu función existente para modificar
    setPristineById(persona.value.id, true);
  
};
const handleAgregarElemento = () => {
  if( persona.value.apellido.length < 3 || persona.value.name.length < 3) return;
  agregar(persona.value);
  
 
};
const handleInputChange = (id: string) => {
  // Tu lógica para manejar el cambio en el input
  // ...

  // Luego, actualiza el estado pristine para el ID específico
  setPristineById(id, false);
};
watch(() => persona.value.id, (newId) => {
  isEditing.value = !newId;
  
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
                    v-model="persona.apellido"
                    @input="handleInputChange(persona.id)"
                     />
            </div>
            <div class="col-6">
                <label for="dropdown" >Nombre</label>
                <MyInput type="text" class="mt-2" v-model="persona.name" />
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
                <Button 
    
    label="Guardar Cambios"
    :disabled="isEditing"
    v-else 
    @click="handleModificarElemento()" 
    severity="warning">
</Button>
            </div>
        </div>
        <pre>
          <span v-for="(id, pristine) in statesID" :key="id">

      ID: {{id}}, Pristine: {{ pristine }}
    </span>
  </pre>
    </template>
</Card>
</template>


<style scoped>

</style>