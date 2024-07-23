import { reactive, ref, watch, type Ref } from 'vue';
import { v4 as uuid } from 'uuid';
import type { AfectadosForm } from "@/interfaces/afectadosForm.interface";
import useFieldState from './useFieldsState';


// Interfaces para los elementos de los afectados y el composable
interface newItem {
  name: string;
  code: string;
}

interface UseAfectadosForm {
  afectados: Ref<AfectadosForm[]>;
  persona: Ref<AfectadosForm>;
  resetInput: () => void;
  selectedPersona: Ref<string | null>;
  items: Ref<AfectadosForm[]>;
  agregar: (nuevoAfectado: AfectadosForm) => void;
  editar: (afectadoEditado: AfectadosForm) => void;
  eliminar: (idPersona: string) => void;
}

// Estado reactivo y funciones para el manejo de los afectados
const afectados = reactive<AfectadosForm[]>([]);
const selectedPersona = ref<string | null>(null);
const persona: Ref<AfectadosForm> = ref({
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
  persona.value = {
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

const cargarPersona = (personaId: string | null) => {
  if (personaId) {
    const found = afectados.find(p => p.id === personaId);
    if (found) persona.value = found;
  } else {
    resetInput();
  }
};

// Se define agregarIdState para manejar el estado de los campos
const { agregarIdState } = useFieldState();

const agregarAfectado = (nuevoAfectado: AfectadosForm) => {
  const id = uuid();
  afectados.push({ ...nuevoAfectado, id });
  agregarIdState(id, {});
  resetInput();
};

const editarAfectado = (afectadoEditado: AfectadosForm) => {
  const index = afectados.findIndex(p => p.id === afectadoEditado.id);
  if (index !== -1) afectados[index] = afectadoEditado;
};

const eliminarAfectado = (idPersona: string) => {
  const index = afectados.findIndex(p => p.id === idPersona);
  if (index !== -1) afectados.splice(index, 1);
};

// Observadores
watch(selectedPersona, cargarPersona);

// Composable expuesto
const useAfectadosForm = (): UseAfectadosForm => {
  return {
    afectados: ref(afectados),
    persona,
    resetInput,
    selectedPersona,
    items: ref(afectados), // Asumiendo que items es una referencia a afectados
    agregar: agregarAfectado,
    editar: editarAfectado,
    eliminar: eliminarAfectado,
  };
};

export default useAfectadosForm;
