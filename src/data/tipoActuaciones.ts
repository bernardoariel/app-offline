import type { TipoActuaciones } from "@/interfaces/tipoActuaciones.interface";

export const actuaciones: TipoActuaciones = {

    "sumario-denuncia": {
        titulo: 'Sumario por Denuncia',
        tituloAlternativo: 'Prevencional Denuncia',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante y Damnificado', 'Denunciante', 'Damnificado']
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Acusado', 'Detenido'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            }
        }
    },
    "sumario-oficio": {
        titulo: 'Sumario por Oficio',
        tituloAlternativo: 'Prevencional Oficio',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante y Damnificado', 'Denunciante', 'Damnificado', 'Orden Público'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Acusado', 'Detenido'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "expediente-denuncia": {
        titulo: 'Expediente por Denuncia',
        tituloAlternativo: 'Contravencional Denuncia',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante y Damnificado', 'Denunciante', 'Damnificado'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Acusado', 'Detenido'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            }
        }
    },
    "expediente-oficio": {
        titulo: 'Expediente por Oficio',
        tituloAlternativo: 'Contravencional Oficial',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante y Damnificado', 'Denunciante', 'Damnificado', 'Orden Público'],
                "ordenPublico": "default"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Acusado', 'Detenido'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-flagrancia": {
        titulo: 'UFI - FLAGRANCIA',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION FLAGRANCIA',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Aprehendido', 'Acusado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-cavig": {
        titulo: 'UFI - CAVIG',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION CAVIG',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Aprehendido', 'Acusado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-anivi": {
        titulo: 'UFI - ANIVI',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION ANIVI',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Aprehendido', 'Acusado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-generica-denuncia": {
        titulo: 'UFI - DELITOS GENÉRICOS POR DENUNCIA',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACIÓN DELITOS GENÉRICOS POR DENUNCIA',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante', 'Damnificado'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Aprehendido', 'Acusado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
        }
    },
    "ufi-generica-oficio": {
        titulo: 'UFI - DELITOS GENÉRICOS POR OFICIO',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACIÓN DELITOS GENÉRICOS POR OFICIO',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Aprehendido', 'Acusado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-informatica-denuncia": {
        titulo: 'UFI - DELITOS INFORMÁTICOS Y ESTAFAS POR DENUNCIA',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACIÓN DELITOS INFORMÁTICOS Y ESTAFAS POR DENUNCIA',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Aprehendido', 'Acusado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            }
        }
    },
    "ufi-informatica-oficio": {
        titulo: 'UFI - DELITOS INFORMÁTICOS Y ESTAFAS POR OFICIO',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACIÓN DELITOS INFORMÁTICOS Y ESTAFAS POR OFICIO',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Aprehendido', 'Acusado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-propiedad-denuncia": {
        titulo: 'UFI - DELITOS CONTRA LA PROPIEDAD POR DENUNCIA',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACIÓN DELITOS CONTRA LA PROPIEDAD POR DENUNCIA',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante', 'Damnificado'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Aprehendido', 'Acusado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            }
        }
    },
    "ufi-delitos-especiales-paradero":{
        titulo: 'UFI - ESTABLECER PARADERO',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E ESTABLECER PARADERO',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Extraviado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Secuestrado'],
            }
        }
    },
    "ufi-delitos-especiales-médicas":{
        titulo: 'UFI - EMERGENCIAS MÉDICAS',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E EMERGENCIAS MEDICAS',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Fallecido', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-delitos-especiales-vial":{
        titulo: 'UFI - SINIESTRO VIAL',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E SINIESTRO VIAL',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Fallecido', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Aprehendido', 'Acusado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-delitos-especiales-ahorcamiento-suicidio":{
        titulo: 'UFI - AHORCAMIENTO O SUICIDIO',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E AHORCAMIENTO O SUICIDIO',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Fallecido', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-delitos-especiales-incendio-vivienda":{
        titulo: 'UFI - INCENDIO EN VIVIENDA',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E INCENDIO EN VIVIENDA',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Fallecido', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "ufi-delitos-especiales-intoxicación":{
        titulo: 'UFI - INTOXICACIÓN',
        tituloAlternativo: 'UNIDADES FISCALES DE INVESTIGACION D.E INTOXICACION',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Fallecido', 'Damnificado'],
                "ordenPublico": "check"
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-incendio-vivienda": {
        titulo: 'ACTUACIONES PRELIMINARES - INCENDIO EN VIVIENDA',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR INCENDIO EN VIVIENDA',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante y Damnificado', 'Denunciante', 'Damnificado'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Acusado', 'Detenido'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-procendencia":{
        titulo: 'ACTUACIONES PRELIMINARES - ESTABLECER PROCEDENCIA',
        tituloAlternativo: 'ACTUACION PRELIMINAR PARA ESTABLECER PROCEDENCIAS',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante', 'Damnificado'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Acusado', 'Detenido'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-fuga":{
        titulo: 'ACTUACIONES PRELIMINARES - FUGA DE MENOR',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR FUGA DE MENOR',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante', 'Damnificado'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Acusado', 'Detenido'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-siniestro":{
        titulo: 'ACTUACIONES PRELIMINARES - SINIESTRO VIAL',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR SINIESTRO VIAL',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Protagonista', 'Acompañante', 'Peatón'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-caida":{
        titulo: 'ACTUACIONES PRELIMINARES - CAÍDA CASUAL',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR CAIDA CASUAL',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Protagonista', 'Acompañante', 'Peatón'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-incendio-automotor": {
        titulo: 'ACTUACIONES PRELIMINARES - INCENDIO DE AUTOMOTOR',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR INCENDIO DE AUTOMOTOR',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Protagonista', 'Acompañante', 'Damnificado'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-tentativa":{
        titulo: 'ACTUACIONES PRELIMINARES - TENTATIVA DE SUICIDIO',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR TENTATIVA DE SUICIDIO',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante y Damnificado', 'Denunciante', 'Damnificado'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Autolesionado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    },
    "preliminares-otros": {
        titulo: 'ACTUACIONES PRELIMINARES - OTROS',
        tituloAlternativo: 'ACTUACION PRELIMINAR POR CHOQUE',
        "tarjetas": {
            "afectados": {
                "titulo": "Afectados",
                "valor": ['Denunciante y Damnificado', 'Denunciante', 'Damnificado'],
            },
            "fecha": {
                "titulo": "Fecha, Hora y Ubicacion",
                "valor": null,
            },
            "vinculados": {
                "titulo": "Vinculados",
                "valor": ['Acusado y/o Detenido', 'Acusado'],
            },
            "efectos": {
                "titulo": "Efectos",
                "valor": ['Denunciado', 'Recuperado', 'Secuestrado'],
            },
            "personalInterviniente": {
                "titulo": "Personal Interviniente",
                "valor": null,
            },
        }
    }
}