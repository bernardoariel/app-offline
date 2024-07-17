import { reactive, computed } from 'vue';

interface FieldState {
    field: string;
    value: any;
    isModified: boolean;
}

const fieldStates = reactive<FieldState[]>([]);

export default function useLegalesState() {
    const addField = (field: string, value: any) => {
        const existingField = fieldStates.find(f => f.field === field);
        if (!existingField) {
            fieldStates.push({ field, value, isModified: false });
        } else {
            existingField.value = value;
        }
    };

    const setFieldModified = (field: string, isModified: boolean) => {
        const existingField = fieldStates.find(f => f.field === field);
        if (existingField) {
            existingField.isModified = isModified;
        }
    };

    const isAnyFieldModified = computed(() => {
        return fieldStates.some(f => f.isModified);
    });

    const getFieldState = (field: string) => {
        return fieldStates.find(f => f.field === field);
    };

    const resetFields = () => {
        fieldStates.splice(0, fieldStates.length);
    };

    return {
        addField,
        setFieldModified,
        isAnyFieldModified,
        getFieldState,
        fieldStates,
        resetFields
    };
}
