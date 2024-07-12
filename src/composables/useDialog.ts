// src/composables/useDialog.js
import { ref } from 'vue';

const isDialogVisible = ref(false);
const pendingRoute = ref(null);

export function useDialog() {
  const showDialog = (route) => {
    pendingRoute.value = route;
    isDialogVisible.value = true;
  };

  const hideDialog = () => {
    isDialogVisible.value = false;
    pendingRoute.value = null;
  };

  const confirmNavigation = (router) => {
    if (pendingRoute.value) {
      router.push(pendingRoute.value);
      hideDialog();
    }
  };

  return {
    isDialogVisible,
    showDialog,
    hideDialog,
    confirmNavigation,
  };
}

