import { getBase64ImageFromURL } from '../../../helpers/getBase64Image';

export const headerSection = async () => {
    try {
        const logoPolicia = await getBase64ImageFromURL('src/assets/logo-policia-de-san-juan.png');
        const logoSeguridad = await getBase64ImageFromURL('src/assets/police.png');

        return {
            columns: [
                {
                    image: logoPolicia,
                    fit: [150, 150],
                    alignment: 'left',
                    margin: [0, 0, 0, 0],
                },
                {
                    width: '*',
                    text: ''
                },
                {
                    stack: [
                        {
                            image: logoSeguridad,
                            fit: [100, 100],
                            alignment: 'left',
                            margin: [-15, -25, 10, 0],
                        },
                        {
                            canvas: [{ type: 'line', x1: 0, y1: 0, x2: 0, y2: 90, lineWidth: 1 }],
                            margin: [60, -95, 10, 0],
                        },
                        {
                            stack: [
                                { text: 'SEGURIDAD', alignment: 'left' },
                                { text: 'PREVENCIÓN', alignment: 'left', margin: [0, 5, 0, 5] },
                                { text: 'PROTECCIÓN', alignment: 'left' },
                            ],
                            margin: [100, -70, 0, 0],
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
