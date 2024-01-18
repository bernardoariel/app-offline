
import type { RespCard } from "@/interfaces/RespCard.interface";
import { ref } from "vue"

let data_api = [
    {
        id: '1000',
        name: 'Entre 18/1/2024 20:21 y 18/1/2024 20:21',
        description: 'las heras 155 sin numero, 25 DE MAYO',
        type: 'Sin Ubicacion '
      
    },
]
let fecha = ref<RespCard[]>(data_api);
const agregarFecha = (nuevoAfectado: RespCard) => {
    
    fecha.value =[]
    fecha.value.push(nuevoAfectado);
   
};
const useFecha = () =>{


    
    return{
        fecha,
        items: fecha,
        agregar: agregarFecha,
    }
}

export default useFecha