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
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor": [ 'Acusado','Detenido' ],
            },
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
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor": [ 'Acusado','Detenido' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor": [ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
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
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
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
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Acusado','Detenido' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-flagrancia":{
        titulo: 'UFI - FLAGRANCIA',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION FLAGRANCIA',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Víctima','Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Aprehendido','Acusado' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-cavig":{
        titulo: 'UFI - CAVIG',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION CAVIG',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Víctima','Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Aprehendido','Acusado' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-anivi":{
        titulo: 'UFI - ANIVI',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION ANIVI',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Víctima','Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Aprehendido','Acusado' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-generica-denuncia":{
        titulo: 'UFI - DELITOS GENÉRICOS POR DENUNCIA',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACIÓN DELITOS GENÉRICOS POR DENUNCIA',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Víctima','Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Aprehendido','Acusado' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            },            
        }
    },
    "ufi-generica-oficio":{
        titulo: 'UFI - DELITOS GENÉRICOS POR OFICIO',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACIÓN DELITOS GENÉRICOS POR OFICIO',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Víctima','Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Aprehendido','Acusado' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-informatica-denuncia":{
        titulo: 'UFI - DELITOS INFORMÁTICOS Y ESTAFAS POR DENUNCIA',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACIÓN DELITOS INFORMÁTICOS Y ESTAFAS POR DENUNCIA',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Víctima','Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Aprehendido','Acusado' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            }
        }
    },
    "ufi-informatica-oficio":{
        titulo: 'UFI - DELITOS INFORMÁTICOS Y ESTAFAS POR OFICIO',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACIÓN DELITOS INFORMÁTICOS Y ESTAFAS POR OFICIO',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Víctima','Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Aprehendido','Acusado' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-propiedad-denuncia":{
        titulo: 'UFI - DELITOS CONTRA LA PROPIEDAD POR DENUNCIA',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACIÓN DELITOS CONTRA LA PROPIEDAD POR DENUNCIA',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Víctima','Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Aprehendido','Acusado' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            }
        }
    },
    "ufi-establecer-paradero":{
        titulo: 'UFI - ESTABLECER PARADERO',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E ESTABLECER PARADERO',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Denunciante' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Extraviado' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Secuestrado' ],
            }
        }
    },
    "ufi-emergencias-medicas":{
        titulo: 'UFI - EMERGENCIAS MÉDICAS',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E EMERGENCIAS MEDICAS',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Fallecido' , 'Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },            
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },        
        }
    },
    "ufi-siniestro-vial":{
        titulo: 'UFI - SINIESTRO VIAL',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E SINIESTRO VIAL',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Fallecido' , 'Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },            
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Aprehendido' , 'Acusado' ],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-suicidio":{
        titulo: 'UFI - AHORCAMIENTO O SUICIDIO',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E AHORCAMIENTO O SUICIDIO',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Fallecido' , 'Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-incendio-vivienda":{
        titulo: 'UFI - INCENDIO EN VIVIENDA',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E INCENDIO EN VIVIENDA',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Fallecido' , 'Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-intoxicacion":{
        titulo: 'UFI - INTOXICACIÓN',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E INTOXICACION',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Fallecido' , 'Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-incendio-vivienda":{
        titulo: 'ACTUACIONES PRELIMINARES - INCENDIO EN VIVIENDA',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR INCENDIO EN VIVIENDA',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Denunciante y Damnificado' , 'Denunciante' , 'Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },            
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Acusado' , 'Detenido'],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-establecer-procedencia":{
        titulo: 'ACTUACIONES PRELIMINARES - ESTABLECER PROCEDENCIA',
        tituloAlternativo: 'ACTUACION PRELIMINAR PARA ESTABLECER PROCEDENCIAS',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Denunciante' , 'Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },            
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Acusado' , 'Detenido'],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-fuga-menor":{
        titulo: 'ACTUACIONES PRELIMINARES - FUGA DE MENOR',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR FUGA DE MENOR',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Denunciante' , 'Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Acusado' , 'Detenido'],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado','Recuperado','Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-siniestro-vial":{
        titulo: 'ACTUACIONES PRELIMINARES - SINIESTRO VIAL',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR SINIESTRO VIAL',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Protagonista' , 'Acompañante' , 'Peatón'],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },            
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado' , 'Recuperado' , 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-caida-casual":{
        titulo: 'ACTUACIONES PRELIMINARES - CAÍDA CASUAL',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR CAIDA CASUAL',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Protagonista' , 'Acompañante' , 'Peatón'],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado' , 'Recuperado' , 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-incendio-automotor":{
        titulo: 'ACTUACIONES PRELIMINARES - INCENDIO DE AUTOMOTOR',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR INCENDIO DE AUTOMOTOR',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Protagonista' , 'Acompañante' , 'Damnificado'],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado' , 'Recuperado' , 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-suicidio":{
        titulo: 'ACTUACIONES PRELIMINARES - TENTATIVA DE SUICIDIO',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR TENTATIVA DE SUICIDIO',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Denunciante y Damnificado' , 'Denunciante' , 'Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Autolesionado'],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado' , 'Recuperado' , 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-otros":{
        titulo: 'ACTUACIONES PRELIMINARES - OTROS',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR CHOQUE',
        "tarjetas":{
            "afectados":{
                "titulo" : "Afectados",
                "valor": [ 'Denunciante y Damnificado' , 'Denunciante' , 'Damnificado' ],
            },
            "fecha":{
                "titulo":"Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados":{
                "titulo" : "Vinculados",
                "valor":[ 'Acusado y/o Detenido' , 'Acusado'],
            },
            "efectos":{
                "titulo":"Efectos",
                "valor":[ 'Denunciado' , 'Recuperado' , 'Secuestrado' ],
            },
            "personalInterviniente":{
                "titulo":"Personal Interviniente",
                "valor": null,
            },
        }
    }
}