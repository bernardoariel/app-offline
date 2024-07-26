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
  selectedModusOperandi,
  selectedCausaCaratula,
  selectedJuzgadoInterviniente,
  selectedCausaCaratulaList,
  nroLegajo,
  itemsCausaCaratula,
  initialValuesDatosLegales,
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
};

watch(selectedCausaCaratula, () => {
  if (!selectedCausaCaratula.value) return;

  const itemExists = itemsCausaCaratula.value.some(
    (item) => item.name === selectedCausaCaratula.value?.name
  );
  if (!itemExists) itemsCausaCaratula.value.push(selectedCausaCaratula.value);

  selectedCausaCaratula.value = undefined;
});

const eliminarItem = (name: string) => {
  if (itemsCausaCaratula.value === undefined) return;
  itemsCausaCaratula.value = itemsCausaCaratula.value.filter(
    (item) => item.name !== name
  );
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
</script>
<template>
  <div class="grid">
    <div class="col-9">
      <label for="dropdown">{{props.datosLegalesItems[0]}}</label>
     
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
    <div class="col-12">
      <label for="dropdown">Sitio</label>
      <MyDropdown
        :items="sitiosDropdwown"
        v-model="selectedSitio"
        placeholder="Seleccione un sitio"
        optionLabel="name"
        filter
        color
        @change="(newValue) => handleDropdownChange('selectSitio', newValue)"
        class="w-full mt-2"
      />
    </div>
    <!-- Modus Operandi -->
    <div class="col-12">
      <label for="dropdown">Modus operandi</label>
      <MyDropdown
        :items="modusOperandiDropdwown"
        v-model="selectedModusOperandi"
        placeholder="Seleccione Modus Operandi"
        optionLabel="name"
        filter
        color
        @change="
          (newValue) => handleDropdownChange('selectModusOperandi', newValue)
        "
        class="w-full mt-2"
      />
    </div>
    <!-- Modus Operandi -->
    <div class="col-12">
      <label for="dropdown">Causa Caratula</label>
      <MyDropdown
        :items="causaCaratulaDropdwown"
        v-model="selectedCausaCaratula"
        placeholder="Seleccione Causa Caratula"
        optionLabel="name"
        filter
        color
        @change="
          (newValue) => handleDropdownChange('selectCausaCaratula', newValue)
        "
        class="w-full mt-2"
      />
    </div>
    <div class="col-12">
      <Listbox
        v-model="selectedCausaCaratulaList"
        :options="itemsCausaCaratula"
        optionLabel="name"
        class="w-full"
      >
        <template #option="{ option }">
          <div
            class="flex align-content-center justify-content-between flex-wrap"
          >
            <div class="justify-content-between">
              <span class="font-bold">{{
                option.name ? getUpperCase(option.name) : ''
              }}</span>
            </div>
            <div class="justify-content-between">
              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="eliminarItem(option.name)"
              />
            </div>
          </div>
        </template>
      </Listbox>
    </div>
    <!-- UFI Nro. -->
    <div class="col-12">
      <label for="dropdown">Juzgado Interviniente</label>
      <MyDropdown
        :items="juzgadoIntervinienteDropdwown"
        v-model="selectedJuzgadoInterviniente"
        placeholder="Seleccione Juzgado Interviniente"
        optionLabel="name"
        filter
        color
        @change="
          (newValue) =>
            handleDropdownChange('selectJuzgadoInterviniente', newValue)
        "
        class="w-full mt-2"
      />
    </div>
  </div>
</template>
