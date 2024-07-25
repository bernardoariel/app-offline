<script setup lang="ts">
import { onActivated, ref, watch } from 'vue';
import useAfectados from '../composables/useAfectados';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFieldsState';
import useActuacionData from '@/composables/useActuacionData';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';
import MyTextArea from '@/components/elementos/MyTextArea.vue';
import type {
  AfectadosForm,
  Afectados,
} from '../interfaces/afectado.interface';
import {
  documentosDropdown,
  sexoDropdown,
  nacionalidadDropdown,
  estadoCivilDropdown,
  instruccionDropdown,
  afectadosDropdown,
} from '@/helpers/getDropItems';
import { mapToArray, mapToDropdownItems } from '@/helpers/dropUtils';
import useNewActuacion from '@/composables/useNewActuacion';
import MyInputMask from '@/components/elementos/MyInputMask.vue';
import useCardValidation from '@/composables/useCardValidations';

const { obtenerTarjeta } = useActuacionData();
const { setField } = useCardValidation();

const validationSchema = yup.object({
  nombre: yup.string().required().min(3),
  apellido: yup.string().required().min(3),
  domicilio: yup.string().required().min(8),
  // nroDocumento: yup
  //   .number()
  //   .required('Ingrese un número documento válido')
  //   .min(5000000, 'Ingrese un número documento válido'),
  fechaNacimiento: yup
    .string()
    .required('La fecha de nacimiento es obligatoria')
    .test(
      'format-valid-check',
      'La fecha debe estar en el formato dd/MM/yyyy y ser válida',
      (value) => {
        if (!value) return false;

        const [day, month, year] = value.split('/').map(Number);
        if (
          !Number.isInteger(day) ||
          !Number.isInteger(month) ||
          !Number.isInteger(year)
        ) {
          return false;
        }
        if (
          day > 31 ||
          month > 12 ||
          year < 1600 ||
          year > new Date().getFullYear()
        ) {
          return false;
        }
        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      }
    ),
  sexoSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione un sexo')
      .oneOf(mapToArray(sexoDropdown), 'Selecciones un tipo válido'),
  }),

  tipoDenuncianteSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione un tipo de denunciante')
      .oneOf(
        ['Denunciante y Damnificado', 'Denunciante', 'Damnificado'],
        'Selecciones un tipo válido'
      ),
  }),
  // tipoDocSelect: yup.object().shape({
  //   name: yup
  //     .string()
  //     .required('Seleccione un tipo de documento')
  //     .oneOf(mapToArray(documentosDropdown), 'Selecciones un tipo válido'),
  // }),
  nacionalidadSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione una nacionalidad')
      .oneOf(
        mapToArray(nacionalidadDropdown),
        'Selecciones una nacionalidad válida'
      ),
  }),
  estadoCivilSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione un estado civil')
      .oneOf(
        mapToArray(estadoCivilDropdown),
        'Selecciones un estado civil válido'
      ),
  }),
  instruccionSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione un opción')
      .oneOf(mapToArray(instruccionDropdown), 'Selecciones una opción válida'),
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
let [nombre, nombreAttrs] = defineField('nombre');
let [apellido, apellidoAttrs] = defineField('apellido');
let [nroDocumento, nroDocumentoAttrs] = defineField('nroDocumento');
let [domicilio, domicilioAttrs] = defineField('domicilio');
let [sexoSelect, sexoSelectAttrs] = defineField('sexoSelect');
let [tipoDenuncianteSelect, tipoDenuncianteSelectAttrs] = defineField(
  'tipoDenuncianteSelect'
);
let [tipoDocSelect, tipoDocSelectAttrs] = defineField('tipoDocSelect');
let [nacionalidadSelect, nacionalidadSelectAttrs] =
  defineField('nacionalidadSelect');
let [estadoCivilSelect, estadoCivilSelectAttrs] =
  defineField('estadoCivilSelect');
let [instruccionSelect, instruccionSelectAttrs] =
  defineField('instruccionSelect');
let [fechaNacimiento, fechaNacimientoAttrs] = defineField('fechaNacimiento');
let [telefono] = defineField('telefono');
let [email] = defineField('email');
let [profesion] = defineField('profesion');
const firsDateChangeDone = ref(true);
const { editar, agregar, resetAllDropdown, initialValues } = useAfectados();

const { selectedItem } = useItemValue();
const { resetIsEditedHeader } = useNewActuacion();

