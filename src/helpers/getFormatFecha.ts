type FormatoFecha = 'fechaHora' | 'fecha';
export const formatFecha = (fechaString: Date, formato: FormatoFecha = 'fechaHora'): 'dd/MM/yyyy' | 'dd/MM/yyyy HH:mm' => {
  // Crear un objeto Date a partir de la cadena de fecha proporcionada
    const fecha = new Date(fechaString);
  
    // Obtener los componentes individuales de la fecha
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // getMonth() devuelve un valor basado en cero, así que se le suma 1
    const año = fecha.getFullYear();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
  
    if (formato === 'fechaHora'){

      return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año} ${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

    }
    
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${año}`;
}
  