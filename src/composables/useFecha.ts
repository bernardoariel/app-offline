
import { ref, } from "vue"
import type { FechaUbicacion, FechaUbicacionForm } from '../interfaces/fecha.interface';
import type { DropDownInterface } from '../interfaces/dropdown.interface';

let fechaUbicacion = ref<FechaUbicacion>();
const selectedMunicipioDrop:DropDownInterface = ref()

const initialValues = ref<FechaUbicacionForm>({
    desdeFechaHora: new Date(),
    hastaFechaHora: new Date(),
    calle: '',
    numero: '',
    departamento: { name:'' }
});

const useAfectados = () => {
    
    const agregarFechaUbicacion = (item: FechaUbicacion) => {
        if(!item) return 
        fechaUbicacion.value = item
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
        agregar: agregarFechaUbicacion,
        eliminar: eliminarFechaUbicacion,
        editar: editarFechaUbicacion,
    };
};

export default useAfectados;
  

