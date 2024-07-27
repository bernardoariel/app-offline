
export const mapToDropdownItems = (array: any) => {
    if (array)
        return array.map((item: any) => {
            const name = item.Nombre || item.name || item.nombre; // Asegúrate de que el campo `name` esté presente
            return { ...item, name };
        });
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