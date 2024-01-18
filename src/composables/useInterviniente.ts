import type { RespCard } from "@/interfaces/RespCard.interface"
import { ref } from "vue"

let data_api = [
    {
        id: '1000',
        name: 'Dario Perez',
        description: ' Oficial Dependencia E3',
        type: 'Agente'
      
    },
    
]
let intervinientes = ref<RespCard[]>(data_api);
const agregarInterviniente = (nuevoAfectado: RespCard) => {
    intervinientes.value.push(nuevoAfectado);
  };
const useInterviniente = () =>{


    return{
        intervinientes,
        items: intervinientes,
        agregar: agregarInterviniente,
    }
}

export default useInterviniente