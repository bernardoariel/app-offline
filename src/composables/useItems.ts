import useAfectados from '@/composables/useAfectados';
import useVinculados from '@/composables/useVinculados';
import useFecha from './useFecha';
import useEfectos from './useEfectos';
import usePersonalInterviniente from '@/composables/usePersonalInterviniente';

export const useItem = () => {
    // Acceder a la lógica y datos de cada composable
    const { afectados,set:setAfectado,reset:resetAfectado } = useAfectados();
    const { vinculados,set:setVinculado,reset:resetVinculado } = useVinculados();
    const { fechaUbicacion,set:setFechaUbicacion,reset:resetFechaUbicacion } = useFecha();
    const { efectos,set:setEfecto,reset:resetEfecto} = useEfectos();
    const { intervinientes,set:setInterviniente,reset:resetInterviniente } = usePersonalInterviniente();

    const resetAll = () => {
        resetAfectado()
        resetVinculado()
        resetFechaUbicacion()
        resetEfecto()
        resetInterviniente()
    };
    const setAll = () => {
        setAfectado()
        setVinculado()
        setFechaUbicacion()
        setEfecto()
        setInterviniente()
    };
    // Devolver todos los datos y métodos combinados
    return {
        afectados,
        vinculados,
        fechaUbicacion,
        efectos,
        intervinientes,
        resetAll,
        setAll
    };
};

export default useItem;