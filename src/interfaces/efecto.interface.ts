interface PrimaryAttributes {
    id?: string;
    nombre?: string;
    año?: string;
    nroChasis?: string;
    nroMotor?: string;
    dominio?: string;
    nroSerie?: string;
    nroIMEI?: string;
    nroAbonado?: string;
    color?: string;
}

export interface EfectosForm extends PrimaryAttributes {
    categoria: { name: string };
    subcategoria: { name: string };
    tipo: { name: string };
    marca: { name: string };
    modelo: { name: string };
}

export interface Efectos extends PrimaryAttributes {
    categoria: string;
    subcategoria: string;
    tipo: string;
    marca: string;
    modelo: string;
}
export interface Efecto {
    titulo: string,
    valor: string[]
}