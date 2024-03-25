import { ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const useRouteType = ()=>{
  const route = useRoute();
  const routeType  = ref(route.params.tipo);

  watch(route, (newRoute) => {
    routeType.value = newRoute.params.tipo;
  }, { deep: true });
  return {
    routeType 
  };
}
export default useRouteType
