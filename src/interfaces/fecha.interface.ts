export interface PrimaryAttributes {
  id?: string;
  desdeFechaHora: Date | null;
  hastaFechaHora: Date | null;
  calle?: string;
  nombre?: string;
  numero?: string;
  ubicacion?: string;
  latitud?: string;
  longitud?: string;
}
export interface FechaUbicacionForm extends PrimaryAttributes {
  departamento: { name: string };
}

export interface FechaUbicacion extends PrimaryAttributes {
  departamento?: string;
}

export interface Fecha {
  titulo: string;
  valor: string | null;
}
