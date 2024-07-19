// src/composables/useDialog.js
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const isDialogVisible = ref(false);
const pendingRoute = ref(null);

export function useDialog() {

  const router = useRouter()

  const showDialog = (route) => {
    pendingRoute.value = route.name;
    isDialogVisible.value = true;
  };

  const hideDialog = () => {
    isDialogVisible.value = false;
  };

  const confirmNavigation = () => {
   
    if (pendingRoute.value) {
      router.push({name:pendingRoute.value});
      hideDialog();
    }

  };
 
  return {
    isDialogVisible,
    showDialog,
    hideDialog,
    confirmNavigation,
    pendingRoute
  };
}

