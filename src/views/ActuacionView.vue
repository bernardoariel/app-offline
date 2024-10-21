<script lang="ts" setup>
import { ref, watch, onActivated } from 'vue';
import { useRoute } from 'vue-router';
import { ActuacionCards, ToolbarActuacion } from '@/components/index';
import { MyModal } from '@/components/elementos/index';
import { DiligenciaComponent } from '@/components/index';
import {
  useActuacion,
  useDatosLegales,
  useDatosDiligencia,
  useActuacionData,
  useDialog,
  useFieldsState,
  useLegalesState,
  useActuacionLoading
} from '@/composables/index'
import { handleFetchActuacion, dialogButtons } from '@/helpers/index';

interface Props {
  id?: number;
  actuacionName: string;
  actuacionData: any;
}
const props = defineProps<Props>();

const router = useRoute();

const { dialogState, confirmNavigation, hideDialog } = useDialog();
const { toogleDateActuacion } = useActuacion();
const { set: setActuacionData } = useActuacionData();
const { setLoading } = useActuacionLoading();
const {
  resetNewRecordCreated,
  resetUnsavedChanges,
  resetRecordDeleted,
  resetDiliginciaChange,
  resetPristine,
  resetModifiedData,
} = useFieldsState();
const { resetFields: resetLegalFields } = useLegalesState();
const { resetData: resetDataLegal } = useDatosLegales();
const { isEditingHeader, resetRelato } = useDatosDiligencia(props.actuacionName);

setActuacionData(props.actuacionData);

onActivated(async () => {
  if (!props.id) {
    setLoading(false);
    setActuacionData(props.actuacionData);
  }
  toogleDateActuacion();
  await handleFetchActuacion(props.id, props.actuacionName);
});

const resetAllStates = () => {
  resetUnsavedChanges();
  resetNewRecordCreated();
  resetRecordDeleted();
  resetDiliginciaChange();
  resetLegalFields();
  resetDataLegal();
  resetRelato();
  resetPristine();
  resetModifiedData();
};
const resetBackStates = () => {
  resetUnsavedChanges();
  resetNewRecordCreated();
  resetRecordDeleted();
  resetPristine();
  resetModifiedData();
};

const handleButtonClick = (action: string) => {
  if (action !== 'accept') {
    hideDialog();
    dialogState.value.pendingRoute = null;
    return;
  }
  isEditingHeader.value = !isEditingHeader.value;
  if (router.name === 'formulario') {
    resetBackStates();
  } else {
    resetAllStates();
  }
  confirmNavigation();
};

watch(
  () => dialogState.value.isDialogVisible,
  (newVal) => {
    if (newVal === false) dialogState.value.pendingRoute = null;
  }
);

</script>

<template>
  <MyModal :visible="dialogState.isDialogVisible" :title="dialogState.header.title" :buttons="dialogButtons"
    @update:visible="dialogState.isDialogVisible = $event" @button-click="handleButtonClick">
    <template #body>
      <div class="justify-content-center flex flex-col items-center w-full" style="padding: 0">
        <div class="flex items-center w-full justify-between">
          <i class="text-7xl mt-3 ml-5" :class="[dialogState.body.colorClass, dialogState.body.icon]"></i>
          <p class="font-bold text-xl ml-4">
            {{ dialogState.body.answer }}
          </p>
        </div>
        <p class="text-lg ml-8 text-center text-gray-600" style="margin-top: -20px">
          {{ dialogState.body.comments }}
        </p>
      </div>
    </template>
  </MyModal>

  <div class="grid">
    <div class="col-12">
      <ToolbarActuacion :actuacion="props.actuacionName" :id="id" />
    </div>

    <div class="lg:col-5 col-12">
      <ActuacionCards :id=props.id :actuacionName=props.actuacionName :actuacionData=props.actuacionData />
    </div>

    <div class="lg:col-7 col-12">
      <DiligenciaComponent :actuacion="props.actuacionName" :id="props.id" />
    </div>
  </div>
</template>
