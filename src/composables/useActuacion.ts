import type { Actuacion } from '@/interfaces/tipoActuaciones.interface';
import { ref } from "vue"
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import  { actuaciones } from '@/data/tipoActuaciones';


const useActuacion = () => {
   /*  const route = useRoute();
    const actuacionParam = route.params.actuacion as string;
   
    const atributosActuacion: Actuacion | undefined = actuaciones[actuacionParam];
  
    const atributosActuacionRef = ref(atributosActuacion || { segmentoUrl: '' }); */

    const router = useRouter();
  
    /* const tarjetas = atributosActuacionRef.value.tarjetas || {}; */
    

    const agregarNuevoItem = (key: string) => {

       router.push({ name: 'formulario', params: { tipo: key } });
    };

    return {
     
        agregarNuevoItem,
       
    };
}
export default useActuacion;