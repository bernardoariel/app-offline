import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ref } from 'vue';
import type { Ref, UnwrapRef } from 'vue';

interface UseFetchReturn<T> {
  data: Ref<UnwrapRef<T> | null>;
  error: Ref<string | null>;
  fetchData: (url: string, options?: AxiosRequestConfig) => Promise<void>;
}

export function useFetch<T>(): UseFetchReturn<T> {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);

  const fetchData = async (url: string, options: AxiosRequestConfig = {}): Promise<void> => {
    try{
      const resp = await axios.get(url, options)
      data.value = resp.data
    }catch(err){
      error.value = JSON.stringify(err)
    }
  };

  return {
    data,
    error,
    fetchData,
  };
}
