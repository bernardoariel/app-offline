<script setup lang="ts">
import useNewActuacion from '@/composables/useNewActuacion';
import { afectadosDropdown,documentosDropdown,sexoDropdown,nacionalidadDropdown,estadoCivilDropdown,instruccionDropdown } from '@/helpers/getDropItems';

const { item } = useNewActuacion()

const handleInputChange = (campo:string, event:HTMLElement) => {
  const newValue = { ...item.value, [campo]: event.target.value };
  if(composableActual.value) {
    composableActual.value.updatePersona(newValue);
  }
};
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
