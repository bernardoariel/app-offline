import { reactive, ref } from "vue"

const missingFieldsEmpty = reactive({
    afectados: false,
    vinculados: false,
    fecha: false,
    efectos: false,
    personalInterviniente: false
});
const useCardValidation = () => {


    const hasErrors = ref<boolean>(false);

    const setField = (fieldName: keyof typeof missingFieldsEmpty, value: boolean) => {
        missingFieldsEmpty[fieldName] = value;
        updateHasErrors();
    };

    const updateHasErrors = () => {
        hasErrors.value = Object.values(missingFieldsEmpty).some(field => field);
    };

    const resetFieldsEmpty = () => {
        Object.keys(missingFieldsEmpty).forEach(key => {
            missingFieldsEmpty[key as keyof typeof missingFieldsEmpty] = false;
        });
        updateHasErrors();
    };

    return {
        missingFieldsEmpty,
        hasErrors,
        setField,
        resetFieldsEmpty
    };
};

export default useCardValidation;
