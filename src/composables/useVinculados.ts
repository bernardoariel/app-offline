
import type { RespCard } from "@/interfaces/RespCard.interface"
import { ref } from "vue"

let data_api = [
    {
        id: '1000',
        name: 'Ariel Bernardo',
        description: 'MZA 82 CASA 2, CP:3600 - Formosa, Formosa, Argentina',
        type: 'Acusado'
      
    },
    {
        id: '1100',
        name: 'Juan Forengei',
        description: 'Stella 1211, CP:2100 - Mendoza, Las Heras, Argentina',
        type: 'Detenido'
      
    },
    
]
let vinculados = ref<RespCard[]>(data_api);
const agregarInterviniente = (nuevoAfectado: RespCard) => {
  vinculados.value.push(nuevoAfectado);
};
const useVinculados = () => {

  
  return {
    vinculados,
    items: vinculados,
    agregar: agregarInterviniente,
  };
};

export default useVinculados