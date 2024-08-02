import { reactive, ref, watch } from "vue";
import type { CardInformation } from "@/interfaces/cardInformation.interface";
import useItems from "./useItems";

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

  const updateCardInformation = (data) => {
    if (data && data.tarjetas) {
      // Eliminar propiedades que no están en `data.tarjetas`
      for (const key in cardInformation) {
        if (!data.tarjetas.hasOwnProperty(key)) {
          delete cardInformation[key];
        }
      }
      console.log('Updated cardInformation:', cardInformation);
      cardInformationKeys.value = Object.keys(cardInformation) as (keyof typeof cardInformation)[];
      console.log('cardInformationKeys updated:', cardInformationKeys.value);
    }
  };

  // Llamada inicial
  if (actuacionData?.value) {
    updateCardInformation(actuacionData.value);
  }

  // Observar cambios en actuacionData
  watch(
    () => actuacionData?.value,
    (newData) => {
      if (newData) {
        updateCardInformation(newData);
      }
    },
    { immediate: true, deep: true }
  );

  // Observar cambios en cardInformation para actualizar cardInformationKeys
  watch(cardInformation, () => {
    cardInformationKeys.value = Object.keys(cardInformation) as (keyof typeof cardInformation)[];
    console.log('cardInformationKeys updated:', cardInformationKeys.value);
  }, { deep: true });

  return {
    cardInformationKeys,
    cardInformation,
  };
};

export default useCardInformation;
