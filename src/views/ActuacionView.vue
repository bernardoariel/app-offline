<script lang="ts" setup>
import { ref, watch, onActivated, computed } from 'vue';
import DataViewCard from '@/components/DataViewCard.vue';
import DatosLegalesView from './DatosLegalesView.vue';
import DiligenciaView from './DiligenciaView.vue';

import useActuacion from '@/composables/useActuacion';
import useCardInformation from '@/composables/useCardInformation';
import useItem from '../composables/useItems';
import useDatosLegales from '../composables/useDatosLegales';
import useDatosDiligencia from '@/composables/useDatosDiligencia';
import useItemValue from '@/composables/useItemValue';
import useActuacionData from '@/composables/useActuacionData';
import { useDialog } from '../composables/useDialog';
import MyDialog from '@/components/elementos/MyModal.vue';
import useFieldState from '@/composables/useFieldsState';
import useLegalesState from '@/composables/useLegalesState';
import useActuacionLoading from '@/composables/useActuacionLoading';
import useCardValidation from '@/composables/useCardValidations';

import { handleFetchActuacion } from '@/helpers/handleFetchActuacion';

const { dialogState, confirmNavigation, hideDialog } = useDialog();
interface Props {
  id?: number;
  actuacionName: string;
  actuacionData: any;
}
const props = defineProps<Props>();
const actuacionName = ref(props.actuacionName);
const actuacionData = ref(props.actuacionData);

const activeButtonTab = ref(0);
const { agregarNuevoItem, toogleDateActuacion } = useActuacion();
const { set: setActuacionData } = useActuacionData();
const { resetData: resetDatosLegales, nroLegajo } = useDatosLegales();
const { setLoading } = useActuacionLoading();

const {
  resetNewRecordCreated,
  resetUnsavedChanges,
  markNewRecordCreated,
  resetRecordDeleted,
  isUnsavedChange,
  areAnyFieldsModifiedGlobally,
  isNewRecordCreated,
  isRecordDeleted,
  isDiligenciaChange,
  resetDiliginciaChange,
  resetPristine,
  resetModifiedData,
} = useFieldState();

const { resetFields: resetLegalFields, isAnyFieldModified: isLegalModified } =
  useLegalesState();
const { addDataFake, resetData: resetDataLegal } = useDatosLegales();

setActuacionData(props.actuacionData);

onActivated(async () => {
  if (!props.id) {
    setLoading(false);
  }
  toogleDateActuacion();
  await handleFetchActuacion(props.id, props.actuacionName);
});

const { setAll } = useItem();

const { relato, isEditingHeader, resetRelato } = useDatosDiligencia(
  props.actuacionName
);
const { cardInformationKeys, cardInformation } = useCardInformation(
  actuacionName,
  actuacionData
);
const { missingFieldsEmpty } = useCardValidation();
const { prepararNuevoItem } = useItemValue();

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
  resetDatosLegales();
  resetLegalFields();
  resetDataLegal();
  resetRelato();
  resetPristine();
  resetModifiedData();
};

watch(
  () => props.actuacionName,
  (newValue) => {
    setActuacionData(props.actuacionData);
    actuacionName.value = newValue;
    resetAllStates();
  }
);

watch(
  () => props.id,
  (newValue) => {
    resetAllStates();
  },
  { immediate: true }
);

const handleNuevoItem = (key: string) => {
  prepararNuevoItem();
  agregarNuevoItem(key);
};
const dialogButtons = [
  {
    label: 'Aceptar',
    class: 'p-button-primary',
    icon: 'pi pi-check',
    action: 'accept',
    focus: false,
  },
  {
    label: 'Cancelar',
    class: 'p-button-secondary',
    icon: 'pi pi-times',
    action: 'cancel',
    focus: true,
  },
];

const handleButtonClick = (action: string) => {
  if (action !== 'accept') {
    hideDialog();
    dialogState.value.pendingRoute = null;
    return;
  }
  isEditingHeader.value = !isEditingHeader.value;
  resetAllStates();
  confirmNavigation();
};

watch(
  () => dialogState.value.isDialogVisible,
  (newVal) => {
    if (newVal === false) dialogState.value.pendingRoute = null;
  }
);

watch(
  () => props.actuacionData,
  (newData) => {
    actuacionData.value = newData;
  }
);

const isAnyChange = computed(() => {
  return (
    isUnsavedChange.value ||
    areAnyFieldsModifiedGlobally() ||
    isNewRecordCreated.value ||
    isRecordDeleted.value ||
    isLegalModified.value ||
    isDiligenciaChange.value
  );
});
</script>

