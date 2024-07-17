import { reactive, ref, watch, type Ref } from 'vue';
import { v4 as uuid } from 'uuid';
import type { AfectadosForm } from "@/interfaces/afectadosForm.interface";
import useFieldState from './useFieldState';


// Interfaces para los elementos de los afectados y el composable
interface newItem {
  name: string;
  code: string;
}

interface UseVinculadosForm {
  vinculados: Ref<AfectadosForm[]>;
  persona: Ref<AfectadosForm>;
  resetInput: () => void;
  selectedPersona: Ref<string | null>;
  items: Ref<AfectadosForm[]>;
  agregar: (nuevoAfectado: AfectadosForm) => void;
  editar: (afectadoEditado: AfectadosForm) => void;
  eliminar: (idPersona: string) => void;
}

// Estado reactivo y funciones para el manejo de los afectados
const vinculados = reactive<AfectadosForm[]>([]);
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
    const found = vinculados.find(p => p.id === personaId);
    if (found) persona.value = found;
  } else {
    resetInput();
  }
};

// Se define agregarIdState para manejar el estado de los campos
const { agregarIdState } = useFieldState();

const agregarAfectado = (nuevoAfectado: AfectadosForm) => {
  const id = uuid();
  vinculados.push({ ...nuevoAfectado, id });
  agregarIdState(id, {});
  resetInput();
};

const editarAfectado = (afectadoEditado: AfectadosForm) => {
  const index = vinculados.findIndex(p => p.id === afectadoEditado.id);
  if (index !== -1) vinculados[index] = afectadoEditado;
};

const eliminarAfectado = (idPersona: string) => {
  const index = vinculados.findIndex(p => p.id === idPersona);
  if (index !== -1) vinculados.splice(index, 1);
};

// Observadores
watch(selectedPersona, cargarPersona);

// Composable expuesto
const useAfectadosForm = (): UseVinculadosForm => {
  return {
    vinculados: ref(vinculados),
    persona,
    resetInput,
    selectedPersona,
    items: ref(vinculados), // Asumiendo que items es una referencia a afectados
    agregar: agregarAfectado,
    editar: editarAfectado,
    eliminar: eliminarAfectado,
  };
};

export default useAfectadosForm;
