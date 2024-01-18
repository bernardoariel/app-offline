import type { RespCard } from "@/interfaces/RespCard.interface"
import { ref, } from "vue"

let data_api = [
    {
        id: '1000',
        name: 'Cuatriciclo Honda',
        description: '',
        type: 'Recuperado'
      
    },
    {
        id: '1100',
        name: 'Fiat Palio',
        description: 'dddd1133',
        type: 'Denunciado'
      
    },
    {
        id: '1100',
        name: 'Arma Blanca',
        description: 'filosa',
        type: 'Secuestrado'
      
    },
   
]
let efectos = ref<RespCard[]>(data_api);
const agregarEfectos = (nuevoAfectado: RespCard) => {
  efectos.value.push(nuevoAfectado);
};
const useEfectos = () => {

  return {
    efectos,
    items: efectos,
    agregar: agregarEfectos,
  };
};

export default useEfectos;
  


