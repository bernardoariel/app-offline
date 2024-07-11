
export const afectadosFake = [
    {
        "nroDocumento": "36874512",
        "apellido": "Quiroga",
        "nombre": "Ricardo",
        "fecha": "05/03/1982",
        "domicilioResidencia": "Calle Mendoza 321, Rawson. San Juan",
        "telefono": "2644509876",
        "email": "ricardo.quiroga@example.com",
        "profesion": "Maestro",
        "typeAfectado": "Denunciante y Damnificado",
        "typeDocumento": "DNI",
        "typeSexo": "Masculino",
        "nacionalidad": "Argentina",
        "estadoCivil": "Casado/a",
        "instruccion": "Sabe leer y sabe firmar",
        "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
      },
      {
        "nroDocumento": "29567123",
        "apellido": "Lopez",
        "nombre": "Marianela",
        "fecha": "22/11/1989",
        "domicilioResidencia": "Av. Libertador 2050, Rivadavia. San Juan",
        "telefono": "2645201234",
        "email": "marianela.lopez@example.com",
        "profesion": "Contadora",
        "typeAfectado": "Damnificado",
        "typeDocumento": "DNI",
        "typeSexo": "Femenino",
        "nacionalidad": "Argentina",
        "estadoCivil": "Soltero/a",
        "instruccion": "Sabe leer y sabe firmar",
        "id": "b7c8d9e0-f1g2-h3i4-j5k6-l7m8n9o0p1q2"
      },
      {
        "nroDocumento": "41325896",
        "apellido": "Vega",
        "nombre": "Esteban",
        "fecha": "30/07/1975",
        "domicilioResidencia": "Boulevard Sarmiento 758, Chimbas. San Juan",
        "telefono": "2644315678",
        "email": "esteban.vega@example.com",
        "profesion": "Ingeniero Civil",
        "typeAfectado": "Denunciante",
        "typeDocumento": "DNI",
        "typeSexo": "Masculino",
        "nacionalidad": "Argentina",
        "estadoCivil": "Divorciado/a",
        "instruccion": "Sabe leer y sabe firmar",
        "id": "c4d3e2f1-g0h1-i2j3-k4l5-m6n7o8p9q0r1"
      }
]
export const vinculadosFake = [
  {
  "apodo": "nano",
  "nroDocumento": "40235874",
  "apellido": "García",
  "nombre": "Lucas",
  "fecha": "15/04/1980",
  "domicilioResidencia": "Calle Colón 850, Capital, San Juan",
  "telefono": "2645001234",
  "profesion": "Carpintero",
  "typeAfectado": "Acusado",
  "typeDocumento": "DNI",
  "typeSexo": "Masculino",
  "nacionalidad": "Argentina",
  "estadoCivil": "Soltero/a",
  "instruccion": "No sabe leer, si sabe firmar",
  "id": "a123b456-c789-d012-e345-f67890g123h4"
  },
  {
  "apodo": "la Dama",
  "nroDocumento": "38567890",
  "apellido": "Martinez",
  "nombre": "Sofía",
  "fecha": "22/07/1988",
  "domicilioResidencia": "Avenida Libertador 2345, Santa Lucía, San Juan",
  "telefono": "2645112233",
  "profesion": "Abogada",
  "typeAfectado": "Detenido",
  "typeDocumento": "DNI",
  "typeSexo": "Femenino",
  "nacionalidad": "Argentina",
  "estadoCivil": "Casado/a",
  "instruccion": "Sabe leer y escribir",
  "id": "b234c567-d890-e123-f456-g78901h234i5"
  },
  {
  "apodo": "one",
  "nroDocumento": "29765432",
  "apellido": "Ruiz",
  "nombre": "Eduardo",
  "fecha": "03/11/1972",
  "domicilioResidencia": "Belgrano 678, Jáchal, San Juan",
  "telefono": "2645203344",
  "profesion": "Maestro Mayor de Obras",
  "typeAfectado": "Acusado",
  "typeDocumento": "DNI",
  "typeSexo": "Masculino",
  "nacionalidad": "Argentina",
  "estadoCivil": "Divorciado/a",
  "instruccion": "No sabe leer, no sabe firmar",
  "id": "c345d678-e901-f234-g567-h89012i345j6"
  }
]

export const fechaUbicacioFake = [
  {
    "desdeFechaHora":"Sat Mar 30 2024 12:00:22 GMT-0300 (hora estándar de Argentina)",
    "hastaFechaHora":"Sat Mar 30 2024 12:15:22 GMT-0300 (hora estándar de Argentina)",
    "calle":"Belgrano",
    "numero":"678",
    "departamento":"Jáchal",
    "id":"7eff3cf0-5006-4b4d-9dcc-7a3431ca4563"
  }
]

