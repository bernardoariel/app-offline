import { ref } from 'vue';
import { userDataSiis } from '../data/mock/datosActuacion';

const dependencia = ref(null);
const usuario = ref<string | null>(null);

export function useStorageData() {

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
  const findUser = () =>{

    const dataGuardada = localStorage.getItem("siisOffLineData");
    if (dataGuardada) {
      
      const data = JSON.parse(dataGuardada);
      dependencia.value = data.dependencia;
      usuario.value = data.usuario;
      return 
    } 

    dependencia.value = null;
    usuario.value = null;
  }
    
  const obtenerDatos = () => {
    
    findUser()
    return { dependencia: dependencia.value, usuario: usuario.value };

  };

  return {
    dependencia,
    usuario,
    guardarDatosAleatorios,
    obtenerDatos,
  };
}
