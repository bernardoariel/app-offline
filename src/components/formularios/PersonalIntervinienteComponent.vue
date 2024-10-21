<script lang="ts" setup>
import { onActivated, ref, watch } from 'vue';
import usePersonalInterviniente from '@/composables/usePersonalInterviniente';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFieldsState';
import * as yup from 'yup';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';
import type {
  PersonalInterviniente,
  PersonalIntervinienteForm,
} from '@/interfaces/index';
import { dependenciaDropdown, jerarquiaDropdown } from '@/helpers/getDropItems';
import { useForm } from 'vee-validate';
import { mapToArray } from '@/helpers/dropUtils';

const validationSchema = yup.object({
  jerarquiaSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione un estado')
      .oneOf(mapToArray(jerarquiaDropdown), 'Selecciones un tipo válido'),
  }),
  dependenciaSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione una categoria')
      .oneOf(
        mapToArray(dependenciaDropdown),
        'Selecciones una categoria válida'
      ),
  }),
  nombre: yup.string().required().min(3),
  apellido: yup.string().required().min(3),
});
const { defineField, values, errors } = useForm({
  validationSchema,
});

let [jerarquiaSelect, jerarquiaSelectAttrs] = defineField('jerarquiaSelect');
let [dependenciaSelect, dependenciaSelectAttrs] =
  defineField('dependenciaSelect');
let [nombre, nombreAttrs] = defineField('nombre');
let [apellido, apellidoAttrs] = defineField('apellido');

const {
  editar,
  agregar,
  initialValues,
  selectedJerarquiaDrop,
  selectedDependenciaDrop,
} = usePersonalInterviniente();

const { selectedItem } = useItemValue();

const {
  statesID,
  setPristineById,
  setModifiedData,
  guardarModificaciones,
  isEditing,
  cancelarModificaciones,
  markNewRecordCreated,
} = useFieldState();
let formData = ref<PersonalIntervinienteForm>({ ...initialValues });

onActivated(() => {
  if (selectedItem.value) {
    formData.value = { ...selectedItem.value };
    updateDataWithForm();
  }
  // selectedItem.value = null;
});
const hasErrors = () => {
  const keys1 = Object.keys(validationSchema.fields);
  const keys2 = Object.keys(values);
  const areKeysEqual =
    keys1.length <= keys2.length && keys1.every((key) => keys2.includes(key));
  return Object.keys(errors.value).length > 0 || !areKeysEqual;
};

const updateDataWithForm = () => {
  if (formData) {
    jerarquiaSelect.value = { name: formData.value.jerarquia };
    dependenciaSelect.value = { name: formData.value.dependencia };
    nombre.value = formData.value.nombre;
    apellido.value = formData.value.apellido;
  }
};

const handleDropdownChange = (
  campo: keyof PersonalIntervinienteForm,
  newValue: { value: any; name: string }
) => {
  const name = newValue.value.name;

  if (campo in formData.value) {
    formData.value = {
      ...formData.value,
      [campo]: { name },
    };

    const itemId = formData.value.id!;
    if (itemId) {
      setPristineById(itemId, false);
      setModifiedData(itemId, campo, name);
    }
  }
};

