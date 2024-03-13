// useItemsComputados.js
import { computed, ref } from 'vue';
import useItem from './useItems'; // Asume que este composable ya existe y exporta lo que necesitas
import useRouteType from './useRouteType'; // Composable para obtener el tipo de ruta actual

const useItemsComputados = ()=> {
  const { routeType } = useRouteType(); // Obtiene el tipo de ruta actual
  const { afectados, vinculados, fechaUbicacion, efectos, intervinientes } = useItem();
  const cargando = ref(true);

  const itemsComputados = computed(() => {
    cargando.value = true; // Indica que comienza la carga
    let data:any = [];
    switch (routeType.value) {
      case 'afectados':
        data = afectados.value;
        break;
      case 'vinculados':
        data = vinculados.value;
        break;
      case 'fecha':
        // Asumiendo que 'fechaUbicacion' es un objeto y quieres tratarlo como un array de un solo elemento
        data = fechaUbicacion.value;
        break;
      case 'efectos':
        data = efectos.value;
        break;
      case 'personalInterviniente':
        data = intervinientes.value;
        break;
      default:
        data = [];
        break;
    }

    cargando.value = false; // Indica que la carga ha terminado
    return data;
  });

  return {
    itemsComputados,
    cargando,
    routeType
  };
}

export default useItemsComputados;
