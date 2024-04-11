export const ProductService = {


    getProductsWithOrdersData() {
        return [
            {
                id: '1000',
                nroLegajo: '1034/2024',
                fechaCreacion: '20/10/2023',
                nombreActuacion: 'UFI - DELITOS CONTRA LA PROPIEDAD POR DENUNCIA',
                causaCaratula:'Hurto Simple',
                juzgado: 'UFI N°EN TURNO',
                statusActuacion: 'EN CURSO',
                afectados: [
                    {
                        id: '1000-1',
                        nombre: 'Ana María',
                        apellido: 'González',
                        documento: 251623012,
                        telefono: 37046047,
                        tipo: 'Denunciante y Damnificado'
                    },
                    {
                        id: '1000-2',
                        nombre: 'Roberto',
                        apellido: 'López',
                        documento: 289561232,
                        telefono: 37046048,
                        tipo: 'Denunciante'
                    },
                    {
                        id: '1000-3',
                        nombre: 'Luisa',
                        apellido: 'Martínez',
                        documento: 227856342,
                        telefono: 37046049,
                        tipo: 'Damnificado'
                    }
                ],
                vinculados:[
                    {
                        id: '1000-10',
                        nombre: 'Gabriela',
                        apellido: 'Morales',
                        documento: 264890456,
                        telefono: 37046056,
                        tipo: 'Acusado',
                        apodo: 'La Gata'
                    },
                    {
                        id: '1000-11',
                        nombre: 'Jorge',
                        apellido: 'Sánchez',
                        documento: 278901234,
                        telefono: 37046057,
                        tipo: 'Detenido',
                        apodo: 'El Rápido'
                    }
                ],
                fechaUbicacion:[
                    {
                        "desdeFechaHora":"08/04/2023 12:15:22",
                        "hastaFechaHora":"08/04/2023 12:20:00",
                        "calle":"Belgrano",
                        "numero":"678",
                        "departamento":"Jáchal"
                    }
                ],
                efectos:[
                    {
                        "categoria": "Vehiculos",
                        "marca": "Rockrider",
                        "modelo": "Blazer",
                        "subcategoria": "Moto",
                        "tipo": "Competicion"
                    },
                    {
                        "categoria": "Electrónica",
                        "marca": "Samsung",
                        "modelo": "Galaxy S21",
                        "subcategoria": "Móvil",
                        "tipo": "Smartphone"
                    },
                    {
                        "categoria": "Indumentaria",
                        "marca": "Nike",
                        "modelo": "Air Max",
                        "subcategoria": "Calzado",
                        "tipo": "Deportivo"
                    }
                ],
                intervinientes:[
                    {
                    "apellido":"Perez",
                    "nombre":"David",
                    "jerarquia":"Cabo Primero",
                    "dependencia":"Comisaria 16ta Calingasta"
                    },
                    {
                    "apellido":"Gonzalez",
                    "nombre":"Javier Alejandro",
                    "jerarquia":"Sargento Primero",
                    "dependencia":"Unidad Fiscal ANIVI"
                    },
                    {
                    "apellido":"Lansini",
                    "nombre":"Lorena",
                    "jerarquia":"Oficial Principal",
                    "dependencia":"Unidad Op. de Prevencion Barreal"
                    }
                ]

            },
            {
                id: '1001',
                nroLegajo: '1035/2024',
                fechaCreacion: '20/11/2023',
                nombreActuacion: 'CONTRAVENCIONAL OFICIO',
                juzgado: 'JUZGADO DE FALTAS DE TERCERA NOMINACIÓN',
                causaCaratula: '113º Actos turbatorios y desórdenes, 117º Ofensas a la moral pública, 118º Escándalo público',
                statusActuacion: 'EN CURSO',
                afectados: [
                    {
                        id: '1000-4',
                        nombre: 'Carlos',
                        apellido: 'Navarro',
                        documento: 302561940,
                        telefono: 37046050,
                        tipo: 'Damnificado'
                    },
                    {
                        id: '1000-5',
                        nombre: 'Elena',
                        apellido: 'Ruiz',
                        documento: 212345678,
                        telefono: 37046051,
                        tipo: 'Denunciante y Damnificado'
                    },
                    {
                        id: '1000-6',
                        nombre: 'Diego',
                        apellido: 'Torres',
                        documento: 298765432,
                        telefono: 37046052,
                        tipo: 'Denunciante'
                    }
                ],
                vinculados:[
                    {
                        id: '1000-12',
                        nombre: 'Lucía',
                        apellido: 'Díaz',
                        documento: 289076543,
                        telefono: 37046058,
                        tipo: 'Acusado',
                        apodo: 'El Rayo'
                    },
                    {
                        id: '1000-13',
                        nombre: 'Miguel',
                        apellido: 'García',
                        documento: 297654321,
                        telefono: 37046059,
                        tipo: 'Detenido',
                        apodo: 'Norteño'
                    },
                    {
                        id: '1000-14',
                        nombre: 'Fernanda',
                        apellido: 'López',
                        documento: 300112233,
                        telefono: 37046060,
                        tipo: 'Acusado',
                        apodo: 'La Maestra'
                    }
                    
                ],
                fechaUbicacion:[
                    {
                        "desdeFechaHora": "09/04/2023 14:30:00",
                        "hastaFechaHora": "09/04/2023 14:45:00",
                        "calle": "Libertador",
                        "numero": "1345",
                        "departamento": "Rivadavia"
                    }
                    
                ],
                efectos:[
                    {
                        "categoria": "Instrumentos Musicales",
                        "marca": "Fender",
                        "modelo": "Stratocaster",
                        "subcategoria": "Guitarra",
                        "tipo": "Eléctrica"
                    } 
                ],
                intervinientes:[
                    {
                        "apellido": "Martinez",
                        "nombre": "Carlos",
                        "jerarquia": "Cabo Primero",
                        "dependencia": "Seccional 5ta Rivadavia"
                    },
                    {
                        "apellido": "Rodriguez",
                        "nombre": "Mariana",
                        "jerarquia": "Oficial Principal",
                        "dependencia": "Dirección de Investigaciones"
                    }
                ]
                
            },
            {
                id: '1002',
                nroLegajo: '1036/2024',
                fechaCreacion: '20/12/2023',
                nombreActuacion: 'HURTO CALIFICADO',
                causaCaratula: 'UFI N°EN TURNO',
                juzgado: 'COMISARIA VIGESIMOCTAVA',
                statusActuacion: 'FINALIZADA',
                afectados: [
                    {id: '1000-13',
                    nombre: 'Miguel',
                    apellido: 'García',
                    documento: 297654321,
                    telefono: 37046059,
                    tipo: 'Detenido',
                    apodo: 'Norteño'}
                ],
                vinculados:[
                    {
                        id: '1000-15',
                        nombre: 'Carlos',
                        apellido: 'Vega',
                        documento: 312345678,
                        telefono: 37046061,
                        tipo: 'Detenido',
                        apodo: 'El Silencioso'
                    }
                ],
                fechaUbicacion:[
                    {
                        "desdeFechaHora": "10/04/2023 10:00:00",
                        "hastaFechaHora": "10/04/2023 11:00:00",
                        "calle": "Avenida Ignacio de la Roza",
                        "numero": "850",
                        "departamento": "Santa Lucía"
                    }
                ],
                efectos:[
                    {
                        "categoria": "Librería",
                        "marca": "Moleskine",
                        "modelo": "Classic Notebook",
                        "subcategoria": "Cuaderno",
                        "tipo": "Anillado"
                    },
                    {
                        "categoria": "Tecnología",
                        "marca": "Apple",
                        "modelo": "iPhone 13",
                        "subcategoria": "Celular",
                        "tipo": "Smartphone"
                    },
                    {
                        "categoria": "Hogar",
                        "marca": "Philips",
                        "modelo": "Series 3200",
                        "subcategoria": "Cafetera",
                        "tipo": "Automática"
                    },
                    {
                        "categoria": "Juegos",
                        "marca": "Nintendo",
                        "modelo": "Switch",
                        "subcategoria": "Consola",
                        "tipo": "Portátil"
                    }
                ],
                intervinientes:[
                    {
                        "apellido": "Fernandez",
                        "nombre": "Roberto",
                        "jerarquia": "Sargento Primero",
                        "dependencia": "Jefatura de Policía de San Juan"
                    },
                    {
                        "apellido": "Ruiz",
                        "nombre": "Patricia",
                        "jerarquia": "Cabo Primero",
                        "dependencia": "Comisaría 2da Chimbas"
                    },
                    {
                        "apellido": "Silva",
                        "nombre": "Eduardo",
                        "jerarquia": "Oficial Principal",
                        "dependencia": "División de Operaciones Especiales"
                    }
                ]
                        
            },
            {
                id: '1003',
                nroLegajo: '1037/2024',
                fechaCreacion: '05/03/2024',
                nombreActuacion: 'PREVENCIONAL DENUNCIA',
                juzgado: 'PRIMER JUZGADO PENAL DE NIÑEZ Y ADOLESCENCIA',
                causaCaratula: 'ROBO ARREBATO',
                statusActuacion: 'FINALIZADA',
                afectados: [
                    {
                        id: '1000-7',
                        nombre: 'Marta',
                        apellido: 'Fernández',
                        documento: 267890321,
                        telefono: 37046053,
                        tipo: 'Denunciante y Damnificado'
                    },
                    {
                        id: '1000-8',
                        nombre: 'Sergio',
                        apellido: 'Ramírez',
                        documento: 234567890,
                        telefono: 37046054,
                        tipo: 'Damnificado'
                    }
                    
                ],
                vinculados:[
                    {
                        id: '1000-16',
                        nombre: 'Isabel',
                        apellido: 'Quintana',
                        documento: 325678901,
                        telefono: 37046062,
                        tipo: 'Acusado',
                        apodo: 'La Sombra'
                    },
                    {
                        id: '1000-17',
                        nombre: 'Antonio',
                        apellido: 'Miranda',
                        documento: 334567890,
                        telefono: 37046063,
                        tipo: 'Detenido',
                        apodo: 'El Fantasma'
                    },
                    {
                        id: '1000-18',
                        nombre: 'Julia',
                        apellido: 'Campos',
                        documento: 343678901,
                        telefono: 37046064,
                        tipo: 'Acusado',
                        apodo: 'Centella'
                    },
                    {
                        id: '1000-19',
                        nombre: 'Eduardo',
                        apellido: 'Rojas',
                        documento: 352789012,
                        telefono: 37046065,
                        tipo: 'Detenido',
                        apodo: 'El Mudo'
                    }
                    
                ],
                fechaUbicacion:[
                    {
                        "desdeFechaHora": "11/04/2023 08:30:00",
                        "hastaFechaHora": "11/04/2023 09:15:00",
                        "calle": "Avenida Circunvalación",
                        "numero": "1500",
                        "departamento": "Rawson"
                    }
                ],
                efectos:[],
                intervinientes:[
                    {
                        "apellido": "Molina",
                        "nombre": "Lucía",
                        "jerarquia": "Sargento Primero",
                        "dependencia": "Departamento de Seguridad Personal"
                    },
                    {
                        "apellido": "Torres",
                        "nombre": "Diego",
                        "jerarquia": "Cabo Primero",
                        "dependencia": "Comisaría 4ta Pocito"
                    }
                ]
                
            },
            {
                id: '1004',
                nroLegajo: '1038/2024',
                fechaCreacion: '20/01/2024',
                nombreActuacion: 'PREVENCIONAL DENUNCIA',
                juzgado: 'QUINTO JUZGADO DE INSTRUCCION',
                causaCaratula: 'DAÑO',
                statusActuacion: 'VENCIDA',
                afectados: [
                    {
                        id: '1000-9',
                        nombre: 'Carmen',
                        apellido: 'Reyes',
                        documento: 255678345,
                        telefono: 37046055,
                        tipo: 'Denunciante'
                    }
                ],
                vinculados:[
                    {
                        id: '1000-20',
                        nombre: 'Beatriz',
                        apellido: 'Hernández',
                        documento: 361890123,
                        telefono: 37046066,
                        tipo: 'Acusado',
                        apodo: 'La Intrépida'
                    },
                    {
                        id: '1000-21',
                        nombre: 'Ricardo',
                        apellido: 'Martínez',
                        documento: 370901234,
                        telefono: 37046067,
                        tipo: 'Detenido',
                        apodo: 'El Tintero'
                    }
                    
                ],
                fechaUbicacion:[
                    {
                        "desdeFechaHora": "12/04/2023 16:00:00",
                        "hastaFechaHora": "12/04/2023 16:45:00",
                        "calle": "Mendoza",
                        "numero": "204",
                        "departamento": "Chimbas"
                    }
                ],
                efectos:[
                    {
                        "categoria": "Fotografía",
                        "marca": "Canon",
                        "modelo": "EOS 5D Mark IV",
                        "subcategoria": "Cámara",
                        "tipo": "DSLR"
                    },
                    {
                        "categoria": "Bicicletas",
                        "marca": "Trek",
                        "modelo": "Marlin 7",
                        "subcategoria": "Montaña",
                        "tipo": "Trail"
                    }
                ],
                intervinientes:[
                    {
                        "apellido": "Ramirez",
                        "nombre": "Sofía",
                        "jerarquia": "Oficial Principal",
                        "dependencia": "Unidad de Investigaciones Fiscales"
                    },
                    {
                        "apellido": "Lopez",
                        "nombre": "Miguel",
                        "jerarquia": "Sargento Primero",
                        "dependencia": "Dirección General de Drogas Ilícitas"
                    }
                ]
 
            }
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 5));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 10));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },

    getProductsWithOrdersSmall() {
        return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
    },

    getProductsWithOrders() {
        return Promise.resolve(this.getProductsWithOrdersData());
    }
};

