// useActuacionData.ts
import { ref } from 'vue';

interface Tarjetas {
    titulo: string;
    valor: string[] | null;
}

interface Actuacion {
    titulo: string;
    tituloAlternativo: string;
    tarjetas: {
        [key: string]: Tarjetas;
    };
}

const actuacionData = ref<Actuacion | null>(null);

const useActuacionData = () => {
    const set = (data: Actuacion) => {
        actuacionData.value = data;
    };

    const actualizarTarjeta = (tarjetaKey: string, tarjeta: Tarjetas) => {
        if (!actuacionData.value || !tarjeta) return;
        actuacionData.value.tarjetas[tarjetaKey] = tarjeta;
    };

    const obtenerTarjeta = (tarjetaKey: string): Tarjetas | null => {
        if (!actuacionData.value) return null;
        return actuacionData.value.tarjetas[tarjetaKey] || null;
    };

    const reset = () => {
        actuacionData.value = null;
    };

    return {
        actuacionData,
        set,
        actualizarTarjeta,
        obtenerTarjeta,
        reset
    };
};

export default useActuacionData;
