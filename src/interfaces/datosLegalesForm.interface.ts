interface PrimaryAttributes {
  id?: string;
  nroLegajo: string;
}

export interface DatosLegalesForm extends PrimaryAttributes {
  selectYear: { name: string };
  selectSitio: { name: string };
  selectModusOperandi?: { name: string } | null;
  selectCausaCaratula?: { name: string } | null;
  opcionesCausaCaratula?: string[] | null;
  selectJuzgadoInterviniente?: { name: string } | null;
  selectArticulo?: { name: string } | null;
  selectDelito?: { name: string } | null;
  selectUfiNro?: { name: string } | null;
  selectAyudanteFiscal?: { name: string } | null;
  selectFiscalCargo?: { name: string } | null;
}

export interface DatosLegales extends PrimaryAttributes {
  selectYear: string;
  selectSitio: string;
  selectModusOperandi?: string | null;
  selectCausaCaratula?: string | null;
  opcionesCausaCaratula?: string[] | null;
  selectJuzgadoInterviniente?: string | null;
  selectArticulo?: string | null;
  selectDelito?: string | null;
  selectUfiNro?: string | null;
  selectAyudanteFiscal?: string | null;
  selectFiscalCargo?: string | null;
}

export interface DatosLegalesDiligencia {
  id: string;
  titulo: string;
  header: string;
  footer: string;
}
