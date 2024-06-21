import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { StyleDictionary, TDocumentDefinitions } from '../components/reports/interfaces/pdfmake';
import { headerSection, bodySection } from '../components/reports/sections/index';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const style = {
  title: {
    decoration: 'underline',
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
  body: {
    margin: [0, 0, 0, 50],
    alignment: 'justify',
  },
};

export const useViewPdf = () => {
  const generatePdf = async () => {
      const header = await headerSection();
      const body = bodySection();

      const docDefinition = {
          styles: style,
          content: [
            header,
            { text: 'ACTA DE INICIO', style: 'title' },
            body,
          ],
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.open();
  };

  return {
      generatePdf
  };
};