import { useDialog } from '../composables/useDialog';
import useFieldsState from '../composables/useFieldsState'

const { showDialog, dialogState } = useDialog();
const { isPristineState, statesID } = useFieldsState();


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
    footer?: any;
}

const keyMap: { [key: string]: string } = {
    // claveOriginal: 'Clave formateada'
    typeDocumento: 'Tipo de documento',
    fecha: 'Fecha de nacimiento',
    estadoCivil: 'Estado Civil',
    typeAfectado: 'Tipo de denunciante',
    nroDocumento: 'Nro de doc',
    typeSexo: 'Sexo',
    domicilioResidencia: 'Domicilio'
};

const formatKey = (key: string) => {
    return keyMap[key] || key;
};;

const isPersonSaved = (to, from, next) => {

    const pathFindGuard = ['personas'];
    const pathIncludesGuard = pathFindGuard.some(keyword => from.path.includes(keyword));
    /* cuando quiero salir del la edicion o la creacion de un afectado */
    if (pathIncludesGuard && dialogState.value.pendingRoute === null) {

        if (pathIncludesGuard && isPristineState.value) {

            const modifiedItem = statesID.find(item => Object.keys(item.modifiedData).length > 0);

            if (modifiedItem) {
                // Obtener las claves de modifiedData y formatearlas
                const modifiedDataKeys = Object.keys(modifiedItem.modifiedData)
                    .map(formatKey)
                    .join(', ');
                const optionDialog: DialogOptions = {
                    nameRouteToRedirect: to.path,
                    routeProp: 'path',
                    header: {
                        title: 'Confirmación Necesaria'
                    },
                    body: {
                        icon: 'pi pi-exclamation-triangle',
                        answer: '¿ Deseas continuar sin guardar ?',
                        colorClass: 'text-orange-400',
                        comment: `Tienes cambios sin guardar en los datos de ${modifiedDataKeys}`
                    },
                    footer: {} // Completar más adelante según sea necesario
                };
                showDialog(optionDialog);
                return;
            }
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

export default isPersonSaved;