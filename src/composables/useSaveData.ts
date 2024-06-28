import { ref } from 'vue';
import Dexie from 'dexie';
import type { Afectados } from '../interfaces/afectado.interface';
import type { Vinculados } from '../interfaces/vinculado.interface';
import type { FechaUbicacion } from '../interfaces/afectadosForm.interface';
import type { Efectos } from '../interfaces/efecto.interface';
import type { PersonalInterviniente } from '../interfaces/personalInterviniente';
import useActuacion from './useActuacion';
import useDatosLegales from './useDatosLegales';
import { juzgadoInterviniente } from '../data/actuacionNew';



export interface dataActuacionForSave {
    id?: number;
    nroLegajoCompleto?: string,
    afectados: Afectados[],
    vinculados: Vinculados[],
    fechaUbicacion: FechaUbicacion,
    efectos: Efectos[],
    personalInterviniente: PersonalInterviniente[],
    viewPdf?: string
}
/* const { fechaCreacion } = useActuacion()   */
const fechaCreacion = ref('24/08/1974')
const { nombreActuacion, nroLegajo, selectedJuzgadoInterviniente } = useDatosLegales()
const db = new Dexie('Siis') as any;

db.version(1).stores({
    actuaciones: '++id'
});


const useSaveData = () => {
    const error = ref(null as unknown);
    const success = ref(false);

    const saveData = async (data: dataActuacionForSave) => {
        console.log('data::: ', data);

        try {
            await db.open();
            // Ajustar las claves aquí
            await db.actuaciones.add({
                nroLegajoCompleto: nroLegajo.value,
                fechaCreacion: fechaCreacion.value.substring(0, 10),
                nombreActuacion: nombreActuacion.value,
                juzgadoInterviniente: selectedJuzgadoInterviniente.value.name,
                afectados: JSON.stringify(data.afectados),
                vinculados: JSON.stringify(data.vinculados),
                fechaUbicacion: JSON.stringify(data.fechaUbicacion),
                efectos: JSON.stringify(data.efectos),
                personalInterviniente: JSON.stringify(data.personalInterviniente),
                viewPdf:JSON.stringify(data.viewPdf)
            });
            success.value = true;

        } catch (err) {
            console.error('Error al guardar datos:', err);
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
                    fechaCreacion: fechaCreacion.value,
                    nroLegajoCompleto: actuacion.nroLegajoCompleto,
                    nombreActuacion: nombreActuacion.value,
                    juzgadoInterviniente: actuacion.juzgadoInterviniente,
                    afectados: JSON.parse(actuacion.afectados),
                    vinculados: JSON.parse(actuacion.vinculados),
                    fechaUbicacion: JSON.parse(actuacion.fechaUbicacion),
                    efectos: JSON.parse(actuacion.efectos),
                    personalInterviniente: JSON.parse(actuacion.personalInterviniente),
                    viewPdf:JSON.parse(actuacion.viewPdf)
                };
            });


            return deserializedData;
        } catch (err) {
            console.error('Error al recuperar datos:', err);
            return [];
        }
    };

    const deleteActuacion = async (id: string) => {
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
    }
    return {
        saveData,
        error,
        success,
        fetchActuaciones,
        deleteActuacion
    };
};

export default useSaveData;