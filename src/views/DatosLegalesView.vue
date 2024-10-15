<script setup lang="ts">
import MyInput from '@/components/elementos/MyInput.vue';
import { getYearsDrop } from '@/helpers/getYearsDrop';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import { mapToDropdownItems } from '@/helpers/dropUtils';
import * as yup from 'yup';
import { computed, ref, watch } from 'vue';
import {
  sitiosDropdwown,
  modusOperandiDropdwown,
  causaCaratulaDropdwown,
  juzgadoIntervinienteDropdwown,
  articulosDropdwown,
  delitosDropdown,
  ufiNroDropdown,
  fiscalCargoDropdown,
  ayudanteFiscalDropdown,
} from '../helpers/getDropItems';
import { getUpperCase } from '@/helpers/stringUtils';
import useDatosLegales from '../composables/useDatosLegales';
import type { DatosLegalesForm } from '../interfaces/datosLegalesForm.interface';
import useLegalesState from '@/composables/useLegalesState';
import useFieldState from '@/composables/useFieldsState';
import { separateCamelCase } from '../helpers/stringUtils';
import { useForm } from 'vee-validate';
import Listbox from 'primevue/listbox';
import useValidacionDatosLegales from '@/composables/useValidacionDatosLegales';

interface Props {
  datosLegalesItems?: string[];
}
const { setValidValue } = useValidacionDatosLegales();
const props = defineProps<Props>();
const { markRecordDeleted } = useFieldState();
const {
  selectedYear,
  selectedSitio,
  selectedDelito,
  selectedModusOperandi,
  selectedCausaCaratula,
  selectedJuzgadoInterviniente,
  selectedArticulosRelacionados,
  nroLegajo,
  itemsCausaCaratula,
  initialValuesDatosLegales,
  itemsArticulosRelacionados,
  selectedCausaCaratulaList,
  selectedArticulosRelacionadosList,
  selectedUfiNro,
  selectedFiscalCargo,
  selectedAyudanteFiscal,
} = useDatosLegales();
let yearsActuacion: string[] = getYearsDrop();
const { addField, setFieldModified } = useLegalesState();

const getField = (type: string): string => {
  switch (type) {
    case 'causaCaratula':
      return 'selectCausaCaratula';
    case 'listboxCausaCaratula':
      return 'opcionesCausaCaratula';
    case 'articulosRelacionados':
      return 'selectArticulo';
    default:
      return type as string;
  }
};

const dropdownItems: { [key: string]: any } = {
  sitio: sitiosDropdwown.value,
  modusOperandi: modusOperandiDropdwown.value,
  selectCausaCaratula: causaCaratulaDropdwown.value,
  juzgadoInterviniente: juzgadoIntervinienteDropdwown.value,
  selectArticulo: articulosDropdwown.value,
  delito: delitosDropdown.value,
  ufiNro: ufiNroDropdown.value,
  fiscalCargo: fiscalCargoDropdown.value,
  ayudanteFiscal: ayudanteFiscalDropdown.value,
};
const yearsActuacionStrings = yearsActuacion.map((year) => year.toString());

const baseValidationSchema = yup.object({
  legajo: yup.string().required(),
  year: yup.object().shape({
    name: yup
      .string()
      .required('Seleccione un año')
      .oneOf(yearsActuacionStrings, 'Seleccione una opción válida'),
  }),
});

const getDynamicValidationSchema = () => {
  let schema = baseValidationSchema;
  const items = props.datosLegalesItems!.slice(1);
  items.forEach((item, index) => {
    if (
      item !== 'causaCaratula' &&
      item !== 'listboxCausaCaratula' &&
      item !== 'articulosRelacionados' &&
      item !== 'listboxArticulos'
    ) {
      if (dropdownItems[getField(item)]) {
        schema = schema.shape({
          [item]: yup.object().shape({
            name: yup
              .string()
              .required('Seleccione una opción válida')
              .oneOf(
                dropdownItems[getField(item)]?.map(
                  (value: { name: any }) => value.name
                ),
                'Seleccione una opción válida'
              ),
          }),
        });
      }
      // else{
      //   schema = schema.shape({
      //   [item]: yup.object().shape({
      //   name: yup
      //     .string()
      //     .required('Seleccione una opción válida')
      //   }),
      // });
      // }
    }
  });
  return schema;
};