const {
  statesID,
  setPristineById,
  setModifiedData,
  guardarModificaciones,
  isEditing,
  cancelarModificaciones,
  markNewRecordCreated,
} = useFieldState();

let formData = ref<AfectadosForm>({
  ...(selectedItem.value || initialValues),
  typeAfectado: {
    name: '',
  },
  typeDocumento: {
    name: '',
  },
  typeSexo: {
    name: '',
  },
  nacionalidad: {
    name: '',
  },
  estadoCivil: {
    name: '',
  },
  instruccion: {
    name: '',
  },
  nroDocumento: '',
  apellido: '',
  nombre: '',
  fecha: '',
  domicilioResidencia: '',
  telefono: '',
  email: '',
  profesion: '',
});
const tarjetaValues = ref<string[]>([]);

onActivated(() => {
  tarjetaValues.value = obtenerTarjeta('afectados')?.valor as string[];
  if (selectedItem.value) {
    formData.value = { ...selectedItem.value };
    updateDataWithForm(formData);
  }
});

const updateDataWithForm = (form: any) => {
  if (form) {
    telefono.value = formData.value.telefono;
    profesion.value = formData.value.profesion;
    email.value = formData.value.email;
    apellido.value = formData.value.apellido;
    nombre.value = formData.value.nombre;
    domicilio.value = formData.value.domicilioResidencia;
    sexoSelect.value = { name: formData.value.typeSexo || '' };
    tipoDenuncianteSelect.value = { name: formData.value.typeAfectado };
    tipoDocSelect.value = {
      name: formData?.value?.typeDocumento || 'Seleccione tipo',
    };
    nacionalidadSelect.value = { name: formData.value.nacionalidad };
    estadoCivilSelect.value = { name: formData.value.estadoCivil };
    instruccionSelect.value = { name: formData.value.instruccion };
    nroDocumento.value = formData.value.nroDocumento;
    fechaNacimiento.value = formData.value.fecha;
  }
};
const handleDropdownChange = (
  campo: keyof AfectadosForm,
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

const getInputValue = (campo: keyof AfectadosForm) => {
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
const handleDateChange = (campo: string | number, event: Event) => {
  if (firsDateChangeDone.value) {
    firsDateChangeDone.value = false;
    return;
  }
  const valor = event;
  formData.value = { ...formData.value, [campo]: valor };
  const itemId = formData.value.id!;
  setPristineById(itemId, false);
  const campoStr = typeof campo === 'number' ? campo.toString() : campo;
  setModifiedData(itemId, campoStr, valor);
};

const handleBlur = (campo: keyof AfectadosForm) => {
  const valor = getInputValue(campo);
  if (!selectedItem.value) return;

  setModifiedData(selectedItem.value!.id, campo, valor);
};

const handleAgregarElemento = () => {
  if (hasErrors()) return;
  const nuevoItem: Afectados = {
    nroDocumento: nroDocumento.value,
    apellido: apellido.value,
    nombre: nombre.value,
    fecha: fechaNacimiento.value,
    domicilioResidencia: domicilio.value,
    telefono: formData.value.telefono,
    email: formData.value.email,
    profesion: formData.value.profesion,
    typeAfectado: tipoDenuncianteSelect.value.name,
    typeDocumento: tipoDocSelect?.value?.name || '',
    typeSexo: sexoSelect.value.name,
    nacionalidad: nacionalidadSelect.value.name,
    estadoCivil: estadoCivilSelect.value.name,
    instruccion: instruccionSelect.value.name,
  };

  agregar(nuevoItem);
  markNewRecordCreated();
  setField('afectados', false);
  formData.value = { ...nuevoItem };
  apellido.value = '';
  nombre.value = '';
  domicilio.value = '';
  sexoSelect.value = { name: 'Seleccione sexo' };
  tipoDenuncianteSelect.value = { name: 'Seleccione tipo' };
  tipoDocSelect.value = { name: 'Seleccione tipo' };
  nacionalidadSelect.value = { name: 'Nacionalidad' };
  estadoCivilSelect.value = { name: 'Estado Civil' };
  instruccionSelect.value = { name: 'instrucción' };
  nroDocumento.value = '';
  fechaNacimiento.value = '';
  telefono.value = '';
  profesion.value = '';
  email.value = '';
  resetAllDropdown();
  resetIsEditedHeader();
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
  console.log('itemStateEncontrado::: ', itemStateEncontrado);
  let itemAEditar = {
    id: formData.value.id,
    nroDocumento: nroDocumento.value || '',
    apellido: apellido.value || '',
    nombre: nombre.value || '',
    fecha: fechaNacimiento.value || '',
    domicilioResidencia: domicilio.value || '',
    telefono: formData.value.telefono || '',
    email: formData.value.email || '',
    profesion: formData.value.profesion || '',
    typeAfectado: tipoDenuncianteSelect.value.name || '',
    typeDocumento:
      tipoDocSelect.value.name == 'Seleccione tipo'
        ? ''
        : tipoDocSelect.value.name || '',
    typeSexo: sexoSelect.value.name || '',
    nacionalidad: nacionalidadSelect.value.name || '',
    estadoCivil: estadoCivilSelect.value.name || '',
    instruccion: instruccionSelect.value.name || '',
    ...itemStateEncontrado,
  };
  editar(itemAEditar);
};

watch(selectedItem, (newVal: any) => {
  firsDateChangeDone.value = true;
  if (!newVal) {
    formData.value = { ...initialValues };
    telefono.value = '';
    profesion.value = '';
    email.value = '';
    apellido.value = '';
    nombre.value = '';
    domicilio.value = '';
    sexoSelect.value = { name: 'Seleccione sexo' };
    tipoDenuncianteSelect.value = { name: 'Seleccione tipo' };
    tipoDocSelect.value = { name: 'Seleccione tipo' };
    nacionalidadSelect.value = { name: 'Nacionalidad' };
    estadoCivilSelect.value = { name: 'Estado Civil' };
    instruccionSelect.value = { name: 'instrucción' };
    nroDocumento.value = '';
    fechaNacimiento.value = '';
  } else {
    formData.value = { ...newVal };
    updateDataWithForm(formData);
  }
});
</script>
<template>
  <Card>
    <template #content>
      <div class="grid">
        <div class="col-12">
          <!-- <pre>{{ values }}</pre> -->
          <label for="dropdown">Seleccione tipo de Denunciante</label>
          <MyDropdown
            class="mt-2"
            :items="mapToDropdownItems(tarjetaValues)"
            filter
            v-model="tipoDenuncianteSelect"
            placeholder="Seleccione tipo de denunciante"
            @change="handleDropdownChange('typeAfectado', $event)"
            :error="errors.tipoDenuncianteSelect"
            v-bind="tipoDenuncianteSelectAttrs"
            :color="false"
          />
          <span
            class="text-red-400"
            v-if="errors.tipoDenuncianteSelect ? true : false"
          >
            {{ errors.tipoDenuncianteSelect }}
          </span>
        </div>
        <div class="col-4">
          <label for="dropdown">Tipo de doc.</label>
          <MyDropdown
            class="mt-2"
            :items="documentosDropdown"
            :color="false"
            v-model="tipoDocSelect"
            v-bind="tipoDocSelectAttrs"
            :error="errors.tipoDocSelect"
            @change="
              (newValue) => handleDropdownChange('typeDocumento', newValue)
            "
            placeholder="Seleccione tipo de doc."
            filter
          />
          <span class="text-red-400" v-if="errors.tipoDocSelect ? true : false">
            {{ errors.tipoDocSelect }}
          </span>
        </div>
        <div class="col-4">
          <label for="dropdown">N° de doc.</label>
          <MyInput
            type="text"
            class="mt-2"
            v-model="nroDocumento"
            :color="false"
            v-bind="nroDocumentoAttrs"
            :error="errors.nroDocumento"
            placeholder="Ingrese N° de doc"
            @input="handleInputChange('nroDocumento', $event)"
            @blur="() => handleBlur('nroDocumento')"
          />
        </div>
        <div class="col-4">
          <label for="dropdown">Sexo</label>
          <MyDropdown
            class="mt-2"
            :items="sexoDropdown"
            v-model="sexoSelect"
            placeholder="Seleccione sexo"
            @change="handleDropdownChange('typeSexo', $event)"
            :error="errors.sexoSelect"
            v-bind="sexoSelectAttrs"
            :color="false"
            filter
          />
          <span class="text-red-400" v-if="errors.sexoSelect ? true : false">
            {{ errors.sexoSelect }}
          </span>
        </div>
        <div class="col-6">
          <label for="dropdown">Apellido</label>
          <MyInput
            type="text"
            class="mt-2"
            v-model="apellido"
            v-bind="apellidoAttrs"
            :color="false"
            :error="errors.apellido"
            placeholder="Ingrese apellido"
            @input="handleInputChange('apellido', $event)"
            @blur="() => handleBlur('apellido')"
          />
        </div>
        <div class="col-6">
          <label for="dropdown">Nombre</label>
          <MyInput
            type="text"
            class="mt-2"
            @input="handleInputChange('nombre', $event)"
            v-model="nombre"
            v-bind="nombreAttrs"
            :error="errors.nombre"
            :color="false"
            placeholder="Ingrese nombre"
            @blur="() => handleBlur('nombre')"
          />
        </div>
        <div class="col-3">
          <label for="dropdown">Fecha de nac.</label>
          <MyInputMask
            class="mt-2 w-full"
            mask="99/99/9999"
            slotChar="dd/mm/yyyy"
            placeholder="Ingrese fecha"
            @update:modelValue="handleDateChange('fecha', $event)"
            v-model="fechaNacimiento"
            v-bind="fechaNacimientoAttrs"
            :color="false"
            :error="errors.fechaNacimiento"
          />
        </div>
        <div class="col-3">
          <label for="dropdown">Nacionalidad</label>
          <MyDropdown
            class="mt-2"
            :items="nacionalidadDropdown"
            v-model="nacionalidadSelect"
            v-bind="nacionalidadSelectAttrs"
            placeholder="Nacionalidad"
            @change="handleDropdownChange('nacionalidad', $event)"
            :error="errors.nacionalidadSelect"
            filter
            :color="false"
          />
          <span
            class="text-red-400"
            v-if="errors.nacionalidadSelect ? true : false"
          >
            {{ errors.nacionalidadSelect }}
          </span>
        </div>
        <div class="col-3">
          <label for="dropdown">Estado Civil</label>
          <MyDropdown
            class="mt-2"
            :items="estadoCivilDropdown"
            v-model="estadoCivilSelect"
            placeholder="Estado Civil"
            @change="handleDropdownChange('estadoCivil', $event)"
            :error="errors.estadoCivilSelect"
            :color="false"
            filter
            v-bind="estadoCivilSelectAttrs"
          />
          <span
            class="text-red-400"
            v-if="errors.estadoCivilSelect ? true : false"
          >
            {{ errors.estadoCivilSelect }}
          </span>
        </div>
        <div class="col-12">
          <label for="dropdown">Domicilio de residencia</label>
          <MyTextArea
            class="mt-2 w-full"
            placeholder="Ingrese Domicilio de residencia"
            v-bind="domicilioAttrs"
            @input="handleInputChange('domicilioResidencia', $event)"
            @blur="() => handleBlur('domicilioResidencia')"
            v-model="domicilio"
            :error="errors.domicilio"
            :color="false"
          />
        </div>
        <div class="col-3">
          <label for="dropdown">Teléfono</label>
          <MyInput
            type="number"
            class="mt-2"
            placeholder="Ingrese teléfono"
            v-model="telefono"
            @input="handleInputChange('telefono', $event)"
            @blur="() => handleBlur('telefono')"
            :color="false"
            :error="errors.telefono"
          />
        </div>
        <div class="col-3">
          <label for="dropdown">Email</label>
          <MyInput
            type="text"
            class="mt-2"
            placeholder="Ingrese email"
            v-model="email"
            @input="handleInputChange('email', $event)"
            @blur="() => handleBlur('email')"
            :color="false"
          />
        </div>
        <div class="col-3">
          <label for="dropdown">Profesión</label>
          <MyInput
            type="text"
            class="mt-2"
            placeholder="Ingrese Profesión"
            v-model="profesion"
            @input="handleInputChange('profesion', $event)"
            @blur="() => handleBlur('profesion')"
            :color="false"
          />
        </div>
        <div class="col-3">
          <label for="dropdown">Instrucción</label>
          <MyDropdown
            class="mt-2"
            :items="instruccionDropdown"
            v-model="instruccionSelect"
            placeholder="Instrucción"
            @change="handleDropdownChange('instruccion', $event)"
            :error="errors.instruccionSelect"
            filter
            :color="false"
            v-bind="instruccionSelectAttrs"
          />
          <span
            class="text-red-400"
            v-if="errors.instruccionSelect ? true : false"
          >
            {{ errors.instruccionSelect }}
          </span>
        </div>
        <div class="ml-auto mt-2 p-0">
          <Button
            label="Agregar"
            :disabled="hasErrors()"
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
            ID: {{ id }}, Pristine: {{ pristine }}
          </span>
        </pre>
    </template>
  </Card>
</template>
