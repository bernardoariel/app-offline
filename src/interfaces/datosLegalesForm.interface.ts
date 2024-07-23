interface PrimaryAttributes {
    id?: string,
    nroLegajo: string
}

export interface DatosLegalesForm extends PrimaryAttributes {
    selectYear: { name: string },
    selectSitio: { name: string },
    selectModusOperandi: { name: string },
    selectCausaCaratula: { name: string },
    opcionesCausaCaratula: string[],
    selectJuzgadoInterviniente: { name: string },
}

export interface DatosLegales extends PrimaryAttributes {
    selectYear: string;
    selectSitio: string;
    selectModusOperandi: string;
    selectCausaCaratula: string;
    opcionesCausaCaratula: string[];
    selectJuzgadoInterviniente: string;
}