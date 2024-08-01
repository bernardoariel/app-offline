import { reactive, ref, watch } from 'vue';
import type { CardInformation } from '@/interfaces/cardInformation.interface';
import useItems from './useItems';

const useCardInformation = (actuacionRef, actuacionData) => {
  const itemsCollection = useItems();

  const cardInformation: CardInformation = reactive({});

  const updateCardInformation = (data) => {
    console.log('updateCardInformation called with data:', data);
    if (data && data.tarjetas) {
      console.log('tarjetas:', data.tarjetas);
      Object.keys(data.tarjetas).forEach((key) => {
        cardInformation[key] = {
          titulo: data.tarjetas[key].titulo,
          values: data.tarjetas[key].valor || [],
          items: itemsCollection[key] || [],
        };
      });
      console.log('Updated cardInformation:', cardInformation);
    } else {
      console.warn('Data or tarjetas is not defined');
    }
  };

  // Llamada inicial
  if (actuacionData && actuacionData.value) {
    console.log('Initial actuacionData:', actuacionData.value);
    updateCardInformation(actuacionData.value);
  } else {
    console.error('actuacionData is undefined');
  }

  // Observar cambios en actuacionData
  watch(() => actuacionData.value, (newData) => {
    console.log('actuacionData changed:', newData);
    if (newData) {
      updateCardInformation(newData);
    }
  });

  const cardInformationKeys = ref(Object.keys(cardInformation) as (keyof typeof cardInformation)[]);

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
