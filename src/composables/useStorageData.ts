import { ref } from 'vue';
import { userDataSiis } from '../data/mock/datosActuacion';

export function useStorageData() {
  const dependencia = ref(null);
  const usuario = ref<string | null>(null);

  const obtenerDatoAleatorio = (tipo) => {
    if (!userDataSiis[tipo] || userDataSiis[tipo].length === 0) {
      throw new Error(`No hay datos disponibles para el tipo: ${tipo}`);
    }

    const indiceAleatorio = Math.floor(Math.random() * userDataSiis[tipo].length);
    return userDataSiis[tipo][indiceAleatorio];
  };

  const guardarDatosAleatorios = () => {
    const dependenciaAleatoria = obtenerDatoAleatorio('dependencias');
    // const usuarioAleatorio = obtenerDatoAleatorio('usuarios');
    // opciones ["Jefe de Sumario", "Oficial Sumariante", "Jefe de Dependencia"]
    const usuarioAleatorio = "Jefe de Sumario";

    // Crear un objeto que contenga tanto la dependencia como el usuario
    const data = {
      dependencia: dependenciaAleatoria,
      usuario: usuarioAleatorio
    };

    // Convertir el objeto a JSON
    const dataJSON = JSON.stringify(data);

    // Guardar en localStorage
    localStorage.setItem("siisOffLineData", dataJSON);

    // Actualizar los refs
    dependencia.value = dependenciaAleatoria;
    usuario.value = usuarioAleatorio;
  };

  const obtenerDatos = () => {
    // Obtener los datos desde localStorage
    const dataGuardada = localStorage.getItem("siisOffLineData");

    // Convertir de JSON a objeto y actualizar los refs
    if (dataGuardada) {
      const data = JSON.parse(dataGuardada);
      dependencia.value = data.dependencia;
      usuario.value = data.usuario;
    }
    return { dependencia: dependencia.value, usuario: usuario.value };
  };

  return {
    dependencia,
    usuario,
    guardarDatosAleatorios,
    obtenerDatos,
  };
}
