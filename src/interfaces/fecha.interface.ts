interface PrimaryAttributes{
    id?:string;
    desdeFechaHora: string | Date,
    hastaFechaHora: string | Date,
    calle?: string,
    nombre?:string;
    numero?: string,
    /* si hay internet */
    ubicacion?: string,
    latitud?: string,
    longitud?: string
}
export interface FechaUbicacionForm extends PrimaryAttributes{
    departamento: {name:string},
}
export interface FechaUbicacion extends PrimaryAttributes{
    departamento?: string,
}  

export interface Fecha{
    titulo: string,
    valor: string | null
}



/* export interface FechaUbicacion{
    desdeFechaHora: string | Date,
    hastaFechaHora: string | Date,
    calle?: string,
    numero?: string,
    departamento?: string,

    ubicacion: string,
    latitud?: string,
    longitud?: string
} */