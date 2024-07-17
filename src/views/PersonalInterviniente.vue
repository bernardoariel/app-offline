<script lang="ts" setup>
import { onActivated, ref, watch } from 'vue';
import usePersonalInterviniente from '@/composables/usePersonalInterviniente';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFieldState';

import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';

import type {
  PersonalInterviniente,
  PersonalIntervinienteForm,
} from '../interfaces/personalInterviniente';
import { dependenciaDropdown, jerarquiaDropdown } from '@/helpers/getDropItems';

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
  selectedItem.value = null;
});

const handleDropdownChange = (
  campo: keyof PersonalIntervinienteForm,
  newValue: { value: any; name: string }
) => {
  const name = newValue.value.name;

  if (campo in formData.value) {
    // Actualizar formData para que el campo específico tenga un objeto con la propiedad 'name' actualizada
    formData.value = {
      ...formData.value,
      [campo]: { name }, // Asigna un objeto con 'name' a campo
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
  if (!formData.value) return;
  const nuevoPersonalInterviniente: PersonalInterviniente = {
    apellido: formData.value.apellido,
    nombre: formData.value.nombre,
    jerarquia: selectedJerarquiaDrop.value!.name,
    dependencia: selectedDependenciaDrop.value!.name,
  };

  agregar(nuevoPersonalInterviniente);
  markNewRecordCreated();
  formData.value = { ...initialValues };
};

const handleCancelar = () => {
  if (!selectedItem.value) return;
  cancelarModificaciones(selectedItem.value.id);
  formData.value = formData.value = { ...initialValues, ...selectedItem.value };
};

const handleModificarElemento = () => {
  let itemStateEncontrado = guardarModificaciones(selectedItem.value!.id);
  let itemAEditar = {
    ...formData.value,
    jerarquia: selectedJerarquiaDrop.value?.name || '',
    dependencia: selectedDependenciaDrop.value?.name || '',
    ...itemStateEncontrado,
  };
  editar(itemAEditar);
};
watch(selectedItem, (newVal: any) => {
  if (!newVal) {
    formData.value = { ...initialValues };
  } else {
    selectedJerarquiaDrop.value = { name: newVal.jerarquia };
    selectedDependenciaDrop.value = { name: newVal.dependencia };
    formData.value = { ...newVal };
  }
});
</script>

<template>
  <Card>
    <template #content>
      <div class="grid">
        <div class="col-6">
          <label for="dropdown">Apellido</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('apellido')"
            @input="handleInputChange('apellido', $event)"
            @blur="() => handleBlur('apellido')"
            :color="!!selectedItem"
          />
        </div>
        <div class="col-6">
          <label for="dropdown">Nombre</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('nombre')"
            @input="handleInputChange('nombre', $event)"
            @blur="() => handleBlur('nombre')"
            :color="!!selectedItem"
          />
        </div>
        <div class="col-6">
          <label for="dropdown">Seleccione Jerarquia</label>
          <MyDropdown
            class="mt-2"
            :items="jerarquiaDropdown"
            v-model="selectedJerarquiaDrop"
            @change="(newValue) => handleDropdownChange('jerarquia', newValue)"
            placeholder="Seleccione la Jerarquia"
            filter
            :color="!!selectedItem"
          />
        </div>
        <div class="col-6">
          <label for="dropdown">Seleccione Dependencia</label>
          <MyDropdown
            class="mt-2"
            :items="dependenciaDropdown"
            v-model="selectedDependenciaDrop"
            @change="
              (newValue) => handleDropdownChange('dependencia', newValue)
            "
            placeholder="Seleccione la Dependencia"
            filter
            :color="!!selectedItem"
          />
        </div>
        <div class="ml-auto mt-2 p-0">
          <Button
            label="Agregar"
            v-if="!selectedItem"
            @click="handleAgregarElemento()"
          >
          </Button>
          <div v-else>
            <Button
              :disabled="isEditing(selectedItem!.id)"
              label="Cancelar"
              icon="pi pi-times"
              severity="secondary"
              outlined
              aria-label="Cancel"
              class="mr-3"
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
