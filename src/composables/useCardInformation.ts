import { reactive, ref, watch } from "vue";
import type { CardInformation } from "@/interfaces/cardInformation.interface";
import useItems from "./useItems";

const actuacionesRequierenInterviniente = [
  'sumario-oficio',
  'expediente-oficio',
  'ufi-flagrancia',
  'ufi-generica-oficio',
  'ufi-propiedad-oficio',
  'ufi-informatica-oficio',
  'ufi-cavig',
  'ufi-anivi'
];

const useCardInformation = (actuacionRef, actuacionData) => {
  const itemsCollection = useItems();

  const cardInformation: CardInformation = reactive({
    afectados: { titulo: 'Afectados', items: itemsCollection.afectados },
    vinculados: { titulo: 'Vinculados', items: itemsCollection.vinculados },
    fecha: { titulo: 'Fecha', items: itemsCollection.fechaUbicacion },
    efectos: { titulo: 'Efectos', items: itemsCollection.efectos },
    personalInterviniente: { titulo: 'Personal Interviniente', items: itemsCollection.intervinientes }
  });

  const cardInformationKeys = ref(Object.keys(cardInformation) as (keyof typeof cardInformation)[]);

 /*  const updateCardInformation = (data) => {
    if (data && data.tarjetas) {
      for (const key in cardInformation) {
        if (!data.tarjetas.hasOwnProperty(key)) {
          delete cardInformation[key];
        }
      }
      console.log('Updated cardInformation:', cardInformation);
    } 
  }; */

  /* // Llamada inicial
  if (actuacionData?.value) {
    updateCardInformation(actuacionData.value);
  }  */

  // Observar cambios en actuacionData
/*   watch(
    () => actuacionData?.value,
    (newData) => {
      if (newData) {
        updateCardInformation(newData);
      }
    },
    { immediate: true }
  ); */

  // Actualizar cardInformationKeys cuando cardInformation cambia
  watch(cardInformation, () => {
    cardInformationKeys.value = Object.keys(cardInformation) as (keyof typeof cardInformation)[];
    console.log('cardInformationKeys updated:', cardInformationKeys.value);
  });

  return {
    cardInformationKeys,
    cardInformation,
  };
};

export default useCardInformation;
