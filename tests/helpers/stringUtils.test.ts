import { getUpperCase, getLowerCase } from '../../src/helpers/stringUtils';

describe('getUpperCase', () => {
    test('debe devolver un texto en mayuscula',()=>{

        // arrange
        const inputWord = 'hello';
        const expectedOuput = 'HELLO';
     
        // act 
        const result = getUpperCase(inputWord)
        // assert
        expect(result).toEqual(expectedOuput)
     })
     
     test('should return empty string for empty input', () => {
         // arrange
         const inputWord = '';
         const expectedOutput = '';
       
         // act 
         const result = getUpperCase(inputWord);
       
         // assert
         expect(result).toEqual(expectedOutput);
       });
       test('should return same string for already uppercase input', () => {
         // arrange
         const inputWord = 'HELLO';
         const expectedOutput = 'HELLO';
       
         // act 
         const result = getUpperCase(inputWord);
       
         // assert
         expect(result).toEqual(expectedOutput);
         
       });
     
       test('should return uppercase version for input with special characters', () => {
         // arrange
         const inputWord = 'h3ll0!';
         const expectedOutput = 'H3LL0!';
       
         // act 
         const result = getUpperCase(inputWord);
       
         // assert
         expect(result).toEqual(expectedOutput);
       });
       test('should return uppercase version for input with accented characters', () => {
         // arrange
         const inputWord = 'héllò';
         const expectedOutput = 'HÉLLÒ';
       
         // act 
         const result = getUpperCase(inputWord);
        
       
         // assert
         expect(result).toEqual(expectedOutput);
       });
       test('should return the same input for numeric input', () => {
         // arrange
         const inputNumber = '123';
         
         // act 
         const result = getUpperCase(inputNumber);
         
         // assert
         expect(result).toEqual(inputNumber);
       });
})


describe('getLowerCase', () => {
    test('debe devolver un texto en minuscula',()=>{

        // arrange
        const inputWord = 'HELLO';
        const expectedOuput = 'hello';
     
        // act 
        const result = getLowerCase(inputWord)
     
        // assert
        expect(result).toEqual(expectedOuput)
     })
})

  