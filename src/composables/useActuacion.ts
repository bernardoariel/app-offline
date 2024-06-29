import { ref } from "vue";
import type { Actuacion } from '@/interfaces/tipoActuaciones.interface';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { actuaciones } from '@/data/tipoActuaciones';

let fechaCreacion = ref<Date | null>(new Date());

const useActuacion = () => {
  const router = useRouter();
  const route = useRoute();
  
  const toogleDateActuacion = () => {
    if (route.name !== 'actuacion') {
      console.log('es null');
      fechaCreacion.value = null;
    } else {
      fechaCreacion.value = new Date();
      console.log('no es null');
    }
  };

  const refreshDate = () => {
    fechaCreacion.value = new Date();
  };

  const agregarNuevoItem = (key: string) => {
    router.push({ name: 'formulario', params: { tipo: key } });
  };

  return {
    agregarNuevoItem,
    fechaCreacion,
    toogleDateActuacion,
    refreshDate
  };
};

export default useActuacion;
