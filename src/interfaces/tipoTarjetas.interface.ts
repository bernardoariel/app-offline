import type {
  Afectado,
  Efecto,
  Fecha,
  Interviniente,
  Vinculado,
} from "./index";

export interface Tarjeta {
  afectados: Afectado;
  vinculados?: Vinculado;
  fecha: Fecha;
  efectos: Efecto;
  personalInterviniente?: Interviniente;
}
