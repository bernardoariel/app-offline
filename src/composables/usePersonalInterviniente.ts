import { ref } from "vue"
import { v4 as uuid } from 'uuid';
import useFieldState from "./useFiledsState";
import { intervinientesFake as itemsFake } from '@/data/mock/datosActuacion'
import type { PersonalInterviniente, PersonalIntervinienteForm } from "@/interfaces/personalInterviniente";
import type { DropDownInterface } from '../interfaces/dropdown.interface';

const { agregarIdState, guardarModificaciones, eliminarIdState } = useFieldState();
const  intervinientes = ref<PersonalInterviniente[]>([]);

const selectedJerarquiaDrop = ref<DropDownInterface>()
const selectedDependenciaDrop = ref<DropDownInterface>()

const initialValues: PersonalIntervinienteForm = {
  apellido: '',
  nombre: '',
  jerarquia: { name: '' },
  dependencia: { name: '' },
  id: ""
};
const usePersonalInterviniente = () => {
    
    const agregarPersonalInterviniente = (item: PersonalInterviniente) => {
      
      if(!item) return 
      const id = uuid();

      intervinientes.value?.push({...item, id})

      // Agrega el estado del ítem
      agregarIdState(id, {});
    };
    const editarPersonalInterviniente = (item: PersonalInterviniente) => {
      if(!item.id) return
        const itemExistente = findById(item.id);
        if (itemExistente) {
            const index = intervinientes.value.indexOf(itemExistente);
            intervinientes.value[index] = item;
            guardarModificaciones(item.id);
        }
    };
    const eliminarPersonalInterviniente = (id: string) => {
       
      const afectadoExistente = findById(id);
      if (afectadoExistente) {
          const index = intervinientes.value.indexOf(afectadoExistente);
          if (index !== -1) {
              intervinientes.value.splice(index, 1);
              eliminarIdState(id);
          }
      }    
    };
    const selecccionarPersonalInterviniente = (id: string) => {
       
    };    

    const findById = (id: string) => {
      return intervinientes.value.find(item => item.id === id);
    };

    const resetAllDropdown = () =>{
      selectedJerarquiaDrop.value = null;
      selectedDependenciaDrop.value = null;
    }
    const reset = () => {
      intervinientes.value = [];
      resetAllDropdown()
    };
    const set = () => {
       
      intervinientes.value = [...itemsFake];
      console.log('intervinientes.value::: ', intervinientes.value);
    };
   
    return {
      intervinientes,
      selectedJerarquiaDrop,
      selectedDependenciaDrop,
      initialValues,
      reset,
      resetAllDropdown,
      set,
      items: intervinientes,
      agregar: agregarPersonalInterviniente,
      eliminar: eliminarPersonalInterviniente,
      editar: editarPersonalInterviniente,
      seleccionar:selecccionarPersonalInterviniente
    };
};

export default usePersonalInterviniente;
  

