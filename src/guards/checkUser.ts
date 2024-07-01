import { useStorageData } from "@/composables/useStorageData"
import { useRouter } from 'vue-router';


const checkUser = () => {
    const router = useRouter();
    const enabledUsers = ["Jefe de Sumario", "Oficial Sumariante", "Jefe de Dependencia"]

    const { obtenerDatos } = useStorageData()
    const datos = obtenerDatos();

    if (!enabledUsers.includes(datos.usuario!.tipoUsuario)) {
        router.push({ name: 'deshabilitado' });
    }
}

export default checkUser