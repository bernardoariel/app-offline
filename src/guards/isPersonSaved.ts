import { useDialog } from '../composables/useDialog';
import useFieldsState from '../composables/useFieldsState'

const { showDialog, dialogState } = useDialog();
const { isUnsavedChange } = useFieldsState();


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
    header: DialogHeader;
    body: DialogBody;
    footer?: any;
}

const isPersonSaved = (to, from, next) => {

    const pathFindGuard = ['afectados', 'new'];
    const pathIncludesGuard = pathFindGuard.some(keyword => from.path.includes(keyword));
    /* cuando quiero salir del la edicion o la creacion de un afectado */
    if (pathIncludesGuard && isUnsavedChange.value) {
        console.log('pathIncludesGuard', pathIncludesGuard);
        console.log('isUnsavedChanges', isUnsavedChange.value);
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
        return;
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

export default isPersonSaved;