const validationSchema = getDynamicValidationSchema();

const { defineField, values, errors } = useForm({
  validationSchema,
});
const isListArticulosRelacionadosEmpty = computed(() => {
  return itemsArticulosRelacionados.value?.length === 0 ? true : false;
});
const isListCausasCaratulaEmpty = computed(() => {
  return itemsCausaCaratula.value?.length === 0 ? true : false;
});

let [legajo, legajoAttrs] = defineField('legajo');
let [year, yearAttrs] = defineField('year');
let [sitio, sitioAttrs] = defineField('sitio');
let [delito, delitoAttrs] = defineField('delito');
let [modusOperandi, modusOperandiAttrs] = defineField('modusOperandi');
let [selectCausaCaratula, selectCausaCaratulaAttrs] = defineField(
  'selectCausaCaratula'
);
let [selectArticulo, selectArticuloAttrs] = defineField('selectArticulo');
let [listboxCausaCaratula, listboxCausaCaratulaAttrs] = defineField(
  'listboxCausaCaratula'
);
let [juzgadoInterviniente, juzgadoIntervinienteAttrs] = defineField(
  'juzgadoInterviniente'
);
let [ayudanteFiscal, ayudanteFiscalAttrs] = defineField('ayudanteFiscal');
let [ufiNro, ufiNroAttrs] = defineField('ufiNro');
let [fiscalCargo, fiscalCargoAttrs] = defineField('fiscalCargo');

const getDropdownModel = (item: string) => {
  switch (item) {
    case 'sitio':
      return sitio;
    case 'delito':
      return delito;
    case 'modusOperandi':
      return modusOperandi;
    case 'causaCaratula':
      return selectCausaCaratula;
    case 'juzgadoInterviniente':
      return juzgadoInterviniente;
    case 'listboxCausaCaratula':
      return listboxCausaCaratula;
    case 'articulosRelacionados':
      return selectArticulo;
    case 'ufiNro':
      return ufiNro;
    case 'fiscalCargo':
      return fiscalCargo;
    case 'ayudanteFiscal':
      return ayudanteFiscal;
    default:
      return ref(null);
  }
};

const getNameAttrs = (item: string) => {
  switch (item) {
    case 'sitio':
      return sitioAttrs;
    case 'delito':
      return delitoAttrs;
    case 'modusOperandi':
      return modusOperandiAttrs;
    case 'causaCaratula':
      return selectCausaCaratulaAttrs;
    case 'juzgadoInterviniente':
      return juzgadoIntervinienteAttrs;
    case 'listboxCausaCaratula':
      return selectedCausaCaratulaList;
    case 'articulosRelacionados':
      return selectArticuloAttrs;
    case 'ufiNro':
      return ufiNroAttrs;
    case 'fiscalCargo':
      return fiscalCargoAttrs;
    case 'ayudanteFiscal':
      return ayudanteFiscalAttrs;
    default:
      return ref(null);
  }
};
const validateData = () => {
  for (const key in values) {
    if (values[key]?.length === 0) {
      setValidValue(false);
      return;
    }
  }

  for (const key in errors.value) {
    if (key in values && values[key]?.length > 0) {
      setValidValue(true);
      return;
    }
  }
  const keys1 = Object.keys(validationSchema.fields).filter(
    (key) => key !== 'year'
  );
  const keys2 = Object.keys(values).filter((key) => key !== 'year');
  const areKeysEqual = keys1.every((key) => keys2.includes(key));
  if (props.datosLegalesItems?.includes('listboxArticulos')) {
    setValidValue(
      Object.keys(errors.value).length === 0 &&
      areKeysEqual &&
      !isListArticulosRelacionadosEmpty.value
    );
    return;
  } else if (props.datosLegalesItems?.includes('listboxCausaCaratula')) {
    setValidValue(
      Object.keys(errors.value).length === 0 &&
      areKeysEqual &&
      !isListCausasCaratulaEmpty.value
    );
    return;
  }

  setValidValue(Object.keys(errors.value).length === 0 && areKeysEqual);
};

