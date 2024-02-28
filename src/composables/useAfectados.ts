
import { ref, } from "vue"


let afectados = ref();

const useAfectados = () => {
    
    const agregarAfectado = (afectado: any) => {
    
    };
    const editarAfectado = (afectado: any) => {
    
    };
    const eliminarAfectado = (id: string) => {
       
        afectados.value = afectados.value.filter((afectado:any) => afectado.id !== id);
    };
    const selecccionarAfectado = (id: string) => {
      
        
    };    
    return {
        afectados,
        items: afectados,
        agregar: agregarAfectado,
        eliminar: eliminarAfectado,
        editar: editarAfectado,
        seleccionar:selecccionarAfectado
    };
};

export default useAfectados;
  

