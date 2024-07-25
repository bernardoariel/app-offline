interface PrimaryAttributes{
    id?: string,
    nroDocumento: string,
    apellido: string,
    nombre: string,
    fecha: string,
    domicilioResidencia: string,
    telefono: string,
    profesion: string,
    apodo:string
}
export interface VinculadosForm extends PrimaryAttributes{
    typeAfectado: {name:string},
    typeDocumento: {name:string},
    typeSexo: {name:string},
    nacionalidad: {name:string},
    estadoCivil: {name:string},
    instruccion: {name:string},
    descripcionDesconocido?: string
}
export interface Vinculados extends PrimaryAttributes{
    typeAfectado: string,
    typeDocumento: string,
    typeSexo: string,
    nacionalidad: string,
    estadoCivil: string,
    instruccion: string,
    descripcionDesconocido?: string
}  
export interface Vinculado{
    titulo: string,
    valor: string[]
}
