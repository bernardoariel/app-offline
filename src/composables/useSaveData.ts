import { ref } from 'vue';
import Dexie from 'dexie';
import type { Afectados } from '../interfaces/afectado.interface';
import type { Vinculados } from '../interfaces/vinculado.interface';
import type { FechaUbicacion } from '../interfaces/afectadosForm.interface';
import type { Efectos } from '../interfaces/efecto.interface';
import type { PersonalInterviniente } from '../interfaces/personalInterviniente';
import useActuacion from './useActuacion';
import useDatosLegales from './useDatosLegales';
import type { DatosLegales } from '../interfaces/datosLegalesForm.interface';
import { getDependenciaData } from '@/helpers/getDependencia';
import { formatFecha } from '@/helpers/getFormatFecha';
import { useFormCompleted } from './useFormCompleted';

export interface dataActuacionForSave {
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

const { fechaCreacion, getFormattedDate } = useActuacion();
const { nombreActuacion, nroLegajo, selectedJuzgadoInterviniente } = useDatosLegales();
const { validateForm } = useFormCompleted()
const db = new Dexie('Siis') as any;

db.version(1).stores({
  actuaciones: '++id'
});

const useSaveData = () => {
  const error = ref(null as unknown);
  const success = ref(false);

  const saveData = async (data: dataActuacionForSave) => {
    const isValid = validateForm(nombreActuacion.value, data)
    data.relato = data.relato.replace(/\n/g, ' ');
    if (!isValid) {
      alert('faltan datos')
      success.value = false;
      return
    }
    try {
      await db.open();
      await db.actuaciones.add({
        nroLegajoCompleto: nroLegajo.value,
        fechaCreacion: fechaCreacion.value,
        nombreActuacion: nombreActuacion.value,
        juzgadoInterviniente: selectedJuzgadoInterviniente.value?.name || '',
        afectados: JSON.stringify(data.afectados),
        vinculados: JSON.stringify(data.vinculados),
        fechaUbicacion: JSON.stringify(data.fechaUbicacion),
        efectos: JSON.stringify(data.efectos),
        datosLegales: JSON.stringify(data.datosLegales),
        personalInterviniente: JSON.stringify(data.personalInterviniente),
        viewPdf: JSON.stringify(data.viewPdf),
        pathName: JSON.stringify(data.pathName),
        relato: JSON.stringify(data.relato),
        dependenciaData: JSON.stringify(getDependenciaData())
      });
      success.value = true;

    } catch (err) {
      console.error('Error al guardar datos:', err);
      error.value = err;
      success.value = false;
    }

  };

  const updateData = async (data: dataActuacionForSave) => {
    data.relato = data.relato.replace(/\n/g, ' ');
    if (typeof data.id !== 'number') {
      console.error('Invalid id:', data.id);
      error.value = 'Invalid id';
      return;
    }
    try {
      await db.open();
      await db.actuaciones.update(data.id, {
        nroLegajoCompleto: nroLegajo.value,
        // fechaCreacion: fechaCreacion.value,
        nombreActuacion: nombreActuacion.value,
        juzgadoInterviniente: selectedJuzgadoInterviniente.value?.name || '',
        afectados: JSON.stringify(data.afectados),
        vinculados: JSON.stringify(data.vinculados),
        fechaUbicacion: JSON.stringify(data.fechaUbicacion),
        efectos: JSON.stringify(data.efectos),
        datosLegales: JSON.stringify(data.datosLegales),
        personalInterviniente: JSON.stringify(data.personalInterviniente),
        viewPdf: JSON.stringify(data.viewPdf),
        pathName: JSON.stringify(data.pathName),
        relato: JSON.stringify(data.relato)
      });
      success.value = true;
    } catch (err) {
      console.error('Error al actualizar datos:', err);
      error.value = err;
    }
  };

  const fetchActuaciones = async () => {
    try {
      await db.open();
      const actuacionesArray = await db.actuaciones.toArray();

      const deserializedData = actuacionesArray.map(actuacion => {
        return {
          id: actuacion.id,
          fechaCreacion: formatFecha(actuacion.fechaCreacion, 'fecha'),
          nroLegajoCompleto: actuacion.nroLegajoCompleto,
          nombreActuacion: nombreActuacion.value,
          juzgadoInterviniente: actuacion.juzgadoInterviniente,
          afectados: JSON.parse(actuacion.afectados),
          vinculados: JSON.parse(actuacion.vinculados),
          fechaUbicacion: JSON.parse(actuacion.fechaUbicacion),
          efectos: JSON.parse(actuacion.efectos),
          datosLegales: JSON.parse(actuacion.datosLegales),
          personalInterviniente: JSON.parse(actuacion.personalInterviniente),
          viewPdf: JSON.parse(actuacion.viewPdf),
          pathName: JSON.parse(actuacion.pathName),
          relato: JSON.parse(actuacion.relato)
        };
      });

      return deserializedData;
    } catch (err) {
      console.error('Error al recuperar datos:', err);
      return [];
    }
  };

  const fetchActuacionById = async (id: number) => {
    try {
      await db.open();
      const actuacion = await db.actuaciones.get({ id });
      return actuacion;
    } catch (err) {
      console.error('Error al recuperar datos:', err);
      return [];
    }
  };

  const deleteActuacion = async (id: number) => {
    try {
      await db.open();
      const actuacion = await db.actuaciones.where({ id }).first();
      if (actuacion) {
        await db.actuaciones.delete(actuacion.id);
        console.log('Actuación eliminada:', actuacion);
      } else {
        console.log('No se encontró la actuación con id:', id);
      }
    } catch (err) {
      console.error('Error al eliminar actuación:', err);
      error.value = err;
    }
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
