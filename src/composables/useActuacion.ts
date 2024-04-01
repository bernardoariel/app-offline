import type { Actuacion } from '@/interfaces/tipoActuaciones.interface';
import { ref } from "vue"
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import  { actuaciones } from '@/data/tipoActuaciones';


const useActuacion = () => {
    const route = useRoute();
    const actuacionParam = route.params.actuacion as string;
   
    const atributosActuacion: Actuacion | undefined = actuaciones[actuacionParam];
  
    // Verifica si atributosActuacion es undefined y asigna un valor por defecto si lo es
    const atributosActuacionRef = ref(atributosActuacion || { segmentoUrl: '' });

    const router = useRouter();
  
    const tarjetas = atributosActuacionRef.value.tarjetas || {};
    // const tarjetasKeys: (keyof typeof tarjetas)[] = Object.keys(tarjetas);
    const nuevoItem = ref({
      id: '1200',
      name: 'Nuevo Afectado',
      description: 'Ubicación desconocida',
      type: 'Desconocido', 
    });

    const agregarNuevoItem = (key: string) => {
      console.log('key::: ', key);
      
      /* const composable = getComposableForType(key);
      composable.agregar(nuevoItem.value); */
       router.push({ name: 'formulario', params: { tipo: key } });
    };

    return {
        atributosActuacion: atributosActuacionRef,
        tarjetas,
        // tarjetasKeys,
        nuevoItem,
        agregarNuevoItem,
       
    };
}
export default useActuacion;