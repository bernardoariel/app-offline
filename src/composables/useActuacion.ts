import type { Afectados } from "@/interfaces/actuacion.interface"
import { ref } from "vue"

let data_api = [
    {
        id: '1000',
        name: 'Ariel Bernardo',
        description: 'MZA 82 CASA 2, CP:3600 - Formosa, Formosa, Argentina',
        type: 'Denunciante y Damnificado'
      
    },
    {
        id: '1100',
        name: 'Juan Forengei',
        description: 'Stella 1211, CP:2100 - Mendoza, Las Heras, Argentina',
        type: 'Damnificado'
      
    },
    {
        id: '1100',
        name: 'Juan Forengei',
        description: 'Stella 1211, CP:2100 - Mendoza, Las Heras, Argentina',
        type: 'Victima'
      
    },
]

const useActuacion = ( actuacionName:string  ) =>{

    let afectados = ref<Afectados[]>(data_api)
    
    return{
        afectados,

    }
}

export default useActuacion