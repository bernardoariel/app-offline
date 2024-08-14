import Dexie from 'dexie';

import type { Afectados } from '../interfaces/afectado.interface';
import type { Vinculados } from '../interfaces/vinculado.interface';
import type { FechaUbicacion } from '../interfaces/fecha.interface';
import type { Efectos } from '../interfaces/efecto.interface';
import type { PersonalInterviniente } from '../interfaces/personalInterviniente';
import type { DatosLegales } from '../interfaces/datosLegalesForm.interface';

import { getDependenciaData } from '@/helpers/getDependencia';
import { formatFecha } from '@/helpers/getFormatFecha';

export interface dataActuacionForSave {
    id?: number;
    nroLegajoCompleto?: string;
    fechaCreacion?: Date | null;
    nombreActuacion?: string;
    juzgadoInterviniente: string;
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

const db = new Dexie('Siis') as any;

db.version(1).stores({
    actuaciones: '++id'
});

const dbOperations = {
    async save(data: dataActuacionForSave) {
        try {
            await db.open();
            await db.actuaciones.add({
                nroLegajoCompleto: data.nroLegajoCompleto,
                fechaCreacion: data.fechaCreacion,
                nombreActuacion: data.nombreActuacion,
                juzgadoInterviniente: data.juzgadoInterviniente,
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
            return { success: true };
        } catch (err) {
            console.error('Error al guardar datos:', err);
            return { success: false, error: err };
        }
    },

    async update(data: dataActuacionForSave) {
        try {
            await db.open();
            await db.actuaciones.update(data.id, {
                nroLegajoCompleto: data.nroLegajoCompleto,
                nombreActuacion: data.nombreActuacion,
                juzgadoInterviniente: data.juzgadoInterviniente,
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
            return { success: true };
        } catch (err) {
            console.error('Error al actualizar datos:', err);
            return { success: false, error: err };
        }
    },

    async fetchActuaciones() {
        try {
            await db.open();
            const actuacionesArray = await db.actuaciones.toArray();

            const deserializedData = actuacionesArray.map((actuacion: any) => {
                return {
                    id: actuacion.id,
                    fechaCreacion: formatFecha(actuacion.fechaCreacion, 'fecha'),
                    nroLegajoCompleto: actuacion.nroLegajoCompleto,
                    nombreActuacion: actuacion.nombreActuacion,
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
    },

    async fetchActuacionById(id: number) {
        try {
            await db.open();
            const actuacion = await db.actuaciones.get({ id });
            return actuacion;
        } catch (err) {
            console.error('Error al recuperar datos:', err);
            return null;
        }
    },

    async deleteActuacion(id: number) {
        try {
            await db.open();
            const actuacion = await db.actuaciones.where({ id }).first();
            if (actuacion) {
                await db.actuaciones.delete(actuacion.id);
            } else {
                console.error('No se encontró la actuación con id:', id);
            }
            return { success: true };
        } catch (err) {
            console.error('Error al eliminar actuación:', err);
            return { success: false, error: err };
        }
    }
};

export default dbOperations;