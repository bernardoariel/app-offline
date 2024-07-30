// useDatosDiligencia.ts
import { computed, ref } from 'vue';
import { diligencias } from '@/data/datosDiligencia';
import useItem from '@/composables/useItems';
import type { DatosLegales } from '@/interfaces/datosLegales.interface';
import { getTitleCase, getUpperCase } from '@/helpers/stringUtils';
import { getDependenciaData } from '@/helpers/getDependencia'
import { getAge } from '@/helpers/getAge';
import useNewActuacion from './useNewActuacion';
import useActuacion from './useActuacion';
import { convertDate } from '../helpers/dateToString'

interface ProcessedText {
  header: string;
  footer: string;
}

const relato = ref<string>('')
const headerContainer = ref<string>('')
const footerContainer = ref<string>('')

const { isEditedHeader, isEditedFooter } = useNewActuacion()
const { fechaCreacion } = useActuacion()

const useDatosDiligencia = (actuacion: ref<string>) => {

  const { afectados, intervinientes, vinculados, fechaCreacionaActuacion, itemSelected, dependenciaData: dependencia, fechaUbicacion, efectos } = useItem();

  const ufiNro = '1';
  const articulosRelacionados = ['Articulo 65 ', 'Ley N\u00ba 941-R', 'Art 192 aprovechamiento malicioso de credito'];
  const juzgado = 'JUZGADO DE PAZ ANGACO';
  const nombreFiscal  = 'Pedro Sanchez'
  const ayudanteFiscal = 'Pedro Sanchez'

  const isEditingHeader = ref<boolean>(false);
  const isEditingFooter = ref<boolean>(false);

  const actuacionMap: { [key: string]: string } = {
    'sumario-denuncia': 'sumario-denuncia',
    'sumario-oficio': 'sumario-oficio',
    'expediente-denuncia': 'expediente-denuncia',
    'expediente-oficio': 'expediente-oficio',
    'ufi-delitos-especiales-paradero': 'ufi-delitos-especiales-paradero'
  };

  const getIdToFind = (actuacion: string) => {
    if (actuacionMap[actuacion]) {
      return actuacionMap[actuacion];
    }
    if (actuacion.startsWith('ufi-delitos-especiales-') && actuacion !== 'ufi-delitos-especiales-paradero') {
      return 'ufi-delitos-especiales';
    }
    if (actuacion.startsWith('preliminares-')) {
      return 'preliminares';
    }

    const ufiOficio = ['oficio', 'cavig', 'flagrancia', 'anivi'];
    if (actuacion.startsWith('ufi') && ufiOficio.some(term => actuacion.includes(term))) {
      return 'ufi-oficio';
    }
    if (actuacion.startsWith('ufi') && actuacion.includes('denuncia')) {
      return 'ufi-denuncia';
    }

    return actuacion;
  };

  const diligenciaSeleccionada = computed(() => {
    if (!actuacion.value) return;
    const idToFind = getIdToFind(actuacion.value);
    const result = diligencias.find((d: DatosLegales) => d.id === idToFind);
    return result;
  });

  const getStyle = (value: string, color: string = 'primary'): string => {
    return `<span class="text-${color} font-medium"><i>${value}</i></span>`;
  };

  const dependenciaDataLocal = getDependenciaData() //datos local Storage

  const processedAfectados = computed(() => {
    return afectados.value.map((a, index) => {
      if (a.descripcionOrdenPublico) 
        return ``;
      const isLast = index === afectados.value.length - 1;
      const separator = isLast ? '.' : ',';
      const apellidoNombre = getUpperCase(a.apellido) + ', ' + getTitleCase(a.nombre);
      const documento = a.typeDocumento && a.nroDocumento ? 'con ' + a.typeDocumento + ' Nº ' + String(a.nroDocumento) : '';
      const nacionalidad = 'de nacionalidad ' + a.nacionalidad;
      const edad = 'de ' + getAge(a.fecha) + ' años de edad.';
      const instruccion = a.instruccion + ',';
      const profesion = 'de profesion ' + a.profesion + ',';
      const domicilio = 'con domicilio en ' + a.domicilioResidencia;
      return `${getStyle(apellidoNombre)} ${getStyle(documento)} ${getStyle(nacionalidad)} ${getStyle(edad)} ${getStyle(instruccion)} ${getStyle(profesion)} ${getStyle(domicilio, isLast)}`;
    }).join(' ');
  });

  const processedVinculados = computed(() => {
    
    return vinculados.value.map((v, index) => {
      if (v.descripcionDesconocido) 
        return ``;
      const isLast = index === vinculados.value.length - 1;
      const separator = isLast ? '.' : ',';
      const apellidoNombre = getUpperCase(v.apellido) + ', ' + getTitleCase(v.nombre);
      const documento = v.typeDocumento && v.nroDocumento ? 'con ' + v.typeDocumento + ' Nº ' + String(v.nroDocumento) : '';;
      const nacionalidad = 'de nacionalidad ' + v.nacionalidad;
      const edad = 'de ' + getAge(v.fecha) + ' años de edad.';
      const instruccion = v.instruccion + ',';
      const profesion = 'de profesion ' + v.profesion + ',';
      const domicilio = 'con domicilio en ' + v.domicilioResidencia;
      return `${getStyle(apellidoNombre)} ${getStyle(documento)} ${getStyle(nacionalidad)} ${getStyle(edad)} ${getStyle(instruccion)} ${getStyle(profesion)} ${getStyle(domicilio, isLast)}`;
    }).join(' ');
  });

  const processedIntervinientes = computed(() => {
    return intervinientes.value.map((item, index) => {
      const isLast = index === intervinientes.value.length - 1;
      const separator = isLast ? '.' : ',';

      return `${getStyle(getTitleCase(item.jerarquia) + ' ' + getUpperCase(item.apellido) + ' ' + getTitleCase(item.nombre))}
          ${getStyle(' adscripto/s a numerario de  ' + item.dependencia)}${separator}`;

    }).join(' ');

  });
  const processedEfectos = computed(() => {
    return efectos.value.map((e, index) => {
      const subcategoria = e.subcategoria || '';
      const marca = e.marca || '';
      const modelo = e.modelo || '';
      const estado = e.estado || ''; // Asumimos que hay una propiedad estado que indica si el efecto es secuestrado

      const textoSecuestro = estado.toLowerCase() === 'secuestrado' ? 'el secuestro de ' : '';
      return `${textoSecuestro}un/una ${subcategoria} Marca ${marca} Modelo ${modelo};`;
    }).join(' ');
  });
  const processedArticulosRelacionados = computed(() => {
    return articulosRelacionados.join(', ');
  });

  const processedUfiNro = computed(() => {
    return ufiNro ? getStyle(ufiNro) : '';
  });
  const processedFiscal = computed(() => {
    return nombreFiscal ? getStyle(nombreFiscal) : '';
  });
  const processedAyudanteFiscal = computed(() => {
    return ayudanteFiscal ? getStyle(ayudanteFiscal) : '';
  });
  
  const processedJuzgado = computed(() => {
    return juzgado ? getStyle(juzgado) : '';
  });

  const processedText = computed<ProcessedText>(() => {
    let header = '';
    let footer = '';
    if (diligenciaSeleccionada.value) {
      header = diligenciaSeleccionada.value.header
        .replace('@dependencia', getStyle(dependenciaDataLocal.dependencia.nombre,'blue-600'))
        .replace('@departamento', getStyle(dependenciaDataLocal.dependencia.departamento))
        .replace('@fechaactuacion', getStyle(convertDate(itemSelected.value ? fechaCreacionaActuacion.value : fechaCreacion.value)))
        .replace('@afectados', processedAfectados.value)
        .replace('@intervinientes', processedIntervinientes.value)
        .replace('@vinculados', processedVinculados.value)
        .replace('@horaDelHecho', getStyle(processedFechaUbicacion.value));

      footer = diligenciaSeleccionada.value.footer
      .replace('@vinculados', processedVinculados.value)
      .replace('@efectos', getStyle(processedEfectos.value))
      .replace('@ufi', getStyle(processedUfiNro.value,'blue-600'))
      .replace('@juzgado', getStyle(processedJuzgado.value,'blue-600'))
      .replace('@ayudanteFiscal', getStyle(processedAyudanteFiscal.value,'blue-600'))
      .replace('@fiscal', getStyle(processedFiscal.value,'blue-600'))
      .replace('@articulosRelacionados', getStyle(processedArticulosRelacionados.value,'blue-600'));
      // Reemplazar palabras claves con estilos especiales
      ['HACE CONSTAR', 'DISPONE', 'CERTIFICO', 'CERTIFICA', 'DECLARO' , 'DECLARA', 'U.F.I'].forEach((word) => {
        const replacement = `<span style="font-weight: bold; text-decoration: underline;">${word}</span>`;
        header = header.replace(new RegExp(word, 'g'), replacement);
        footer = footer.replace(new RegExp(word, 'g'), replacement);
      });
    }

    return { header, footer };
  });

  const processedFechaUbicacion = computed(() => {
    if (!fechaUbicacion.value || fechaUbicacion.value.length === 0) {
        return '';
    }
    const ubicacionItem = fechaUbicacion.value[0]; 
    if (!ubicacionItem || !ubicacionItem.desdeFechaHora || !ubicacionItem.calle || !ubicacionItem.numero) {
        return '';
    }

    const fechaHora = new Date(ubicacionItem.desdeFechaHora);
    const hora = fechaHora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

    const ubicacion = `se encontraban de recorridas por Calle ${getTitleCase(ubicacionItem.calle)} Número: ${ubicacionItem.numero}`;
    
    return `${hora} horas, ${ubicacion}`;
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
      return isEditingHeader.value ? headerContainer.value : processedHeaderText.value;
    },
    set(newValue) {
      headerContainer.value = newValue;
    }
  });
  const footerTextComputed = computed({
    get() {
      return isEditingFooter.value ? footerContainer.value : processedFooterText.value;
    },
    set(newValue) {
      footerContainer.value = newValue;
    }
  });
  return {
    processedText,
    processedAfectados,
    processedIntervinientes,
    processedVinculados,
    processedFechaUbicacion,
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
    resetRelato: () => relato.value = '',
    footerText: computed(() => processedText.value.footer),
  };
};

export default useDatosDiligencia;