const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const numbers = [
    '', 'Uno', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve', 'Diez',
    'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho',
    'Diecinueve', 'Veinte', 'Veintiuno', 'Veintidós', 'Veintitrés', 'Veinticuatro',
    'Veinticinco', 'Veintiséis', 'Veintisiete', 'Veintiocho', 'Veintinueve', 'Treinta',
    'Treinta y uno'
];

const years = {
    '2024': 'Dos Mil Veinticuatro',
    '2023': 'Dos Mil Veintitres',
    '2022': 'Dos Mil Veintidos',
    '2021': 'Dos Mil Veintiuno'
    // Agrega más años según sea necesario
};

export const convertDate = (isoDateString: string): string => {
    const date = new Date(isoDateString);

    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const dayText = numbers[day];
    const monthText = months[month];
    const yearText = years[year.toString()] || year.toString(); // Fallback al número si el año no está en el objeto years

    const hoursText = hours.toString().padStart(2, '0');
    const minutesText = minutes.toString().padStart(2, '0');

    return `a los ${dayText} días del mes de ${monthText} del año ${yearText}, siendo las ${hoursText}:${minutesText} horas`;
};


