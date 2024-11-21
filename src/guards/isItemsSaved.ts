import { computed } from 'vue';
import { useDialog } from '@/composables/useDialog';
import useFieldState from '@/composables/useFieldsState';
import useLegalesState from '@/composables/useLegalesState';
import type { DialogOptions } from '@/interfaces/dialogInterfaces'
import { useDatosLegales } from '@/composables';

const { showDialog, dialogState } = useDialog();

const {
    isUnsavedChange,
    areAnyFieldsModifiedGlobally,
    isNewRecordCreated,
    isRecordDeleted,
    isDiligenciaChange,
    resetUnsavedChanges,
    resetNewRecordCreated,
    resetRecordDeleted,
    resetDiliginciaChange,
    resetPristine,
    resetModifiedData,
} = useFieldState();
const { resetData: resetDatosLegales } = useDatosLegales();

const { isAnyFieldModified: isLegalModified, resetFields: resetLegalFields } = useLegalesState()

export const isAnyChange = computed(() => {
    return isUnsavedChange.value ||
        areAnyFieldsModifiedGlobally() ||
        isNewRecordCreated.value ||
        isRecordDeleted.value ||
        isLegalModified.value ||
        isDiligenciaChange.value;
});

const resetAllStates = () => {
    resetUnsavedChanges();
    resetNewRecordCreated();
    resetRecordDeleted();
    resetDiliginciaChange();
    resetDatosLegales();
    resetLegalFields();
    resetPristine();
    resetModifiedData();
};

const isSavedChanges = (to, from, next) => {

    if (dialogState.value.pendingRoute === null) {
        if (isAnyChange.value) {
            const optionDialog: DialogOptions = {
                nameRouteToRedirect: to.path,
                routeProp: 'path',
                header: {
                    title: 'Confirmación Necesaria'
                },
                body: {
                    icon: 'pi pi-question-circle',
                    answer: '¿Desea salir sin guardar los cambios?',
                    colorClass: 'text-red-400',
                    comment: 'Los cambios no guardados se perderán.'
                },
                footer: {}
            };
            showDialog(optionDialog);
            return
        }
        resetAllStates()

    }

    if (dialogState.value.pendingRoute) {
        dialogState.value.pendingRoute = null;
        next()
    }

    next()
};

export default isSavedChanges;