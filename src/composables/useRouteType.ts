import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const useRouteType = ()=>{
  const route = useRoute();
  const routeType  = ref(route.params.tipo);

  watch(() => route.params.tipo, (nuevoTipo) => {
    routeType.value = nuevoTipo;
  });
  
  return {
    routeType 
  };
}
export default useRouteType
