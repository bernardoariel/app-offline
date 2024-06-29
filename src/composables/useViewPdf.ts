import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { customFonts } from '../components/reports/fonts/customFonts.ts';
import type { StyleDictionary, TDocumentDefinitions } from '../components/reports/interfaces/pdfmake';
import { headerSection, bodySection } from '../components/reports/sections/index';
import { ref } from 'vue';
import useSaveData from './useSaveData';

// Register custom fonts with pdfMake
pdfMake.vfs = {
  ...pdfMake.vfs,
  ...customFonts,
};

const pdfUrl = ref('');
const { fetchActuacionById } =useSaveData()
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
  const fetchBodyContent = async (id?: number) => {

    if (id) {
      const actuacion = await fetchActuacionById(id);
      return actuacion.viewPdf ? JSON.parse(actuacion.viewPdf) : bodySection().text;
    }
    
    return bodySection().text;
  
  };

  const generatePdf = async (id?:number) => {

    try {
      const header = await headerSection();
      const bodyContent = await fetchBodyContent(id);

      

      return new Promise((resolve) => {
        const docDefinition: TDocumentDefinitions = {
          content: [
            header,
            { text: 'ACTA DE INICIO', style: 'title' },
            { text: bodyContent, style: 'body' },
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
          resolve(url);
        });
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      return Promise.reject(error);
    }
  };

  return {
    generatePdf,
    pdfUrl,
  };
};
