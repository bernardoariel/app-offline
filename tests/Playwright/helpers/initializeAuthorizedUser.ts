export const initializeAuthorizedUser = async (page: any) => {
    let userData = {
      dependencia: {
        nombre: "Electro3 - Rawson",
        telefonos: "02644516084",
        dependenciaLetra: "SUB COMISARIA E3",
        domicilio: "c/Rivadavia s/n V° S",
        departamento: "RAWSON"
      },
      usuario: {
        nombreUsuario: "UserTesterE3",
        tipoUsuario: "Jefe de Dependencia"
      }
    };
  
    let tipoUsuario = "Oficial Sumariante";
  
    const userDataString = JSON.stringify(userData);
  
    // Modifica el localStorage después de cargar la página
    await page.goto('/', {
      waitUntil: 'domcontentloaded'
    });
  
    // Inyectar datos en localStorage después de que la página ha cargado
    await page.evaluate(({ storageData, userType }) => {
      localStorage.setItem('siisOffLineData', storageData);
      localStorage.setItem('tipo usuario', userType);
    }, { storageData: userDataString, userType: tipoUsuario });
  
    // Recargar la página para que el guard verifique los datos en localStorage
    await page.reload();
  
    // Realiza las acciones necesarias después de que la página haya cargado con los datos correctos en localStorage
  };
  