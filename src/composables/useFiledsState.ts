import { reactive, toRefs } from 'vue';

interface FieldState {
  id: string;
  modifiedData: Record<string, any>;
  pristine:boolean;
}

const statesID =reactive<FieldState[]>([])


export default function useFieldState() {
 
  const agregarIdState = (id: string,data: Record<string, any>) => {
    
    // console.log('id::: ', id);
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
  const setModifiedData = (id: string, campo: string, valor: any) => {
    const index = statesID.findIndex((state) => state.id === id);
    if (index !== -1) {
      statesID[index].modifiedData[campo] = valor;
    }
  };
  const guardarModificaciones = (id: string) => {
    
    const index = statesID.findIndex((state) => state.id === id);
  
    if (index !== -1) {
      // Aplica las modificaciones a los afectados
      // statesID[index].modifiedData contiene los cambios realizados
      // Implementa la lógica para guardar los cambios en tu array de afectados
  
      // Limpia modifiedData después de guardar
      statesID[index].modifiedData = {};
  
      // Actualiza el estado pristine a true después de guardar
      statesID[index].pristine = true;
    }
  };
  return {
    statesID,
    agregarIdState,
    setPristineById,
    setModifiedData,
    guardarModificaciones,
  };
}