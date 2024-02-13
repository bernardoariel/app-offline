// composablesFactory.ts
import useAfectados from "@/composables/useAfectados";
import useVinculados from "@/composables/useVinculados";
import useFecha from "@/composables/useFecha";
import useEfectos from "@/composables/useEfectos";
import useInterviniente from "@/composables/useInterviniente";
import useAfectadosForm from "./useAfectadosForm";
import useVinculadosForm from "./useVinculadosForm";

export const getComposableForType = (type: string) => {
  switch (type) {
    case 'afectados':
      return useAfectadosForm();
    case 'vinculados':
      return useVinculadosForm();
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
