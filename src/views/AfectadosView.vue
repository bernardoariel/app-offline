<script setup lang="ts">
import { ref, watch } from 'vue';
import useAfectados from '../composables/useAfectados';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';
import MyInputMask from '@/components/elementos/MyInputMask.vue';
import MyTextArea from '@/components/elementos/MyTextArea.vue';
import { afectadosDropdown } from '../helpers/getDropItems';
import { documentosDropdown, sexoDropdown, nacionalidadDropdown, estadoCivilDropdown, instruccionDropdown } from '@/helpers/getDropItems';
import type { AfectadosForm, Afectados } from '../interfaces/afectado.interface';
import MyInputNumber from '@/components/elementos/MyInputNumber.vue';

import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFiledsState';

const { 
      afectados,
      agregar,  
      initialValues,
      selectedType,
      selectedDocumento,
      selectedSexo,
      selectedNacionalidad,
      selectedEstadoCivil,
      selectedInstruccion } = useAfectados()

const { selectedItem } = useItemValue()

const { statesID, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();
let formData = ref<AfectadosForm>({ ...initialValues });
let isEditing = false

const getInputValue = (campo: keyof AfectadosForm) => {
  // Asegurarse de que 'campo' existe dentro de formData.value antes de intentar acceder a él.
  
  if (campo in formData.value) {
    // Intenta encontrar un registro en statesID que coincida con el ID del selectedItem actual.
    // Aquí, se asume que selectedItem.value podría ser nulo, por lo que se usa el operador de encadenamiento opcional (?) para evitar errores.
    const modifiedData = statesID.find((state) => state.id === selectedItem.value?.id)?.modifiedData;

    // Si existe modifiedData para este campo, devuelve ese valor; si no, devuelve el valor actual del campo en formData.
    return modifiedData && modifiedData[campo] !== undefined ? modifiedData[campo] : formData.value[campo];
  } 
};
const handleInputChange = (campo: string, event: Event) => {
  const valor = (event.target as HTMLInputElement).value;
  formData.value = { ...formData.value, [campo]: valor };

  // Actualiza el estado pristine para el ID específico
  setPristineById(formData.value.id!, false);
  // Llama a la función setModifiedData
  setModifiedData(formData.value.id!, campo, valor);
};
const getPristineById = (id: string) => {
  const found = statesID.find((state) => state.id === id);
  return found ? found.pristine : false;
};
const handleBlur = (campo: keyof AfectadosForm) => {
  const valor = getInputValue(campo);
  if (!selectedItem.value) return 

  setModifiedData(selectedItem.value!.id, campo, valor);
};
type TipoLista = 'afectados' | 'vinculados' | 'fecha' | 'efectos' | 'personalInterviniente';

const handleAgregarElemento = () => {
    // const modifiedData = { ...formData.value };
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

    // setPristineById(selectedItem.value!.id, true);
    
};
const handleModificarElemento = () => {
  let itemStateEncontrado = guardarModificaciones(selectedItem.value!.id);
  let itemAEditar = {
      ...formData.value,
      ...itemStateEncontrado
    };
  // editar(itemAEditar,tipo.value as string);
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
               <!-- <MyInput type="text" class="mt-2" v-model="formData.apellido"/> -->
               <MyInput 
                    type="text" class="mt-2" 
                    :value="getInputValue('apellido')"
                    @input="handleInputChange('apellido', $event)"
                    @blur="() => handleBlur('apellido')"
                />
                
            </div>
            <div class="col-6">
                <label for="dropdown" >Nombre</label>
                <MyInput type="text" class="mt-2" v-model="formData.nombre"/>
            </div>
            <div class="col-3">
                <label for="dropdown" >Fecha de nac.</label>
                <MyInputMask type="text" class="mt-2" v-model="formData.fecha" />
            </div>
            <div class="col-3">
               <label for="dropdown" >Nacionalidad</label>
               <MyDropdown class="mt-2" :items="nacionalidadDropdown" placeholder="Nacionalidad"
                v-model="selectedNacionalidad"/>
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
                <label for="dropdown">Email</label>
                <MyInput type="text" class="mt-2" placeholder="Email" v-model="formData.email"/>
            </div>
            <div class="col-3">
                <label for="dropdown">Profesión</label>
                <MyInput type="text" class="mt-2" placeholder="Profesión" v-model="formData.profesion"/>
            </div>
            <div class="col-3">
                <label for="dropdown" >Instrucción</label>
               <MyDropdown class="mt-2" :items="instruccionDropdown" placeholder="Instrucción" v-model="selectedInstruccion" />
            </div>

            <div class="ml-auto mt-2 p-0">
                <Button label="Agregar" v-if="!isEditing" @click="handleAgregarElemento()"></Button>
                <div v-else>
                  <Button 
                    :disabled="selectedItem ? getPristineById(selectedItem.id) : false" label="Cancelar"
                     icon="pi pi-times" severity="secondary" outlined aria-label="Cancel" class="mr-3"
                     @click="guardarModificaciones(formData.id!)"
                     ></Button>        
                    <Button
                        label="Guardar Cambios"
                        :disabled="selectedItem ? getPristineById(selectedItem.id) : false"
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
