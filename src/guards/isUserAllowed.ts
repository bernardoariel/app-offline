import { useStorageData } from "@/composables/useStorageData";

const isUserAllowed = (to, from, next) => {

    const enabledUsers = ["Jefe de Sumario", "Oficial Sumariante", "Jefe de Dependencia"];
    
    const { obtenerDatos } = useStorageData();
    const datos = obtenerDatos();

    if (datos && datos.usuario && enabledUsers.includes(datos.usuario)) {
        next();
        return 
    } 

    next({ name: 'denegado' });
    
};

export default isUserAllowed;