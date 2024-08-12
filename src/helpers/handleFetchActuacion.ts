import useActuacion from '@/composables/useActuacion';
import useItem from '../composables/useItems';
import useSaveData from '@/composables/useSaveData';
import useDatosLegales from '@/composables/useDatosLegales';
import useDatosDiligencia from '@/composables/useDatosDiligencia';
import useActuacionLoading from '@/composables/useActuacionLoading';
import useCardValidation from '@/composables/useCardValidations';


export async function handleFetchActuacion(id: number | undefined, actuacionName?: string) {

  const { setAll } = useItem();
  const { currentEditId, setFechaCreacion } = useActuacion();
  const { fetchActuacionById } = useSaveData();
  const { setData: setDatosLegales, } = useDatosLegales();
  const { setLoading } = useActuacionLoading();
  const { resetFieldsEmpty } = useCardValidation();

  if (id && !currentEditId.value) {
    const data = await fetchActuacionById(id);
    if (actuacionName) {
      const { relato } = useDatosDiligencia(actuacionName);
      relato.value = data.relato.replace(/['"]/g, '');
    }
    setAll(data); // info tabs1
    setDatosLegales(data); // tabs2
    setFechaCreacion(data.fechaCreacion);
    currentEditId.value = id;
    setLoading(false);
    resetFieldsEmpty();
  }
}