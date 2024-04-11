import { ref } from "vue"
import type { Actuacion } from '@/interfaces/tipoActuaciones.interface';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import  { actuaciones } from '@/data/tipoActuaciones';
import { formatFecha } from '../helpers/getFormatFecha';

let fechaCreacion = ref(formatFecha(new Date()))

const useActuacion = () => {
    
    const router = useRouter();
    const route = useRoute();
    const toogleDateActuacion = () =>{

        if (fechaCreacion.value && route.name !== 'actuacion') {
            console.log('es null')
            fechaCreacion.value = null

        }else{
            fechaCreacion.value = formatFecha(new Date())
            console.log('no es null')
        }   
    }
    const refreshDate = ()=>{
        fechaCreacion.value = formatFecha(new Date())
    }
    const agregarNuevoItem = (key: string) => {
       router.push({ name: 'formulario', params: { tipo: key } });
    };

    return {
        agregarNuevoItem,
        fechaCreacion,
        toogleDateActuacion,
        refreshDate
    };
}
export default useActuacion;