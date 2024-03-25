
export const getAge= (birthDate:string): number =>{
    if(!birthDate) return 0

    const [day, month, year] = birthDate.split('/');
    const formattedBirthDate = `${year}-${month}-${day}`;
    const today = new Date()
    const birthDateObj = new Date(formattedBirthDate)
    let age = today.getFullYear() - birthDateObj.getFullYear()
    const m = today.getMonth() - birthDateObj.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
   }
   return age;
}