import { reactive, toRefs } from 'vue';

interface FieldState {
  id: string;
  pristine:boolean;
}

const statesID =reactive<FieldState[]>([])


export default function useFieldState() {
 
  const agregarIdState = (id: string) => {
    // console.log('id::: ', id);
    if(!id) return
    statesID.push({
      id: id,
      pristine: true,
    });
    console.log('statesID::: ', statesID);
  };
  const setPristineById = (id: string, pristine: boolean) => {
    const index = statesID.findIndex(state => state.id === id);
    if (index !== -1) {
      statesID[index].pristine = pristine;
    }
  };
  return {
    statesID,
    agregarIdState,
    setPristineById
  };
}