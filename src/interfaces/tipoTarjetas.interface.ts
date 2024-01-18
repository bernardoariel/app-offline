import type { Afectado } from "./afectado.interface";
import type { Efecto } from "./efecto.interface";
import type { Fecha } from "./fecha.interface";
import type { Interviniente } from "./interviniente.interface";
import type { Vinculado } from "./vinculado.interface";


export interface Tarjeta{
   
    afectados: Afectado;
    vinculados: Vinculado;
    fecha: Fecha;
    efectos: Efecto;
    personalInterviniente?:Interviniente
      
}