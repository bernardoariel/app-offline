import { ref } from "vue"
import { v4 as uuid } from 'uuid';

import type { PersonalInterviniente, PersonalIntervinienteForm } from "@/interfaces/personalInterviniente";
import type { DropDownInterface } from '../interfaces/dropdown.interface';

const  intervinientes = ref<PersonalInterviniente[]>([]);
const selectedJerarquiaDrop = ref<DropDownInterface>()
const selectedDependenciaDrop = ref<DropDownInterface>()

const initialValues: PersonalIntervinienteForm = {
  apellido: '',
  nombre: '',
  jerarquia: { name: '' },
  dependencia: { name: '' },
};
const usePersonalInterviniente = () => {
    
    const agregarPersonalInterviniente = (item: PersonalInterviniente) => {
      
      if(!item) return 
      const id = uuid();
      intervinientes.value?.push({...item, id})


    };
    const editarPersonalInterviniente = (item: PersonalInterviniente) => {
    
    };
    const eliminarPersonalInterviniente = (id: string) => {
       
      //personalIntervinientes.value = personalIntervinientes.value.filter((personalInterviniente:any) => personalInterviniente.id !== id);
    };
    const selecccionarPersonalInterviniente = (id: string) => {
       
    };    

    return {
      intervinientes,
      selectedJerarquiaDrop,
      selectedDependenciaDrop,
      initialValues,
      items: intervinientes,
      agregar: agregarPersonalInterviniente,
      eliminar: eliminarPersonalInterviniente,
      editar: editarPersonalInterviniente,
      seleccionar:selecccionarPersonalInterviniente
    };
};

export default usePersonalInterviniente;
  
