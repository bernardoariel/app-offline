// src/composables/useDialog.js
import { ref, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import type { DialogOptions } from '../guards/isSavedChanges';

const dialogState = ref({
  isDialogVisible: false,
  pendingRoute: null as string | null,
  allowNavigation: false,
  header: {
    title: 'Consulta del Sistema!!'
  },
  body: {
    icon: '',
    comments: '',
    colorClass: '',
    answer:''
  },
  footer: null as any
});


export function useDialog() {
  const router = useRouter();

  const showDialog = (options: DialogOptions) => {
    dialogState.value.pendingRoute = options.nameRouteToRedirect || null;
    dialogState.value.isDialogVisible = true;

    dialogState.value.header.title = options.header.title;
    dialogState.value.body.icon = options.body.icon;
    dialogState.value.body.answer = options.body.answer;
    dialogState.value.body.comments = options.body.comments;
    dialogState.value.body.colorClass = options.body.colorClass;

    if (options.footer) {
      dialogState.value.footer = options.footer;
    }
  };

  const hideDialog = () => {
    dialogState.value.isDialogVisible = false;
  };

  const confirmNavigation = () => {
    if (dialogState.value.pendingRoute) {
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

