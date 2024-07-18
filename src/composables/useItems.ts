import { ref } from 'vue';
import useAfectados from '@/composables/useAfectados';
import useVinculados from '@/composables/useVinculados';
import useFecha from './useFecha';
import useEfectos from './useEfectos';
import usePersonalInterviniente from '@/composables/usePersonalInterviniente';
import type { DependenciaData } from '@/helpers/getDependencia';

let fechaCreacionaActuacion = ref<string>('')
let dependenciaData = ref<DependenciaData | null>(null)
let itemSelected = ref<boolean>(false)
export const useItem = () => {

    const { afectados, set: setAfectado, reset: resetAfectado } = useAfectados();
    const { vinculados, set: setVinculado, reset: resetVinculado } = useVinculados();
    const { fechaUbicacion, set: setFechaUbicacion, reset: resetFechaUbicacion } = useFecha();
    const { efectos, set: setEfecto, reset: resetEfecto } = useEfectos();
    const { intervinientes, set: setInterviniente, reset: resetInterviniente } = usePersonalInterviniente();

    const resetAll = () => {
        resetAfectado()
        resetVinculado()
        resetFechaUbicacion()
        resetEfecto()
        resetInterviniente()
    };
    const setAll = (data = null) => {

        if (!data) {
            setAfectado();
            setVinculado();
            setFechaUbicacion();
            setEfecto();
            setInterviniente();
            itemSelected.value = false
            return
        }
        itemSelected.value = true
        fechaCreacionaActuacion.value = data.fechaCreacion
        dependenciaData.value = data.dependenciaData
        setAfectado(data.afectados);
        setVinculado(data.vinculados);
        setFechaUbicacion(data.fechaUbicacion);
        setEfecto(data.efectos);
        setInterviniente(data.personalInterviniente);

    };
    // Devolver todos los datos y métodos combinados
    return {
        afectados,
        vinculados,
        fechaUbicacion,
        itemSelected,
        efectos,
        intervinientes,
        fechaCreacionaActuacion,
        dependenciaData,
        resetAll,
        setAll
    };
};

export default useItem;