import { computed, ref, watchEffect, type Ref } from 'vue';
const statePristineForm = ref(true);
export default function useFieldState() {
    const fieldStates:any = ref({
      apellido: { touched: false, dirty: false, pristine: true },
      name: { touched: false, dirty: false, pristine: true },
      // ... repite para cada campo
    });
    
    function handleInput(fieldName:string) {
  
        if (fieldStates.value[fieldName].pristine) {
            fieldStates.value[fieldName].pristine = false;
            statePristineForm.value = false
            console.log("statePristineForm updated:", statePristineForm.value);
          }
    }
    function touchField(fieldName:string) {
        /* if (fieldStates.value[fieldName].pristine) {
            fieldStates.value[fieldName].pristine = false;
          } */
          fieldStates.value[fieldName].touched = true;
    }
    
    function dirtyField(fieldName:string) {
      // ... lógica para dirtyField
    }
    const resetFieldStates = () =>{
        Object.keys(fieldStates.value).forEach(fieldName => {
            fieldStates.value[fieldName].touched = false;
            fieldStates.value[fieldName].dirty = false;
            fieldStates.value[fieldName].pristine = true;
        });
        statePristineForm.value = true
    }
    const isFormPristine = computed(() => {
        return Object.values(fieldStates.value).some((field: any) => field.pristine);
      });
      watchEffect(() => {
        isFormPristine.value; // Solo se usa para activar la reactividad
      });
    
    return { 
        statePristineForm,
        fieldStates,
        touchField,
        dirtyField,
        isFormPristine: isFormPristine.value,
         resetFieldStates ,
         handleInput };
  }