// src/reports/interfaces/pdfmake.d.ts
declare module "pdfmake/build/pdfmake" {
  const pdfMake: any;
  export default pdfMake;
}

declare module "pdfmake/build/vfs_fonts" {
  const pdfFonts: any;
  export default pdfFonts;
}

// Define tipos básicos que necesitas
export interface Content {
  text?: string | any[];
  style?: string | string[];
  margin?: number | [number, number] | [number, number, number, number];
  image?: string;
  width?: number;
  height?: number;
  alignment?: string;
  columns?: Content[];
}

export interface StyleDictionary {
  [name: string]: any;
}

interface TDocumentDefinitions {
  content: Content | Content[];
  styles?: StyleDictionary;
  header?: Content | (() => Content);
  footer?: Content | (() => Content);
  pageMargins?: [number, number, number, number];
}
