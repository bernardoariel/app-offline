import type { AfectadosForm } from "@/interfaces/afectadosForm.interface";
import { ref, watch } from "vue";
import { v4 as uuid } from 'uuid';
import useFieldState from "./useFiledsState";

const afectados = ref<AfectadosForm[]>([]);
const vinculados = ref<AfectadosForm[]>([]);
const selectedItem = ref<string | null>(null);
const items = ref<AfectadosForm[]>([]);
const item = ref({
    id: '',
    typeAfectado: '',
    typeDocumento: '',
    nroDocumento: 0,
    typeSexo: '',
    apellido: '',
    name: '',
    fecha: '',
    nacionalidad: '',
    estadoCivil: '',
    domicilioResidencia: '',
    telefono: '',
    email: '',
    profesion: '',
    instruccion: ''
});
const resetInput = () => {
    item.value = {
      id: '',
      typeAfectado: '',
      typeDocumento: '',
      nroDocumento: 0,
      typeSexo: '',
      apellido: '',
      name: '',
      fecha: '',
      nacionalidad: '',
      estadoCivil: '',
      domicilioResidencia: '',
      telefono: '',
      email: '',
      profesion: '',
      instruccion: ''
    };
};
const cargarItem = (itemId: string | null) => {
    if (itemId) {
      const found = afectados.value.find(item => item.id === itemId);
      if (found) item.value = found;
    } else {
      resetInput();
    }
};
// Se define agregarIdState para manejar el estado de los campos
const { agregarIdState } = useFieldState();

const agregar = (item: AfectadosForm,tipo:string) => {

    let lista = tipo === 'afectados' ? afectados : vinculados;
    const id = uuid();
   
    lista.value.push({ ...item, id })
    
    agregarIdState(id,{});
    resetInput();
    actualizarEstado(lista.value);
};
const editar = (item: AfectadosForm, tipo: string) => {
    let lista = tipo === 'afectados' ? afectados : vinculados;
    const index = lista.value.findIndex(p => p.id === item.id);
    if (index !== -1) lista.value[index] = { ...item };
    // Suponiendo que necesites actualizar el estado después de editar
    actualizarEstado(lista.value);
};

const eliminar = (item: AfectadosForm, tipo: string) => {
    let lista = tipo === 'afectados' ? afectados : vinculados;
    const index = lista.value.findIndex(p => p.id === item.id);
    if (index !== -1) lista.value.splice(index, 1);
    // Suponiendo que necesites actualizar el estado después de eliminar
    actualizarEstado(lista.value);
};

// Función para actualizar el estado (ejemplo, ajusta según tu caso)
const actualizarEstado = (lista: AfectadosForm[]) => {
    // Actualiza el estado aquí, por ejemplo, si estás usando Vue o React
    console.log('actualizado')
    items.value = lista
};

// Observadores
watch(selectedItem, cargarItem);

const useNewActuacion = () => {
    return {
      afectados,
      vinculados,
      item, // persona
      resetInput, // 
      selectedItem, // select persona
      items, // Asumiendo que items es una referencia a afectados
      agregar,
      editar,
      eliminar,
    };
  };
  
  export default useNewActuacion;


