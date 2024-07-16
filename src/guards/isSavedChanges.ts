import { useDialog } from '../composables/useDialog';

const { showDialog, pendingRoute } = useDialog()


const isSavedChanges = (to, from, next) => {
  console.log('from::: ', from);
  console.log('to::: ', to);


  const pathFindGuard = ['edit', 'new'];
  const pathIncludesGuard = pathFindGuard.some(keyword => from.path.includes(keyword));
  console.log('pathIncludesGuard::: ', pathIncludesGuard);
  console.log('pendingRoute.value::: ', pendingRoute.value);
  const { name } = to
  /* cuando quiero salir del la edicion o la creacion */
  if (pathIncludesGuard && pendingRoute.value === null) {
    next(false)
    showDialog({
      nameRouteToRedirect: name,
      title: 'Mensaje de Confirmación',
      icon: 'pi pi-question-circle',
      message: 'Los cambios o la actuación nueva no se guardaran y se perderán.'
    });
    console.log('2.', pendingRoute.value);
    return
  }
  /* cuando tengo una ruta pendiente a navegar luego de mostrar el modal */
  if (pendingRoute) {
    pendingRoute.value = null
    next()
    return
  }
  /* para todos las demas */
  next()

};

export default isSavedChanges;
