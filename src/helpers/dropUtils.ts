
export const mapToDropdownItems = (array: any) => {
    if (array)
        return array.map((item: any) => ({ name: item }));
};

export const mapToDropDownEfectos =(array:any) => {

    return array.map((objeto: any) => {
        const name = objeto.Nombre || objeto.nombre; 
        return {
            ...objeto,
            name: name
        };
    });
    
}

export const mapToArray=(dropDownValues:any)=>{
    if(dropDownValues)
        return dropDownValues.value.map(item => item.name)
}