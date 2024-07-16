import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const isDialogVisible = ref(false);
const pendingRoute = ref<string | null>(null);
const titleDialog = ref<string | null>(null)
const messageDialog = ref<string | null>(null)
const iconDialog = ref<string | null>(null)


interface DialogOptions {
  nameRouteToRedirect?: string;
  title: string;
  icon: string;
  message: string;
}

export function useDialog() {

  const router = useRouter()

  const showDialog = ({ title, message, nameRouteToRedirect, icon }: DialogOptions) => {
    if (nameRouteToRedirect) {
      pendingRoute.value = nameRouteToRedirect;
    }
    titleDialog.value = title
    messageDialog.value = message
    iconDialog.value = icon

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
    pendingRoute,
    iconDialog,
    messageDialog,
    titleDialog
  };
}

