<script setup lang="ts">
import { onActivated, ref, watch } from 'vue';
import useFecha from '@/composables/useFecha';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFieldsState';
import * as yup from 'yup';
import MyInput from '@/components/elementos/MyInput.vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyCalendar from '@/components/elementos/MyCalendar.vue';
import type {
  FechaUbicacionForm,
  FechaUbicacion,
} from '../interfaces/fecha.interface';
import { municipiosDropdown } from '@/helpers/getDropItems';
import { mapToArray } from '@/helpers/dropUtils';
import { useForm } from 'vee-validate';

const { agregar, editar, initialValues, selectedMunicipioDrop } = useFecha();

const validationSchema = yup.object({
  calle: yup.string().required().min(3),
  numero: yup.number().required(),
  departamentoSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione un opción')
      .oneOf(mapToArray(municipiosDropdown), 'Selecciones una opción válida'),
  }),
});

const { defineField, values, errors } = useForm({
  validationSchema,
});

const hasErrors = () => {
  const keys1 = Object.keys(validationSchema.fields);
  const keys2 = Object.keys(values);
  const areKeysEqual =
    keys1.length <= keys2.length && keys1.every((key) => keys2.includes(key));
  return Object.keys(errors.value).length > 0 || !areKeysEqual;
};

let [calle, calleAttrs] = defineField('calle');
let [numero, numeroAttrs] = defineField('numero');
let [departamentoSelect, departamentoSelectAttrs] =
  defineField('departamentoSelect');

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

let formData = ref<FechaUbicacionForm>({ ...initialValues });
onActivated(() => {
  if (selectedItem.value) {
    formData.value = {
      ...selectedItem.value,
      desdeFechaHora: selectedItem.value.desdeFechaHora
        ? new Date(selectedItem.value.desdeFechaHora)
        : '',
      hastaFechaHora: selectedItem.value.hastaFechaHora
        ? new Date(selectedItem.value.hastaFechaHora)
        : '',
    };
    updateDataWithForm(formData);
  }
});

const updateDataWithForm = (form: any) => {
  if (form) {
    calle.value = formData.value.calle;
    numero.value = formData.value.numero;
    departamentoSelect.value = { name: formData.value.departamento };
  }
};
const handleDropdownChange = (
  campo: keyof FechaUbicacionForm,
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

const getInputValue = (campo: keyof FechaUbicacionForm) => {
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
const changeToSpanish = () => {
  const primevue = usePrimeVue();
  primevue.config.locale = {
    firstDayOfWeek: 1,
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    today: 'Hoy',
    clear: 'Borrar',
    weekHeader: 'Sm',
  };
};
const handleBlur = (campo: keyof FechaUbicacionForm) => {
  const valor = getInputValue(campo);
  if (!selectedItem.value) return;

  setModifiedData(selectedItem.value!.id, campo, valor);
};

const handleAgregarElemento = () => {
  if (hasErrors()) return;
  const nuevoItem: FechaUbicacion = {
    desdeFechaHora: formData.value.desdeFechaHora,
    hastaFechaHora: formData.value.hastaFechaHora,
    calle: calle.value,
    numero: numero.value,
    departamento: departamentoSelect.value.name,
  };

  agregar(nuevoItem);
  markNewRecordCreated();
  formData.value = { ...initialValues };
  calle.value = '';
  numero.value = '';
  departamentoSelect.value = { name: 'Seleccione departamento' };
};

const handleCancelar = () => {
  if (!selectedItem.value) return;
  cancelarModificaciones(selectedItem.value.id);
  formData.value = { ...initialValues, ...selectedItem.value };
};

const handleModificarElemento = () => {
  if (hasErrors()) {
    alert('Completa el formulario antes de guardar.');
    return;
  }
  let itemStateEncontrado = guardarModificaciones(selectedItem.value!.id);
  let itemAEditar = {
    ...formData.value,
    // departamento: selectedMunicipioDrop.value?.name || '',
    calle: calle.value || '',
    numero: numero.value || '',
    departamento: departamentoSelect.value.name || '',
    ...itemStateEncontrado,
  };
  editar(itemAEditar);
};

watch(selectedItem, (newVal: any) => {
  if (!newVal) {
    formData.value = { ...initialValues };
    calle.value = '';
    numero.value = '';
    departamentoSelect.value = { name: 'Seleccione un departamento' };
  } else {
    formData.value = {
      ...newVal,
      desdeFechaHora: newVal.desdeFechaHora
        ? new Date(newVal.desdeFechaHora)
        : '',
      hastaFechaHora: newVal.hastaFechaHora
        ? new Date(newVal.hastaFechaHora)
        : '',
    };
    updateDataWithForm(formData);
    selectedMunicipioDrop.value = { name: newVal.departamento };
  }
});
</script>

<template>
  <Card>
    <template #content>
      <div class="grid">
        <div class="col-6">
          <label for="desdeFechaHoraRef">Desde</label>
          <MyCalendar v-model="formData.desdeFechaHora" />
        </div>
        <div class="col-6">
          <label for="hastaFechaHoraRef">Hasta</label>
          <MyCalendar v-model="formData.hastaFechaHora" />
        </div>
        <div class="md:col-4 col-6">
          <label for="calle">Calle</label>
          <MyInput type="text" class="mt-2" v-model="calle" :color="false" v-bind="calleAttrs" :error="errors.calle"
            placeholder="ingrese una calle" @input="handleInputChange('calle', $event)"
            @blur="() => handleBlur('calle')" />
        </div>
        <div class="md:col-4 col-6">
          <label for="numero">Número</label>
          <MyInput type="number" class="mt-2" v-model="numero" :color="false" v-bind="numeroAttrs"
            :error="errors.numero" placeholder="ingrese un número" @input="handleInputChange('numero', $event)"
            @blur="() => handleBlur('numero')" />
        </div>
        <div class="md:col-4 col-6">
          <label for="departamento">Departamento</label>
          <MyDropdown class="mt-2" :items="municipiosDropdown" filter v-model="departamentoSelect"
            placeholder="Seleccione departamento" @change="handleDropdownChange('departamento', $event)"
            :error="errors.departamentoSelect" v-bind="departamentoSelectAttrs" :color="false" />
          <span class="text-red-400" v-if="errors.departamentoSelect ? true : false">
            {{ errors.departamentoSelect }}
          </span>
        </div>
        <div class="col-12 flex align-items-center justify-content-end">
          <Button label="Agregar" :disabled="hasErrors()" v-if="!selectedItem"
            @click="handleAgregarElemento()"></Button>
          <div v-else>
            <Button :disabled="isEditing(selectedItem!.id)" label="Cancelar" icon="pi pi-times" severity="secondary"
              outlined aria-label="Cancel" class="mr-3" @click="handleCancelar"></Button>
            <Button label="Guardar Cambios" :disabled="isEditing(selectedItem!.id)" @click="handleModificarElemento()"
              severity="warning"></Button>
          </div>
        </div>
      </div>
      <!-- <pre>
        <span v-for="state in statesID" :key="state.id">
          ID: {{ state.id }}, Pristine: {{ state.pristine }}
        </span>
      </pre> -->
    </template>
  </Card>
</template>
