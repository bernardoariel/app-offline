import { ref } from "vue"
let efectos = ref();

const useEfectos = () => {
    
    const agregarEfecto = (efecto: any) => {
    
    };
    const editarEfecto = (efecto: any) => {
    
    };
    const eliminarEfecto = (id: string) => {
       
      efectos.value = efectos.value.filter((efecto:any) => efecto.id !== id);
    };
    const selecccionarEfecto = (id: string) => {
       
    };    

    return {
        efectos,
        items: efectos,
        agregar: agregarEfecto,
        eliminar: eliminarEfecto,
        editar: editarEfecto,
        seleccionar:selecccionarEfecto
    };
};

export default useEfectos;
  

