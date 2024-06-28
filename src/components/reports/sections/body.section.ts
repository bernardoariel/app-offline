import { ref, watch } from 'vue';
import useDatosDiligencia from '../../../composables/useDatosDiligencia';

// Asume que 'sumario-denuncia' es el valor que quieres pasar a `useDatosDiligencia`
const actuacion = ref('sumario-denuncia');
const {
  processedText,
  primeradiligencia,
  processedHeaderText,
  isEditingHeader,
  headerContainer,
  headerTextComputed,
  footerContainer,
  processedFooterText,
  relato,
  footerText
} = useDatosDiligencia(actuacion);



// Exported function to get the body section
export const bodySection = () => {
  const head = headerContainer.value || processedHeaderText.value
  const body = relato.value
  const foot = footerContainer.value || processedFooterText.value

  return {
    text: head + ' ' + body + ' ' + foot,
    style: 'body',
  };
};
