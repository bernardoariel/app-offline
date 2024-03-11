
// Define un tipo para los elementos que son arrays
interface CardInformationArrayItem {
    titulo: string;
    items: any[]; // Cambiar "any[]" por el tipo específico según corresponda
  }
  
  // Define un tipo para el elemento que es un objeto único
  interface CardInformationSingleItem {
    titulo: string;
    item: any; // Cambiar "any" por el tipo específico, en este caso, FechaUbicacion
  }
  
  // Usamos un tipo unión para manejar ambos casos
  type CardInformationItem = CardInformationArrayItem | CardInformationSingleItem;
  
  // Define un tipo que incluya todos los posibles casos
export type CardInformation = {
    [key: string]: CardInformationItem;
  };