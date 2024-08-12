import { useDialog } from '../composables/useDialog';
import useFieldsState from '../composables/useFieldsState'

const { showDialog, dialogState } = useDialog();
const { isPristineState, statesID } = useFieldsState();

const keyMap: { [key: string]: string } = {
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
};

const isPersonSaved = (to, from) => {
    const pathFindGuard = ['personas'];
    const pathIncludesGuard = pathFindGuard.some(keyword => from.path.includes(keyword));

    if (pathIncludesGuard && dialogState.value.pendingRoute === null) {
        if (pathIncludesGuard && isPristineState.value) {
            const modifiedItem = statesID.find(item => Object.keys(item.modifiedData).length > 0);

            if (modifiedItem) {
                const modifiedDataKeys = Object.keys(modifiedItem.modifiedData)
                    .map(formatKey)
                    .join(', ');

                showDialog({
                    nameRouteToRedirect: to.path,
                    routeProp: 'path',
                    header: { title: 'Cambios sin guardar' },
                    body: {
                        icon: 'pi pi-exclamation-triangle',
                        comment: `Hay cambios sin guardar en los siguientes campos: ${modifiedDataKeys}`,
                        colorClass: 'text-orange-400',
                        answer: '¿Desea salir sin guardar?'
                    },
                    footer: 'customFooterComponent'
                });
                return false;
            }
        }
    }

    /* cuando tengo una ruta pendiente a navegar luego de mostrar el modal */
    if (dialogState.value.pendingRoute) {
        dialogState.value.pendingRoute = null;
        return true;
    }

    return true;
};

export default isPersonSaved;
