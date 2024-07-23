// useItemsComputados.js
import { computed, ref, watch } from 'vue';
import useItem from './useItems'; // Asume que este composable ya existe y exporta lo que necesitas
import useRouteType from './useRouteType'; // Composable para obtener el tipo de ruta actual
import useAfectados from './useAfectados';
import useVinculados from './useVinculados';
import useEfectos from './useEfectos';
import useFecha from './useFecha';
import usePersonalInterviniente from './usePersonalInterviniente';
import useFieldState from './useFieldsState';

const selectedItem = ref(null);
type RouteTypeKey = 'afectados' | 'vinculados' | 'fecha' | 'efectos' | 'personalInterviniente';

const useItemsComputados = () => {

  const { markRecordDeleted } = useFieldState()
  const { routeType } = useRouteType(); // Obtiene el tipo de ruta actual
  const composables: Record<RouteTypeKey, any> = {
    afectados: useAfectados(),
    vinculados: useVinculados(),
    fecha: useFecha(),
    efectos: useEfectos(),
    personalInterviniente: usePersonalInterviniente(),
  };

  const cargando = ref(true);
  const eliminarItem = (id: string) => {
    const composableActual = composables[routeType.value as RouteTypeKey];
    if (composableActual && composableActual.eliminar) {
      composableActual.eliminar(id);
      markRecordDeleted()
    } else {
      console.error("Método eliminar no definido para el tipo de ruta actual");
    }
  };
  const itemsComputados = computed(() => {
    if (!routeType.value) return

    cargando.value = true;
    let data: any = [];
    const composableActual = composables[routeType.value as RouteTypeKey];

    if (composableActual) {
      data = composableActual.items.value; // Aquí asumimos que cada composable tiene una propiedad 'items' que es reactiva
    } else {
      console.error("Composable no definido para el tipo de ruta actual");
    }

    cargando.value = false;
    return data;
  });
  watch(selectedItem, (newVal) => {
    console.log("SelectedItem ha cambiado:", newVal);
  });
  return {
    itemsComputados,
    cargando,
    routeType,
    eliminarItem,
    selectedItem
  };
}

export default useItemsComputados;

