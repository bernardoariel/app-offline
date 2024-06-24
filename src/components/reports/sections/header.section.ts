import { getBase64ImageFromURL } from '../../../helpers/getBase64Image';
import { useStorageData } from '../../../composables/useStorageData';

export const headerSection = async () => {
    try {
        const { obtenerDatos } = useStorageData();
        obtenerDatos();
        
        // Obtener los datos de dependencia desde localStorage
        const dependenciaGuardada = localStorage.getItem('dependencia');
        let dependencia = {};

        if (dependenciaGuardada) {
            dependencia = JSON.parse(dependenciaGuardada);
        }
        const logoPolicia = await getBase64ImageFromURL('src/assets/logo-policia-de-san-juan.png');
        const logoSeguridad = await getBase64ImageFromURL('src/assets/police.png');

        return {
            columns: [
                {
                    width: '75%',
                    stack:[
                        {
                            image: logoPolicia,
                            fit: [150, 150],
                            alignment: 'left',
                            margin: [0, 0, 0, 0],
                        },
                        {
                            text: `${dependencia.nombre.toUpperCase()} - TELEFONO: ${dependencia.telefonos}`,
                            alignment: 'left',
                            fontSize: 10,
                        }
                    ]
                },
              
                {
                    stack: [
                        {
                            image: logoSeguridad,
                            fit: [80, 80],
                            alignment: 'left',
                            margin: [-15, 0, 10, 0],
                        },
                        {
                            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 0, y2: 65, lineWidth: 0.75 }],
                            margin: [50, -75, 10, 0],
                        },
                        {
                            stack: [
                                { text: 'SEGURIDAD\n', alignment: 'left',fontSize: 9 },
                                { text: 'PREVENCIÓN\n', alignment: 'left',fontSize: 9 },
                                { text: 'PROTECCIÓN', alignment: 'left' ,fontSize: 9},
                            ],
                            margin: [70, -52, 0, 0],
                        }
                    ],
                    alignment: 'right'
                }
            ],
            margin: [0, 0, 0, 20],
        };
    } catch (error) {
        console.error('Error generating header section:', error);
        throw error;
    }
};
