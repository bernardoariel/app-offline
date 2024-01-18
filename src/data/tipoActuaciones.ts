import type { TipoActuaciones } from "@/interfaces/tipoActuaciones.interface";

export const actuaciones:TipoActuaciones  = {

    "sumario-denuncia":{
        titulo: 'Sumario por Denuncia',
        tituloAlternativo: 'Prevencional Denuncia',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Denunciante y Damnificado', 'Denunciante', 'Damnificado' ]
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor": [ 'Acusado','Detenido' ],
            } ,
            "fecha":"Fecha, Hora y Ubicacion",
            "efectos": {
                "titulo" : "Vinculados",
                "valor": [ 'Denunciado','Recuperado','Secuestrado' ],
            }
        }
    },
    "sumario-oficio":{
        titulo: 'Sumario por Oficio',
        tituloAlternativo: 'Prevencional Oficio',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Denunciante y Damnificado', 'Denunciante', 'Damnificado', 'Orden Público' ],
            },
            "fecha":"Fecha, Hora y Ubicacion",
            "vinculados":{
                "titulo" : "Vinculados",
                "valor": [ 'Acusado','Detenido' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor": [ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente": "Personal Interviniente"
        }
    },
    "expediente-denuncia":{
        titulo: 'Expediente por Denuncia',
        tituloAlternativo: 'Contravencional Denuncia',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Denunciante y Damnificado', 'Denunciante', 'Damnificado' ],
            },
            "fecha":"Fecha, Hora y Ubicacion",
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Acusado','Detenido' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            } 
        }
    },
    "expediente-oficio":{
        titulo: 'Expediente por Oficio',
        tituloAlternativo: 'Contravencional Oficial',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Denunciante y Damnificado', 'Denunciante', 'Damnificado' ,'Orden Público' ],
            },
            "fecha":"Fecha, Hora y Ubicacion",
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Acusado','Detenido' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente": "Personal Interviniente"
        }
    },
}