<template>
  <MyDialog
    :visible="dialogState.isDialogVisible"
    :title="dialogState.header.title"
    :buttons="dialogButtons"
    @update:visible="dialogState.isDialogVisible = $event"
    @button-click="handleButtonClick"
  >
    <template #body>
      <div
        class="modal-body flex flex-col items-center w-full"
        style="padding: 0"
      >
        <div class="flex items-center w-full justify-between">
          <i
            class="text-7xl mt-3 ml-5"
            :class="[dialogState.body.colorClass, dialogState.body.icon]"
          ></i>
          <p class="font-bold text-xl ml-4">
            {{ dialogState.body.answer }}
          </p>
        </div>
        <p
          class="text-lg ml-8 text-center text-gray-600"
          style="margin-top: -20px"
        >
          {{ dialogState.body.comments }}
        </p>
      </div>
    </template>
  </MyDialog>
  <div class="grid">
    <div class="col-5">
      <Card v-if="Object.keys(props.actuacionData).length > 0 ? true : false">
        <template #title>
          <div class="title-container">
            <div>
              <Button
                label="Cancelar"
                icon="pi pi-arrow-circle-left"
                severity="secondary"
                rounded
                @click="$router.replace({ name: 'actuaciones' })"
              />
            </div>
            <div
              class="font-medium text-center text-3xl text-900"
              @click="handleClick"
            >
              <div class="text-3xl font-bold">
                {{ props.actuacionData?.titulo }}
              </div>

              <small
                :class="{
                  'text-orange-500': !nroLegajo,
                  'text-gray-500': nroLegajo,
                }"
                class="text-sm font-bold"
              >
                <i class="">{{
                  props.actuacionData?.datosLegales?.items[0]
                }}</i>
                {{ nroLegajo ? ': ' + nroLegajo : '' }}
              </small>
            </div>

            <div class="buttons-container">
              <Tag
                @click="handleClick"
                v-if="$props.id"
                icon="pi pi-pencil"
                severity="danger"
                value="Edición"
                class="px-2"
              ></Tag>
              <Tag
                @click="handleClick"
                v-else
                icon="pi pi-bolt"
                severity="success"
                value="Nueva"
                class="px-2"
              ></Tag>
              <Button
                @click="activeButtonTab = 0"
                rounded
                label="1"
                class="button"
                :outlined="activeButtonTab !== 0"
              />
              <Button
                @click="activeButtonTab = 1"
                rounded
                label="2"
                class="button"
                :outlined="activeButtonTab !== 1"
              />
            </div>

            <div
              class="change-status"
              :title="isAnyChange ? 'Cambios Pendientes' : 'Sin Cambios'"
            >
              <i
                :class="isAnyChange ? 'pi pi-circle-fill' : 'pi pi-circle'"
              ></i>
            </div>
          </div>
        </template>
        <template #content>
          <TabView v-model:activeIndex="activeButtonTab">
            <TabPanel header="Datos Requeridos">
              <Card
                v-for="key in cardInformationKeys"
                :key="key"
                class="p-fluid mb-2 color-border-top"
                :style="
                  missingFieldsEmpty[key]
                    ? key === 'efectos'
                      ? 'borderBottom: 2px solid #f97316'
                      : 'borderBottom: 2px solid #dc3545'
                    : null
                "
              >
                <template #title>
                  <div class="title-container">
                    <div class="font-medium text-3xl text-900">
                      {{ cardInformation[key]?.titulo }}
                    </div>

                    <Button
                      icon="pi pi-plus"
                      severity="secondary"
                      rounded
                      outlined
                      @click="handleNuevoItem(key as string)"
                    />
                  </div>
                </template>
                <template #content>
                  <DataViewCard
                    v-if="cardInformation[key]"
                    :itemsCardValue="cardInformation[key]"
                    :data-key="key"
                    :actuacion="actuacionName"
                  />
                </template>
              </Card>
            </TabPanel>
            <TabPanel header="Datos Legales">
              <DatosLegalesView
                v-if="props.actuacionData?.datosLegales"
                :datosLegalesItems="props.actuacionData.datosLegales.items"
              />
            </TabPanel>
          </TabView>
        </template>
      </Card>
    </div>
    <div class="col">
      <DiligenciaView :actuacion="actuacionName" :id="props.id" />
    </div>
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.buttons-container {
  display: flex;
  gap: 10px;
}

.color-border-top {
  border-top: 1px solid #e9e9e984;
}

.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.change-status {
  position: absolute;
  top: -18px;
  right: -10px;
  font-size: 1.5rem;
}
</style>
