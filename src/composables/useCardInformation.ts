import { reactive, ref, watch } from "vue"
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
]
const missingFieldsEmpty = reactive({
  afectados: false,
  vinculados: false,
  fecha: false,
  efectos: false,
  personalInterviniente: false
});
const useCardInformation = (actuacionRef) => {
  const itemsCollection = useItems();

  const cardInformation: CardInformation = reactive({
    afectados: { titulo: 'Afectados', items: itemsCollection.afectados },
    vinculados: { titulo: 'Vinculados', items: itemsCollection.vinculados },
    fecha: { titulo: 'Fecha', items: itemsCollection.fechaUbicacion },
    efectos: { titulo: 'Efectos', items: itemsCollection.efectos },
  });
  

  const updatePersonalInterviniente = (actuacion) => {
    if (actuacionesRequierenInterviniente.includes(actuacion)) {
      cardInformation.personalInterviniente = { titulo: 'Personal Interviniente', items: itemsCollection.intervinientes };
    } else {
      delete cardInformation.personalInterviniente;
    }
  };

  // Llamada inicial
  updatePersonalInterviniente(actuacionRef.value);

  // Observar cambios
  watch(actuacionRef, (newActuacion) => {
    updatePersonalInterviniente(newActuacion);
  });

  const cardInformationKeys = ref(Object.keys(cardInformation) as (keyof typeof cardInformation)[]);

  // Actualizar cardInformationKeys cuando cardInformation cambia
  watch(cardInformation, () => {
    cardInformationKeys.value = Object.keys(cardInformation) as (keyof typeof cardInformation)[];
  });

  return {
    cardInformationKeys,
    cardInformation,
    missingFieldsEmpty
  };
};

export default useCardInformation;
