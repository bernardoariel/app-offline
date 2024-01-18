import type { Afectados } from "@/interfaces/actuacion.interface";

export const getColorByAfectado = (afectados:Afectados) => {
    switch (afectados.type) {
        case 'Denunciante y Damnificado':
            return 'success';

        case 'Damnificado':
            return 'warning';

        case 'Victima':
            return 'danger';

        default:
            return null;
    }
};