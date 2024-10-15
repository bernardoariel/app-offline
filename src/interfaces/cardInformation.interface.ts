import type { Afectados } from "./afectado.interface";
import type { Efectos } from "./efecto.interface";
import type { FechaUbicacion } from "./fecha.interface";
import type { PersonalInterviniente } from "./personalInterviniente";
import type { Vinculados } from "./vinculado.interface";

type Item =
  | Afectados
  | Vinculados
  | PersonalInterviniente
  | FechaUbicacion
  | Efectos;

interface CardInformationArrayItem {
  titulo: string;
  items: Item[]; // Cambiar "any[]" por el tipo específico según corresponda
  visible?: boolean;
}

// Define un tipo para el elemento que es un objeto único
interface CardInformationSingleItem {
  titulo: string;
  item: any; // Cambiar "any" por el tipo específico, en este caso, FechaUbicacion
  visible?: boolean;
}

// Usamos un tipo unión para manejar ambos casos
type CardInformationItem = CardInformationArrayItem | CardInformationSingleItem;

// Define un tipo que incluya todos los posibles casos
export type CardInformation = {
  [key: string]: CardInformationItem;
};
