import { ref } from 'vue';

const dependencia = ref(null);
const usuario = ref<string | null>(null);

export function useStorageData() {

  const findUser = () => {

    const dataGuardada = localStorage.getItem("siisOffLineData");
    if (dataGuardada) {

      const data = JSON.parse(dataGuardada);
      dependencia.value = data.dependencia;
      usuario.value = data.usuario.tipoUsuario;
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
    obtenerDatos,
  };
}
