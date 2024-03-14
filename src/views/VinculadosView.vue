<script setup lang="ts">
import { ref } from 'vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';

import { afectadosDropdown, documentosDropdown, estadoCivilDropdown, instruccionDropdown, nacionalidadDropdown, sexoDropdown } from '@/helpers/getDropItems';

import useVinculados from '@/composables/useVinculados';
import type { Vinculados, VinculadosForm } from '@/interfaces/vinculado.interface';
import MyInput from '@/components/elementos/MyInput.vue';
import MyTextArea from '@/components/elementos/MyTextArea.vue';
import { Afectados } from '../interfaces/afectado.interface';
import MyInputMask from '@/components/elementos/MyInputMask.vue';
import MyInputNumber from '@/components/elementos/MyInputNumber.vue';


const { 
  vinculados,
  agregar, 
  efectos, 
  initialValues,
  selectedType,
  selectedDocumento,
  selectedSexo,
  selectedNacionalidad,
  selectedEstadoCivil,
  selectedInstruccion } = useVinculados()

const formData = ref<VinculadosForm>({ ...initialValues.value });

const getInputValue = (campo: keyof VinculadosForm) => {
  return formData.value[campo];
};
const handleInputChange = (campo: keyof VinculadosForm, event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  const field = formData.value[campo] as { name: string };
  field.name = value;
};

const handleBlur = (campo: string) => {
  // Aquí podrías hacer algo adicional si lo necesitas
};

const handleAgregarElemento = () => {

    const nuevoItem: Vinculados = {
        apodo: formData.value.apodo,
        nroDocumento: formData.value.nroDocumento,
        apellido: formData.value.apellido,
        name: formData.value.name,
        fecha: formData.value.fecha,
        domicilioResidencia: formData.value.domicilioResidencia,
        telefono: formData.value.telefono,
        profesion: formData.value.profesion,
        typeAfectado: selectedType.value.name,
        typeDocumento: selectedDocumento.value.name,
        typeSexo: selectedSexo.value.name,
        nacionalidad: selectedNacionalidad.value.name ,
        estadoCivil: selectedEstadoCivil.value.name,
        instruccion: selectedInstruccion.value.name
    };

    agregar(nuevoItem)

};

</script>
<template>
   <Card>
    <!-- <template #title> Afectados </template> -->
    <template #content>
      <div class="grid">
            <div class="col-12">
               <label for="dropdown" >Seleccione tipo de Denunciante</label>
               <MyDropdown class="mt-2" :items="afectadosDropdown" v-model="selectedType" placeholder="Seleccione tipo de Denunciante" />
            </div>
            <div class="col-4">
               <label for="dropdown" >Tipo de doc.</label>
               <MyDropdown class="mt-2" :items="documentosDropdown" v-model="selectedDocumento" placeholder="Tipo de doc." />
            </div>
            <div class="col-4">
                <label for="dropdown" >N° de doc.</label>
                <MyInputNumber type="number" class="mt-2" v-model="formData.nroDocumento" />

            </div>
            <div class="col-4">
               <label for="dropdown" >Sexo</label>
               <MyDropdown class="mt-2" :items="sexoDropdown" v-model="selectedSexo"  placeholder="Sexo" />
            </div>
            <div class="col-6">
                <label for="dropdown" >Apellido</label>
               <MyInput 
                    type="text" class="mt-2 uppercase" 
                    v-model="formData.apellido" 
                />
                
            </div>
            <div class="col-6">
                <label for="dropdown" >Nombre</label>
                <MyInput type="text" class="mt-2" v-model="formData.name"  />
            </div>
            <div class="col-3">
                <label for="dropdown" >Fecha de nac.</label>
                <MyInputMask type="text" class="mt-2" v-model="formData.fecha" />
                
            </div>
            <div class="col-3">
               <label for="dropdown" >Nacionalidad</label>
               <MyDropdown class="mt-2" :items="nacionalidadDropdown"
                placeholder="Nacionalidad" v-model="selectedNacionalidad"/>
            </div>
            <div class="col-3">
               <label for="dropdown" >Estado Civil</label>
               <MyDropdown class="mt-2" :items="estadoCivilDropdown" placeholder="Estado Civil" v-model="selectedEstadoCivil" />
            </div>
            <div class="col-12">
                <label for="dropdown" >Domicilio de residencia</label>
                <MyTextArea class="mt-2 w-full" placeholder="Domicilio de residencia" v-model="formData.domicilioResidencia" />
            </div>
            <div class="col-3">
                <label for="dropdown">Teléfono</label>
                <MyInput type="text" class="mt-2" placeholder="Teléfono" v-model="formData.telefono"/>
            </div>

            <div class="col-3">
                <label for="dropdown">Profesión</label>
                <MyInput type="text" class="mt-2" placeholder="Profesión" v-model="formData.profesion"/>
            </div>
            <div class="col-3">
                <label for="dropdown" >Instrucción</label>
               <MyDropdown class="mt-2" :items="instruccionDropdown" placeholder="Instrucción" v-model="selectedInstruccion" />
            </div>
            <div class="col-3">
                <label for="dropdown">Apodo</label>
                <MyInput type="text" class="mt-2" placeholder="Apodo" v-model="formData.apodo"/>
            </div>
            <div class="ml-auto mt-2 p-0">
                <Button label="Agregar" @click="handleAgregarElemento()"></Button>
                <!-- <div v-else>
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
                </div> -->

            </div>
        </div>
        <!-- <pre>
          <span v-for="(id, pristine) in statesID" key="id">
            ID: {{id}}, Pristine: {{ pristine }}
          </span>
        </pre> -->
    </template>
</Card>
</template>


<style scoped>

</style>
