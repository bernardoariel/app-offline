import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const isDialogVisible = ref(false);
const pendingRoute = ref<string | null>(null);

interface DialogOptions {
  route?: { name: string };
  title: string;
  icon: string;
  message: string;
}

export function useDialog() {

  const router = useRouter()

  const showDialog = (options: DialogOptions) => {
    if (options.route) {
      pendingRoute.value = options.route.name;
    }
    isDialogVisible.value = true;
  };

  const hideDialog = () => {
    isDialogVisible.value = false;
  };

  const confirmNavigation = () => {

    if (pendingRoute.value) {
      router.push({ name: pendingRoute.value });
    }
    hideDialog();

  };

  return {
    isDialogVisible,
    showDialog,
    hideDialog,
    confirmNavigation,
    pendingRoute
  };
}

