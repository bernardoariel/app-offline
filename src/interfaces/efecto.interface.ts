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
  estado: { name: string; key: string };
  categoria: { name: string; key: string };
  subcategoria: { name: string; key: string };
  tipo: { name: string; key: string };
  marca: { name: string; key: string };
  modelo: { name: string; key: string };
}

export interface Efectos extends PrimaryAttributes {
  estado: { name: string; key: string };
  categoria: { name: string; key: string };
  subcategoria: { name: string; key: string };
  tipo: { name: string; key: string };
  marca: { name: string; key: string };
  modelo: { name: string; key: string };
}
export interface Efecto {
  titulo: string;
  valor: string[];
}
