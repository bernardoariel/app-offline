import { ref, watch } from "vue";

const selectedItem = ref(null);

const useItemValue = ()=> {
  
    const prepararNuevoItem = () => {
        selectedItem.value = null ;
        // Restablecer cualquier otro estado relevante para un nuevo ítem
        // resetInput();
    };
    
    watch(selectedItem, (newVal) => {
        console.log("SelectedItem ha cambiado:", newVal);
    });
  return {
    prepararNuevoItem,
    selectedItem
  };
}

export default useItemValue;
