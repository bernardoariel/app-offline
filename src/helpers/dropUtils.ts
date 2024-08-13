
export const mapToDropdownItems = (array: any) => {
    if (array)
        return array.map((item: any) => ({ name: item }));
};

export const mapToDropDownEfectos =(array:any) => {

    return array.map((objeto: any) => {
        const name = objeto.Nombre || objeto.nombre; 
        const key = objeto.CategoriaID || objeto.id_categoria || objeto.tipoID || objeto.ModeloID; 
        return {
            ...objeto,
            name: name,
            key: key
        };
    });
    
}

export const mapToArray=(dropDownValues:any)=>{
    if(dropDownValues)
        return dropDownValues.value.map(item => item.name)
}