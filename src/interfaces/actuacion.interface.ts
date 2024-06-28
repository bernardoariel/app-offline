interface Afectado {
    nroDocumento: string;
    apellido: string;
    nombre: string;
    fecha: string;
    domicilioResidencia: string;
    telefono: string;
    email: string;
    profesion: string;
    typeAfectado: string;
    typeDocumento: string;
    typeSexo: string;
    nacionalidad: string;
    estadoCivil: string;
    instruccion: string;
    id: string;
}

interface Vinculado {
    apodo: string;
    nroDocumento: string;
    apellido: string;
    nombre: string;
    fecha: string;
    domicilioResidencia: string;
    telefono: string;
    profesion: string;
    typeAfectado: string;
    typeDocumento: string;
    typeSexo: string;
    nacionalidad: string;
    estadoCivil: string;
    instruccion: string;
    id: string;
}

interface FechaUbicacion {
    desdeFechaHora: string;
    hastaFechaHora: string;
    calle: string;
    numero: string;
    departamento: string;
    id: string;
}

interface Efecto {
    categoria: string;
    marca: string;
    modelo: string;
    subcategoria: string;
    tipo: string;
    id: string;
}

interface PersonalInterviniente {
    apellido: string;
    nombre: string;
    jerarquia: string;
    dependencia: string;
    id: string;
}

export interface Actuacion {
    nroLegajoCompleto: number;
    fechaCreacion: string;
    nombreActuacion: string;
    juzgadoInterviniente: string;
    afectados: Afectado[];
    vinculados: Vinculado[];
    fechaUbicacion: FechaUbicacion[];
    efectos: Efecto[];
    personalInterviniente: PersonalInterviniente[];
    id: number;
}
