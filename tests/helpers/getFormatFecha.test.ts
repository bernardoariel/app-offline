import { formatFecha } from '@/helpers/getFormatFecha';

describe('formatFecha', () => {
    it('should format date with time (fechaHora)', () => {
        // arrange
        const fecha = new Date('2024-06-29T14:45:00');
        const expectedOutput = '29/06/2024 14:45';
        
        // act
        const result = formatFecha(fecha, 'fechaHora');
        
        // assert
        expect(result).toEqual(expectedOutput);
    });

    it('should format date without time (fecha)', () => {
        // arrange
        const fecha = new Date('2024-06-29T14:45:00');
        const expectedOutput = '29/06/2024';
        
        // act
        const result = formatFecha(fecha, 'fecha');
        
        // assert
        expect(result).toEqual(expectedOutput);
    });

    it('should format date correctly for the beginning of the year', () => {
        // arrange
        const fecha = new Date('2024-01-01T00:00:00');
        const expectedOutput = '01/01/2024 00:00';
        
        // act
        const result = formatFecha(fecha, 'fechaHora');
        
        // assert
        expect(result).toEqual(expectedOutput);
    });

    it('should format date correctly for the end of the year', () => {
        // arrange
        const fecha = new Date('2024-12-31T23:59:00');
        const expectedOutput = '31/12/2024 23:59';
        
        // act
        const result = formatFecha(fecha, 'fechaHora');
        
        // assert
        expect(result).toEqual(expectedOutput);
    });
    it('should format date correctly for a specific date with time zone (Argentina)', () => {
        // arrange
        const fecha = new Date('Wed Jun 19 2024 14:18:53 GMT-0300 (hora estándar de Argentina)');
        const expectedOutput = '19/06/2024 14:18';
        
        // act
        const result = formatFecha(fecha, 'fechaHora');

        // assert
        expect(result).toEqual(expectedOutput);
    });
});
