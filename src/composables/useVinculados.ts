
import { ref, } from "vue"


let vinculados = ref();

const useVinculados = () => {
    
    const agregarVinculado = (vinculado: any) => {
    
    };
    const editarVinculado = (vinculado: any) => {
    
    };
    const eliminarVinculado = (id: string) => {
       
        vinculados.value = vinculados.value.filter((vinculado:any) => vinculado.id !== id);
    };
    const selecccionarVinculado = (id: string) => {
       
    
    };    
    return {
        vinculados,
        items: vinculados,
        agregar: agregarVinculado,
        eliminar: eliminarVinculado,
        editar: editarVinculado,
        seleccionar:selecccionarVinculado
    };
};

export default useVinculados;
  

