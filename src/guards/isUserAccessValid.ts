import { useStorageData } from "@/composables/useStorageData";

const isUserAccessValid = (to, from, next) => {
    const enabledUsers = ["Jefe de Sumario", "Oficial Sumariante", "Jefe de Dependencia"];
    const { obtenerDatos } = useStorageData();
    const datos = obtenerDatos();

    if (datos && datos.usuario && enabledUsers.includes(datos.usuario)) {
        next({ name: 'actuaciones' });
        return
    } 
    
    next();
    
};

export default isUserAccessValid;