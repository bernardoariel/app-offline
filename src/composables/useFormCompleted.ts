import { ref } from 'vue';
import { actuaciones } from '@/data/tipoActuaciones';

export function useFormCompleted() {
    const isFormCompleted = ref(false);

    const validateForm = (nombreActuacion: string, data: any): boolean => {
        const actuacion = Object.values(actuaciones).find(
            (act) => act.titulo.toLowerCase() === nombreActuacion.toLowerCase() || act.tituloAlternativo === nombreActuacion
        );

        if (!actuacion) {
            console.log('Actuación no encontrada');
            return false;
        }

        const tarjetas = actuacion.tarjetas;
        for (const [key, tarjeta] of Object.entries(tarjetas)) {
            const dataKey = key === 'fecha' ? 'fechaUbicacion' : key;
            if (!data[dataKey] || data[dataKey].length === 0) {
                isFormCompleted.value = false
                return false;
            }
        }
        isFormCompleted.value = true
        return true;
    };

    return {
        isFormCompleted,
        validateForm
    };
}
