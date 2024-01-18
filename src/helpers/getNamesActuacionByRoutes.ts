

export const getNamesActuacionByRoutes = (nombreRuta:string) => {
    switch (nombreRuta) {
        case 'sumario-oficio':
            return 'Sumario por Oficio';

       

        default:
            return null;
    }
};