<script setup lang="ts">
import { computed, onActivated, ref, watch } from "vue";
import useAfectados from "../composables/useAfectados";
import useItemValue from "@/composables/useItemValue";
import useFieldState from "@/composables/useFiledsState";
import useActuacionData from "@/composables/useActuacionData";
import * as yup from "yup";
import { useForm } from "vee-validate";
import MyDropdown from "@/components/elementos/MyDropdown.vue";
import MyInput from "@/components/elementos/MyInput.vue";
import MyTextArea from "@/components/elementos/MyTextArea.vue";

import type { AfectadosForm, Afectados } from "../interfaces/afectado.interface";
import {
  documentosDropdown,
  sexoDropdown,
  nacionalidadDropdown,
  estadoCivilDropdown,
  instruccionDropdown,
  afectadosDropdown,
} from "@/helpers/getDropItems";
import { mapToArray, mapToDropdownItems } from "@/helpers/dropUtils";

import useNewActuacion from "@/composables/useNewActuacion";
console.log(sexoDropdown.value.target)



const validationSchema = yup.object({
  nombre: yup.string().required().min(3),
  apellido: yup.string().required().min(3),
  // selectedNacionalidad: yup.string().required(),
  // SexoSelect: yup.object().required('Seleccione un sexo').oneOf(['Masculino', 'Femenino'], 'selecciones un tipo válido'),
  SexoSelect: yup.object().shape({
    name: yup.string().required('Seleccione un sexo').oneOf(mapToArray(sexoDropdown), 'selecciones un tipo válido'),
    // etc
  }),
  nroDocumento: yup.number().required(),
});
const { defineField, values, errors } = useForm({
  validationSchema,
  // initialErrors: {
  //   nombre: 'Este campo es requerido',
  //   apellido: 'Este campo es requerido',
  //   nroDocumento: 'Este campo es requerido',
  //   // SexoSelect: ' hola, esto es un test'
  // }
});
const hasErrors = () => {
  const keys1 = Object.keys(validationSchema.fields);
  const keys2 = Object.keys(values);
  const areKeysEqual =
    keys1.length === keys2.length && keys1.every((key) => keys2.includes(key));

  return Object.keys(errors.value).length > 0 || !areKeysEqual;
};
const [nombre, nombreAttrs] = defineField("nombre");
const [apellido, apellidoAttrs] = defineField("apellido");
const [nroDocumento, nroDocumentoAttrs] = defineField("nroDocumento");
const [SexoSelect, SexoSelectAttrs] = defineField("SexoSelect");

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
  selectedInstruccion,
} = useAfectados();

const { selectedItem } = useItemValue();
const { resetIsEditedHeader } = useNewActuacion();
const { obtenerTarjeta } = useActuacionData();

const {
  statesID,
  setPristineById,
  setModifiedData,
  guardarModificaciones,
  isEditing,
  cancelarModificaciones,
} = useFieldState();
let formData = ref<AfectadosForm>({ ...selectedItem.value });
const tarjetaValues = ref<string[]>([]);

onActivated(() => {
  tarjetaValues.value = obtenerTarjeta("afectados")?.valor as string[];
  if (selectedItem.value) {
    selectedType.value = { name: selectedItem.value.typeAfectado };
    selectedDocumento.value = { name: selectedItem.value.typeDocumento };
    selectedSexo.value = { name: selectedItem.value.typeSexo };
    selectedNacionalidad.value = { name: selectedItem.value.nacionalidad };
    selectedEstadoCivil.value = { name: selectedItem.value.estadoCivil };
    selectedInstruccion.value = { name: selectedItem.value.instruccion };
    formData.value = { ...selectedItem.value };
  }
});
const handleDropdownChange = (
  campo: keyof AfectadosForm,
  newValue: { value: any; name: string }
) => {
  console.log("change")
  const name = newValue.value.name;
  console.log("formData antes", formData)
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
  console.log("formData after", formData.value)
};

