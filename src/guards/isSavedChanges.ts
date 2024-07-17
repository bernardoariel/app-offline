import { useDialog } from '../composables/useDialog';

const { showDialog, dialogState } = useDialog();

export interface DialogHeader {
  title: string;
}

export interface DialogBody {
  icon: string;
  message: string;
  colorClass: string;
}

export interface DialogOptions {
  nameRouteToRedirect?: string;
  header: DialogHeader;
  body: DialogBody;
  footer?: any; // Puedes definir esto más adelante
}

const isSavedChanges = (to, from, next) => {
  console.log('from::: ', from);
  console.log('to::: ', to);

  const pathFindGuard = ['edit', 'new'];
  const pathIncludesGuard = pathFindGuard.some(keyword => from.path.includes(keyword));
  console.log('pathIncludesGuard::: ', pathIncludesGuard);
  console.log('pendingRoute.value::: ', dialogState.pendingRoute);

  /* cuando quiero salir del la edicion o la creacion */
  if (pathIncludesGuard && dialogState.pendingRoute === null && !dialogState.allowNavigation) {
    const optionDialog: DialogOptions = {
      nameRouteToRedirect: to.name,
      header: {
        title: 'Mensaje de Confirmación!!'
      },
      body: {
        icon: 'pi pi-question-circle',
        message: 'Los cambios o y se perderán.',
        colorClass: 'text-red-100' // Debe ser colorClass en lugar de color
      },
      footer: {} // Completar más adelante según sea necesario
    };

    // next(false)
    showDialog(optionDialog);
    console.log('2.', dialogState.pendingRoute);
    return;
  }

  /* cuando tengo una ruta pendiente a navegar luego de mostrar el modal */
  if (dialogState.pendingRoute) {
    dialogState.pendingRoute = null;
    next();
    return;
  }

  /* para todos las demas */
  next();
};

export default isSavedChanges;
