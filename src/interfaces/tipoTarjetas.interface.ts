import type { Afectado } from "./afectado.interface";
import type { Efecto } from "./efecto.interface";
import type { Vinculado } from "./vinculado.interface";


export interface Tarjeta{
   
    afectados: Afectado;
    vinculados: Vinculado;
    fecha: string;
    efectos: Efecto;
    personalInterviniente?: string | null | undefined
      
}