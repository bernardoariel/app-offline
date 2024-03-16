import { ref, watch } from "vue";

const selectedItem = ref(null);

const useItemValue = ()=> {
  
  const prepararNuevoItem = () => selectedItem.value = null 
   
  watch(selectedItem, (newVal) => {
      console.log("SelectedItem ha cambiado:", newVal);
  });
  
  return {
    prepararNuevoItem,
    selectedItem
  };
}

export default useItemValue;
