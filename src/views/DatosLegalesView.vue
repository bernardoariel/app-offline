<script setup lang="ts">
import MyInput from '@/components/elementos/MyInput.vue';
import { getYearsDrop } from '@/helpers/getYearsDrop';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import { mapToDropdownItems } from '@/helpers/dropUtils';

import { ref, watch } from 'vue';
import {
  sitiosDropdwown,
  modusOperandiDropdwown,
  causaCaratulaDropdwown,
  juzgadoIntervinienteDropdwown,
  articulosDropdwown,
  delitosDropdown
} from '../helpers/getDropItems';
import { getUpperCase } from '@/helpers/stringUtils';
import useDatosLegales from '../composables/useDatosLegales';
import type { DatosLegalesForm } from '../interfaces/datosLegalesForm.interface';
import useLegalesState from '@/composables/useLegalesState';
import useFieldState from '@/composables/useFieldsState';

const { markRecordDeleted } = useFieldState();
const {
  selectedYear,
  selectedSitio,
  selectedDelito,
  selectedModusOperandi,
  selectedCausaCaratula,
  selectedJuzgadoInterviniente,
  selectedArticulo: selectedArticulosRelacionados,
  nroLegajo,
  itemsCausaCaratula,
  initialValuesDatosLegales,
  itemsArticulosRelacionados,
  selectedCausaCaratulaList,
  selectedArticulosRelacionadosList
} = useDatosLegales();
const { addField, setFieldModified } = useLegalesState();

let yearsActuacion: string[] = getYearsDrop();
let formData = ref<DatosLegalesForm>({ ...initialValuesDatosLegales });
interface Props {
  datosLegalesItems?: string[];
}
const props = defineProps<Props>();

const handleDropdownChange = (
  campo: keyof DatosLegalesForm,
  newValue: any
) => {
  console.log('newValue::: ', newValue);
  console.log('campo::: ', campo);
  const name = newValue.name; // Usa `name` directamente
  addField(campo, name);
  if (campo in formData.value) {
    formData.value = {
      ...formData.value,
      [campo]: { name },
    };
    setFieldModified(campo, true);
  }
  // Actualizar las variables reactivas directamente
  if (campo === 'selectSitio') {
    selectedSitio.value = newValue.value;
  } else if (campo === 'selectModusOperandi') {
    selectedModusOperandi.value = newValue.value;
  } else if (campo === 'selectDelito') {
    selectedDelito.value = newValue.value;
  } else if (campo === 'selectCausaCaratula') {
    selectedCausaCaratula.value = newValue.value;
  } else if (campo === 'selectJuzgadoInterviniente') {
    selectedJuzgadoInterviniente.value = newValue.value;
  } else if (campo === 'opcionesCausaCaratula') {
    selectedCausaCaratula.value = newValue.value;
  } else if (campo === 'selectArticulo') {
    selectedArticulosRelacionados.value = newValue.value;
  }
};

watch(selectedCausaCaratula, () => {
  if (!selectedCausaCaratula.value) return;

  const itemExists = itemsCausaCaratula.value.some(
    (item) => item.name === selectedCausaCaratula.value?.name
  );
  if (!itemExists) itemsCausaCaratula.value.push(selectedCausaCaratula.value);

  selectedCausaCaratula.value = undefined;
});

watch(selectedArticulosRelacionados, () => {
  if (!selectedArticulosRelacionados.value) return;

  const itemExists = itemsArticulosRelacionados.value.some(
    (item) => item.name === selectedArticulosRelacionados.value?.name
  );
  if (!itemExists) itemsArticulosRelacionados.value.push(selectedArticulosRelacionados.value);

  selectedArticulosRelacionados.value = undefined;
});

const eliminarItem = (name: string, itemList: string) => {
  if (itemList === 'Tipo') {
    itemsCausaCaratula.value = itemsCausaCaratula.value.filter(
      (item) => item.name !== name
    );
  } else if (itemList === 'Articulo') {
    itemsArticulosRelacionados.value = itemsArticulosRelacionados.value.filter(
      (item) => item.name !== name
    );
  }
  markRecordDeleted();
};

const handleInputChange = (campo: string | number, event: Event) => {
  const valor = (event.target as HTMLInputElement).value;
  if (campo === 'nroLegajo') {
    nroLegajo.value = valor;
  }
  formData.value = { ...formData.value, [campo]: valor };
  addField(campo.toString(), valor);
  setFieldModified(campo.toString(), true);
};

