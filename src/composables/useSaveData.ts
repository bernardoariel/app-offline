import { ref } from 'vue';

import useActuacion from './useActuacion';
import useDatosLegales from './useDatosLegales';
import { useFormCompleted } from './useFormCompleted';
import useActuacionData from './useActuacionData';
import dbOperations from '@/service/dbOperations';

const { fechaCreacion } = useActuacion();
const { actuacionData } = useActuacionData();
const { nombreActuacion, nroLegajo, selectedJuzgadoInterviniente } = useDatosLegales();
const { validateForm } = useFormCompleted();

const useSaveData = () => {
  const error = ref(null as unknown);
  const success = ref(false);

  const saveData = async (data: dataActuacionForSave) => {
    const isValid = validateForm(nombreActuacion.value, data);
    data.relato = data.relato.replace(/\n/g, ' ');
    if (!isValid) {
      alert('faltan datos');
      success.value = false;
      return;
    }
    data.fechaCreacion = fechaCreacion.value;
    data.nombreActuacion = actuacionData.value?.titulo;
    data.juzgadoInterviniente = selectedJuzgadoInterviniente.value?.name || '';
    const result = await dbOperations.saveData(data);
    success.value = result.success;
    error.value = result.error;
  };

  const updateData = async (data: dataActuacionForSave) => {
    data.relato = data.relato.replace(/\n/g, ' ');
    if (typeof data.id !== 'number') {
      console.error('Invalid id:', data.id);
      error.value = 'Invalid id';
      return;
    }
    data.nombreActuacion = nombreActuacion.value;
    data.juzgadoInterviniente = selectedJuzgadoInterviniente.value?.name || '';
    const result = await dbOperations.updateData(data);
    success.value = result.success;
    error.value = result.error;
  };

  const fetchActuaciones = async () => {
    return await dbOperations.fetchActuaciones();
  };

  const fetchActuacionById = async (id: number) => {
    return await dbOperations.fetchActuacionById(id);
  };

  const deleteActuacion = async (id: number) => {
    const result = await dbOperations.deleteActuacion(id);
    success.value = result.success;
    error.value = result.error;
  };

  return {
    saveData,
    updateData,
    error,
    success,
    fetchActuaciones,
    deleteActuacion,
    fetchActuacionById
  };
};

export default useSaveData;
