
import { ref } from "vue"
import type { Afectados, AfectadosForm } from '../interfaces/afectado.interface';
import type { DropDownInterface } from '../interfaces/dropdown.interface';


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
    name: '',
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
        afectados.value?.push(item)
    };
    const editarAfectado = (item: any) => {
    
    };
    const eliminarAfectado = (id: string) => {
       
        // afectados.value = afectados.value.filter((afectado:any) => afectado.id !== id);
    };
    const selecccionarAfectado = (id: string) => {
      
        
    };    
    return {
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
  

