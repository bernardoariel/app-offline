<template>
  <div class="surface-section px-2 py-5 md:px-6 lg:px-8 w-full">
    <div class="text-700 text-justify">
      <div class="flex justify-content-between align-items-center mb-3">
        <Skeleton
          v-if="isLoading()"
          width="10rem"
          class="mb-2"
          height="2rem"
        ></Skeleton>
        <div v-else class="font-medium text-3xl text-900">
          {{ primeradiligencia ? getUpperCase(primeradiligencia.titulo) : '' }}
        </div>
        <div v-if="isLoading()" class="flex d-row">
          <Skeleton width="5rem" class="mr-2"></Skeleton>
          <Skeleton width="5rem" class="mb-2"></Skeleton>
        </div>
        <div v-else>
          <ToggleButton
            v-model="isVisible"
            class="p-button-rounded mr-2"
            onLabel="Ocultar Pdf"
            offLabel="Ver Pdf"
          />
          <Button
            label="Registrar"
            class="p-button"
            @click="handleSave"
            severity="warning"
          />
        </div>
      </div>

      <div v-if="isVisible">
        <PdfViewer />
      </div>
      <ul v-else class="list-none p-0 m-0 w-full">
        <div v-if="isLoading()">
          <Skeleton class="w-full mb-2" height="1rem"></Skeleton>
          <Skeleton class="w-full mb-2" height="1rem"></Skeleton>
          <Skeleton class="w-full mb-2" height="1rem"></Skeleton>
          <Skeleton class="w-full mb-2" height="1rem"></Skeleton>
          <Skeleton class="w-full mb-2" height="1rem"></Skeleton>
        </div>
        <li
          v-else
          class="flex align-items-center py-3 px-2 border-top-1 surface-border"
          style="justify-content: space-between"
        >
          <div
            v-if="!isEditingHeader && !isEditedHeader"
            v-html="processedText.header"
          ></div>
          <div v-else-if="!isEditingHeader && isEditedHeader">
            <Skeleton v-if="isLoading()" width="10rem" class="mb-2"></Skeleton>
            {{ headerContainer }}
          </div>

          <Textarea
            v-if="isEditingHeader"
            v-model="headerTextComputed"
            autoResize
            @input="setDiliginciaChange()"
            class="w-full"
          />

          <div>
            <Button
              :class="{
                'ml-3': true,
                'p-button-rounded': true,
                'p-button-warning': isEditingHeader,
                'p-button-help': !isEditingHeader,
              }"
              :icon="isEditingHeader ? 'pi pi-check' : 'pi pi-pencil'"
              @click="toggleHeader"
            ></Button>
          </div>
        </li>
        <li class="py-3 px-2 border-top-1 surface-border">
          <Skeleton
            v-if="isLoading()"
            class="mb-2"
            height="1rem"
            width="5rem"
          ></Skeleton>
          <div v-else class="text-500 font-medium mb-2">Relato</div>
          <div>
            <Skeleton
              v-if="isLoading()"
              class="w-full mb-2"
              height="16rem"
            ></Skeleton>
            <Textarea
              v-else
              rows="10"
              class="w-full"
              v-model="relato"
              name="relato"
              @input="setDiliginciaChange()"
            />
          </div>
        </li>
        <Skeleton
          v-if="isLoading()"
          class="w-full mb-2"
          height="3rem"
        ></Skeleton>
        <li
          v-else
          class="flex align-items-center py-3 px-2 border-top-1 surface-border"
          style="justify-content: space-between"
        >
          <div
            v-if="!isEditingFooter && !isEditedFooter"
            v-html="processedText.footer"
          ></div>
          <div v-else-if="!isEditingFooter && isEditedFooter">
            {{ footerContainer }}
          </div>
          <Textarea
            v-if="isEditingFooter"
            v-model="footerTextComputed"
            autoResize
            @input="setDiliginciaChange()"
            class="w-full"
          />
          <div>
            <Button
              :class="{
                'ml-3': true,
                'p-button-rounded': true,
                'p-button-warning': isEditingFooter,
                'p-button-help': !isEditingFooter,
              }"
              :icon="isEditingFooter ? 'pi pi-check' : 'pi pi-pencil'"
              @click="toggleFooter"
            ></Button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useDatosDiligencia from '@/composables/useDatosDiligencia';
import { getUpperCase } from '@/helpers/stringUtils';
import { ref, watch, onActivated, onDeactivated } from 'vue';
import useNewActuacion from '../composables/useNewActuacion';
import useSaveData from '../composables/useSaveData';
import useItem from '@/composables/useItems';
import { useRouter, useRoute } from 'vue-router';
import { useViewPdf } from '../composables/useViewPdf';
import PdfViewer from '@/components/reports/PdfViewer.vue';
import type { dataActuacionForSave } from '../composables/useSaveData';
import useActuacion from '@/composables/useActuacion';
import { useDialog } from '@/composables/useDialog';
import useFieldState from '@/composables/useFieldsState';
import useLegalesState from '@/composables/useLegalesState';

import useDatosLegales from '../composables/useDatosLegales';
import useActuacionLoading from '@/composables/useActuacionLoading';

import Skeleton from 'primevue/skeleton';
import useCardInformation from '@/composables/useCardInformation';
import useCardValidation from '@/composables/useCardValidations';

