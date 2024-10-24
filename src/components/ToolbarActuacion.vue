<script lang="ts" setup>
import { ref, watch, onActivated } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import MyCalendar from './elementos/MyCalendar.vue';
import useActuacion from '@/composables/useActuacion';
import useItem from '@/composables/useItems';
import useDatosLegales from '@/composables/useDatosLegales';
import useFieldState from '@/composables/useFieldsState';
import useDatosDiligencia from '@/composables/useDatosDiligencia';
import useActuacionData from '@/composables/useActuacionData';
import useCardValidation from '@/composables/useCardValidations';
import { useDialog } from '@/composables/useDialog';
import useCardInformation from '@/composables/useCardInformation';
import useLegalesState from '@/composables/useLegalesState';
import useSaveData from '@/composables/useSaveData';
import type { dataActuacion } from '@/composables/useSaveData';
import useValidacionDatosLegales from '@/composables/useValidacionDatosLegales';


interface Props {
  actuacion: string;
  id?: number;
}
const props = defineProps<Props>();

const router = useRouter();
const route = useRoute();
const {
  nroLegajo: legajo,
  selectedCausaCaratula,
  selectedSitio,
  selectedYear,
  selectedJuzgadoInterviniente,
  itemsCausaCaratula,
  selectedModusOperandi,
  selectedUfiNro,
  selectedFiscalCargo,
  selectedAyudanteFiscal,
  itemsArticulosRelacionados,
  selectedDelito,
} = useDatosLegales();

const { isDataValid } = useValidacionDatosLegales()
const { fechaCreacion, setFechaCreacion, isActuationInit, currentEditId } =
  useActuacion();
const {
  afectados,
  efectos,
  fechaUbicacion,
  intervinientes,
  vinculados,
  setAll,
} = useItem();
const { setField, missingFieldsEmpty, hasErrors } = useCardValidation();
const { actuacionData } = useActuacionData();
const { cardInformationKeys } = useCardInformation(
  props.actuacion,
  actuacionData
);
const { dialogState } = useDialog();
const { addDataFake, nroLegajo } = useDatosLegales();
const {
  markNewRecordCreated,
  resetUnsavedChanges,
  resetNewRecordCreated,
  resetRecordDeleted,
  resetDiliginciaChange,
} = useFieldState();
const { resetFields: resetLegalFields } = useLegalesState();
const { saveData, updateData } = useSaveData();
const {
  relato,
  resetRelato,
  processedFooterText,
  processedHeaderText,
  headerContainer,
  footerContainer,
} = useDatosDiligencia(props.actuacion);
const showCalendar = ref(false);
const today = ref<Date | null>(null);

onActivated(() => {
  checkRoute();
});

watch(fechaCreacion, (newValue) => {
  today.value = newValue ? new Date(newValue) : null;
});

watch(route, () => {
  checkRoute();
});

const checkRoute = () => {
  showCalendar.value =
    route.name !== 'actuaciones' && route.name !== 'editActuacion';
};

const actualizarFechaCreacion = (fechaSeleccionada: Date) => {
  setFechaCreacion(fechaSeleccionada);
};

const handleClick = (event: { ctrlKey: any; altKey: any }) => {
  if (event.ctrlKey && event.altKey) {
    setAll();
    addDataFake();
    markNewRecordCreated();
    relato.value = 'esto es una prueba del relato';
  }
};

const resetAllStates = () => {
  resetUnsavedChanges();
  resetNewRecordCreated();
  resetRecordDeleted();
  resetDiliginciaChange();
  resetLegalFields();
  resetRelato();
};

const navigateSuccessfully = async () => {
  await router.push({ name: 'actuaciones' });
};

