// Transforma una cadena a mayúsculas
export const getUpperCase = (word?:string) => {
  if (word)
    return word.toUpperCase();
  else
    return
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
  // funcion para recibir una horacion, y colocar siempre la primera letra mayuscula y todas las demas minusculas
  export const getHour = (hour: string) => {
    return hour.charAt(0).toUpperCase() + hour.slice(1).toLowerCase();
  }

  export const getTruncatedString= (text: string, maxLength:number) => {
    return text.length > maxLength
    ? text.slice(0, maxLength) + '...'
    : text;
  }

  export const separateCamelCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Agrega un espacio antes de cada letra mayúscula que sigue a una minúscula
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Agrega un espacio entre letras mayúsculas seguidas por minúsculas
      .toLowerCase() // Convierte todo a minúsculas
      .replace(/(^\w|\s\w)/g, m => m.toUpperCase()); // Convierte la primera letra de cada palabra a mayúsculas
  };