import type { Tarjeta } from "./tipoTarjetas.interface";

export interface Actuacion {
    titulo: string;
    tituloAlternativo: string;          
    tarjetas: Tarjeta
  }
  
  export interface TipoActuaciones {
    [key: string]: Actuacion;
  }