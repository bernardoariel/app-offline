import { ref } from "vue"
import { v4 as uuid } from 'uuid';
import type { Efectos, EfectosForm } from "@/interfaces/efecto.interface";
import type { DropDownInterface } from '../interfaces/dropdown.interface';
import useFieldState from "./useFieldsState";
import { efectosFake as itemsFake } from '@/data/mock/datosActuacion'

const { agregarIdState, guardarModificaciones, eliminarIdState } = useFieldState();
let efectos = ref<Efectos[]>([]);

let selectedEstado = ref<DropDownInterface>()
let selectedCategoria = ref<DropDownInterface>()
let selectedSubcategoria = ref<DropDownInterface>()
let selectedTipo = ref<DropDownInterface>()
let selectedMarca = ref<DropDownInterface>()
let selectedModelo = ref<DropDownInterface>()

const initialValues: EfectosForm = {
  estado: { name: '', key: '' },
  categoria: { name: '', key: '' },
  marca: { name: '', key: '' },
  modelo: { name: '', key: '' },
  subcategoria: { name: '', key: '' },
  tipo: { name: '', key: '' },
  año: '',
  nroChasis: '',
  nroMotor: '',
  dominio: '',
  nroSerie: '',
  nroIMEI: '',
  nroAbonado: '',
  color: '',
};
const useEfectos = () => {

  const agregarEfecto = (item: Efectos) => {

    if (!item) return
    const id = uuid();
    efectos.value?.push({ ...item, id })
    // Agrega el estado del ítem
    agregarIdState(id, {});
  };
  const editarEfecto = (item: Efectos) => {

    if (!item.id) return
    const itemExistente = findById(item.id);
    if (itemExistente) {
      const index = efectos.value.indexOf(itemExistente);
      efectos.value[index] = item;
      guardarModificaciones(item.id);
    }

  };
  const eliminarEfecto = (id: string) => {
    const itemExistente = findById(id);
    if (itemExistente) {
      const index = efectos.value.indexOf(itemExistente);
      if (index !== -1) {
        efectos.value.splice(index, 1);
        eliminarIdState(id);
      }
    }
  };
  const selecccionarEfecto = (id: string) => {

  };

  const findById = (id: string) => {
    return efectos.value.find(item => item.id === id);
  };

  const resetAllDropdown = () => {
    selectedEstado.value = null;
    selectedCategoria.value = null;
    selectedSubcategoria.value = null;
    selectedTipo.value = null;
    selectedMarca.value = null;
    selectedModelo.value = null;
  }

  const reset = () => {
    efectos.value = [];
    resetAllDropdown()
  };

  const set = (data = null) => {

    if (!data) {
      efectos.value = [...itemsFake];
      itemsFake.forEach(item => {
        agregarIdState(item.id, {});
      });
      return
    }

    efectos.value = JSON.parse(data);
    efectos.value.forEach(item => {
      agregarIdState(item.id, {});
    });

  }

  return {
    efectos,
    selectedEstado,
    selectedCategoria,
    selectedSubcategoria,
    selectedTipo,
    selectedMarca,
    selectedModelo,
    initialValues,
    reset,
    set,
    resetAllDropdown,
    items: efectos,
    agregar: agregarEfecto,
    eliminar: eliminarEfecto,
    editar: editarEfecto,
    seleccionar: selecccionarEfecto
  };
};

export default useEfectos;


