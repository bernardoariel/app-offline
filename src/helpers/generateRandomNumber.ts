export const generateRandomNumber = ():number =>{
    const length = Math.floor(Math.random() * 3) + 3;

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}