// useDatosDiligencia.ts
import { diligencias } from '@/data/datosDiligencia';
import { computed, ref } from 'vue';
import useItem from '@/composables/useItems';
import type { DatosLegales } from '@/interfaces/datosLegales.interface';
import { getTitleCase, getUpperCase } from '@/helpers/stringUtils';
import { getAge } from '@/helpers/getAge';

interface ProcessedText {
  header: string;
  footer: string;
}



const useDatosDiligencia = (actuacion: Ref<string>) => {
  const { afectados, intervinientes } = useItem();
  
  const isEditingHeader = ref<boolean>(false);
  const isEditedHeader = ref<boolean>(false);
  const headerContainer = ref<string>('')
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
      
      return `${getStyle(getUpperCase(a.apellido) + ', '  + getTitleCase(a.nombre))}
        ${getStyle('con ' + a.typeDocumento + ' Nº ' + String(a.nroDocumento))}
        ${getStyle('de nacionalidad ' + a.nacionalidad)}
        ${getStyle('de ' + getAge(a.fecha) + ' años de edad. ')}
        ${getStyle(a.instruccion + ', ')} 
        ${getStyle('de profesion ' + a.profesion + ', ')} 
        ${getStyle('con domicilio en ' + a.domicilioResidencia)}${separator}`;
    }).join(' '); 
  });

  const processedIntervinientes = computed(() => {
    return intervinientes.value.map((item, index) => {
      const isLast = index === intervinientes.value.length - 1; 
      const separator = isLast ? '.' : ',';
      
      return `${getStyle(getTitleCase(item.jerarquia)+ ' ' + getUpperCase(item.apellido) + + ' ' + getTitleCase(item.nombre))}
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

  /* const changeEditar = (elemento: string): void => {
    if (elemento === 'header') isEditHeader.value = !isEditHeader.value;
  }; */
  const processedHeaderText = computed(() => {
    return processedText.value.header.replace(/<\/?[^>]+(>|$)/g, "");
  });
  const headerTextComputed = computed({
    get() {
     
      console.log('isEditingHeader.value::: ', isEditingHeader.value);
      return isEditingHeader.value ? headerContainer.value : processedHeaderText.value;
    },
    set(newValue) {
      console.log('newValue::: ', newValue,isEditedHeader.value);
      // Directamente actualiza headerContainer con lo que se edite en el textarea
       headerContainer.value = newValue;
    }
  });
  return {
    processedText,
    processedAfectados,
    processedIntervinientes,
    primeradiligencia: diligenciaSeleccionada.value, // Asignación de la propiedad primeradiligencia
    processedHeaderText,
    isEditingHeader,
    isEditedHeader,
    headerContainer,
    headerTextComputed
  };
};

export default useDatosDiligencia;