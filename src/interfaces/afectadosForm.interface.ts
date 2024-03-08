interface PrimaryAttributes{
    id?: string,
    nroDocumento: number,
    apellido: string,
    name: string,
    fecha: string,
    nacionalidad: string,
    estadoCivil: string,
    domicilioResidencia: string,
    telefono: string,
    email: string,
    profesion: string,
    instruccion: string,
    apodo:string
}
export interface FechaUbicacionForm extends PrimaryAttributes{
    typeAfectado: {name:string},
    typeDocumento: {name:string},
    typeSexo: {name:string},
}
export interface FechaUbicacion extends PrimaryAttributes{
    typeAfectado: string,
    typeDocumento: string,
    typeSexo: string,
}  
export interface AfectadosForm{
   
    
    
    
    
    [key: string]: string | number;
}