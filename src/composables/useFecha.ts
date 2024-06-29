import { ref } from 'vue';
import { v4 as uuid } from 'uuid';
import type { FechaUbicacion, FechaUbicacionForm } from '../interfaces/fecha.interface';
import type { DropDownInterface } from '../interfaces/dropdown.interface';
import useFieldState from './useFiledsState';
import { fechaUbicacioFake as itemsFake } from '@/data/mock/datosActuacion';

const { agregarIdState, guardarModificaciones, eliminarIdState, resetStates } = useFieldState();
let fechaUbicacion = ref<FechaUbicacion[]>([]);

const selectedMunicipioDrop = ref<DropDownInterface | null>(null);

const initialValues: FechaUbicacionForm = {
  desdeFechaHora: new Date(),
  hastaFechaHora: new Date(),
  calle: '',
  numero: '',
  departamento: { name: '' },
};

const useFecha = () => {
  const agregarFechaUbicacion = (item: FechaUbicacion) => {
    if (!item) return;
    const id = uuid();
    fechaUbicacion.value.push({ ...item, id });
    agregarIdState(id, {});
  };

  const editarFechaUbicacion = (item: FechaUbicacion) => {
    if (!item.id) return;
    const itemExistente = findById(item.id);
    if (itemExistente) {
      const index = fechaUbicacion.value.indexOf(itemExistente);
      fechaUbicacion.value[index] = item;
      guardarModificaciones(item.id);
    }
  };

  const eliminarFechaUbicacion = (id: string) => {
    const afectadoExistente = findById(id);
    if (afectadoExistente) {
      const index = fechaUbicacion.value.indexOf(afectadoExistente);
      if (index !== -1) {
        fechaUbicacion.value.splice(index, 1);
        eliminarIdState(id);
      }
    }
  };

  const findById = (id: string) => {
    return fechaUbicacion.value.find(item => item.id === id);
  };

  const resetAllDropdown = () => {
    selectedMunicipioDrop.value = null;
  };

  const reset = () => {
    fechaUbicacion.value = [];
    resetAllDropdown();
    resetStates();
  };

  const set = () => {
    fechaUbicacion.value = [...itemsFake];
    itemsFake.forEach(item => {
      agregarIdState(item.id, {});
    });
  };

  return {
    fechaUbicacion,
    selectedMunicipioDrop,
    initialValues,
    reset,
    resetAllDropdown,
    set,
    items: fechaUbicacion,
    agregar: agregarFechaUbicacion,
    eliminar: eliminarFechaUbicacion,
    editar: editarFechaUbicacion,
  };
};

export default useFecha;
