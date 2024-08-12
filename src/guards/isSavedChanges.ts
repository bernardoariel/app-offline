import { computed } from 'vue';
import { useDialog } from '@/composables/useDialog';
import useFieldState from '@/composables/useFieldsState';
import useLegalesState from '@/composables/useLegalesState';
import type { DialogOptions } from '@/interfaces/dialogInterfaces'

const { showDialog, dialogState } = useDialog();

const {
  isUnsavedChange,
  areAnyFieldsModifiedGlobally,
  isNewRecordCreated,
  isRecordDeleted,
  isDiligenciaChange
} = useFieldState();

const { isAnyFieldModified: isLegalModified } = useLegalesState()

const isAnyChange = computed(() => {
  return isUnsavedChange.value ||
    areAnyFieldsModifiedGlobally() ||
    isNewRecordCreated.value ||
    isRecordDeleted.value ||
    isLegalModified.value ||
    isDiligenciaChange.value;
});

const isSavedChanges = (to, from, next) => {

  const pathFindGuard = ['edit', 'new'];
  const pathIncludesGuard = pathFindGuard.some(keyword => from.path.includes(keyword));

  /* cuando quiero salir del la edicion o la creacion */
  if (pathIncludesGuard && dialogState.value.pendingRoute === null && !dialogState.allowNavigation) {
    if (isAnyChange.value) {
      const optionDialog: DialogOptions = {
        nameRouteToRedirect: to.name,
        header: {
          title: 'Confirmación Necesaria'
        },
        body: {
          icon: 'pi pi-question-circle',
          answer: '¿Desea salir sin guardar los cambios?',
          colorClass: 'text-red-400',
          comment: 'Los cambios no guardados se perderán.'
        },
        footer: {} // Completar más adelante según sea necesario
      };
      showDialog(optionDialog);
      console.log('2.', dialogState.value.pendingRoute);
      return;
    }
  }

  /* cuando tengo una ruta pendiente a navegar luego de mostrar el modal */
  if (dialogState.value.pendingRoute) {
    dialogState.value.pendingRoute = null;
    next();
    return;
  }

  /* para todos las demas */
  next();
};

export default isSavedChanges;