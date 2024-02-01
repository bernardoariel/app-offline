<script setup lang="ts">
import { ref, watch } from 'vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';
import MyTextArea from '@/components/elementos/MyTextArea.vue';
import useAfectadosForm from '@/composables/useAfectadosForm';



const afectados = ['Denunciante y Damnificado', 'Denunciante', 'Damnificado'];
const documentos = ['DNI', 'Pasaporte'];
const sexo = ['Masculino', 'Femenino'];
const nacionalidad = ['Argentina','Chile','Brasil','Paraguay']
const estadoCivil = ['Casado/a','Divorciado/a','Separado/a','Soltero/a','Viudo/a']
const instruccion = ['Sabe leer y sabe firmar','No sabe leer y no sabe firmar','No sabe leer y si sabe firmar']

const mapToDropdownItems = (array:any) => {
  return array.map((item: any) => ({ name: item }));
};

const afectadosDropdown = ref(mapToDropdownItems(afectados));
const documentosDropdown = ref(mapToDropdownItems(documentos));
const sexoDropdown = ref(mapToDropdownItems(sexo));
const nacionalidadDropdown = ref(mapToDropdownItems(nacionalidad));
const estadoCivilDropdown = ref(mapToDropdownItems(estadoCivil));
const instruccionDropdown = ref(mapToDropdownItems(instruccion));

const {
  persona,
  agregar,
  editar
} = useAfectadosForm();

// Crear una referencia local para controlar si el botón debe decir "Agregar" o "Modificar"
const isEditing = ref(!persona.value.id);
watch(() => persona.value.id, (newId) => {
  // Si 'newId' tiene un valor (no es null ni undefined), significa que estamos en modo de edición
  isEditing.value = !newId;
});
const agregarElemento = () => {
  if( persona.value.apellido.length < 3 || persona.value.name.length < 3) return;
  // TODO! :Validar Items
  // TODO! :Buscar item
  agregar(persona.value);
 
};
const modificarElemento = () =>{
    if( persona.value.apellido.length < 3 || persona.value.name.length < 3) return;
    editar(persona.value);
}


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
                <MyInput type="text" class="mt-2 lowercase" v-model="persona.apellido"/>
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
                <Button label="Agregar" v-if="isEditing" @click="agregarElemento()"></Button>
                <Button label="Modificar" v-else @click="modificarElemento()" severity="warning"></Button>
            </div>
        </div>
    </template>
</Card>
</template>


<style scoped>

</style>