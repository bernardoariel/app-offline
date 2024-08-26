import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { ref } from 'vue';
import type { Ref, UnwrapRef } from 'vue';
import { categorias, subcategorias, tipoCategorias, marcasCategorias, modelosCategorias, sitios, modusOperandi, causaCaratula, juzgadoInterviniente, articulosRelacionados, ayudanteFiscal, fiscalCargo, ufiNro, delitos, sexo, documentos, afectados, nacionalidad, estadoCivil, instruccion, jerarquia, tipoEfecto } from '@/data/actuacionNew'

interface UseFetchReturn<T> {
  data: Ref<UnwrapRef<T> | null>;
  loading: Ref<boolean>;
  fetchData: (url: string, options?: AxiosRequestConfig) => Promise<void>;
}
const dataActuacionNew = { categorias, subcategorias, tipoCategorias, marcasCategorias, modelosCategorias, sitios, modusOperandi, causaCaratula, juzgadoInterviniente, articulosRelacionados, ayudanteFiscal, fiscalCargo, ufiNro, delitos, sexo, documentos, afectados, nacionalidad, estadoCivil, instruccion, jerarquia, tipoEfecto }

export function useFetch<T>(): UseFetchReturn<T> {
  const data = ref<T | null>(null);
  const loading = ref<boolean>(false);

  const fetchData = async (url: string, options: AxiosRequestConfig = {}): Promise<void> => {
    loading.value = true;
    await axios.get(url, options)
      .then((response: AxiosResponse<T>) => {
        data.value = response.data as UnwrapRef<T>;
      })
      .catch((err) => {
        data.value = dataActuacionNew as UnwrapRef<T>;
      })
  };

  return {
    data,
    loading,
    fetchData,
  };
}
