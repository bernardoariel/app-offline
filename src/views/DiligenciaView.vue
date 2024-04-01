<script lang="ts" setup>
import useDatosDiligencia from '@/composables/useDatosDiligencia';
import { getUpperCase } from '@/helpers/stringUtils';
import { computed, ref, watch } from 'vue';


interface Props{
  actuacion:string;
}
const props = defineProps<Props>()
const actuacionRef = ref(props.actuacion);
const { processedText, primeradiligencia,processedHeaderText, isEditingHeader,
    isEditedHeader,
    headerContainer,
    headerTextComputed} = useDatosDiligencia(actuacionRef);



const toggleHeader = () => {
  if (isEditingHeader.value) {
    // Guardar
    console.log('Guardamos');
    headerContainer.value = headerTextComputed.value; // Usar headerTextComputed permite reflejar los cambios
    isEditedHeader.value = true; // Se mueve aquí para reflejar que ahora hay un valor editado
  }else{
    if (headerContainer.value === '') {
      headerContainer.value = processedHeaderText.value;
    }
  }
  isEditingHeader.value = !isEditingHeader.value;
};



watch(() => props.actuacion, (newValue) => {
  console.log('newValue::: ', newValue);
  actuacionRef.value = newValue;
});
</script>
<template>
    <div class="surface-section px-2 py-5 md:px-6 lg:px-8 w-full">
      <div class="text-700 text-justify">
        <div class="flex justify-content-between align-items-center mb-5">
          <div class="font-medium text-3xl text-900">{{ primeradiligencia ? getUpperCase(primeradiligencia.titulo) : '' }}</div>
          <div>
            <Button label="Previsualizar" class="p-button-rounded mr-2" />
            <Button label="Registrar" class="p-button-rounded " severity="warning"/>
          </div>
        </div>

        <div class="text-500 mb-3">Este diligencia es ....</div>
        <ul class="list-none p-0 m-0 w-full">
          <li class="flex align-items-center py-3 px-2 border-top-1 surface-border" style="justify-content: space-between;">
            <div v-if="!isEditingHeader && !isEditedHeader" v-html="processedText.header"></div>
            <div v-else-if="!isEditingHeader && isEditedHeader" >aa{{ headerContainer }}</div>
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
              <Textarea rows="10" class="w-full"/>
            </div>
          </li>
          <li class="flex align-items-center py-3 px-2 border-top-1 surface-border" style="justify-content: space-between;">
            <div  v-html="processedText.footer"  style="flex-grow: 1;"></div>
            <div>
              <Button class="ml-3"  icon="pi pi-pencil" rounded></Button>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>