interface Props {
  actuacion: string;
  id?: number;
}

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute();
const actuacionRef = ref(props.actuacion);

const { generatePdf } = useViewPdf();
const isVisible = ref<boolean>(false);
const {
  processedText,
  primeradiligencia,
  processedHeaderText,
  isEditingHeader,
  headerContainer,
  headerTextComputed,
  processedFooterText,
  isEditingFooter,
  footerContainer,
  footerTextComputed,
  relato,
  resetRelato,
} = useDatosDiligencia(actuacionRef);
const { isLoading } = useActuacionLoading();

const { isEditedHeader, isEditedFooter } = useNewActuacion();
const { isActuationInit, currentEditId } = useActuacion();
const { saveData, updateData } = useSaveData();
const { afectados, efectos, fechaUbicacion, intervinientes, vinculados } =
  useItem();
const {
  nroLegajo,
  selectedCausaCaratula,
  selectedSitio,
  selectedYear,
  selectedJuzgadoInterviniente,
  itemsCausaCaratula,
  selectedModusOperandi,
  resetData: resetDatosLegales,
  selectedUfiNro,
  selectedFiscalCargo,
  selectedAyudanteFiscal,
  itemsArticulosRelacionados,
  selectedDelito
  
} = useDatosLegales();
const { dialogState } = useDialog();
const {
  resetNewRecordCreated,
  resetRecordDeleted,
  resetUnsavedChanges,
  setDiliginciaChange,
  resetDiliginciaChange,
} = useFieldState();
const { resetFields: resetLegalFields } = useLegalesState();
const { cardInformationKeys } = useCardInformation(actuacionRef);
const { setField, missingFieldsEmpty, hasErrors } = useCardValidation();
const setHeaderFromComputed = () => {
  headerContainer.value = headerTextComputed.value;
  isEditedHeader.value = true;
};

const setHeaderFromProcessedIfEmpty = () => {
  if (headerContainer.value === '') {
    headerContainer.value = processedHeaderText.value;
  }
};

const toggleHeader = () => {
  if (isEditingHeader.value) {
    setHeaderFromComputed();
    isEditingHeader.value = !isEditingHeader.value;
    return;
  }
  setHeaderFromProcessedIfEmpty();
  isEditingHeader.value = !isEditingHeader.value;
};

const toggleFooter = () => {
  if (isEditingFooter.value) {
    footerContainer.value = footerTextComputed.value; // Usar headerTextComputed permite reflejar los cambios
    isEditedFooter.value = true; // Se mueve aquí para reflejar que ahora hay un valor editado
  } else {
    if (footerContainer.value === '') {
      footerContainer.value = processedFooterText.value;
    }
  }
  isEditingFooter.value = !isEditingFooter.value;
};

const storeData = async () => {
  const head = headerContainer.value || processedHeaderText.value;
  const body = relato.value;
  const foot = footerContainer.value || processedFooterText.value;

  const datosLegales = {
    nroLegajo: nroLegajo.value?.toString() || '',
    selectYear: selectedYear.value?.name || '',
    selectSitio: selectedSitio.value?.name || '',
    selectModusOperandi: selectedModusOperandi.value?.name || '',
    selectCausaCaratula: selectedCausaCaratula.value?.name || '',
    opcionesCausaCaratula: itemsCausaCaratula.value.map((item) => item.name),
    selectJuzgadoInterviniente: selectedJuzgadoInterviniente.value?.name || '',
    selectUfiNro: selectedUfiNro.value?.name || '',
    selectDelito: selectedDelito.value?.name || '',
    selectFiscalCargo:selectedFiscalCargo.value?.name || '',
    selectAyudanteFiscal:selectedAyudanteFiscal.value?.name || '',
    opcionesArticulosRelacionados:itemsArticulosRelacionados.value.map((item) => item.name),
  };

  const data: dataActuacionForSave = {
    afectados: afectados.value,
    vinculados: vinculados.value,
    fechaUbicacion: fechaUbicacion.value,
    efectos: efectos.value,
    personalInterviniente: intervinientes.value ?? [],
    viewPdf: head + ' ' + body + ' ' + foot,
    pathName: route.params.actuacion as string,
    datosLegales,
    relato: relato.value
  };

  if (props.id) {
    data.id = props.id;
    updateData(data);
    return;
  }

  await saveData(data);
};

const navigateSuccessfully = async () => {
  await router.push({ name: 'actuaciones' });
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
      .filter((key) => missingFieldsEmpty[key as keyof typeof missingFieldsEmpty])
      .join(', ')}`
  );
  return;
}

  await storeData();

  isVisible.value = false;
  isActuationInit.value = false;
  currentEditId.value = null;
  dialogState.value.allowNavigation = true;
  resetAllStates();
  await navigateSuccessfully();
};

onActivated(() => {
  isVisible.value = false; // Set visibility to false when the component is activated
});

onDeactivated(() => {
  isVisible.value = false; // Set visibility to false when the component is deactivated
});

watch(
  () => props.actuacion,
  (newValue) => {
    actuacionRef.value = newValue;
    resetAllStates();
  }
);

const resetAllStates = () => {
  resetUnsavedChanges();
  resetNewRecordCreated();
  resetRecordDeleted();
  resetDiliginciaChange();
  resetLegalFields();
  resetRelato();
};
</script>
