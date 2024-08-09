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

const isPersonSaved = (to, from) => {

    const pathFindGuard = ['personas'];
    const pathIncludesGuard = pathFindGuard.some(keyword => from.path.includes(keyword));
    if (pathIncludesGuard && dialogState.value.pendingRoute === null) {

        if (pathIncludesGuard && isPristineState.value) {

            const modifiedItem = statesID.find(item => Object.keys(item.modifiedData).length > 0);

            if (modifiedItem) {
                // Obtener las claves de modifiedData y formatearlas
                const modifiedDataKeys = Object.keys(modifiedItem.modifiedData)
                    .map(formatKey)
                    .join(', ');
                alert(modifiedDataKeys)
                return true;
            }
        }
    }

    /* cuando tengo una ruta pendiente a navegar luego de mostrar el modal */
    if (dialogState.value.pendingRoute) {
        dialogState.value.pendingRoute = null;
        return true;
    }

    return true
};

export default isPersonSaved;