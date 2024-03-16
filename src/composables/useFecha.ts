
import { ref, } from "vue"
import { v4 as uuid } from 'uuid';
import type { FechaUbicacion, FechaUbicacionForm } from '../interfaces/fecha.interface';
import type { DropDownInterface } from '../interfaces/dropdown.interface';
import useFieldState from "./useFiledsState";
const { agregarIdState, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();
let fechaUbicacion = ref<FechaUbicacion[]>([]);
const selectedMunicipioDrop = ref<DropDownInterface>()

const initialValues = ref<FechaUbicacionForm>({
    desdeFechaHora: new Date(),
    hastaFechaHora: new Date(),
    calle: '',
    numero: '',
    departamento: { name:'' }
});

const useFecha = () => {
    
    const agregarFechaUbicacion = (item: FechaUbicacion) => {
        
        if(!item) return 
        const id = uuid();
        
        fechaUbicacion.value?.push({...item, id})
        // Agrega el estado del ítem
        agregarIdState(id, {});
    };
    const editarFechaUbicacion = (fechaUbicacion: any) => {
    
    };
    const eliminarFechaUbicacion = (id: string) => {
       
        // fechaUbicacion.value = fechaUbicacion.value.filter((item:any) => item.id !== id);
    };
       
    return {
        fechaUbicacion,
        selectedMunicipioDrop,
        initialValues,
        items:fechaUbicacion,
        agregar: agregarFechaUbicacion,
        eliminar: eliminarFechaUbicacion,
        editar: editarFechaUbicacion,
    };
};

export default useFecha;
  

