import { ref } from 'vue';
import { userDataSiis } from '../data/mock/datosActuacion';

export function useStorageData() {
  const dependencia = ref(null);
  const usuario = ref(null);

  const obtenerDatoAleatorio = (tipo) => {
    if (!userDataSiis[tipo] || userDataSiis[tipo].length === 0) {
      throw new Error(`No hay datos disponibles para el tipo: ${tipo}`);
    }

    const indiceAleatorio = Math.floor(Math.random() * userDataSiis[tipo].length);
    return userDataSiis[tipo][indiceAleatorio];
  };

  const guardarDatosAleatorios = () => {
    const dependenciaAleatoria = obtenerDatoAleatorio('dependencias');
    const usuarioAleatorio = obtenerDatoAleatorio('usuarios');

    // Convertir los objetos a JSON
    const dependenciaJSON = JSON.stringify(dependenciaAleatoria);
    const usuarioJSON = JSON.stringify(usuarioAleatorio);

    // Guardar en localStorage
    localStorage.setItem("dependencia", dependenciaJSON);
    localStorage.setItem("usuario", usuarioJSON);

    // Actualizar los refs
    dependencia.value = dependenciaAleatoria;
    usuario.value = usuarioAleatorio;
  };

  const obtenerDatos = () => {
    // Obtener los JSON desde localStorage
    const dependenciaGuardada = localStorage.getItem("dependencia");
    const usuarioGuardado = localStorage.getItem("usuario");

    // Convertir de JSON a objetos y actualizar los refs
    if (dependenciaGuardada) {
      dependencia.value = JSON.parse(dependenciaGuardada);
    }

    if (usuarioGuardado) {
      usuario.value = JSON.parse(usuarioGuardado);
    }
  };

  return {
    dependencia,
    usuario,
    guardarDatosAleatorios,
    obtenerDatos,
  };
}
