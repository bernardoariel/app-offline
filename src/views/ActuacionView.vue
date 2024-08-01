<script lang="ts" setup>
//actuacionView
import { ref, watch, onActivated, computed, onDeactivated } from 'vue';
import DataViewCard from '@/components/DataViewCard.vue';
import DatosLegalesView from './DatosLegalesView.vue';
import DiligenciaView from './DiligenciaView.vue';
import useActuacion from '@/composables/useActuacion';
import useCardInformation from '@/composables/useCardInformation';

import useItem from '../composables/useItems';

import useDatosLegales from '../composables/useDatosLegales';
import useDatosDiligencia from '@/composables/useDatosDiligencia';
import useSaveData from '@/composables/useSaveData';
import useItemValue from '@/composables/useItemValue';
import useActuacionData from '@/composables/useActuacionData';
import { useDialog } from '../composables/useDialog';
import MyDialog from '@/components/elementos/MyModal.vue';
import useFieldState from '@/composables/useFieldsState';
import useLegalesState from '@/composables/useLegalesState';
import useActuacionLoading from '@/composables/useActuacionLoading';
import useCardValidation from '@/composables/useCardValidations';

const { dialogState, confirmNavigation, hideDialog } = useDialog();
interface Props {
  id?: number;
  actuacionName: string;
  actuacionData: any;
}
const props = defineProps<Props>();
const actuacionName = ref(props.actuacionName);
const actuacionData = ref(props.actuacionData)

const activeButtonTab = ref(0);
const { agregarNuevoItem,currentEditId,toogleDateActuacion,setFechaCreacion} = useActuacion();
const { set: setActuacionData } = useActuacionData();
const { fetchActuacionById } = useSaveData();
const {  resetData: resetDatosLegales, setData: setDatosLegales, nroLegajo} = useDatosLegales();
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
} = useFieldState();

const { resetFields: resetLegalFields, isAnyFieldModified: isLegalModified } = useLegalesState();
const { addDataFake, resetData: resetDataLegal } = useDatosLegales();

setActuacionData(props.actuacionData);

onActivated(async () => {
  if (!props.id) {
    setLoading(false);
  }
  toogleDateActuacion();
  if (props.id && !currentEditId.value) {
    const data = await fetchActuacionById(props.id);
    setAll(data); // info tabs1
    setDatosLegales(data); // tabs2
    setFechaCreacion(data.fechaCreacion);
    relato.value = data.relato.replace(/['"]/g, '');
    currentEditId.value = props.id;
    setLoading(false);
    resetFieldsEmpty();
  }
});

const { setAll } = useItem();

const { relato, isEditingHeader, resetRelato } = useDatosDiligencia(props.actuacionName);
const { cardInformationKeys, cardInformation } = useCardInformation(actuacionName,actuacionData);
const { missingFieldsEmpty, resetFieldsEmpty } = useCardValidation();
const { prepararNuevoItem } = useItemValue();

const handleClick = (event: { ctrlKey: any; altKey: any }) => {
  if (event.ctrlKey && event.altKey) {
    // console.log(`Ctrl + Alt + Click detectado: ${actuacionRef}`);
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
  { immediate: true } // Esto asegura que el watcher se ejecute inmediatamente con el valor inicial
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
    // Manténgo al usuario en la página actual sin borrar los estados pendientes por guardar
    hideDialog();
    dialogState.value.pendingRoute = null;
    return;
  }
  isEditingHeader.value = !isEditingHeader.value;
  resetAllStates();
  confirmNavigation(); // Proceder con la navegación
};
watch(
  () => dialogState.value.isDialogVisible,
  (newVal) => {
    if (newVal === false) dialogState.value.pendingRoute = null;
  }
);

watch(() => props.actuacionData, (newData) => {
  actuacionData.value = newData;
});
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
            class="text-red-500 text-7xl mt-3 ml-5"
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
      <Card>
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
                {{ props.actuacionData.titulo }}
              </div>

              <small 
              :class="{'text-orange-500': !nroLegajo, 'text-gray-500': nroLegajo}"
              class="text-sm font-bold"
              >
                <i class="">{{ actuacionData.datosLegales.items[0]}}</i> {{  nroLegajo ? ': '+ nroLegajo : '' }}
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

            <div>
              <small class="text-sm">
                <!--     <i :class="isAnyChange ? 'pi pi-exclamation-circle' : 'pi pi-check-circle'"
                  :style="{ color: isAnyChange ? 'orange' : 'green' }"></i> -->
                {{ isAnyChange ? ' Cambios Pendientes' : ' Sin Cambios' }}
              </small>
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
                      {{ cardInformation[key].titulo }}
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
                    :itemsCardValue="cardInformation[key]"
                    :data-key="key"
                    :actuacion="actuacionName"
                  />
                </template>
              </Card>
            </TabPanel>
            <TabPanel header="Datos Legales">
              <DatosLegalesView :datosLegalesItems="actuacionData.datosLegales.items" />
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
}
.custom-title {
  /* font-size: 28px; */ /* Ajusta el tamaño de la fuente según tus preferencias */
  /* font-weight: 500;  */ /* Puedes ajustar el peso de la fuente según tus preferencias */
  color: #333; /* Cambia el color del texto según tus preferencias */
}
.buttons-container {
  display: flex;
  gap: 10px; /* Espacio entre los botones */
}

.color-border-top {
  border-top: 1px solid #e9e9e984; /* Cambia el color y grosor del borde según necesites */
}
.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
