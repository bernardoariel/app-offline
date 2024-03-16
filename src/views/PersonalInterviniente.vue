<script lang="ts" setup>
import { ref, watch } from 'vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';
import { dependenciaDropdown, jerarquiaDropdown } from '@/helpers/getDropItems';
import type { PersonalInterviniente, PersonalIntervinienteForm } from '../interfaces/personalInterviniente';
import usePersonalInterviniente from '@/composables/usePersonalInterviniente';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFiledsState';

const { 
  intervinientes,
  agregar,
  selectedJerarquiaDrop,
  selectedDependenciaDrop,
  initialValues
 } = usePersonalInterviniente();
 const { selectedItem } = useItemValue()
 const { statesID, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();
const formData = ref<PersonalIntervinienteForm>({ ...initialValues });

const getInputValue = (campo: keyof PersonalInterviniente) => {
  return formData.value[campo];
};

const handleInputChange = (campo: keyof PersonalIntervinienteForm, event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  // Verificar si el campo es 'jerarquia' o 'dependencia'
  if (campo === 'jerarquia' || campo === 'dependencia') {
    // Asegurarse de que formData.value[campo] sea del tipo adecuado
    const field = formData.value[campo] as { name: string };
    field.name = value;
  } else {
    // Si no es 'jerarquia' ni 'dependencia', asignar directamente el valor
    formData.value[campo] = value;
  }
};

const handleBlur = (campo: string) => {
  // Aquí podrías hacer algo adicional si lo necesitas
};

const handleAgregarElemento = () => {

  const nuevoPersonalInterviniente: PersonalInterviniente = {
    apellido: formData.value.apellido,
    nombre: formData.value.nombre,
    jerarquia: selectedJerarquiaDrop.value.name,
    dependencia: selectedDependenciaDrop.value.name,
  };


  agregar(nuevoPersonalInterviniente)
  
};
watch(selectedItem, (newVal:any) => {
    
    if (!newVal)  formData.value = ({ ...initialValues })
    formData.value = ({...newVal})
    
   
 });
</script>

<template>
  <Card>
    <template #content>
      <div class="grid">
        <div class="col-6">
          <label for="dropdown">Apellido</label>
          <MyInput 
              type="text" class="mt-2 uppercase" 
              :value="getInputValue('apellido')"
              @input="handleInputChange('apellido', $event)"
              @blur="() => handleBlur('apellido')"
          />
        </div>
        <div class="col-6">
          <label for="dropdown">Nombre</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('nombre')"
            @input="handleInputChange('nombre', $event)"
            @blur="() => handleBlur('nombre')" />
        </div>  
        <div class="col-6">
          <label for="dropdown">Seleccione Jerarquia</label>
          <MyDropdown
            class="mt-2"
            :items="jerarquiaDropdown"
            v-model="selectedJerarquiaDrop"
            placeholder="Seleccione la Jerarquia" />
        </div>
        <div class="col-6">
          <label for="dropdown">Seleccione Dependencia</label>
          <MyDropdown
            class="mt-2"
            :items="dependenciaDropdown"
            v-model="selectedDependenciaDrop"
            placeholder="Seleccione la Dependencia" />
        </div>
        <div class="ml-auto mt-2 p-0">
          <Button label="Agregar" @click="handleAgregarElemento"></Button>
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
