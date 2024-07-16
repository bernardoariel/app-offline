import { useDialog } from '../composables/useDialog';
import useFieldState from '@/composables/useFiledsState';

const { showDialog, pendingRoute } = useDialog();
const { isUnsavedChange } = useFieldState();

const isSavedChanges = (to, from, next) => {
  const pathFindGuard = ['edit', 'new'];
  const pathIncludesGuard = pathFindGuard.some(keyword => from.path.includes(keyword));

  if (pathIncludesGuard && isUnsavedChange.value) {
    next(false);
    showDialog({
      nameRouteToRedirect: to.name,
      title: 'Mensaje de Confirmación',
      icon: 'pi pi-question-circle',
      message: 'Los cambios o la actuación nueva no se guardaran y se perderán.'
    });
    return;
  }

  if (pendingRoute.value) {
    pendingRoute.value = null;
    next();
    return;
  }

  next();
};

export default isSavedChanges;
