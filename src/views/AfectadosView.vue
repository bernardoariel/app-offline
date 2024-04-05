<script setup lang="ts">
import { onActivated, ref, watch } from 'vue';
import useAfectados from '../composables/useAfectados';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFiledsState';

import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';
import MyTextArea from '@/components/elementos/MyTextArea.vue';
import MyInputMask from '@/components/elementos/MyInputMask.vue';
import MyInputNumber from '@/components/elementos/MyInputNumber.vue';

import type { AfectadosForm, Afectados } from '../interfaces/afectado.interface';
import { documentosDropdown, sexoDropdown, nacionalidadDropdown, estadoCivilDropdown, instruccionDropdown,afectadosDropdown } from '@/helpers/getDropItems';
import useDatosDiligencia from '../composables/useDatosDiligencia';
import useNewActuacion from '@/composables/useNewActuacion';

const { 
  editar,
  agregar,  
  resetAllDropdown,
  initialValues,
  selectedType,
  selectedDocumento,
  selectedSexo,
  selectedNacionalidad,
  selectedEstadoCivil,
  selectedInstruccion } = useAfectados()  

const { selectedItem } = useItemValue()
const { resetIsEditedHeader} = useNewActuacion()

const { statesID, setPristineById, setModifiedData, guardarModificaciones,isEditing, cancelarModificaciones } = useFieldState();
let formData = ref<AfectadosForm>({ ...initialValues });

