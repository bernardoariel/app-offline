interface PrimaryAttributes{
    id?: string,
    nroDocumento: string,
    apellido: string,
    nombre: string,
    fecha: string,
    domicilioResidencia: string,
    telefono: string,
    email: string,
    profesion: string,
}


export interface AfectadosForm extends PrimaryAttributes{
    typeAfectado: {name:string},
    typeDocumento: {name:string},
    typeSexo: {name:string},
    nacionalidad: {name:string},
    estadoCivil: {name:string},
    instruccion: {name:string},
    descripcionOrdenPublico?: string
}
export interface Afectados extends PrimaryAttributes{
    typeAfectado: string,
    typeDocumento: string,
    typeSexo: string,
    nacionalidad: string,
    estadoCivil: string,
    instruccion: string,
    descripcionOrdenPublico?: string

}  

export interface Afectado{
    titulo: string,
    valor: string[]
}