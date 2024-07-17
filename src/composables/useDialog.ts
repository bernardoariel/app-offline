// src/composables/useDialog.js
import { ref, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { DialogOptions } from '../guards/isSavedChanges';

const dialogState = reactive({
  isDialogVisible: false,
  pendingRoute: null as string | null,
  allowNavigation: false,
  header: {
    title: 'Consulta del Sistema!!'
  },
  body: {
    icon: '',
    message: '',
    color: ''
  },
  footer: null as any
});


export function useDialog() {
  const router = useRouter();

  const showDialog = (options: DialogOptions) => {
    dialogState.pendingRoute = options.nameRouteToRedirect || null;
    dialogState.isDialogVisible = true;

    dialogState.header.title = options.header.title;
    dialogState.body.icon = options.body.icon;
    dialogState.body.message = options.body.message;
    dialogState.body.colorClass = options.body.colorClass;

    if (options.footer) {
      dialogState.footer = options.footer;
    }
  };

  const hideDialog = () => {
    dialogState.isDialogVisible = false;
  };

  const confirmNavigation = () => {
    if (dialogState.pendingRoute) {
      router.push({ name: dialogState.pendingRoute });
      hideDialog();
    }
  };

  return {
    dialogState,
    showDialog,
    hideDialog,
    confirmNavigation
  };
}

