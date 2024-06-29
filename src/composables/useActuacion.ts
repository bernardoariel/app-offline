import { ref, watch } from 'vue';
import type { Actuacion } from '@/interfaces/tipoActuaciones.interface';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { actuaciones } from '@/data/tipoActuaciones';
import { formatFecha } from '../helpers/getFormatFecha';

const fechaCreacion = ref<Date | null>(new Date());

const useActuacion = () => {
  const router = useRouter();
  const route = useRoute();
  
  const toogleDateActuacion = () => {

    fechaCreacion.value = null;
    if (route.name === 'newActuacion') initValue()

  };

  const setFechaCreacion = (date: Date) => {
    fechaCreacion.value = date;
  };

  const initValue = () =>{
    console.log('initValue')
    fechaCreacion.value = new Date();
  }

  const agregarNuevoItem = (key: string) => {
    router.push({ name: 'formulario', params: { tipo: key } });
  };

  watch(fechaCreacion, (newValue) => {
    getFormattedDate.value = formatFecha(newValue, 'fecha');
    getFormattedDateTime.value = formatFecha(newValue, 'fechaHora');
  });
  const getFormattedDate = ref<string>(formatFecha(fechaCreacion.value, 'fecha'));
  const getFormattedDateTime = ref<string>(formatFecha(fechaCreacion.value, 'fechaHora'));


  return {
    fechaCreacion,
    setFechaCreacion,
    getFormattedDate,
    getFormattedDateTime,
    agregarNuevoItem,
    toogleDateActuacion,
  };
};

export default useActuacion;
