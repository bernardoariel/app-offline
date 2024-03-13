import { reactive, ref } from "vue"
import type { CardInformation } from "@/interfaces/cardInformation.interface";
import useItems from "./useItems";

const useCardInformation = () => {
    
    const itemsCollection = useItems();

    const cardInformation: CardInformation = reactive({
      afectados: { titulo: 'Afectados', items: itemsCollection.afectados }, // asume que es un array
      vinculados: { titulo: 'Vinculados', items: itemsCollection.vinculados }, // asume que es un array
      fecha: { titulo: 'Fecha', items: itemsCollection.fechaUbicacion }, // nota el cambio a "item"
      efectos: { titulo: 'Efectos', items: itemsCollection.efectos }, // asume que es un array
      personalInterviniente: { titulo: 'Personal Interviniente', items: itemsCollection.intervinientes }, // asume que es un array
    });
    const cardInformationKeys = Object.keys(cardInformation) as (keyof typeof cardInformation)[];
    
    return {
        cardInformationKeys,
        cardInformation
    };
};

export default useCardInformation;
  
