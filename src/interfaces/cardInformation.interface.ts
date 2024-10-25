import type {
  Afectados,
  Efectos,
  FechaUbicacion,
  PersonalInterviniente,
  Vinculados,
} from "./index";

type Item =
  | Afectados
  | Vinculados
  | PersonalInterviniente
  | FechaUbicacion
  | Efectos;

interface CardInformationArrayItem {
  titulo: string;
  items: Item[];
  visible?: boolean;
}

interface CardInformationSingleItem {
  titulo: string;
  item: any;
  visible?: boolean;
}

type CardInformationItem = CardInformationArrayItem | CardInformationSingleItem;

export type CardInformation = {
  [key: string]: CardInformationItem;
};
