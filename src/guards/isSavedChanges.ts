import { useDialog } from '../composables/useDialog';
import useFieldState from '@/composables/useFieldsState';
import useLegalesState from '@/composables/useLegalesState';
import { computed } from 'vue';

const { showDialog, dialogState } = useDialog();

export interface DialogHeader {
  title: string;
}

export interface DialogBody {
  icon: string;
  answer: string;
  colorClass: string;
  comment: string;
}

export interface DialogOptions {
  nameRouteToRedirect?: string;
  routeProp?: string;
  header: DialogHeader;
  body: DialogBody;
  footer?: any; //quizas lo usemos mas tarde
}

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