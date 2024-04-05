<script lang="ts" setup>
import { ref, watch } from 'vue';
import DataViewCard from '@/components/DataViewCard.vue';
import DatosLegalesView from './DatosLegalesView.vue';
import DiligenciaView from './DiligenciaView.vue';

import useActuacion from '@/composables/useActuacion';
import useCardInformation from '@/composables/useCardInformation';
import useAfectados from '@/composables/useAfectados';
import useItem from '../composables/useItems';
import useFieldState from '@/composables/useFiledsState';

interface Props{
  actuacion:string;
}
const props = defineProps<Props>()
const actuacionRef = ref(props.actuacion);
const active = ref(0);
const { agregarNuevoItem } = useActuacion();
const { setAll } = useItem()
const { resetStates } = useFieldState()
const { cardInformationKeys,cardInformation } = useCardInformation(actuacionRef)
const handleClick = (event: { ctrlKey: any; altKey: any; }) =>{
  if (event.ctrlKey && event.altKey) {
        console.log(`Ctrl + Alt + Click detectado: ${actuacionRef}`);
        resetStates()
        setAll()
  }
}
watch(() => props.actuacion, (newValue) => {
  actuacionRef.value = newValue;
});
</script>

<template>
  <div class="grid">
    
    <div class="col-5">
      <Card>
        <template #title>
          <div class="title-container">
            
            <div class="font-medium text-3xl text-900" @click="handleClick">Ingreso de datos {{ $props.actuacion }}</div>

            <div class="buttons-container">
              <Button @click="active = 0" rounded label="1" class="button" :outlined="active !== 0" />
              <Button @click="active = 1" rounded label="2" class="button" :outlined="active !== 1" />
            </div>
          </div>      
        </template>
        <template #content>
          <TabView v-model:activeIndex="active">
            <TabPanel header="Datos Requeridos">
              <Card v-for="key in cardInformationKeys" :key="key" class="p-fluid mb-2 color-border-top">
                <template #title>
                  <div class="title-container">
                    <div class="font-medium text-3xl text-900">{{ cardInformation[key].titulo }}</div>
                  
                    <Button icon="pi pi-plus" severity="secondary" rounded outlined @click="agregarNuevoItem(key as string)" />
                  </div>
                </template>
                <template #content>
                 <DataViewCard :itemsCardValue="cardInformation[key]" :data-key="key"/>
                </template>
              </Card>
            </TabPanel>
            <TabPanel header="Datos Legales">
              <DatosLegalesView />
            </TabPanel>
            
          </TabView>
        </template>
      </Card>
    </div>
    <div class="col">
      <DiligenciaView :actuacion="actuacion" />
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
  /* font-weight: 500;  *//* Puedes ajustar el peso de la fuente según tus preferencias */
  color: #333; /* Cambia el color del texto según tus preferencias */
 
}
.buttons-container {
  display: flex;
  gap: 10px; /* Espacio entre los botones */
}


.color-border-top {
  border-top: 1px solid #e9e9e984; /* Cambia el color y grosor del borde según necesites */
}

</style>