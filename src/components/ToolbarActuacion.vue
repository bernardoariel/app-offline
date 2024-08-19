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
    cardInformationKeys.value.includes('efectos') &&
    (!efectos.value || efectos.value.length === 0)
  ) {
    missingFieldsEmpty.efectos = true;
    hasErrors.value = true;
  }
  if (
    cardInformationKeys.value.includes('personalInterviniente') &&
    (!intervinientes.value || intervinientes.value.length === 0)
  ) {
    missingFieldsEmpty.personalInterviniente = true;
    hasErrors.value = true;
  }

  if (hasErrors.value) {
    alert(
      `Los siguientes campos están vacíos: ${Object.keys(missingFieldsEmpty)
        .filter(
          (key) => missingFieldsEmpty[key as keyof typeof missingFieldsEmpty]
        )
        .join(', ')}`
    );
    return;
  }

  await storeData();

  isActuationInit.value = false;
  currentEditId.value = null;
  dialogState.value.allowNavigation = true;
  resetAllStates();
  await navigateSuccessfully();
};
</script>

<template>
  <Toolbar class="toolbar-custom">
    <template #start>
      <div class="flex">
        <Button
          label="Cancelar"
          icon="pi pi-arrow-circle-left"
          severity="secondary"
          rounded
          @click="$router.replace({ name: 'actuaciones' })"
        />
        <small class="text-sm font-bold">
          <i class="">{{ actuacionData?.datosLegales?.items[0] }}</i>
          {{ nroLegajo ? ': ' + nroLegajo : '' }}
        </small>
      </div>
    </template>

    <template #center>
      <div
        class="font-medium text-center text-3xl text-900"
        @click="handleClick"
      >
        <div class="text-3xl font-bold">
          {{ actuacionData?.titulo }}
        </div>
      </div>
    </template>

    <template #end>
      <div class="header-end">
        <MyCalendar
          v-if="showCalendar"
          v-model="today"
          :fechaDesde="null"
          :fechaHasta="'today'"
          @update:modelValue="actualizarFechaCreacion"
        />
        <Button
          label="Registrar"
          class="p-button"
          severity="primary"
          @click="handleSave"
        />
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>
.toolbar-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #f8f9fa;
}

.header-end {
  display: flex;
  align-items: center;
  gap: 10px;
}

.flex {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
