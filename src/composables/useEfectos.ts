import { ref } from "vue"
import { v4 as uuid } from 'uuid';

import type { Efectos, EfectosForm } from "@/interfaces/efecto.interface";
import type { DropDownInterface } from '../interfaces/dropdown.interface';
import useFieldState from "./useFiledsState";

let efectos = ref<Efectos[]>([]);
let selectedCategoria = ref<DropDownInterface>()
let selectedSubcategoria = ref<DropDownInterface>()
let selectedTipo = ref<DropDownInterface>()
let selectedMarca = ref<DropDownInterface>()
let selectedModelo = ref<DropDownInterface>()

const { agregarIdState, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();
const initialValues: EfectosForm = {
    categoria:{ name: '' },
    marca:{ name: '' },
    modelo:{ name: '' },
    subcategoria:{ name: '' },
    tipo:{ name: '' }
};
const useEfectos = () => {
    
    const agregarEfecto = (item: Efectos) => {
      
      if(!item) return 
      const id = uuid();
      efectos.value?.push({...item, id})
      // Agrega el estado del ítem
      agregarIdState(id, {});
    };
    const editarEfecto = (item: any) => {
    
    };
    const eliminarEfecto = (id: string) => {
       
      // efectos.value = efectos.value.filter((efecto:any) => efecto.id !== id);
    };
    const selecccionarEfecto = (id: string) => {
       
    };    

    return {
        efectos,
        selectedCategoria,
        selectedSubcategoria,
        selectedTipo,
        selectedMarca,
        selectedModelo,
        initialValues,
        items: efectos,
        agregar: agregarEfecto,
        eliminar: eliminarEfecto,
        editar: editarEfecto,
        seleccionar:selecccionarEfecto
    };
};

export default useEfectos;
  