export const efectosFake = [
  {
    "estado":"Denunciado",
    "categoria":"Vehiculos",
    "marca":" Rockrider",
    "modelo":"Blazer",
    "subcategoria":"Moto",
    "tipo":"Competicion",
    "id":"64a888c4-5b79-4414-9a21-cd9a30b7059e"
  },
  {
    "estado":"Denunciado",
    "categoria":"Electrónica",
    "marca":"Sanyo",
    "modelo":"SM-G532M",
    "subcategoria":"Electrodomesticos",
    "tipo":"Televisor",
    "id":"9355289c-08a0-43ba-8131-6c18d02de812"
  },{
    "estado":"Denunciado",
    "categoria":"Instrumentos Musicales",
    "marca":"Samick",
    "modelo":"Street",
    "subcategoria":"Instrumentos de Cuerdas",
    "tipo":"Guitarra ",
    "id":"fbfec497-d07c-4004-a927-8d65b230fc5c"
  }]
export const intervinientesFake = [
  {
    "apellido":"Perez",
    "nombre":"David",
    "jerarquia":"Cabo Primero",
    "dependencia":"Comisaria 16ta Calingasta",
    "id":"311e30fe-88a2-4ee7-be4d-97d56e075200"
  },
  {
    "apellido":"Gonzalez",
    "nombre":"Javier Alejandro",
    "jerarquia":"Sargento Primero",
    "dependencia":"Unidad Fiscal ANIVI",
    "id":"ff011cfd-479b-4370-9149-15a4fc0faa80"
  },
  {
    "apellido":"Lansini",
    "nombre":"Lorena",
    "jerarquia":"Oficial Principal",
    "dependencia":"Unidad Op. de Prevencion Barreal",
    "id":"07798405-883a-4eb2-9955-253bda2db8c6"
  }
]

export const datosLegales = [
  {
    
  }
] 

