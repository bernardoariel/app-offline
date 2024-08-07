<script lang="ts" setup>
import { onActivated, ref, watch } from 'vue';
import useEfectos from '@/composables/useEfectos';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFieldsState';
import useActuacionData from '@/composables/useActuacionData';
import * as yup from 'yup';

import MyDropdown from '@/components/elementos/MyDropdown.vue';
import MyInput from '@/components/elementos/MyInput.vue';

import type { Efectos } from '../interfaces/efecto.interface';
import type { EfectosForm } from '../interfaces/efecto.interface';
import {
  categoriasDropdown,
  marcasCategoriasDropdown,
  modelosCategoriasDropdown,
  subcategoriasDropdown,
  tipoCategoriasDropdown,
} from '@/helpers/getDropItems';

import { mapToArray, mapToDropdownItems } from '@/helpers/dropUtils';
import { useForm } from 'vee-validate';

const validationSchema = yup.object({
  estadoSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione un estado')
      .oneOf(
        ['Denunciado', 'Recuperado', 'Secuestrado'],
        'Selecciones un tipo válido'
      ),
  }),
  categoriaSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione una categoria')
      .oneOf(
        mapToArray(categoriasDropdown),
        'Selecciones una categoria válida'
      ),
  }),
  subCategoriaSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione una sub categoria')
      .oneOf(mapToArray(subcategoriasDropdown), 'Selecciones una subcategoria'),
  }),
  tipoSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione un tipo')
      .oneOf(mapToArray(tipoCategoriasDropdown), 'Selecciones un tipo válido'),
  }),
  modeloSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione un modelo')
      .oneOf(
        mapToArray(modelosCategoriasDropdown),
        'Selecciones un modelo válido'
      ),
  }),
  marcaSelect: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione una marca')
      .oneOf(
        mapToArray(marcasCategoriasDropdown),
        'Selecciones una marca válida'
      ),
  }),
});
const { defineField, values, errors } = useForm({
  validationSchema,
});

let [estadoSelect, estadoSelectAttrs] = defineField('estadoSelect');
let [categoriaSelect, categoriaSelectAttrs] = defineField('categoriaSelect');
let [subCategoriaSelect, subCategoriaSelectAttrs] =
  defineField('subCategoriaSelect');
let [tipoSelect, tipoSelectAttrs] = defineField('tipoSelect');
let [marcaSelect, marcaSelectAttrs] = defineField('marcaSelect');
let [modeloSelect, modeloSelectAttrs] = defineField('modeloSelect');

const {
  editar,
  agregar,
  initialValues,
  selectedEstado,
  selectedCategoria,
  selectedMarca,
  selectedModelo,
  selectedSubcategoria,
  selectedTipo,
} = useEfectos();

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
const { obtenerTarjeta } = useActuacionData();

const formData = ref<EfectosForm>({ ...initialValues });
const tarjetaValues = ref<string[]>(['']);

