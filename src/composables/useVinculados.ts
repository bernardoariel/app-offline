import type { VinculadosForm, Vinculados } from "@/interfaces/vinculado.interface";
import { ref, } from "vue"
import type { DropDownInterface } from '../interfaces/dropdown.interface';



let vinculados = ref<Vinculados[]>([]);

let selectedType:DropDownInterface = ref()
let selectedDocumento:DropDownInterface = ref()
let selectedSexo:DropDownInterface = ref()
let selectedNacionalidad:DropDownInterface = ref()
let selectedEstadoCivil:DropDownInterface = ref()
let selectedInstruccion:DropDownInterface = ref()

const initialValues: VinculadosForm = {
    nroDocumento: 0,
    apellido: '',
    name: '',
    fecha: '',
    domicilioResidencia: '',
    telefono: '',
    email: '',
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
        console.log('item::: ', item);
        
        // if(!item) return 
        vinculados.value?.push(item)

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
  