const storeData = async () => {
  const head = headerContainer.value || processedHeaderText.value;
  const body = relato.value;
  const foot = footerContainer.value || processedFooterText.value;

  const datosLegales = {
    nroLegajo: legajo.value?.toString() || '',
    selectYear: selectedYear.value?.name || '',
    selectSitio: selectedSitio.value?.name || '',
    selectModusOperandi: selectedModusOperandi.value?.name || '',
    selectCausaCaratula: selectedCausaCaratula.value?.name || '',
    opcionesCausaCaratula: itemsCausaCaratula.value.map((item) => item.name),
    selectJuzgadoInterviniente: selectedJuzgadoInterviniente.value?.name || '',
    selectUfiNro: selectedUfiNro.value?.name || '',
    selectDelito: selectedDelito.value?.name || '',
    selectFiscalCargo: selectedFiscalCargo.value?.name || '',
    selectAyudanteFiscal: selectedAyudanteFiscal.value?.name || '',
    opcionesArticulosRelacionados: itemsArticulosRelacionados.value.map(
      (item) => item.name
    ),
  };

  const data: dataActuacion = {
    afectados: afectados.value,
    vinculados: vinculados.value,
    fechaUbicacion: fechaUbicacion.value,
    efectos: efectos.value,
    personalInterviniente: intervinientes.value ?? [],
    viewPdf: head + ' ' + body + ' ' + foot,
    pathName: route.params.actuacion as string,
    datosLegales,
    relato: relato.value,
  };

  if (props.id) {
    data.id = props.id;
    updateData(data);
    return;
  }

  await saveData(data);
};

const handleSave = async () => {
  // Reiniciar el estado de los errores
  Object.keys(missingFieldsEmpty).forEach((key) => {
    missingFieldsEmpty[key as keyof typeof missingFieldsEmpty] = false;
  });

  hasErrors.value = false;

  if (
    cardInformationKeys.value.includes('afectados') &&
    (!afectados.value || afectados.value.length === 0)
  ) {
    setField('afectados', true);
    hasErrors.value = true;
  }
  if (
    cardInformationKeys.value.includes('vinculados') &&
    (!vinculados.value || vinculados.value.length === 0)
  ) {
    missingFieldsEmpty.vinculados = true;
    hasErrors.value = true;
  }
  if (
    cardInformationKeys.value.includes('fecha') &&
    (!fechaUbicacion.value || fechaUbicacion.value.length === 0)
  ) {
    missingFieldsEmpty.fecha = true;
    hasErrors.value = true;
  }
  if (
    cardInformationKeys.value.includes('personalInterviniente') &&
    (!intervinientes.value || intervinientes.value.length === 0)
  ) {
    missingFieldsEmpty.personalInterviniente = true;
    hasErrors.value = true;
  }

  if (!hasErrors.value) {
    await storeData();
    isActuationInit.value = false;
    currentEditId.value = null;
    dialogState.value.allowNavigation = true;
    resetAllStates();
    await navigateSuccessfully();
  }
};
</script>

<template>
  <Toolbar class="flex flex-column lg:flex-row px-5 py-4 lg:align-items-stretch align-items-center flex-nowrap">
    <template #start>
      <div class="flex flex-column gap-3 h-full lg:justify-content-between align-items-center lg:align-items-start">
        <div>
          <Button label="Cancelar" icon="pi pi-arrow-circle-left" severity="secondary" rounded
            @click="$router.replace({ name: 'actuaciones' })" />
        </div>
        <small class="text-sm font-bold text-center">
          <i class="">{{ actuacionData?.datosLegales?.items[0] }}</i>
          {{ nroLegajo ? ': ' + nroLegajo : '' }}
        </small>
      </div>
    </template>

    <template #center>
      <div class="text-3xl font-bold xl:block hidden text-center" @click="handleClick">
        {{ actuacionData?.titulo }}
      </div>
    </template>

    <template #end>
      <div class="flex flex-end flex-column gap-3 ">
        <div class="text-2xl font-bold xl:hidden block md:white-space-nowrap text-center" @click="handleClick">
          {{ actuacionData?.titulo }}
        </div>
        <div class="w-full flex lg:justify-content-end justify-content-center">
          <MyCalendar v-if="showCalendar" v-model="today" :fechaDesde="null" :fechaHasta="'today'"
            @update:modelValue="actualizarFechaCreacion" />
          <!-- <Button
          label="Registrar"
          class="p-button"
          severity="primary"
          @click="handleSave"
          :disabled="!isDataValid()"
          /> -->
        </div>
      </div>
    </template>
  </Toolbar>
</template>
