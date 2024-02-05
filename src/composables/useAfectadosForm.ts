import type { AfectadosForm } from "@/interfaces/afectadosForm.interface";
import useFieldState from './useFiledsState';
import { reactive, ref, watch } from 'vue';
import { v4 as uuid } from 'uuid';

const { agregarIdState } = useFieldState()
interface newItem{
  name: string; 
  code: string
}
let afectados = reactive<AfectadosForm[]>([]); // el array de todos los afectados
const selectedPersona = ref<string | null>(null); // persona seleccionada si no hay tiene que ser null

const resetInput = () => {
  return {
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
const persona = ref(resetInput()); 
const cargarPersona = (personaId: string | null) => {
  if (personaId && personaId.length >= 1) {
    const found = afectados.find(p => p.id === personaId);
    if (found) {
      return persona.value = { ...found };
    }
  }
  return persona.value = resetInput();
};
const agregarAfectado = (nuevoAfectado: AfectadosForm) => {
  selectedPersona.value = uuid();
  afectados.push({ ...nuevoAfectado, id: selectedPersona.value });
  agregarIdState(selectedPersona.value);
  persona.value = resetInput(); // Resetear los datos después de agregar
};


const editarAfectado = (afectadoEditado: AfectadosForm) => {

  const index = afectados.findIndex(p => p.id === afectadoEditado.id);

  if (index !== -1) {
    afectados[index] = { ...afectadoEditado };
    selectedPersona.value = afectadoEditado.id; // Mantén seleccionado el ítem editado
  }
};

const eliminarAfectado = (idPersona: string) => {
    const index = afectados.findIndex(afectado => afectado.id === idPersona);
     if (index !== -1) {
    afectados.splice(index, 1); // Elimina 1 elemento en la posición encontrada
  }
};

watch(selectedPersona, (newId) => {
  cargarPersona(newId);
});

const useAfectadosForm = () => {
    return {
        afectados,
        persona,
        selectedPersona,
        agregar: agregarAfectado,
        editar: editarAfectado,
        eliminar: eliminarAfectado, 
    };
};

export default useAfectadosForm;