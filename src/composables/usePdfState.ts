// usePdfState.ts
import { ref } from 'vue';

const checkedViewPdf = ref(false);

export const usePdfState = () => {
  const togglePdfView = () => {
    checkedViewPdf.value = !checkedViewPdf.value;
  };

  const setPdfView = (value: boolean) => {
    checkedViewPdf.value = value;
  };

  return {
    checkedViewPdf,
    togglePdfView,
    setPdfView,
  };
};
