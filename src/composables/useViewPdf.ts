import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { customFonts } from '../components/reports/fonts/customFonts.ts';
import type { StyleDictionary, TDocumentDefinitions } from '../components/reports/interfaces/pdfmake';
import { headerSection, bodySection } from '../components/reports/sections/index';

// Register custom fonts with pdfMake
pdfMake.vfs = {
  ...pdfMake.vfs,
  ...customFonts,
};

// Definir las fuentes
const fonts = {
  TimesNewRoman: {
    normal: 'Times-New-Roman.ttf',
    bold: 'Times-New-Roman-Bold.ttf',
    italics: 'Times-New-Roman-Italic.ttf',
    bolditalics: 'Times-New-Roman-BoldItalic.ttf',
  },
};

const style: StyleDictionary = {
  title: {
    fontSize: 16,
    decoration: 'underline',
    font: 'TimesNewRoman',
    bold: true,
    alignment: 'center',
  },
  body: {
    fontSize: 12,
    font: 'TimesNewRoman',
    alignment: 'justify',
  },
};

// Función para generar el PDF
export const useViewPdf = () => {
  const generatePdf = async () => {
    try {
      const header = await headerSection();
      const body = bodySection();

      const docDefinition: TDocumentDefinitions = {
        content: [
          header,
          { text: 'ACTA DE INICIO', style: 'title' },
          body,
        ],
        styles: style,
        defaultStyle: {
          font: 'TimesNewRoman',
        },
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition, null, fonts);
      pdfDocGenerator.open();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return {
    generatePdf,
  };
};