const getInputValue = (campo: keyof AfectadosForm) => {
  if (campo in formData.value) {
    const modifiedData = statesID.find((state) => state.id === selectedItem.value?.id)
      ?.modifiedData;
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

  const campoStr = typeof campo === "number" ? campo.toString() : campo;
  setModifiedData(itemId, campoStr, valor);
};

const handleBlur = (campo: keyof AfectadosForm) => {
  const valor = getInputValue(campo);
  if (!selectedItem.value) return;

  setModifiedData(selectedItem.value!.id, campo, valor);
};

const handleAgregarElemento = () => {
  console.log(formData.value, "errores");
  if (!formData.value) return;
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
    instruccion: selectedInstruccion.value!.name,
  };

  agregar(nuevoItem);
  formData.value = { ...initialValues };
  resetAllDropdown();
  resetIsEditedHeader();
};

const handleCancelar = () => {
  if (!selectedItem.value) return;
  cancelarModificaciones(selectedItem.value.id);
  formData.value = formData.value = { ...initialValues, ...selectedItem.value };
};

const handleModificarElemento = () => {
  let itemStateEncontrado = guardarModificaciones(selectedItem.value!.id);
  console.log("itemStateEncontrado::: ", itemStateEncontrado);
  let itemAEditar = {
    ...formData.value,
    typeAfectado: selectedType.value?.name || "", // Si selectedType.value es null o undefined, asigna una cadena vacía como valor predeterminado
    typeDocumento: selectedDocumento.value?.name || "",
    typeSexo: selectedSexo.value?.name || "",
    nacionalidad: selectedNacionalidad.value?.name || "",
    estadoCivil: selectedEstadoCivil.value?.name || "",
    instruccion: selectedInstruccion.value?.name || "",
    ...itemStateEncontrado,
  };
  editar(itemAEditar);
};