watch([values, errors], () => {
  validateData();
});

let formData = ref<DatosLegalesForm>({ ...initialValuesDatosLegales });

const handleDropdownChange = (
  campo: string,
  newValue: { value: any; name: string }
) => {
  const name = newValue.value.name;
  addField(campo, name);
  if (campo in formData.value) {
    formData.value = {
      ...formData.value,
      [campo]: { name },
    };

    setFieldModified(campo, true);
  }
  if (campo === 'sitio') {
    selectedSitio.value = newValue.value;
  } else if (campo === 'modusOperandi') {
    selectedModusOperandi.value = newValue.value;
  } else if (campo === 'delito') {
    selectedDelito.value = newValue.value;
  } else if (campo === 'selectCausaCaratula') {
    selectedCausaCaratula.value = newValue.value;
  } else if (campo === 'juzgadoInterviniente') {
    selectedJuzgadoInterviniente.value = newValue.value;
  } else if (campo === 'opcionesCausaCaratula') {
    selectedCausaCaratula.value = newValue.value;
  } else if (campo === 'selectArticulo') {
    selectedArticulosRelacionados.value = newValue.value;
  } else if (campo === 'ufiNro') {
    selectedUfiNro.value = newValue.value;
  } else if (campo === 'fiscalCargo') {
    selectedFiscalCargo.value = newValue.value;
  }
};

watch(selectedCausaCaratula, () => {
  if (!selectedCausaCaratula.value) return;
  const itemExists = itemsCausaCaratula.value.some(
    (item) => item.name === selectedCausaCaratula.value?.name
  );
  if (!itemExists) itemsCausaCaratula.value.push(selectedCausaCaratula.value);
  selectedCausaCaratula.value = undefined;
  validateData();
});
watch(nroLegajo, () => {
  legajo.value = nroLegajo.value ? nroLegajo.value : '';
  sitio.value = selectedSitio.value
    ? selectedSitio.value
    : { name: 'Seleccione una opción' };
  delito.value = selectedSitio.value
    ? selectedDelito.value
    : { name: 'Seleccione una opción' };
  year.value = selectedYear.value
    ? selectedYear.value
    : { name: 'Seleccione una opción' };
  modusOperandi.value = selectedModusOperandi.value
    ? selectedModusOperandi.value
    : { name: 'Seleccione una opción' };
  juzgadoInterviniente.value = selectedJuzgadoInterviniente.value
    ? selectedJuzgadoInterviniente.value
    : { name: 'Seleccione una opción' };
  ufiNro.value = selectedUfiNro.value
    ? selectedUfiNro.value
    : { name: 'Seleccione una opción' };
  fiscalCargo.value = selectedFiscalCargo.value
    ? selectedFiscalCargo.value
    : { name: 'Seleccione una opción' };
  ayudanteFiscal.value = selectedAyudanteFiscal.value
    ? selectedAyudanteFiscal.value
    : { name: 'Seleccione una opción' };
  validateData();
});

watch(selectedArticulosRelacionados, () => {
  if (!selectedArticulosRelacionados.value) return;

  const itemExists = itemsArticulosRelacionados.value.some(
    (item) => item.name === selectedArticulosRelacionados.value?.name
  );
  if (!itemExists)
    itemsArticulosRelacionados.value.push(selectedArticulosRelacionados.value);

  selectedArticulosRelacionados.value = undefined;
  validateData();
});
const eliminarItem = (name: string, type: string) => {
  if (type === 'caratula') {
    if (!itemsCausaCaratula.value) return;
    itemsCausaCaratula.value = itemsCausaCaratula.value.filter(
      (item) => item.name !== name
    );
  } else if (type === 'articulos') {
    if (!itemsArticulosRelacionados.value) return;
    itemsArticulosRelacionados.value = itemsArticulosRelacionados.value.filter(
      (item) => item.name !== name
    );
  }
  validateData();
  markRecordDeleted();
};

