// useDatosDiligencia.ts
import { diligencias } from '@/data/datosDiligencia';
import { computed, ref } from 'vue';
import useItem from '@/composables/useItems';
import type { DatosLegales } from '@/interfaces/datosLegales.interface';
import { getTitleCase, getUpperCase } from '@/helpers/stringUtils';
import { getAge } from '@/helpers/getAge';
import useNewActuacion from './useNewActuacion';

interface ProcessedText {
  header: string;
  footer: string;
}

const { isEditedHeader, isEditedFooter } = useNewActuacion()
const relato = ref<string>('')
const headerContainer = ref<string>('')
const footerContainer = ref<string>('')

const useDatosDiligencia = (actuacion: ref<string>) => {
  console.log('actuacion::: ', actuacion);

  const { afectados, intervinientes } = useItem();

  const isEditingHeader = ref<boolean>(false);
  const isEditingFooter = ref<boolean>(false);

  const diligenciaSeleccionada = computed(() => {
    return diligencias.find((d: DatosLegales) => d.id === actuacion.value);
  });

  const getStyle = (value: string): string => {
    return `<span class="text-primary font-medium"><i>${value}</i></span>`;
  };

  const processedAfectados = computed(() => {
    return afectados.value.map((a, index) => {
      const isLast = index === afectados.value.length - 1;
      const separator = isLast ? '.' : ',';
      const apellidoNombre = getUpperCase(a.apellido) + ', ' + getTitleCase(a.nombre);
      const documento = 'con ' + a.typeDocumento + ' Nº ' + String(a.nroDocumento);
      const nacionalidad = 'de nacionalidad ' + a.nacionalidad;
      const edad = 'de ' + getAge(a.fecha) + ' años de edad.';
      const instruccion = a.instruccion + ',';
      const profesion = 'de profesion ' + a.profesion + ',';
      const domicilio = 'con domicilio en ' + a.domicilioResidencia;
      return `${getStyle(apellidoNombre)} ${getStyle(documento)} ${getStyle(nacionalidad)} ${getStyle(edad)} ${getStyle(instruccion)} ${getStyle(profesion)} ${getStyle(domicilio, isLast)}`;
    }).join(' ');
  });

  const processedIntervinientes = computed(() => {
    return intervinientes.value.map((item, index) => {
      const isLast = index === intervinientes.value.length - 1;
      const separator = isLast ? '.' : ',';

      return `${getStyle(getTitleCase(item.jerarquia) + ' ' + getUpperCase(item.apellido) + + ' ' + getTitleCase(item.nombre))}
        ${getStyle(' adscripto/s a numerario de  ' + item.dependencia)}${separator}`

    }).join(' ');

  });

  const processedText = computed<ProcessedText>(() => {
    let header = '';
    let footer = '';

    if (diligenciaSeleccionada.value) {
      header = diligenciaSeleccionada.value.header
        .replace('@dependencia', getStyle('SUB COMISARIA E3'))
        .replace('@departamento', getStyle('RAWSON'))
        .replace('@fechaactuacion', getStyle('a los 22 días del mes de Marzo del año Dos Mil Veinticuatro, siendo las 12:44 horas'))
        .replace('@afectados', processedAfectados.value)
        .replace('@intervinientes', processedIntervinientes.value);

      footer = diligenciaSeleccionada.value.footer;

      // Reemplazar palabras claves con estilos especiales
      ['HACE CONSTAR', 'DISPONE', 'CERTIFICO', 'CERTIFICA', 'DECLARO'].forEach((word) => {
        const replacement = `<span style="font-weight: bold; text-decoration: underline;">${word}</span>`;
        header = header.replace(new RegExp(word, 'g'), replacement);
        footer = footer.replace(new RegExp(word, 'g'), replacement);
      });
    }

    return { header, footer };
  });

  const editableHeader = computed(() => processedText.value.header);

  const processedHeaderText = computed(() => {
    return processedText.value.header.replace(/<\/?[^>]+(>|$)/g, "");
  });
  const processedFooterText = computed(() => {
    return processedText.value.footer.replace(/<\/?[^>]+(>|$)/g, "");
  });
  const headerTextComputed = computed({
    get() {

      console.log('isEditingHeader.value::: ', isEditingHeader.value);
      return isEditingHeader.value ? headerContainer.value : processedHeaderText.value;
    },
    set(newValue) {
      console.log('newValue::: ', newValue, isEditedHeader.value);
      // Directamente actualiza headerContainer con lo que se edite en el textarea
      headerContainer.value = newValue;
    }
  });
  const footerTextComputed = computed({
    get() {

      console.log('isEditingFooter.value::: ', isEditingFooter.value);
      return isEditingFooter.value ? footerContainer.value : processedFooterText.value;
    },
    set(newValue) {
      console.log('newValue::: ', newValue, isEditedFooter.value);
      // Directamente actualiza footerContainer con lo que se edite en el textarea
      footerContainer.value = newValue;
    }
  });
  return {
    processedText,
    processedAfectados,
    processedIntervinientes,
    primeradiligencia: diligenciaSeleccionada.value, // Asignación de la propiedad primeradiligencia
    processedHeaderText,
    isEditingHeader,
    headerContainer,
    headerTextComputed,
    processedFooterText,
    isEditingFooter,
    footerContainer,
    footerTextComputed,
    relato,
    footerText: computed(() => processedText.value.footer)
  };
};

export default useDatosDiligencia;