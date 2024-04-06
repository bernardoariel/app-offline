
import { ref } from "vue"
import { v4 as uuid } from 'uuid';

import type { Afectados, AfectadosForm } from '../interfaces/afectado.interface';
import type { DropDownInterface } from "@/interfaces/dropdown.interface";
import useFieldState from "./useFiledsState";
import {afectadosFake as itemsFake} from '@/data/mock/datosActuacion'
import useActuacion from './useActuacion';
import useNewActuacion from './useNewActuacion';

const { agregarIdState, guardarModificaciones, eliminarIdState,resetStates, statesID} = useFieldState();

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
        const itemExistente = findById(item.id);
        if (itemExistente) {
            const index = afectados.value.indexOf(itemExistente);
            afectados.value[index] = item;
            guardarModificaciones(item.id);
        }
      
    };
    const eliminarAfectado = (id: string) => {
        
        const afectadoExistente = findById(id);
        if (afectadoExistente) {
            const index = afectados.value.indexOf(afectadoExistente);
            if (index !== -1) {
                afectados.value.splice(index, 1);
                eliminarIdState(id);
            }
        }
    };
    
    const findById = (id: string) => {
        return afectados.value.find(item => item.id === id);
    };
    
    const resetAllDropdown = () =>{
        selectedType.value = null;
        selectedDocumento.value = null;
        selectedSexo.value = null;
        selectedNacionalidad.value = null;
        selectedEstadoCivil.value = null;
        selectedInstruccion.value = null;
    }
    const reset = () => {
        afectados.value = [];
        resetAllDropdown()
    };
    const set = ()=>{

        afectados.value = [...itemsFake]
        itemsFake.forEach(item => {
            agregarIdState(item.id, {}); // Llama a agregarIdState con el id de cada ítem
        });
       
    }

  
    return {
        initialValues,
        afectados,
        selectedType,
        selectedDocumento,
        selectedSexo,
        selectedNacionalidad,
        selectedEstadoCivil,
        selectedInstruccion,
        reset,
        resetAllDropdown,
        set,
        items: afectados,
        agregar: agregarAfectado,
        eliminar: eliminarAfectado,
        editar: editarAfectado,
    };
};

export default useAfectados;
  

