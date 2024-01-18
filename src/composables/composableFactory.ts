// composablesFactory.ts
import useAfectados from "@/composables/useAfectados";
import useVinculados from "@/composables/useVinculados";
import useFecha from "@/composables/useFecha";
import useEfectos from "@/composables/useEfectos";
import useInterviniente from "@/composables/useInterviniente";

export const getComposableForType = (type: string) => {
  switch (type) {
    case 'afectados':
      return useAfectados();
    case 'vinculados':
      return useVinculados();
    case 'fecha':
      return useFecha();
    case 'efectos':
      return useEfectos();
    case 'personalInterviniente':
      return useInterviniente();
    default:
      throw new Error(`Tipo de elemento desconocido: ${type}`);
  }
};
