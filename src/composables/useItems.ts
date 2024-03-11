import useAfectados from '@/composables/useAfectados';
import useVinculados from '@/composables/useVinculados';
import useFecha from './useFecha';
import useEfectos from './useEfectos';
import usePersonalInterviniente from '@/composables/usePersonalInterviniente';

export const useItem = () => {
    // Acceder a la lógica y datos de cada composable
    const { afectados } = useAfectados();
    const { vinculados } = useVinculados();
    const { fechaUbicacion } = useFecha();
    const { efectos } = useEfectos();
    const { intervinientes } = usePersonalInterviniente();

    // Devolver todos los datos y métodos combinados
    return {
        afectados,
        vinculados,
        fechaUbicacion,
        efectos,
        intervinientes,
    };
};

export default useItem;