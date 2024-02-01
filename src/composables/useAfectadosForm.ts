import type { AfectadosForm } from "@/interfaces/afectadosForm.interface";
import { reactive, ref, watch } from 'vue';
import { v4 as uuid } from 'uuid';

let afectados = reactive<AfectadosForm[]>([]);
const selectedPersona = ref<string | { name: string; code: string }>('new-item');
const cargarPersona = (personaId: string | { name: string; code: string } | null) => {
  if (typeof personaId === 'object' && personaId!.code === 'new-item') {
    persona.value = { ...personaNueva };
  } else if (typeof personaId === 'string') {
    const found = afectados.find(p => p.id === personaId);
    if (found) {
      persona.value = { ...found };
    }
  }
};
const personaNueva: AfectadosForm = {
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
const persona = ref({ ...personaNueva });
const agregarAfectado = (nuevoAfectado: AfectadosForm) => {

    const afectadoAClonar = { ...nuevoAfectado,id: uuid() };
    afectados.push(afectadoAClonar);
    selectedPersona.value = afectadoAClonar.id;
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
    if (index > -1) {
        afectados.splice(index, 1); // Utiliza splice para reactividad
    }
};

watch(selectedPersona, (newId) => {
  cargarPersona(newId);
});

const useAfectadosForm = () => {
    return {
        afectados,
        persona,
        personaNueva,
        selectedPersona,
        agregar: agregarAfectado,
        editar: editarAfectado,
        eliminar: eliminarAfectado,
        cargarPersona 
    };
};

export default useAfectadosForm;