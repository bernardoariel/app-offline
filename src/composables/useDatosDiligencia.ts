import { diligencias } from '@/data/datosDiligencia';

import { computed, ref } from 'vue';
import useItem from '@/composables/useItems';
import type { DatosLegales } from '@/interfaces/datosLegales.interface';
import { getTitleCase, getUpperCase } from '@/helpers/stringUtils';
import { getAge } from '@/helpers/getAge';

const useDatosDiligencia = (actuacion:string) => {
  const { afectados, intervinientes } = useItem();
  
  const diligenciaSeleccionada = diligencias.find((d:DatosLegales) => d.id === actuacion);

  const wordStrong = ['HACE CONSTAR', 'DISPONE', 'CERTIFICO', 'CERTIFICA', 'DECLARO'];

  const getStyle = (value: string) => {
      return `<span class="text-primary font-medium"><i>${value}</i></span>`;
  };

  const departamento = 'RAWSON';
  const dependencia = 'SUB COMISARIA E3';
  const fechaActuacion = 'a los 22 días del mes de Marzo del año Dos Mil Veinticuatro, siendo las 12:44 horas';

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
      
      return `${getStyle(getTitleCase(item.jerarquia)+ ' ' + getUpperCase(item.apellido) +getTitleCase(item.nombre))}
        ${getStyle(' adscripto/s a numerario de  ' + item.dependencia)}${separator}`

    }).join(' '); 
  });

  const processedText = computed(() => {
    let header = diligenciaSeleccionada?.header.replace('@dependencia', getStyle(dependencia))
      .replace('@departamento', getStyle(departamento))
      .replace('@fechaactuacion', getStyle(fechaActuacion))
      .replace('@afectados', processedAfectados.value)
      .replace('@intervinientes', processedIntervinientes.value);

    let footer = diligenciaSeleccionada?.footer;

     wordStrong.forEach(word => {
        const replacement = `<span style="font-weight: bold; text-decoration: underline;">${word}</span>`;
        if(header) header = header.replace(new RegExp(word, 'g'), replacement);
        if(footer) footer = footer.replace(new RegExp(word, 'g'), replacement);
    });

    return { header, footer };
  });

  return {
    processedText,
    processedAfectados, // Si necesitas acceder directamente a los afectados procesados
    processedIntervinientes,
    primeradiligencia:diligenciaSeleccionada
  };
}
export default useDatosDiligencia;