const handleInputChange = (campo: string | number, event: Event) => {
  const valor = (event.target as HTMLInputElement).value;
  if (campo === 'nroLegajo') {
    nroLegajo.value = valor;
    legajo.value = valor;
  }
  formData.value = { ...formData.value, [campo]: valor };
  addField(campo.toString(), valor);
  setFieldModified(campo.toString(), true);
};
</script>
<template>
  <div class="grid">
    <div class="xl:col-9 col-12">
      <label for="dropdown">Legajo N° / N° de extracto</label>
      <MyInput type="text" class="mt-2" v-model="legajo" v-bind="legajoAttrs" :error="errors.legajo"
        @input="handleInputChange('nroLegajo', $event)" color />
    </div>
    <div class="xl:col-3 col-12">
      <label for="dropdown">Año</label>
      <MyDropdown class="w-full mt-2" :items="mapToDropdownItems(yearsActuacion)" v-model="year" v-bind="yearAttrs"
        :error="errors.year" :placeholder="yearsActuacion[0].toString()" optionLabel="name" :filter="false" color
        @change="(newValue) => handleDropdownChange('selectYear', newValue)" />
    </div>
    <div v-for="(item, index) in props.datosLegalesItems!.slice(1)" :key="index" class="col-12">
      <template v-if="item !== 'listboxCausaCaratula' && item !== 'listboxArticulos'">
        <label :for="item" class="capitalize">{{
          separateCamelCase(item === 'juzgadoInterviniente' ? 'Interviniente' : item)
        }}</label>
        <MyDropdown :items="dropdownItems[getField(item)]" v-model="getDropdownModel(item).value"
          v-bind="getNameAttrs(item).value" :placeholder="'Seleccione ' + separateCamelCase(item)" optionLabel="name"
          filter :error="errors[getField(item)]" color
          @change="(newValue) => handleDropdownChange(getField(item), newValue)" class="w-full mt-2" />
        <span class="text-red-400" v-if="errors[getField(item)] ? true : false">
          {{ errors[getField(item)] }}
        </span>
      </template>
      <div v-else-if="item === 'listboxCausaCaratula'">
        <Listbox v-model="selectedCausaCaratulaList" :options="itemsCausaCaratula"
          :class="{ 'is-invalid': isListCausasCaratulaEmpty }" optionLabel="name"
          emptyMessage="No hay opciones seleccionadas" class="w-full">
          <template #option="{ option }">
            <div class="flex align-content-center justify-content-between flex-wrap">
              <div class="justify-content-between">
                <span class="font-bold">
                  {{ option.name ? getUpperCase(option.name) : '' }}
                </span>
              </div>
              <div class="justify-content-between">
                <Button icon="pi pi-trash" severity="danger" @click="eliminarItem(option.name, 'caratula')" />
              </div>
            </div>
          </template>
        </Listbox>
        <span class="text-red-400" v-if="isListCausasCaratulaEmpty">
          Seleccione al menos una causa
        </span>
      </div>
      <div v-else>
        <Listbox v-model="selectedArticulosRelacionadosList" :options="itemsArticulosRelacionados"
          :class="{ 'is-invalid': isListArticulosRelacionadosEmpty }" optionLabel="name"
          emptyMessage="No hay opciones seleccionadas" class="w-full">
          <template #option="{ option }">
            <div class="flex align-content-center justify-content-between flex-wrap">
              <div class="justify-content-between">
                <span class="font-bold">
                  {{ option.name ? getUpperCase(option.name) : '' }}
                </span>
              </div>
              <div class="justify-content-between">
                <Button icon="pi pi-trash" severity="danger" @click="eliminarItem(option.name, 'articulos')" />
              </div>
            </div>
          </template>
        </Listbox>
        <span class="text-red-400" v-if="isListArticulosRelacionadosEmpty">
          Seleccione al menos un articulo
        </span>
      </div>
    </div>
  </div>
</template>
<style>
.is-invalid {
  border: 1px solid red;
}
</style>