watch(selectedItem, (newVal: any) => {
  if (!newVal) {
    formData.value = { ...initialValues };
  } else {
    selectedType.value = { name: newVal.typeAfectado };
    selectedDocumento.value = { name: newVal.typeDocumento };
    selectedSexo.value = { name: newVal.typeSexo };
    selectedNacionalidad.value = { name: newVal.nacionalidad };
    selectedEstadoCivil.value = { name: newVal.estadoCivil };
    selectedInstruccion.value = { name: newVal.instruccion };

    formData.value = { ...newVal };
  }
});
</script>
<template>
  <Card>
    <template #content>
      <div class="grid">
        <div class="col-12">
          <pre>{{ values }}</pre>
          <label for="dropdown">Seleccione tipo de Denunciante</label>
          <MyDropdown class="mt-2" :items="mapToDropdownItems(tarjetaValues)" v-model="selectedType"
            @change="(newValue) => handleDropdownChange('typeAfectado', newValue)"
            placeholder="Seleccione tipo de Denunciante" filter :color="!!selectedItem" />
        </div>
        <div class="col-4">
          <label for="dropdown">Tipo de doc.</label>
          <MyDropdown class="mt-2" :items="documentosDropdown" v-model="selectedDocumento"
            @change="(newValue) => handleDropdownChange('typeDocumento', newValue)" placeholder="Tipo de doc." filter
            :color="!!selectedItem" />
          <!-- <MyDropdown class="mt-2" :items="documentosDropdown" v-model="SexoSelect" placeholder="Tipo de doc." filter /> -->
        </div>
        <div class="col-4">
          <label for="dropdown">N° de doc.</label>
          <!-- <MyInputNumber -->
          <!-- <MyInput type="number" class="mt-2" :value="getInputValue('nroDocumento')"
            @input="handleInputChange('nroDocumento', $event)" @blur="() => handleBlur('nroDocumento')"
            :color="!!selectedItem" /> -->
          <MyInput type="number" class="mt-2" v-model="nroDocumento" v-bind="nroDocumentoAttrs"
            :error="errors.nroDocumento" />
        </div>
        <div class="col-4">
          <label for="dropdown">Sexo</label>
          <!-- <MyDropdown class="mt-2" :items="sexoDropdown" v-model="selectedSexo" placeholder="Sexo"
            @change="(newValue) => handleDropdownChange('typeSexo', newValue)" filter :color="!!selectedItem" /> -->
          <MyDropdown class="mt-2" :items="sexoDropdown" v-model="SexoSelect" placeholder="Sexo"
            @change="(newValue) => handleDropdownChange('typeSexo', newValue)" />
        </div>
        <div class="col-6">
          <label for="dropdown">Apellido</label>
          <!-- <MyInput type="text" class="mt-2" v-model="formData.apellido"/> -->
          <!-- <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('apellido')"
            @input="handleInputChange('apellido', $event)"
            @blur="() => handleBlur('apellido')"
            :color="!!selectedItem"
          /> -->
          <MyInput type="text" class="mt-2" v-model="apellido" v-bind="apellidoAttrs" :error="errors.apellido" />
        </div>
        <div class="col-6">
          <label for="dropdown">Nombre</label>
          <MyInput type="text" class="mt-2" v-model="nombre" v-bind="nombreAttrs" :error="errors.nombre" />
          <!-- <MyInput
            type="text"
            class="mt-2"º
            :value="getInputValue('nombre')"
            @input="handleInputChange('nombre', $event)"
            @blur="() => handleBlur('nombre')"
            :color="!!selectedItem"
          />  -->
        </div>
        <div class="col-3">
          <label for="dropdown">Fecha de nac.</label>
          <MyInput type="text" class="mt-2" :value="getInputValue('fecha')" @input="handleInputChange('fecha', $event)"
            @blur="() => handleBlur('fecha')" :color="!!selectedItem" />
        </div>
        <div class="col-3">
          <label for="dropdown">Nacionalidad</label>
          <MyDropdown class="mt-2" :items="nacionalidadDropdown" placeholder="Nacionalidad"
            @change="(newValue) => handleDropdownChange('nacionalidad', newValue)" v-model="selectedNacionalidad" filter
            :color="!!selectedItem" />
        </div>
        <div class="col-3">
          <label for="dropdown">Estado Civil</label>
          <MyDropdown class="mt-2" :items="estadoCivilDropdown" placeholder="Estado Civil"
            @change="(newValue) => handleDropdownChange('estadoCivil', newValue)" v-model="selectedEstadoCivil" filter
            :color="!!selectedItem" />
        </div>
        <div class="col-12">
          <label for="dropdown">Domicilio de residencia</label>
          <MyTextArea class="mt-2 w-full" placeholder="Domicilio de residencia"
            :value="getInputValue('domicilioResidencia')" @input="handleInputChange('domicilioResidencia', $event)"
            @blur="() => handleBlur('domicilioResidencia')" :color="!!selectedItem" />
        </div>
        <div class="col-3">
          <label for="dropdown">Teléfono</label>
          <MyInput type="text" class="mt-2" placeholder="Teléfono" :value="getInputValue('telefono')"
            @input="handleInputChange('telefono', $event)" @blur="() => handleBlur('telefono')"
            :color="!!selectedItem" />
        </div>
        <div class="col-3">
          <label for="dropdown">Email</label>
          <MyInput type="text" class="mt-2" placeholder="Email" :value="getInputValue('email')"
            @input="handleInputChange('email', $event)" @blur="() => handleBlur('email')" :color="!!selectedItem" />
        </div>
        <div class="col-3">
          <label for="dropdown">Profesión</label>
          <MyInput type="text" class="mt-2" placeholder="Profesión" :value="getInputValue('profesion')"
            @input="handleInputChange('profesion', $event)" @blur="() => handleBlur('profesion')"
            :color="!!selectedItem" />
        </div>
        <div class="col-3">
          <label for="dropdown">Instrucción</label>
          <MyDropdown class="mt-2" :items="instruccionDropdown" placeholder="Instrucción"
            @change="(newValue) => handleDropdownChange('instruccion', newValue)" v-model="selectedInstruccion"
            :color="!!selectedItem" filter />
        </div>

        <div class="ml-auto mt-2 p-0">
          <Button label="Agregar" :disabled="hasErrors()" v-if="!selectedItem" @click="handleAgregarElemento()">
          </Button>
          <div v-else>
            <Button :disabled="isEditing(selectedItem!.id)" label="Cancelar" icon="pi pi-times" severity="secondary"
              outlined aria-label="Cancel" class="mr-3" @click="handleCancelar"></Button>
            <Button label="Guardar Cambios" :disabled="isEditing(selectedItem!.id)" @click="handleModificarElemento()"
              severity="warning"></Button>
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
