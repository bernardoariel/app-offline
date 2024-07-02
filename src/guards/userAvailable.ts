import { useStorageData } from "@/composables/useStorageData"
import { useRouter } from 'vue-router';


const userAvailable = (to: any, from: any, next: any) => {
    const enabledUsers = ["Jefe de Sumario", "Oficial Sumariante", "Jefe de Dependencia"]

    const { obtenerDatos } = useStorageData()
    const datos = obtenerDatos();

    if (enabledUsers.includes(datos.usuario!.tipoUsuario)) {
        next({ name: 'actuaciones' });
    } else {
        next();
    }
}

export default userAvailable