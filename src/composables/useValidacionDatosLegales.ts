import { ref } from 'vue';

const  isValidFlag= ref(false);

export default function useValidacionDatosLegales() {
    
    const isDataValid = () => isValidFlag.value;
    const setValidValue = (isValidValue: boolean) => {
        isValidFlag.value = isValidValue;
    };

    return {
        isDataValid,
        setValidValue,
    };
}