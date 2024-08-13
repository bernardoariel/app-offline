import { ref, watch, type Ref } from "vue";

interface SelectableItem {
  id: string;
  // Otras propiedades relevantes...
}

// Declara selectedItem con un tipo explícito que puede ser SelectableItem o null.
const selectedItem: Ref<SelectableItem | null> = ref(null);

const useItemValue = () => {

  const prepararNuevoItem = () => selectedItem.value = null

  watch(selectedItem, (newVal) => {
    // console.log("SelectedItem ha cambiado:", newVal);
  });

  return {
    prepararNuevoItem,
    selectedItem
  };
}

export default useItemValue;
