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
  relato,
  footerText
} = useDatosDiligencia(actuacion);



// Exported function to get the body section
export const bodySection = () => {
  const head = headerContainer.value;
  const body = relato.value
  const foot = footerText.value.replace(/<\/?[^>]+(>|$)/g, "");


  return {
    text: head + ' ' + body + ' ' + foot,
    style: 'body',
  };
};
