
import { ref, } from "vue"
import type { FechaUbicacion, FechaUbicacionForm } from '../interfaces/fecha.interface';
import type { DropDownInterface } from '../interfaces/dropdown.interface';

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
        fechaUbicacion.value?.push(item)
    
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
  