export const userDataSiis = {
  usuarios: [
    {
      nombreUsuario: "userDependencia03",
      tipoUsuario: "TipoUsuarioOficialSumariante",
    },
    {
      nombreUsuario: "UsEnOtraDep",
      tipoUsuario: "TipoUsuarioJefeDeDependencia",
    },
    {
      nombreUsuario: "UserTesterE3",
      tipoUsuario: "UserTester",
    },
    {
      nombreUsuario: "noropel",
      tipoUsuario: "TipoUsuarioOficialSumariante",
    },
    {
      nombreUsuario: "MayTest",
      tipoUsuario: "TipoUsuarioOficialSumariante",
    },
    {
      nombreUsuario: "LeoTestDeveloper",
      tipoUsuario: "TipoUsuarioJefeDeDependencia",
    },
    {
      nombreUsuario: "UsuarioPlaneamiento",
      tipoUsuario: "TipoUsuarioDptoPlaneamiento",
    },
    {
      nombreUsuario: "PruebaSuperUser",
      tipoUsuario: "SuperUser",
    },
    {
      nombreUsuario: "pruebaPlaneamiento",
      tipoUsuario: "TipoUsuarioDptoPlaneamiento",
    },
    {
      nombreUsuario: "PruebaDeposito",
      tipoUsuario: "TipoUsuarioOficialSumariante",
    },
    {
      nombreUsuario: "noropeltest",
      tipoUsuario: "TipoUsuarioOficialSumariante",
    },
    {
      nombreUsuario: "JefeDependenciaPrueba",
      tipoUsuario: "TipoUsuarioJefeDeDependencia",
    },
    {
      nombreUsuario: "pruebaControl",
      tipoUsuario: "TipoUsuarioControldeGestion",
    },
    {
      nombreUsuario: "pruebaJefeDeSumario",
      tipoUsuario: "TipoUsuarioJefeDeSumario",
    },
    {
      nombreUsuario: "ezequielF",
      tipoUsuario: "TipoUsuarioOficialSumariante",
    },
    {
      nombreUsuario: "nombre de usuario",
      tipoUsuario: "SuperUser",
    },
    {
      nombreUsuario: "OficialSumariantePrueba",
      tipoUsuario: "TipoUsuarioOficialSumariante",
    },
    {
      nombreUsuario: "JefeSumarioPrueba",
      tipoUsuario: "TipoUsuarioJefeDeSumario",
    },
    {
      nombreUsuario: "pruebaOficialSumariante",
      tipoUsuario: "TipoUsuarioOficialSumariante",
    },
  ],
  dependencias: [
    {
      nombre: "Unidad Operativa B° Municipal",
      telefonos: "264381154",
      dependenciaLetra: "Comisaria Decimo sexta",
      domicilio: "Mendoza Pasando calle 18 Pocito",
      departamento: "CAPITAL",
    },
    {
      nombre: "Comisaria 16ta Calingasta",
      telefonos: "02648-421022",
      dependenciaLetra: "Ptp Policial Tamberias Calingasta",
      domicilio: "Av. Argentina s/n Calingasta",
      departamento: "CALINGASTA",
    },
    {
      nombre: "Ptp Policial Tamberias Calingasta",
      telefonos: "02648492010",
      dependenciaLetra: "Ptp Policial Tamberias Calingasta",
      domicilio: "Ruta Prov. s/n Tamberias Calingasta",
      departamento: "CALINGASTA",
    },
    {
      nombre: "Unidad Operativa Chimbas Sur",
      telefonos: "4313253",
      dependenciaLetra: "Unidad Operativa Chimbas Sur",
      domicilio: "B° Udap Chimbas",
      departamento: "CHIMBAS",
    },
    {
      nombre: "Comisaria 8va -Sarmiento",
      telefonos: "4941009",
      dependenciaLetra: "Comisaria Octava",
      domicilio: "c/Rivadavia s/n Media Agua Sarmiento",
      departamento: "SARMIENTO",
    },
    {
      nombre: "Comisaria 33ra Barreal",
      telefonos: "02648-441022",
      dependenciaLetra: "Comisaria Trigésima Tercera",
      domicilio: "av. Presidente Roca s/n Barreal",
      departamento: "BARREAL",
    },
    {
      nombre: "Comisaria 4ta Desamparados",
      telefonos: "4-231880",
      dependenciaLetra: "COMISARIA CUARTA",
      domicilio: "Av. Libertador y P. A. Sarmiento",
      departamento: "CAPITAL",
    },
    {
      nombre: "Comisaría 2da Concepción",
      telefonos: "4-212526",
      dependenciaLetra: "COMISARIA SEGUNDA",
      domicilio: "c/Rivadavia s/n V° San Agustín",
      departamento: "CONCEPCIÓN",
    },
    {
      nombre: "Comisaria 12da Valle Fértil",
      telefonos: "02646-420100",
      dependenciaLetra: "Comisaria Decimo Segunda",
      domicilio: "c/Rivadavia s/n V° San Agustín",
      departamento: "VALLE FÉRTIL",
    },
    {
      nombre: "Unidad Operativa Republica del libano",
      telefonos: "N/A",
      dependenciaLetra: "Unidad Operativa Republica del libano",
      domicilio: "Unidad Operativa Republica del libano",
      departamento: "CAPITAL",
    },
    {
      nombre: "Comisaria 5ta Sta Lucia",
      telefonos: "4-250040",
      dependenciaLetra: "COMISARIA QUINTA",
      domicilio: "COMISARIA QUINTA STA LUCIA",
      departamento: "SANTA LUCIA",
    },
    {
      nombre: "Cuerpo De Prevención y Seguridad Ciudadana",
      telefonos: "4274679",
      dependenciaLetra: "Cuerpo De Prevención y Seguridad Ciudadana",
      domicilio: "B° Clemente Sarmiento Capital",
      departamento: "SARMIENTO",
    },
    {
      nombre: "Comisaria 36ta",
      telefonos: "02644845346",
      dependenciaLetra: "Comisaria Trigésimo Sexta",
      domicilio: "c/Balmaceda y Progreso Rawson",
      departamento: "RAWSON",
    },
    {
      nombre: "MOTORIZADA N° 4",
      telefonos: "4333927",
      dependenciaLetra: "MOTORIZADA N° 4",
      domicilio: "Av Libertador y Soldado Argentino Rivadavia",
      departamento: "RIVADAVIA",
    },
    {
      nombre: "Comisaria 25ta Rawson",
      telefonos: "4-341720",
      dependenciaLetra: "COMISARIA VIGÉSIMO QUINTA",
      domicilio: "COMISARIA VIGÉSIMO QUINTA RAWSON",
      departamento: "RAWSON",
    },
    {
      nombre: "Comisaria 18va Albardon",
      telefonos: "4-911024",
      dependenciaLetra: "COMISARIA DECIMOCTAVA",
      domicilio: "COMISARIA DECIMOCTAVA ALBARDON",
      departamento: "ALBARDON",
    },
  ],
};
