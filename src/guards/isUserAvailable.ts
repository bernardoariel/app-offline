import { useStorageData } from "@/composables/useStorageData"
import { useRouter } from 'vue-router';


const isUserAvailable = (to: any, from: any, next: any) => {
    const enabledUsers = ["Jefe de Sumario", "Oficial Sumariante", "Jefe de Dependencia"]

    const { obtenerDatos } = useStorageData()
    const datos = obtenerDatos();

    // const usuarioAleatorio = obtenerDatoAleatorio('usuarios');
    // opciones ["Jefe de Sumario", "Oficial Sumariante", "Jefe de Dependencia"]

    if (!enabledUsers.includes(datos.usuario!.tipoUsuario)) {
        next({ name: 'denegado' });
    } else {
        next();
    }
}

export default isUserAvailable