const getField = (type: string): keyof DatosLegalesForm => {
  switch (type) {
    case 'sitio':
      return 'selectSitio';
    case 'delito':
      return 'selectDelito';
    case 'modusOperandi':
      return 'selectModusOperandi';
    case 'causaCaratula':
      return 'selectCausaCaratula';
    case 'juzgadoInterviniente':
      return 'selectJuzgadoInterviniente';
    case 'listboxCausaCaratula':
      return 'opcionesCausaCaratula';
    case 'articulosRelacionados':
      return 'selectArticulo';
    default:
      return '' as keyof DatosLegalesForm;
  }
};

const dropdownItems: { [key: string]: any } = {
  selectSitio: sitiosDropdwown.value,
  selectModusOperandi: modusOperandiDropdwown.value,
  selectCausaCaratula: causaCaratulaDropdwown.value,
  selectJuzgadoInterviniente: juzgadoIntervinienteDropdwown.value,
  selectArticulo: articulosDropdwown.value,
  selectDelito: delitosDropdown.value
};

const getDropdownModel = (item: string) => {
  switch (item) {
    case 'sitio':
      return selectedSitio;
    case 'delito':
      return selectedDelito;
    case 'modusOperandi':
      return selectedModusOperandi;
    case 'causaCaratula':
      return selectedCausaCaratula;
    case 'juzgadoInterviniente':
      return selectedJuzgadoInterviniente;
    case 'listboxCausaCaratula':
      return selectedCausaCaratulaList;
    case 'articulosRelacionados':
      return selectedArticulosRelacionadosList;
    default:
      return ref(null);
  }
};
</script>

<template>
  <div class="grid">
    <div class="col-9">
      <label for="dropdown">{{ props.datosLegalesItems![0] }}</label>
      <MyInput
        type="text"
        class="mt-2"
        v-model="nroLegajo"
        @input="handleInputChange('nroLegajo', $event)"
        color
      />
    </div>
    <div class="col-3">
      <label for="dropdown">Año</label>
      <MyDropdown
        class="w-full mt-2"
        :items="mapToDropdownItems(yearsActuacion)"
        v-model="selectedYear"
        :placeholder="yearsActuacion[0].toString()"
        optionLabel="name"
        :filter="false"
        color
        @change="(newValue) => handleDropdownChange('selectYear', newValue)"
      />
    </div>
    <!-- Sitio -->
    <div v-for="(item, index) in props.datosLegalesItems!.slice(1)" :key="index" class="col-12">
      <label :for="item" class="capitalize">{{ item }}</label>
      <MyDropdown
        v-if="item !== 'listboxCausaCaratula' && item !== 'listboxArticulos'"
        :items="dropdownItems[getField(item)]"
        v-model="getDropdownModel(item).value"
        :placeholder="'Seleccione ' + item"
        optionLabel="name"
        filter
        color
        @change="(newValue) => handleDropdownChange(getField(item), newValue)"
        class="w-full mt-2"
      />
      <Listbox
        v-else-if="item === 'listboxCausaCaratula'"
        v-model="selectedCausaCaratulaList"
        :options="itemsCausaCaratula"
        optionLabel="name"
        class="w-full"
      >
        <template #option="{ option }">
          <div class="flex align-content-center justify-content-between flex-wrap">
            <div class="justify-content-between">
              <span class="font-bold">
                {{ option.name ? getUpperCase(option.name) : '' }}
              </span>
            </div>
            <div class="justify-content-between">
              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="eliminarItem(option.name, 'Tipo')"
              />
            </div>
          </div>
        </template>
      </Listbox>
      <Listbox
        v-else
        v-model="selectedArticulosRelacionadosList"
        :options="itemsArticulosRelacionados"
        optionLabel="name"
        class="w-full"
      >
        <template #option="{ option }">
          <div class="flex align-content-center justify-content-between flex-wrap">
            <div class="justify-content-between">
              <span class="font-bold">
                {{ option.name ? getUpperCase(option.name) : '' }}
              </span>
            </div>
            <div class="justify-content-between">
              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="eliminarItem(option.name, 'Articulo')"
              />
            </div>
          </div>
        </template>
      </Listbox>
    </div>
  </div>
</template>
