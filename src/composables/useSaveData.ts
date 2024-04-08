import { ref } from 'vue';
import Dexie from 'dexie';
import type { Afectados } from '../interfaces/afectado.interface';
import type { Vinculados } from '../interfaces/vinculado.interface';
import type { FechaUbicacion } from '../interfaces/afectadosForm.interface';
import type { Efectos } from '../interfaces/efecto.interface';
import type { PersonalInterviniente } from '../interfaces/personalInterviniente';


export interface dataActuacionForSave {
    id?: number;
    nroLegajoCompleto:string,
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
              // Ajustar las claves aquí
              await db.actuaciones.add({
                nroLegajoCompleto: data.nroLegajoCompleto,
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
        console.log('fetchActuaciones!!!');
        try {
            await db.open();
            const actuacionesArray = await db.actuaciones.toArray();
            console.log('actuacionesArray::: ', actuacionesArray);
            
            // Deserializar cada actuación individualmente
            const deserializedData = actuacionesArray.map(actuacion => {
                return {
                    id: actuacion.id,
                    nroLegajoCompleto: actuacion.nroLegajoCompleto,
                    datosRequeridos: {
                        afectados: JSON.parse(actuacion.afectados),
                        vinculados: JSON.parse(actuacion.vinculados),
                        fechaUbicacion: JSON.parse(actuacion.fechaUbicacion),
                        efectos: JSON.parse(actuacion.efectos),
                        personalInterviniente: JSON.parse(actuacion.personalInterviniente)
                    }
                };
            });
    
            return deserializedData;
        } catch (err) {
            console.error('Error al recuperar datos:', err);
            return [];
        }
    };
    return {
        saveData,
        error,
        success,
        fetchActuaciones
    };
};

export default useSaveData;