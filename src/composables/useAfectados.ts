
import { ref } from "vue"
import { v4 as uuid } from 'uuid';

import type { Afectados, AfectadosForm } from '../interfaces/afectado.interface';
import type { DropDownInterface } from "@/interfaces/dropdown.interface";
import useFieldState from "./useFiledsState";

const { agregarIdState, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();

let afectados = ref<Afectados[]>([]);
let selectedType = ref<DropDownInterface>()
let selectedDocumento = ref<DropDownInterface>()
let selectedSexo = ref<DropDownInterface>()
let selectedNacionalidad = ref<DropDownInterface>()
let selectedEstadoCivil = ref<DropDownInterface>()
let selectedInstruccion = ref<DropDownInterface>()


const initialValues: AfectadosForm = {
    nroDocumento: 0,
    apellido: '',
    nombre: '',
    fecha: '',
    domicilioResidencia: '',
    telefono: '',
    email: '',
    profesion: '',
    typeAfectado: { name: '' },
    typeDocumento: { name: '' },
    typeSexo: { name: '' },
    nacionalidad: { name: '' },
    estadoCivil: { name: '' },
    instruccion: { name: '' }
};
const useAfectados = () => {
   
    const agregarAfectado = (item: Afectados) => {
        
        if(!item) return 
        const id = uuid();

        afectados.value?.push({...item, id})
        // Agrega el estado del ítem
        agregarIdState(id, {});
    };

    const editarAfectado = (item: Afectados) => {
        if(!item.id) return
        const index = afectados.value.findIndex(afectado => afectado.id === item.id);
        if (index !== -1) {
            afectados.value[index] = item;
        }
        // actualizarEstado(afectados.value)
        guardarModificaciones(item.id)
        /* actualizarEstado(lista.value)
        guardarModificaciones(item.id)  */ 
        
    };
    const eliminarAfectado = (id: string) => {
       
        // afectados.value = afectados.value.filter((afectado:any) => afectado.id !== id);
    };
    const selecccionarAfectado = (id: string) => {
      
        
    };    
  
      
    return {
        initialValues,
        afectados,
        selectedType,
        selectedDocumento,
        selectedSexo,
        selectedNacionalidad,
        selectedEstadoCivil,
        selectedInstruccion,
        items: afectados,
        agregar: agregarAfectado,
        eliminar: eliminarAfectado,
        editar: editarAfectado,
        seleccionar:selecccionarAfectado
    };
};

export default useAfectados;
  

