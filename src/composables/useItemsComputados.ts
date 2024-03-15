// useItemsComputados.js
import { computed, ref, watch } from 'vue';
import useItem from './useItems'; // Asume que este composable ya existe y exporta lo que necesitas
import useRouteType from './useRouteType'; // Composable para obtener el tipo de ruta actual

const selectedItem = ref(null); 

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
  watch(selectedItem, (newVal) => {
    console.log("SelectedItem ha cambiado:", newVal);
});
  return {
    itemsComputados,
    cargando,
    routeType,
    selectedItem
  };
}

export default useItemsComputados;