const getInputValue = (campo: keyof PersonalIntervinienteForm) => {
  if (campo in formData.value) {
    const modifiedData = statesID.find(
      (state) => state.id === selectedItem.value?.id
    )?.modifiedData;
    return modifiedData && modifiedData[campo] !== undefined
      ? modifiedData[campo]
      : formData.value[campo];
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

const handleBlur = (campo: keyof PersonalIntervinienteForm) => {
  const valor = getInputValue(campo);
  if (!selectedItem.value) return;

  setModifiedData(selectedItem.value!.id, campo, valor);
};

const handleAgregarElemento = () => {
  if (hasErrors()) return;
  const nuevoPersonalInterviniente: PersonalInterviniente = {
    apellido: apellido.value,
    nombre: nombre.value,
    jerarquia: jerarquiaSelect.value.name || '',
    dependencia: dependenciaSelect.value.name || '',
  };

  agregar(nuevoPersonalInterviniente);
  markNewRecordCreated();
  formData.value = { ...initialValues };
  jerarquiaSelect.value = { name: 'Seleccione una jerarquie' };
  dependenciaSelect.value = { name: 'Seleccione una dependencia' };
  nombre.value = '';
  apellido.value = '';
};

const handleCancelar = () => {
  if (!selectedItem.value) return;
  cancelarModificaciones(selectedItem.value.id);
  formData.value = formData.value = { ...initialValues, ...selectedItem.value };
};

const handleModificarElemento = () => {
  if (hasErrors()) {
    alert('Completa el formulario antes de guardar.');
    return;
  }
  let itemStateEncontrado = guardarModificaciones(selectedItem.value!.id);
  let itemAEditar = {
    ...formData.value,
    id: formData.value.id,
    jerarquia: jerarquiaSelect.value?.name || '',
    dependencia: dependenciaSelect.value?.name || '',
    nombre: nombre.value,
    apellido: apellido.value,
    ...itemStateEncontrado,
  };
  editar(itemAEditar);
};

watch(selectedItem, (newVal: any) => {
  if (!newVal) {
    formData.value = { ...initialValues };
    jerarquiaSelect.value = { name: 'Seleccione una jerarquia' };
    dependenciaSelect.value = { name: 'Seleccione una dependencia' };
    nombre.value = '';
    apellido.value = '';
  } else {
    selectedJerarquiaDrop.value = { name: newVal.jerarquia };
    selectedDependenciaDrop.value = { name: newVal.dependencia };
    formData.value = { ...newVal };
    updateDataWithForm();
  }
});
</script>

<template>
  <Card>
    <template #content>
      <div class="grid">
        <div class="col-6">
          <label for="dropdown">Apellido</label>
          <MyInput type="text" class="mt-2" placeholder="Ingrese apellido"
            @input="handleInputChange('apellido', $event)" @blur="() => handleBlur('apellido')" v-model="apellido"
            :color="false" :error="errors.apellido" v-bind="apellidoAttrs" />
        </div>
        <div class="col-6">
          <label for="dropdown">Nombre</label>
          <MyInput type="text" class="mt-2" placeholder="Ingrese nombre" @input="handleInputChange('nombre', $event)"
            @blur="() => handleBlur('nombre')" v-model="nombre" :color="false" :error="errors.nombre"
            v-bind="nombreAttrs" />
        </div>
        <div class="col-6">
          <label for="dropdown">Seleccione Jerarquia</label>
          <MyDropdown class="mt-2" :items="jerarquiaDropdown" v-model="jerarquiaSelect"
            @change="(newValue) => handleDropdownChange('jerarquia', newValue)" placeholder="Seleccione la Jerarquia"
            filter :color="false" :error="errors.jerarquiaSelect" v-bind="jerarquiaSelectAttrs" />
        </div>
        <div class="col-6">
          <label for="dropdown">Seleccione Dependencia</label>
          <MyDropdown class="mt-2" :items="dependenciaDropdown" v-model="dependenciaSelect" @change="(newValue) => handleDropdownChange('dependencia', newValue)
            " placeholder="Seleccione la Dependencia" filter :color="false" :error="errors.dependenciaSelect"
            v-bind="dependenciaSelectAttrs" />
        </div>
        <div class="ml-auto mt-2 p-0">
          <Button label="Agregar" v-if="!selectedItem" @click="handleAgregarElemento()">
          </Button>
          <div v-else>
            <Button :disabled="isEditing(selectedItem!.id)" label="Cancelar" icon="pi pi-times" severity="secondary"
              outlined aria-label="Cancel" class="mr-3" @click="handleCancelar"></Button>
            <Button label="Guardar Cambios" :disabled="isEditing(selectedItem!.id)" @click="handleModificarElemento()"
              severity="warning"></Button>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
