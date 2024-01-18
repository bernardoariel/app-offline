
export const getColorByAfectado = (typePropItemCard:string) => {
    switch (typePropItemCard) {
       
        case 'Denunciante y Damnificado':
            return 'success';

        case 'Damnificado':
            return 'warning';

        case 'Victima':
            return 'danger';
        case 'Detenido':
            return 'danger'
        case 'Acusado':
            return 'warning'
        case 'Recuperado':
            return 'success'
        case 'Secuestrado':
            return 'warning'
        case 'Denunciado':
            return 'danger'
      
        default:
            return 'info';
    }
};