onActivated(() => {
  tarjetaValues.value = obtenerTarjeta('efectos')?.valor as string[];
  if (selectedItem.value) {
    formData.value = { ...selectedItem.value };
    updateDataWithForm();
  }
  console.log(mapToArray(categoriasDropdown));
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
    tipoSelect.value = { name: formData.value.tipo };
    marcaSelect.value = { name: formData.value.marca };
    modeloSelect.value = { name: formData.value.modelo };
    categoriaSelect.value = { name: formData.value.categoria };
    subCategoriaSelect.value = { name: formData.value.subcategoria };
    estadoSelect.value = { name: formData.value.estado };
  }
};
const handleDropdownChange = (
  campo: keyof EfectosForm,
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

const getInputValue = (campo: keyof EfectosForm) => {
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

const handleBlur = (campo: keyof EfectosForm) => {
  const valor = getInputValue(campo);
  if (!selectedItem.value) return;

  setModifiedData(selectedItem.value!.id, campo, valor);
};

const handleAgregarElemento = () => {
  if (!formData.value) return;
  const nuevoEfecto: Efectos = {
    estado: estadoSelect.value.name,
    categoria: categoriaSelect.value.name,
    marca: marcaSelect.value.name,
    modelo: modeloSelect.value.name,
    subcategoria: subCategoriaSelect.value.name,
    tipo: tipoSelect.value.name,
    año: formData.value.año,
    nroChasis: formData.value.nroChasis,
    nroMotor: formData.value.nroMotor,
    dominio: formData.value.dominio,
    nroSerie: formData.value.nroSerie,
    nroIMEI: formData.value.nroIMEI,
    nroAbonado: formData.value.nroAbonado,
    color: formData.value.color,
  };

  agregar(nuevoEfecto);
  markNewRecordCreated();
  formData.value = { ...initialValues };
  tipoSelect.value = { name: 'Seleccione un tipo' };
  marcaSelect.value = { name: 'Seleccione una marca' };
  modeloSelect.value = { name: 'Seleccione un modelo' };
  categoriaSelect.value = { name: 'Seleccione una categoria' };
  subCategoriaSelect.value = { name: 'Seleccione una subcategoria' };
  estadoSelect.value = { name: 'Seleccione un estado' };
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
    estado: estadoSelect.value.name || '',
    categoria: categoriaSelect.value.name || '',
    marca: marcaSelect.value.name || '',
    modelo: modeloSelect.value.name || '',
    subcategoria: subCategoriaSelect.value.name || '',
    tipo: tipoSelect.value?.name || '',
    ...itemStateEncontrado,
  };
  editar(itemAEditar);
};
watch(selectedItem, (newVal: any) => {
  if (!newVal) {
    formData.value = { ...initialValues };
    tipoSelect.value = { name: 'Seleccione un tipo' };
    marcaSelect.value = { name: 'Seleccione una marca' };
    modeloSelect.value = { name: 'Seleccione un modelo' };
    categoriaSelect.value = { name: 'Seleccione una categoria' };
    subCategoriaSelect.value = { name: 'Seleccione una subcategoria' };
    estadoSelect.value = { name: 'Seleccione un estado' };
  } else {
    // selectedEstado.value = { name: newVal.estado };
    // selectedCategoria.value = { name: newVal.categoria };
    // selectedMarca.value = { name: newVal.marca };
    // selectedModelo.value = { name: newVal.modelo };
    // selectedSubcategoria.value = { name: newVal.subcategoria };
    // selectedTipo.value = { name: newVal.tipo };
    formData.value = { ...newVal };
    updateDataWithForm();
  }
});
</script>
<template>
  <Card>
    <template #content>
      <!-- <pre>{{ values }}</pre> -->
      <div class="grid">
        <div class="col-6">
          <label for="categoriaDropdown">Seleccione tipo de efecto</label>
          <MyDropdown
            class="mt-2"
            :items="tarjetaValues ? mapToDropdownItems(tarjetaValues) : ''"
            v-model="estadoSelect"
            @change="(newValue) => handleDropdownChange('estado', newValue)"
            placeholder="Seleccione tipo de efecto"
            filter
            :color="false"
            :error="errors.estadoSelect"
            v-bind="estadoSelectAttrs"
          />
          <span class="text-red-400" v-if="errors.estadoSelect ? true : false">
            {{ errors.estadoSelect }}
          </span>
        </div>
        <div class="col-6">
          <label for="categoriaDropdown">Seleccione Categoría</label>
          <MyDropdown
            class="mt-2"
            :items="categoriasDropdown"
            v-model="categoriaSelect"
            @change="handleDropdownChange('categoria', $event)"
            placeholder="Seleccione Categoría"
            filter
            :color="false"
            :error="errors.categoriaSelect"
            v-bind="categoriaSelectAttrs"
          />
          <span
            class="text-red-400"
            v-if="errors.categoriaSelect ? true : false"
          >
            {{ errors.categoriaSelect }}
          </span>
        </div>
        <div class="col-6">
          <label for="subcategoriaDropdown">Seleccione Sub-Categoría</label>
          <MyDropdown
            class="mt-2"
            :items="subcategoriasDropdown"
            v-model="subCategoriaSelect"
            @change="(newValue) => handleDropdownChange('marca', newValue)"
            placeholder="Seleccione Sub-Categoría"
            filter
            :color="false"
            :error="errors.subCategoriaSelect"
            v-bind="subCategoriaSelectAttrs"
          />
          <span
            class="text-red-400"
            v-if="errors.subCategoriaSelect ? true : false"
          >
            {{ errors.subCategoriaSelect }}
          </span>
        </div>
        <div class="col-6">
          <label for="tipoDropdown">Seleccione Tipo</label>
          <MyDropdown
            class="mt-2"
            :items="tipoCategoriasDropdown"
            v-model="tipoSelect"
            @change="(newValue) => handleDropdownChange('modelo', newValue)"
            placeholder="Seleccione Tipo"
            filter
            :color="false"
            :error="errors.tipoSelect"
            v-bind="tipoSelectAttrs"
          />
          <span class="text-red-400" v-if="errors.tipoSelect ? true : false">
            {{ errors.tipoSelect }}
          </span>
        </div>
        <div class="col-6">
          <label for="marcaDropdown">Seleccione Marca</label>
          <MyDropdown
            class="mt-2"
            :items="marcasCategoriasDropdown"
            v-model="marcaSelect"
            @change="
              (newValue) => handleDropdownChange('subcategoria', newValue)
            "
            placeholder="Seleccione Marca"
            filter
            :color="false"
            :error="errors.marcaSelect"
            v-bind="marcaSelectAttrs"
          />
          <span class="text-red-400" v-if="errors.marcaSelect ? true : false">
            {{ errors.marcaSelect }}
          </span>
        </div>
        <div class="col-6">
          <label for="modeloDropdown">Seleccione Modelo</label>
          <MyDropdown
            class="mt-2"
            :items="modelosCategoriasDropdown"
            v-model="modeloSelect"
            @change="(newValue) => handleDropdownChange('tipo', newValue)"
            placeholder="Seleccione Modelo"
            :color="false"
            filter
            :error="errors.modeloSelect"
            v-bind="modeloSelectAttrs"
          />
          <span class="text-red-400" v-if="errors.modeloSelect ? true : false">
            {{ errors.modeloSelect }}
          </span>
        </div>
        <div class="col-6">
          <label for="año">Año</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('año')"
            @input="handleInputChange('año', $event)"
            @blur="() => handleBlur('año')"
            :color="false"
          />
        </div>
        <div class="col-6">
          <label for="nroChasis">Nroº Chasis</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('nroChasis')"
            @input="handleInputChange('nroChasis', $event)"
            @blur="() => handleBlur('nroChasis')"
            :color="false"
          />
        </div>
        <div class="col-6">
          <label for="nroMotor">Nroº Motor</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('nroMotor')"
            @input="handleInputChange('nroMotor', $event)"
            @blur="() => handleBlur('nroMotor')"
            :color="false"
          />
        </div>
        <div class="col-6">
          <label for="dominio">Dominio</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('dominio')"
            @input="handleInputChange('dominio', $event)"
            @blur="() => handleBlur('dominio')"
            :color="false"
          />
        </div>
        <div class="col-6">
          <label for="nroSerie">Nroº Serie</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('nroSerie')"
            @input="handleInputChange('nroSerie', $event)"
            @blur="() => handleBlur('nroSerie')"
            :color="false"
          />
        </div>
        <div class="col-6">
          <label for="nroIMEI">Nroº IMEI</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('nroIMEI')"
            @input="handleInputChange('nroIMEI', $event)"
            @blur="() => handleBlur('nroIMEI')"
            :color="false"
          />
        </div>
        <div class="col-6">
          <label for="nroAbonado">Nroº Abonado</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('nroAbonado')"
            @input="handleInputChange('nroAbonado', $event)"
            @blur="() => handleBlur('nroAbonado')"
            :color="false"
          />
        </div>
        <div class="col-6">
          <label for="color">color</label>
          <MyInput
            type="text"
            class="mt-2"
            :value="getInputValue('color')"
            @input="handleInputChange('color', $event)"
            @blur="() => handleBlur('color')"
            :color="false"
          />
        </div>
        <div class="ml-auto mt-2 p-0">
          <Button
            label="Agregar"
            v-if="!selectedItem"
            :disabled="hasErrors()"
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
