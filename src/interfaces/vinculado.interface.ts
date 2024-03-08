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
    profesion: string,
    instruccion: string,
    apodo:string
}
export interface VinculadosForm extends PrimaryAttributes{
    typeAfectado: {name:string},
    typeDocumento: {name:string},
    typeSexo: {name:string},
    nacionalidad: {name:string},
    estadoCivil: {name:string},
    instruccion: {name:string}
}
export interface Vinculados extends PrimaryAttributes{
    typeAfectado: string,
    typeDocumento: string,
    typeSexo: string,
    nacionalidad: string,
    estadoCivil: string,
    instruccion: string
}  
export interface Vinculado{
    titulo: string,
    valor: string[]
}

/* export interface AfectadosForm{
    id: string
    typeAfectado: string,
    typeDocumento: string,
    nroDocumento: number,
    typeSexo: string,
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
    [key: string]: string | number;
} */