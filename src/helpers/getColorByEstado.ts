
export const getColorByEstado = (estado: string): string => {
    const estadoColorMap: { [key: string]: string } = {
        'Recuperado': 'success',
        'Secuestrado': 'warning',
        'Denunciado': 'danger'
    };

    return estadoColorMap[estado] || 'info';
};