const getFromLocalStorage = (key: string): string | null => {
    return localStorage.getItem(key);
};

export const getDependenciaData = (): DependenciaData => {
    let dependenciaData
    let offlineData = getFromLocalStorage('siisOffLineData');
    if (offlineData) {
        try {
            dependenciaData = JSON.parse(offlineData);
        } catch (error) {
            console.error('Error parsing offline data:', error);
        }
    }
    return dependenciaData
}


export interface DependenciaData {
    dependencia: {
        nombre: string,
        telefonos: string,
        dependenciaLetra: string,
        domicilio: string,
        departamento: string
    },
    usuario: string
}