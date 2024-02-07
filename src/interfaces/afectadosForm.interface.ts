//afectadosFormInterface
export interface AfectadosForm{
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
}