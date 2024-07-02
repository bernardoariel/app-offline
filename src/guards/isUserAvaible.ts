import { useStorageData } from "@/composables/useStorageData"
import { useRouter } from 'vue-router';


const isUserAvaible = () => {
    const router = useRouter();
    const enabledUsers = ["Jefe de Sumario", "Oficial Sumariante", "Jefe de Dependencia"]

    const { obtenerDatos } = useStorageData()
    const datos = obtenerDatos();

    if (!enabledUsers.includes(datos.usuario!.tipoUsuario)) {
        router.push({ name: 'denegado' });
    }
}

export default isUserAvaible