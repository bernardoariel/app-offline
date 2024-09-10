export const mapToDropdownItems = (array: any) => {
  if (array) return array.map((item: any) => ({ name: item }));
};

export const mapToDropDownEfectos = (array: any, tipo?: string) => {
  return array.map((objeto: any) => {
    const {
      Nombre,
      nombre,
      CategoriaID,
      SubcategoriaID,
      tipoID,
      MarcaID,
      ModeloID,
      Numeroarticulo,
    } = objeto;

    const name = Nombre || nombre || Numeroarticulo;

    let key = "";

    if (tipo) {
      switch (tipo) {
        case "categorias":
          key = CategoriaID;
          break;
        case "sub-categorias":
          key = SubcategoriaID;
          break;
        case "tipo-categorias":
          key = tipoID;
          break;
        case "marcas":
          key = MarcaID;
          break;
        case "modelo":
          key = ModeloID;
          break;
      }
    }

    return {
      ...objeto,

      name: name,

      key: key,
    };
  });
};

export const mapToArray = (dropDownValues: any) => {
  if (dropDownValues) return dropDownValues.value.map((item) => item.name);
};

export const addNameProp = (objArray: any, param: string) => {
  objArray.forEach((obj) => {
    obj.nombre = obj[param];
  });

  return objArray;
};
