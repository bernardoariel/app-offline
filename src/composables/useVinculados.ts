import { ref, } from "vue"
import { v4 as uuid } from 'uuid';
import type { VinculadosForm, Vinculados } from "@/interfaces/vinculado.interface";
import type { DropDownInterface } from '../interfaces/dropdown.interface';
import useFieldState from "./useFiledsState";
import { vinculadosFake as itemsFake } from '@/data/mock/datosActuacion'

const { agregarIdState, guardarModificaciones, eliminarIdState,resetStates } = useFieldState();
let vinculados = ref<Vinculados[]>([]);

let selectedType = ref<DropDownInterface>()
let selectedDocumento = ref<DropDownInterface>()
let selectedSexo = ref<DropDownInterface>()
let selectedNacionalidad = ref<DropDownInterface>()
let selectedEstadoCivil = ref<DropDownInterface>()
let selectedInstruccion = ref<DropDownInterface>()

const initialValues: VinculadosForm = {
    nroDocumento: 0,
    apellido: '',
    nombre: '',
    fecha: '',
    domicilioResidencia: '',
    telefono: '',
    profesion: '',
    apodo:'',
    typeAfectado: { name: '' },
    typeDocumento: { name: '' },
    typeSexo: { name: '' },
    nacionalidad: { name: '' },
    estadoCivil: { name: '' },
    instruccion: { name: '' }
};


const useVinculados = () => {
    
    const agregarVinculado = (item: Vinculados) => {
        
        if(!item) return 
        const id = uuid();

        vinculados.value?.push({...item, id})
        // Agrega el estado del ítem
        agregarIdState(id, {});
    };

    const editarVinculado = (item: Vinculados) => {
        if(!item.id) return
        const itemExistente = findById(item.id);
        if (itemExistente) {
            const index = vinculados.value.indexOf(itemExistente);
            vinculados.value[index] = item;
            guardarModificaciones(item.id);
        }
    };
    const eliminarVinculado = (id: string) => {
        const itemExistente = findById(id);
        if (itemExistente) {
            const index = vinculados.value.indexOf(itemExistente);
            if (index !== -1) {
                vinculados.value.splice(index, 1);
                eliminarIdState(id);
            }
        }
    };
    const selecccionarVinculado = (id: string) => {
       
    
    };   
    const findById = (id: string) => {
        return vinculados.value.find(item => item.id === id);
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
        vinculados.value = [];
        resetAllDropdown()
    };
    const set = ()=>{
        
        vinculados.value = [...itemsFake]
        itemsFake.forEach(item => {
            agregarIdState(item.id, {}); // Llama a agregarIdState con el id de cada ítem
        });
      }
   
    return {
        vinculados,
        selectedType,
        selectedDocumento,
        selectedSexo,
        selectedNacionalidad,
        selectedEstadoCivil,
        selectedInstruccion,
        initialValues,
        reset,
        set,
        resetAllDropdown,
        items: vinculados,
        agregar: agregarVinculado,
        eliminar: eliminarVinculado,
        editar: editarVinculado,
        seleccionar:selecccionarVinculado
    };
};

export default useVinculados;
  

