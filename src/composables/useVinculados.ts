import { ref, } from "vue"
import { v4 as uuid } from 'uuid';
import type { VinculadosForm, Vinculados } from "@/interfaces/vinculado.interface";
import type { DropDownInterface } from '../interfaces/dropdown.interface';



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
    name: '',
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
    };

    const editarVinculado = (item: any) => {
    
    };
    const eliminarVinculado = (id: string) => {
       
        // vinculados.value = vinculados.value.filter((vinculado:any) => vinculado.id !== id);
    };
    const selecccionarVinculado = (id: string) => {
       
    
    };    
    return {
        vinculados,
        selectedType,
        selectedDocumento,
        selectedSexo,
        selectedNacionalidad,
        selectedEstadoCivil,
        selectedInstruccion,
        initialValues,
        items: vinculados,
        agregar: agregarVinculado,
        eliminar: eliminarVinculado,
        editar: editarVinculado,
        seleccionar:selecccionarVinculado
    };
};

export default useVinculados;
  

