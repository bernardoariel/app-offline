import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { customFonts } from '../components/reports/fonts/customFonts.ts';
import type { StyleDictionary, TDocumentDefinitions } from '../components/reports/interfaces/pdfmake';
import { headerSection, bodySection } from '../components/reports/sections/index';
import { ref } from 'vue';
import { usePdfState } from './usePdfState';

// Register custom fonts with pdfMake
pdfMake.vfs = {
  ...pdfMake.vfs,
  ...customFonts,
};

const pdfUrl = ref('');
const { setPdfView } = usePdfState();

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
    margin: [0, 20, 0, 10],
  },
  body: {
    fontSize: 12,
    font: 'TimesNewRoman',
    alignment: 'justify',
  },
};

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
        pageMargins: [40, 60, 40, 60] 
      };

      pdfMake.createPdf(docDefinition, null, fonts).getBlob((blob) => {
        const url = URL.createObjectURL(blob);
        pdfUrl.value = url;
        setPdfView(true);  // Set to true after PDF is generated
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return {
    generatePdf,
    pdfUrl,
  };
};
