import { getBase64ImageFromURL } from '../../../helpers/getBase64Image';
import { useStorageData } from '../../../composables/useStorageData';
import logoPoliciaPath from '@/assets/logo-policia-de-san-juan.png';
import logoSeguridadPath from '@/assets/police.png';

export const headerSection = async () => {
    try {
        const { obtenerDatos } = useStorageData();
        obtenerDatos();
        
        // Obtener los datos desde localStorage
        const dataGuardada = localStorage.getItem('siisOffLineData');
        let dependencia = {};

        if (dataGuardada) {
            const data = JSON.parse(dataGuardada);
            dependencia = data.dependencia;
        }
        // const logoPolicia = await getBase64ImageFromURL('src/assets/logo-policia-de-san-juan.png');
        // const logoSeguridad = await getBase64ImageFromURL('src/assets/police.png');
        const logoPolicia = await getBase64ImageFromURL(logoPoliciaPath);
        const logoSeguridad = await getBase64ImageFromURL(logoSeguridadPath);
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
