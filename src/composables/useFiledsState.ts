import { reactive } from 'vue';

interface FieldState {
  id: string;
  modifiedData: Record<string, any>;
  pristine:boolean;
}

const statesID =reactive<FieldState[]>([])

export default function useFieldState() {
 
  const agregarIdState = (id: string,data: Record<string, any>) => {
    
    if(!id) return
    statesID.push({
      id: id,
      modifiedData: { ...data },
      pristine: true,
    });
   
  };

  const setPristineById = (id: string, pristine: boolean) => {
    const index = statesID.findIndex((state) => state.id === id);
    if (index !== -1) {
      statesID[index].pristine = pristine;
    }
  };

  const setModifiedData = (id: string | number, campo: string, valor: any) => {

    if (!id ) return
    const index = statesID.findIndex((state) => state.id === id);
    if (index !== -1) {
      statesID[index].modifiedData[campo] = valor;
    }
  };

  const findById = (id:string) =>{
    const index = statesID.findIndex((state) => state.id === id);
    return {
      index,
      item: index !== -1 ? statesID[index] : null,
    };
  }

  const guardarModificaciones = (id: string) => {
    const { item } = findById(id);
    if (item) {
      const modifiedData = item.modifiedData;
    
      // Opcional: Limpia modifiedData después de "guardar"
      item.modifiedData = {};
      item.pristine = true;
    
      // Devuelve los datos modificados
      return modifiedData;
    }
    return null; // Devuelve null si no se encuentra el ítem
  };

  const cancelarModificaciones = (id: string) => {
    const { item } = findById(id);
    if (item) {
      // Limpia modifiedData y lo marca como pristine para realmente "cancelar" las modificaciones
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
  
  return {
    statesID,
    agregarIdState,
    setPristineById,
    setModifiedData,
    guardarModificaciones,
    cancelarModificaciones,
    isEditing,
    eliminarIdState
  };
}