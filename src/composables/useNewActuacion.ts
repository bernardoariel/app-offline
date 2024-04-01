import type { AfectadosForm } from "@/interfaces/afectadosForm.interface";
import { ref, watch } from "vue";
import { v4 as uuid } from 'uuid';
import useFieldState from "./useFiledsState";


const afectados = ref<AfectadosForm[]>([]);
const vinculados = ref<AfectadosForm[]>([]);
const fecha = ref<AfectadosForm[]>([]);
const efectos = ref<AfectadosForm[]>([]);
const personalInterviniente = ref<AfectadosForm[]>([]);
const isEditedHeader = ref<boolean>(false);
type TipoLista = 'afectados' | 'vinculados' | 'fecha' | 'efectos' | 'personalInterviniente';

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
const prepararNuevoItem = () => {
  selectedItem.value = null ;
  // Restablecer cualquier otro estado relevante para un nuevo ítem
  resetInput();
};
const cargarItem = (itemId: string | null) => {
    
  if (!itemId) {
      resetInput();
      return;
  }
  const listas = [afectados, vinculados, fecha, efectos, personalInterviniente];

  for (const lista of listas) {
    const found = lista.value.find(item => item.id === itemId);
    if (found) {
        item.value = found;
        return; // Detener la búsqueda una vez encontrado el ítem
    }
  }
   // Si el ítem no se encuentra en ninguna lista, opcionalmente puedes resetear item.value
   resetInput();
};
// Se define agregarIdState para manejar el estado de los campos
const { agregarIdState, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();


const agregar = (item: AfectadosForm,tipo:TipoLista) => {

  const listas = {
    afectados: afectados,
    vinculados: vinculados,
    fecha: fecha,
    efectos: efectos,
    personalInterviniente: personalInterviniente,
  };
  
  if (!listas[tipo]) {
    console.error(`El tipo "${tipo}" no corresponde a una lista válida.`);
    return;
  }
   // Accede a la lista correcta usando el tipo
  const lista = listas[tipo];

  // Genera un nuevo ID para el ítem
  const id = uuid();
  
  // Agrega el nuevo ítem a la lista
  lista.value.push({ ...item, id });
  
  // Agrega el estado del ítem
  agregarIdState(id, {});

  // Resetea el input si es necesario
  resetInput();

  // Actualiza el estado general o la UI si es necesario
  // (esta función debe ser definida por ti)
  actualizarEstado(lista.value);
    
};

const editar = (item: AfectadosForm, tipo: string) => {
 
  let lista = tipo === 'afectados' ? afectados : vinculados;
  const index = lista.value.findIndex(p => p.id === item.id);
  if (index !== -1) lista.value[index] = { ...item };
  // Suponiendo que necesites actualizar el estado después de editar
  actualizarEstado(lista.value)
  guardarModificaciones(item.id)
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
   
    items.value = lista
    
};
// Dentro de useNewActuacion
const cargarItemsPorTipo = (tipo: string) => {
  items.value = tipo === 'afectados' ? afectados.value : vinculados.value;
};


// Observadores
watch(selectedItem, cargarItem);
const useNewActuacion = () => {
    return {
      afectados,
      vinculados,
      fecha,
      efectos,
      personalInterviniente,
      item, // persona
      resetInput, // 
      items, // Asumiendo que items es una referencia a afectados
      agregar,
      editar,
      eliminar,
      selectedItem,
      prepararNuevoItem,
      isEditedHeader,
      resetIsEditedHeader: () => isEditedHeader.value = false
    };
  };
  
  export default useNewActuacion;


