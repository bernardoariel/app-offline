import { reactive, ref, watch } from "vue";
import type { CardInformation } from "@/interfaces/cardInformation.interface";
import useItems from "./useItems";

const useCardInformation = (actuacionRef, actuacionData) => {
  const itemsCollection = useItems();

  const cardInformation: CardInformation = reactive({
    afectados: { titulo: 'Afectados', items: itemsCollection.afectados || [] },
    vinculados: { titulo: 'Vinculados', items: itemsCollection.vinculados || [] },
    fecha: { titulo: 'Fecha', items: itemsCollection.fechaUbicacion || [] },
    efectos: { titulo: 'Efectos', items: itemsCollection.efectos || [] },
    personalInterviniente: { titulo: 'Personal Interviniente', items: itemsCollection.intervinientes || [] }
  });

  const cardInformationKeys = ref(Object.keys(cardInformation) as (keyof typeof cardInformation)[]);

  const updateCardInformation = (data) => {
    if (!data || !data.tarjetas) {
      console.warn('Data or tarjetas is not defined');
      return;
    }

    // Eliminar propiedades que no están en `data.tarjetas`
    for (const key in cardInformation) {
      if (!data.tarjetas.hasOwnProperty(key)) {
        delete cardInformation[key];
      }
    }

    // Agregar o actualizar propiedades existentes
    for (const key in data.tarjetas) {
      if (cardInformation.hasOwnProperty(key)) {
        cardInformation[key].titulo = data.tarjetas[key].titulo;
        cardInformation[key].items = itemsCollection[key] || [];
      } else {
        cardInformation[key] = {
          titulo: data.tarjetas[key].titulo,
          items: itemsCollection[key] || []
        };
      }
    }
    cardInformationKeys.value = Object.keys(cardInformation) as (keyof typeof cardInformation)[];
  };

  // Llamada inicial
  if (actuacionData?.value) {
    updateCardInformation(actuacionData.value);
  } else {
    console.error('actuacionData is undefined or has no value');
  }

  // Observar cambios en actuacionData
  watch(
    () => actuacionData?.value,
    (newData) => {
      if (newData) {
        updateCardInformation(newData);
      } else {
        console.error('New data is undefined or has no value');
      }
    },
    { immediate: true, deep: true }
  );

  // Observar cambios en cardInformation para actualizar cardInformationKeys
  watch(cardInformation, () => {
    cardInformationKeys.value = Object.keys(cardInformation) as (keyof typeof cardInformation)[];
  }, { deep: true });

  return {
    cardInformationKeys,
    cardInformation,
  };
};

export default useCardInformation;
