
import { ref, } from "vue"


let fechaUbicacion = ref();

const useAfectados = () => {
    
    const agregarFechaUbicacion = (fechaUbicacion: any) => {
    
    };
    const editarFechaUbicacion = (fechaUbicacion: any) => {
    
    };
    const eliminarFechaUbicacion = (id: string) => {
       
        fechaUbicacion.value = fechaUbicacion.value.filter((item:any) => item.id !== id);
    };
       
    return {
        fechaUbicacion,
        agregar: agregarFechaUbicacion,
        eliminar: eliminarFechaUbicacion,
        editar: editarFechaUbicacion,
    };
};

export default useAfectados;
  

