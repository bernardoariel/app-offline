import { ref } from 'vue';

const itemsLoading = ref(true);

export default function useActuacionLoading() {
    const isLoading = () => itemsLoading.value;
    const setLoading = (loading: boolean) => {
        itemsLoading.value = loading;
    };

    return {
        isLoading,
        setLoading,
    };
}
