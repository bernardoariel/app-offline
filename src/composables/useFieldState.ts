import { computed, reactive, ref } from 'vue';

interface FieldState {
  id: string;
  modifiedData: Record<string, any>;
  pristine: boolean;
  isModified: boolean
}

const statesID = reactive<FieldState[]>([])
const isNewRecordCreated = ref(false)
const isRecordDeleted = ref(false)

export default function useFieldState() {

  const agregarIdState = (id: string, data: Record<string, any>) => {

    if (!id) return
    statesID.push({
      id: id,
      modifiedData: { ...data },
      pristine: true,
      isModified: false
    });

  };

  const setPristineById = (id: string, pristine: boolean) => {
    const index = statesID.findIndex((state) => state.id === id);
    if (index !== -1) {
      statesID[index].pristine = pristine;
    }
  };

  const setModifiedData = (id: string | number, campo: string, valor: any) => {

    if (!id) return
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
  }

  const guardarModificaciones = (id: string) => {
    const { item } = findById(id);
    if (item) {
      const modifiedData = { ...item.modifiedData };
      item.pristine = true;
      return modifiedData;
    }
    return null;
  };

  const cancelarModificaciones = (id: string) => {
    const { item } = findById(id);
    if (item) {
      item.modifiedData = {};
      item.pristine = true;
    }
  };

  const isEditing = (id: string | null) => {
    if (!id) return false
    const state = statesID.find(state => state.id === id);
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
    return statesID.some((state) => state.isModified);
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
    resetStates: () => statesID.splice(0, statesID.length),
    isNewRecordCreated,
    getAllUnsavedChanges,
    isUnsavedChange,
    resetUnsavedChanges,
    areAnyFieldsModifiedGlobally,
    markNewRecordCreated: () => isNewRecordCreated.value = true,
    resetNewRecordCreated: () => isNewRecordCreated.value = false,
    isRecordDeleted,
    markRecordDeleted: () => isRecordDeleted.value = true,
    resetRecordDeleted: () => isRecordDeleted.value = false,
  };
}