onActivated(() => {
  selectedItem.value= null
  
});
const handleDropdownChange = (
  campo: keyof AfectadosForm, 
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

const getInputValue = (campo: keyof AfectadosForm) => {
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

const handleBlur = (campo: keyof AfectadosForm) => {
  const valor = getInputValue(campo);
  if (!selectedItem.value) return 

  setModifiedData(selectedItem.value!.id, campo, valor);
};


const handleAgregarElemento = () => {

  if(!formData.value) return 
  const nuevoItem: Afectados = {
      nroDocumento: formData.value.nroDocumento,
      apellido: formData.value.apellido,
      nombre: formData.value.nombre,
      fecha: formData.value.fecha,
      domicilioResidencia: formData.value.domicilioResidencia,
      telefono: formData.value.telefono,
      email: formData.value.email,
      profesion: formData.value.profesion,
      typeAfectado: selectedType.value!.name,
      typeDocumento: selectedDocumento.value!.name,
      typeSexo: selectedSexo.value!.name,
      nacionalidad: selectedNacionalidad.value!.name,
      estadoCivil: selectedEstadoCivil.value!.name,
      instruccion: selectedInstruccion.value!.name
  };

  agregar(nuevoItem)
  formData.value = ({ ...initialValues });
  resetAllDropdown()
  resetIsEditedHeader()
};

const handleCancelar = () => {
  if (!selectedItem.value) return;
  cancelarModificaciones(selectedItem.value.id);
  formData.value = formData.value = { ...initialValues, ...selectedItem.value };
};

const handleModificarElemento = () => {
  let itemStateEncontrado = guardarModificaciones(selectedItem.value!.id);
  console.log('itemStateEncontrado::: ', itemStateEncontrado);
  let itemAEditar = {
      ...formData.value,
      typeAfectado: selectedType.value?.name || '', // Si selectedType.value es null o undefined, asigna una cadena vacía como valor predeterminado
      typeDocumento: selectedDocumento.value?.name || '',
      typeSexo: selectedSexo.value?.name || '',
      nacionalidad: selectedNacionalidad.value?.name || '',
      estadoCivil: selectedEstadoCivil.value?.name || '',
      instruccion: selectedInstruccion.value?.name || '',
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
            <div class="col-12">
               <label for="dropdown" >Seleccione tipo de Denunciante</label>
               <MyDropdown
                  class="mt-2"
                  :items="afectadosDropdown"
                  v-model="selectedType"
                  @change="(newValue) => handleDropdownChange('typeAfectado', newValue)"
                  placeholder="Seleccione tipo de Denunciante"
                  filter
                  :color="!!selectedItem" />
            </div>
            <div class="col-4">
               <label for="dropdown" >Tipo de doc.</label>
               <MyDropdown
                 class="mt-2"
                 :items="documentosDropdown"
                 v-model="selectedDocumento"
                 @change="(newValue) => handleDropdownChange('typeDocumento', newValue)"
                 placeholder="Tipo de doc."
                 filter
                 :color="!!selectedItem" />
            </div>
            <div class="col-4">
                <label for="dropdown" >N° de doc.</label>
                <!-- <MyInputNumber -->
                <MyInput
                  type="number"
                  class="mt-2"
                  :value="getInputValue('nroDocumento')"
                  @input="handleInputChange('nroDocumento', $event)"
                  @blur="() => handleBlur('nroDocumento')"
                  :color="!!selectedItem"
                  />
            </div>
            <div class="col-4">
               <label for="dropdown">Sexo</label>
               <MyDropdown
                 class="mt-2"
                 :items="sexoDropdown"
                 v-model="selectedSexo"
                 placeholder="Sexo" 
                 @change="(newValue) => handleDropdownChange('typeSexo', newValue)"
                 filter
                 :color="!!selectedItem"/>
            </div>
            <div class="col-6">
                <label for="dropdown" >Apellido</label>
               <!-- <MyInput type="text" class="mt-2" v-model="formData.apellido"/> -->
               <MyInput 
                    type="text" class="mt-2" 
                    :value="getInputValue('apellido')"
                    @input="handleInputChange('apellido', $event)"
                    @blur="() => handleBlur('apellido')"
                    :color="!!selectedItem"
                />
                
            </div>
            <div class="col-6">
              <label for="dropdown" >Nombre</label>
              <MyInput
                type="text"
                class="mt-2"
                :value="getInputValue('nombre')"
                @input="handleInputChange('nombre', $event)"
                @blur="() => handleBlur('nombre')"
                :color="!!selectedItem"
              />
            </div>
            <div class="col-3">
                <label for="dropdown" >Fecha de nac.</label>
                <MyInput
                  type="text"
                  class="mt-2"
                  :value="getInputValue('fecha')"
                  @input="handleInputChange('fecha', $event)"
                  @blur="() => handleBlur('fecha')"
                  :color="!!selectedItem"
                  />
            </div>
            <div class="col-3">
               <label for="dropdown" >Nacionalidad</label>
               <MyDropdown
                 class="mt-2"
                 :items="nacionalidadDropdown"
                 placeholder="Nacionalidad"
                 @change="(newValue) => handleDropdownChange('nacionalidad', newValue)"
                 v-model="selectedNacionalidad" 
                 filter
                 :color="!!selectedItem"/>
            </div>
            <div class="col-3">
               <label for="dropdown" >Estado Civil</label>
               <MyDropdown
                class="mt-2"
                :items="estadoCivilDropdown"
                placeholder="Estado Civil"
                @change="(newValue) => handleDropdownChange('estadoCivil', newValue)"
                v-model="selectedEstadoCivil"
                filter
                :color="!!selectedItem" />
              </div>
            <div class="col-12">
                <label for="dropdown" >Domicilio de residencia</label>
                <MyTextArea
                  class="mt-2 w-full"
                  placeholder="Domicilio de residencia"
                  :value="getInputValue('domicilioResidencia')"
                  @input="handleInputChange('domicilioResidencia', $event)"
                  @blur="() => handleBlur('domicilioResidencia')"
                  :color="!!selectedItem"
                   />
            </div>
            <div class="col-3">
                <label for="dropdown">Teléfono</label>
                <MyInput
                  type="text"
                  class="mt-2"
                  placeholder="Teléfono"
                  :value="getInputValue('telefono')"
                  @input="handleInputChange('telefono', $event)"
                  @blur="() => handleBlur('telefono')"
                  :color="!!selectedItem"
                  />
            </div>
            <div class="col-3">
                <label for="dropdown">Email</label>
                <MyInput
                  type="text"
                  class="mt-2"
                  placeholder="Email"
                  :value="getInputValue('email')"
                  @input="handleInputChange('email', $event)"
                  @blur="() => handleBlur('email')"
                  :color="!!selectedItem"
                   />
            </div>
            <div class="col-3">
                <label for="dropdown">Profesión</label>
                <MyInput
                  type="text"
                  class="mt-2"
                  placeholder="Profesión"
                  :value="getInputValue('profesion')"
                  @input="handleInputChange('profesion', $event)"
                  @blur="() => handleBlur('profesion')"
                  :color="!!selectedItem"
                  />
            </div>
            <div class="col-3">
              <label for="dropdown" >Instrucción</label>
              <MyDropdown
                class="mt-2"
                :items="instruccionDropdown"
                placeholder="Instrucción"
                @change="(newValue) => handleDropdownChange('instruccion', newValue)"
                v-model="selectedInstruccion"
                :color="!!selectedItem"
                filter
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

