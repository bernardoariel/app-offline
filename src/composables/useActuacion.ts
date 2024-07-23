// useActuacion
import { ref, watch } from 'vue';
import type { Actuacion } from '@/interfaces/tipoActuaciones.interface';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { actuaciones } from '@/data/tipoActuaciones';
import { formatFecha } from '../helpers/getFormatFecha';
import useItem from './useItems';
import useFieldState from '@/composables/useFieldsState';


const fechaCreacion = ref<Date | null>(new Date());
const isActuationInit = ref(false);
const currentEditId = ref<number | null>(null);
const { setAll, resetAll } = useItem()
const { resetStates } = useFieldState()

const useActuacion = () => {

  const router = useRouter();
  const route = useRoute();

  const toogleDateActuacion = () => {

    fechaCreacion.value = null;
    isActuationInit.value = true;
    if (route.name === 'newActuacion') initValue()

  };

  const activateComponent = () => {

    toogleDateActuacion();
    resetStates();
    resetAll();

  }
  const setFechaCreacion = (date: Date) => {
    fechaCreacion.value = date;
  };

  const initValue = () => {

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
    isActuationInit,
    activateComponent,
    currentEditId
  };
};

export default useActuacion;
