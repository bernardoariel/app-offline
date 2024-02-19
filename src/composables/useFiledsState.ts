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

  const setModifiedData = (id: string, campo: string, valor: any) => {

    if (!id ) return

    const index = statesID.findIndex((state) => state.id === id);
    if (index !== -1) {
      statesID[index].modifiedData[campo] = valor;
    }
  };

  const guardarModificaciones = (id: string) => {
    const index = statesID.findIndex((state) => state.id === id);
    if (index !== -1) {
      const modifiedData = statesID[index].modifiedData;
  
      // Opcional: Limpia modifiedData después de "guardar"
      statesID[index].modifiedData = {};
      statesID[index].pristine = true;
  
      // Devuelve los datos modificados
      return modifiedData;
    }
    return null; // Devuelve null si no se encuentra el ítem
  };
  return {
    statesID,
    agregarIdState,
    setPristineById,
    setModifiedData,
    guardarModificaciones,
  };
}