export interface Fecha{
    titulo: string,
    valor: string | null
}

export interface FechaUbicacion{
    desdeFechaHora: string | Date,
    hastaFechaHora: string | Date,
    calle?: string,
    numero?: string,
    departamento?: string,
    /* si hay internet */
    ubicacion: string,
    latitud?: string,
    longitud?: string
}