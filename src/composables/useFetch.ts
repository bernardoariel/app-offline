import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { ref } from 'vue';
import type { Ref } from 'vue';

interface UseFetchReturn<T> {
  data: Ref<T | null>;
  error: Ref<Error | null>;
  loading: Ref<boolean>;
  fetchData: (url: string, options?: AxiosRequestConfig) => Promise<void>;
}

export function useFetch<T>(): UseFetchReturn<T> {  
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref<boolean>(false);

  const fetchData = async (url: string, options: AxiosRequestConfig = {}): Promise<void> => {
    loading.value = true;
    try {
      const response: AxiosResponse<T> = await axios.get(url, options);
      data.value = response.data;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    loading,
    fetchData,
  };
}
