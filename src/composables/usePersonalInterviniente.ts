import type { PersonalInterviniente, PersonalIntervinienteForm } from "@/interfaces/personalInterviniente";
import { ref } from "vue"

const  intervinientes = ref<PersonalInterviniente[]>([]);
const selectedJerarquiaDrop = ref()
const selectedDependenciaDrop = ref()

const initialValues: PersonalIntervinienteForm = {
  apellido: '',
  nombre: '',
  jerarquia: { name: '' },
  dependencia: { name: '' },
};
const usePersonalInterviniente = () => {
    
    const agregarPersonalInterviniente = (item: PersonalInterviniente) => {
  
      if(!item) return 
      intervinientes.value?.push(item)

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
  

