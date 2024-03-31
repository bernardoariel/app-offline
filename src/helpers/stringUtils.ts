// Transforma una cadena a mayúsculas
export const getUpperCase = (word:string) => {
    return word.toUpperCase();
  };
  
  // Transforma una cadena a minúsculas
  export const getLowerCase = (word:string) => {
    return word.toLowerCase();
  };
  
  // Transforma una cadena a formato título
  export const getTitleCase = (word: string | undefined) => {
    if (!word) return '';
    return word.replace(
      /\w\S*/g,
      (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  };