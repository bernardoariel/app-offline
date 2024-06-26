<template>
  <div class="surface-section px-2 py-5 md:px-6 lg:px-8 w-full">
    <div class="text-700 text-justify">
      <div class="flex justify-content-between align-items-center mb-5">
        <div class="font-medium text-3xl text-900">{{ primeradiligencia ? getUpperCase(primeradiligencia.titulo) : '' }}</div>
        <div>
          <ToggleButton v-model="isVisible" class="p-button-rounded mr-2" onLabel="Ocultar Pdf" offLabel="Ver Pdf" />
          <Button label="Registrar" class="p-button-rounded" @click="handleSave" severity="warning"/>
        </div>
      </div>

      <div class="text-500 mb-3">Este diligencia es ....</div>
      <div v-if="isVisible">
        <PdfViewer />
      </div>
      <ul v-else class="list-none p-0 m-0 w-full">
        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border" style="justify-content: space-between;">
          <div v-if="!isEditingHeader && !isEditedHeader" v-html="processedText.header"></div>
          <div v-else-if="!isEditingHeader && isEditedHeader">{{ headerContainer }}</div>
          <Textarea v-if="isEditingHeader" v-model="headerTextComputed" autoResize class="w-full" />

          <div>
            <Button
              :class="{'ml-3': true, 'p-button-rounded': true, 'p-button-warning': isEditingHeader, 'p-button-help': !isEditingHeader}"
              :icon="isEditingHeader ? 'pi pi-check' : 'pi pi-pencil'"
              @click="toggleHeader"
            ></Button>
          </div>
        </li>
        <li class="py-3 px-2 border-top-1 surface-border">
          <div class="text-500 font-medium mb-2">Relato</div>
          <div>
            <Textarea rows="10" class="w-full" v-model="relato"/>
          </div>
        </li>
        <li class="flex align-items-center py-3 px-2 border-top-1 surface-border" style="justify-content: space-between;">
<div v-if="!isEditingFooter && !isEditedFooter" v-html="processedText.footer"></div>
<div v-else-if="!isEditingFooter && isEditedFooter" >{{ footerContainer }}</div>
<Textarea v-if="isEditingFooter" v-model="footerTextComputed" autoResize class="w-full" />

<div>
  <Button
    :class="{'ml-3': true, 'p-button-rounded': true, 'p-button-warning': isEditingFooter, 'p-button-help': !isEditingFooter}"
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

interface Props {
  actuacion: string;
  id?:number;
}

const props = defineProps<Props>();
const router = useRouter();
const route = useRoute()
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
  relato
} = useDatosDiligencia(actuacionRef);

const { isEditedHeader, isEditedFooter } = useNewActuacion()
const { isActivated , currentEditId} = useActuacion()
const { saveData,updateData } = useSaveData();
const { afectados, efectos, fechaUbicacion, intervinientes, vinculados } = useItem();

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

  }else{

    if (footerContainer.value === '') {
      footerContainer.value = processedFooterText.value;
    }

  }
  isEditingFooter.value = !isEditingFooter.value;
}

const saveOrUpdateData = async () => {

  const head = headerContainer.value || processedHeaderText.value
  const body = relato.value
  const foot = footerContainer.value || processedFooterText.value

  const data:dataActuacionForSave = {
    afectados: afectados.value,
    vinculados: vinculados.value,
    fechaUbicacion: fechaUbicacion.value,
    efectos: efectos.value,
    personalInterviniente: intervinientes.value ?? [],
    viewPdf:head + ' ' + body + ' ' + foot,
    pathName:route.params.actuacion as string
  }; 


  if (props.id) {
    data.id = props.id;
    updateData(data)  
    return
  } 

  await saveData(data);
  
};

const handleSave = async() => {

  saveOrUpdateData()
  isVisible.value = false;
  isActivated.value = false;
  currentEditId.value = null
  router.push({ name: 'actuaciones' });

};

onActivated(() => {
  isVisible.value = false;  // Set visibility to false when the component is activated
});

onDeactivated(() => {
  isVisible.value = false;  // Set visibility to false when the component is deactivated
});

watch(() => props.actuacion, (newValue) => {
  actuacionRef.value = newValue;
});
</script>