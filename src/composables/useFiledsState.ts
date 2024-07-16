import { computed, reactive, ref } from 'vue';

interface FieldState {
  id: string;
  modifiedData: Record<string, any>;
  pristine: boolean;
  isModified: boolean;
}

const statesID = reactive<FieldState[]>([]);
const isNewRecordCreated = ref(false);

export default function useFieldState() {
  const agregarIdState = (id: string, data: Record<string, any>) => {
    if (!id) return;
    statesID.push({
      id,
      modifiedData: { ...data },
      pristine: true,
      isModified: false,
    });
  };

  const setPristineById = (id: string, pristine: boolean) => {
    const index = statesID.findIndex((state) => state.id === id);
    if (index !== -1) {
      statesID[index].pristine = pristine;
    }
  };

  const setModifiedData = (id: string, campo: string, valor: any) => {
    if (!id) return;
    const index = statesID.findIndex((state) => state.id === id);
    if (index !== -1) {
      statesID[index].modifiedData[campo] = valor;
      statesID[index].isModified = true;
    }
  };

  const findById = (id: string) => {
    const index = statesID.findIndex((state) => state.id === id);
    return {
      index,
      item: index !== -1 ? statesID[index] : null,
    };
  };

  const guardarModificaciones = (id: string) => {
    const { item } = findById(id);
    if (item) {
      const modifiedData = { ...item.modifiedData };
      item.pristine = true;
      item.isModified = false;
      // Devuelve los datos modificados
      return modifiedData;
    }
    return null; // Devuelve null si no se encuentra el ítem
  };

  const cancelarModificaciones = (id: string) => {
    const { item } = findById(id);
    if (item) {
      item.modifiedData = {};
      item.pristine = true;
      item.isModified = false;
    }
  };

  const isEditing = (id: string | null) => {
    if (!id) return false;
    const state = statesID.find((state) => state.id === id);
    return state ? state.pristine : false;
  };

  const eliminarIdState = (id: string) => {
    const { index } = findById(id);
    if (index !== -1) {
      statesID.splice(index, 1);
    }
  };

  const getAllUnsavedChanges = () => {
    return statesID
      .filter((state) => state.isModified)
      .map((state) => ({
        id: state.id,
        modifiedData: { ...state.modifiedData },
      }));
  };

  const isUnsavedChange = computed(() => {
    return statesID.some((state) => state.isModified);
  });

  const resetUnsavedChanges = () => {
    statesID.forEach(state => {
      state.isModified = false;
    });
  };

  const areAnyFieldsModifiedGlobally = () => {
    return statesID.some((state) => Object.keys(state.modifiedData).length > 0);
  };

  return {
    statesID,
    agregarIdState,
    setPristineById,
    setModifiedData,
    guardarModificaciones,
    cancelarModificaciones,
    isEditing,
    eliminarIdState,
    getAllUnsavedChanges,
    resetUnsavedChanges,
    areAnyFieldsModifiedGlobally,
    isUnsavedChange,
    isNewRecordCreated,
    markNewRecordCreated: () => isNewRecordCreated.value = true,
    resetNewRecordCreated: () => isNewRecordCreated.value = false,
    resetStates: () => statesID.splice(0, statesID.length),
  };
}