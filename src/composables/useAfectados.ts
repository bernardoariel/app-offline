import type { RespCard } from "@/interfaces/RespCard.interface"
import { ref, } from "vue"

let data_api = [
    {
        id: '1000',
        name: 'Ariel Bernardo',
        description: 'MZA 82 CASA 2, CP:3600 - Formosa, Formosa, Argentina',
        type: 'Denunciante y Damnificado'
      
    },
    {
        id: '1101',
        name: 'Juan Forengei',
        description: 'Stella 1211, CP:2100 - Mendoza, Las Heras, Argentina',
        type: 'Damnificado'
      
    },
    {
        id: '1102',
        name: 'Carlos Mancuso',
        description: 'Stella 1211, CP:2100 - Mendoza, Las Heras, Argentina',
        type: 'Damnificado'
      
    },
    {
        id: '1103',
        name: 'Marcela Santy',
        description: 'Stella 1211, CP:2100 - Mendoza, Las Heras, Argentina',
        type: 'Victima'
      
    },
]
let afectados = ref<RespCard[]>(data_api);
const agregarAfectado = (nuevoAfectado: RespCard) => {
    afectados.value.push(nuevoAfectado);
};
const eliminarAfectado = (id: string) => {
   
    afectados.value = afectados.value.filter(afectado => afectado.id !== id);
};

const useAfectados = () => {

    
    return {
        afectados,
        items: afectados,
        agregar: agregarAfectado,
        eliminar: eliminarAfectado,
    };
};

export default useAfectados;
  

