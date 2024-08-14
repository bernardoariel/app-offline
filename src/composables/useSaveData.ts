import { ref } from 'vue';

import type { Afectados } from '../interfaces/afectado.interface';
import type { Vinculados } from '../interfaces/vinculado.interface';
import type { FechaUbicacion } from '../interfaces/fecha.interface';
import type { Efectos } from '../interfaces/efecto.interface';
import type { PersonalInterviniente } from '../interfaces/personalInterviniente';
import type { DatosLegales } from '../interfaces/datosLegalesForm.interface';

import useActuacion from './useActuacion';
import useDatosLegales from './useDatosLegales';
import useActuacionData from './useActuacionData';
import dbOperations from '@/services/dbOperations';

export interface dataActuacion {
  id?: number;
  nroLegajoCompleto?: string;
  afectados: Afectados[];
  vinculados: Vinculados[];
  fechaUbicacion: FechaUbicacion;
  efectos: Efectos[];
  datosLegales: DatosLegales;
  personalInterviniente: PersonalInterviniente[];
  viewPdf?: string;
  pathName?: string;
  relato: string;
}

const { fechaCreacion } = useActuacion();
const { actuacionData } = useActuacionData()
const { nroLegajo, selectedJuzgadoInterviniente } = useDatosLegales();


const useSaveData = () => {
  const error = ref(null as unknown);
  const success = ref(false);

  const saveData = async (data: dataActuacion) => {
    data.relato = data.relato.replace(/\n/g, ' ');
    const result = await dbOperations.save({
      ...data,
      nroLegajoCompleto: nroLegajo.value as string,
      fechaCreacion: fechaCreacion.value,
      nombreActuacion: actuacionData.value?.titulo,
      juzgadoInterviniente: selectedJuzgadoInterviniente.value?.name || '',
    })
    success.value = result.success;
    error.value = result.error
  };

  const updateData = async (data: dataActuacion) => {
    data.relato = data.relato.replace(/\n/g, ' ');
    if (typeof data.id !== 'number') {
      console.error('Invalid id:', data.id);
      error.value = 'Invalid id';
      return;
    }
    const result = await dbOperations.update({
      ...data,
      nroLegajoCompleto: nroLegajo.value as string,
      nombreActuacion: actuacionData.value?.titulo,
      juzgadoInterviniente: selectedJuzgadoInterviniente.value?.name || '',
    })
    success.value = result.success;
    error.value = result.error
  };

  const fetchActuaciones = async () => {
    return await dbOperations.fetchActuaciones();

  };

  const fetchActuacionById = async (id: number) => {
    return await dbOperations.fetchActuacionById(id);

  };

  const deleteActuacion = async (id: number) => {
    const result = await dbOperations.deleteActuacion(id)
    success.value = result.success;
    error.value = result.error
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
