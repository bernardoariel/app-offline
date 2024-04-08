import { ref } from 'vue';
import Dexie from 'dexie';
import type { Afectados } from '../interfaces/afectado.interface';
import type { Vinculados } from '../interfaces/vinculado.interface';
import type { FechaUbicacion } from '../interfaces/afectadosForm.interface';
import type { Efectos } from '../interfaces/efecto.interface';
import type { PersonalInterviniente } from '../interfaces/personalInterviniente';


export interface dataActuacionForSave {
    id?: number;
    datosRequeridos: {
        afectados:Afectados[],
        vinculados:Vinculados[],
        fechaUbicacion:FechaUbicacion,
        efectos:Efectos[],
        personalInterviniente:PersonalInterviniente[]
    }
  }
  
const db = new Dexie('Siis');
  
db.version(1).stores({
    actuaciones: '++id'
});
  

const useSaveData = () => {
    const error = ref(null);
    const success = ref(false);

    const saveData = async (data: dataActuacionForSave) => {

        try {
            await db.open();
             // Serializar los arrays a JSON antes de almacenarlos
              // Ajustar las claves aquí
              await db.actuaciones.add({
                afectados: JSON.stringify(data.datosRequeridos.afectados),
                vinculados: JSON.stringify(data.datosRequeridos.vinculados),
                fechaUbicacion: JSON.stringify(data.datosRequeridos.fechaUbicacion),
                efectos: JSON.stringify(data.datosRequeridos.efectos),
                personalInterviniente: JSON.stringify(data.datosRequeridos.personalInterviniente)
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
            const data = await db.actuaciones.toArray();
            // Deserializar los arrays
            const serializedData = {
                datosRequeridos: {
                    afectado: JSON.stringify(data.datosRequeridos.afectados), // Cambiado de 'afectados' a 'afectado'
                    vinculados: JSON.stringify(data.datosRequeridos.vinculados),
                    fechaUbicacion: JSON.stringify(data.datosRequeridos.fechaUbicacion),
                    efectos: JSON.stringify(data.datosRequeridos.efectos),
                    personalInterviniente: JSON.stringify(data.datosRequeridos.personalInterviniente)
                }
            };
            
            return deserializedData;
        } catch (err) {
            console.error('Error al recuperar datos:', err);
            return [];
        }
    };
    return {
        saveData,
        error,
        success
    };
};

export default useSaveData;