<script lang="ts" setup>
//ActuacionView.vue
/* import Dexie from 'dexie';
const db = new Dexie('my_database');
db.version(1).stores({
    afectados: '++id, typeAfectado, typeDocumento, nroDocumento, typeSexo, apellido, name, fecha, nacionalidad, estadoCivil, domicilioResidencia, telefono, email, profesion, instruccion'
}); */
const { agregarNuevoItem } = useActuacion();



const active = ref(0);
// import DataViewCard from '@/components/DataViewCard.vue';
import useActuacion from '@/composables/useActuacion';
import useCardInformation from '@/composables/useCardInformation';

import DatosLegalesView from './DatosLegalesView.vue';

import { ref } from 'vue';
import DiligenciaView from './DiligenciaView.vue';
import SidebarMenu from '@/components/SidebarMenu.vue';

interface Props{
  actuacion:string;
}
const props = defineProps<Props>()
const { cardInformationKeys,cardInformation } = useCardInformation(props.actuacion)
/* const getVariables = () => {
  const nombreActuacion = ' Prevencional por Denuncia'
  const nombreDiligencia = 'Denuncia Penal'
  const fechaActuacion = 'a los 22 días del mes de Marzo del año Dos Mil Veinticuatro, siendo las 12:44 horas'
  const departamento = 'RAWSON';
  const dependencia = 'SUB COMISARIA E3';
  const intervinientes = [
    {nombre: 'Ariel Bernardo', jerarquia: 'Agente', dependencia: 'Comisaria 4ta Desamparados'},
    {nombre: 'Viviana', jerarquia: 'Cabo Primero', dependencia: 'Primero viviana'},
  ];
  const afectados = [
    {nombre: 'Ariel Bernardo', jerarquia: 'Agente', dependencia: 'Comisaria 4ta Desamparados'},
    {nombre: 'Viviana', jerarquia: 'Cabo Primero', dependencia: 'Primero viviana'},
  ];
  
  const header = `--- En la provincia de San Juan, Departamento ${ getStyle(departamento) }, sede de ${ getStyle(dependencia) }, ${ getStyle(fechaActuacion) }; el funcionario de Policía que suscribe y Secretario de actuaciones que refrenda, a los fines legales HACE CONSTAR: : Que en la fecha y hora precitada, comparece ante esta Instrucción la persona mencionada precedentemente a fin de poner en conocimiento la supuesta Comisión de un hecho de carácter delictivo, que da lugar a la intervención de esta Autoridad Policial, acto seguido y luego de ser impuesto del contenido del Art. 245° del Código Penal (falsa denuncia), a continuación, se le pregunta por sus nombres apellidos y demás circunstancias personales manifestó llamarse: ${afectados} . Con relación al hecho que viene a denunciar DECLARO: Que se presenta ante esta autoridad policial a fin de manifestar que`;
  
  const footer = `Lo que solicita es que se tomen las medidas legales de rigor. No siendo para más la presente acta la que leída y ratificada en todo su contenido se firma al pie por ante mí que lo CERTIFICA. --------`;

  return { intervinientes, header, footer,fechaActuacion,departamento,dependencia,afectados };
}; */


/* const variables = ref(getVariables()); */




/* const guardarDatos = async () => {
  try {
    // Aquí puedes realizar las operaciones necesarias para guardar los datos en tu base de datos Dexie.js
    // Por ejemplo, puedes agregar un nuevo registro a la tabla 'afectados'
    await db.table('afectados').add({
      typeAfectado: 'Tipo de afectado',
      typeDocumento: 'Tipo de documento',
      nroDocumento: 123456789,
      typeSexo: 'Sexo',
      apellido: 'Apellido',
      name: 'Nombre',
      fecha: '01/01/2022',
      nacionalidad: 'Nacionalidad',
      estadoCivil: 'Estado civil',
      domicilioResidencia: 'Domicilio',
      telefono: '123456789',
      email: 'correo@example.com',
      profesion: 'Profesión',
      instruccion: 'Instrucción'
    });
    console.log('Datos guardados correctamente');
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    throw error; // Relanza el error para que el componente pueda manejarlo si es necesario
  }
}; */


</script>

<template>
  <div class="grid">
    
    <div class="col-5">
      <Card>
        <template #title>
          <div class="title-container">
            <span class="custom-title">Ingreso de datos {{ $props.actuacion }}</span>
            <div class="buttons-container">
              <Button @click="active = 0" rounded label="1" class="button" :outlined="active !== 0" />
              <Button @click="active = 1" rounded label="2" class="button" :outlined="active !== 1" />
            </div>
          </div>      
        </template>
        <template #content>
          <TabView v-model:activeIndex="active">
            <TabPanel header="Datos Requeridos">
              <Card v-for="key in cardInformationKeys" :key="key" class="p-fluid mb-2 color-border-top">
                <template #title>
                  <div class="title-container">
                    <span class="custom-title text-3x1 ">{{ cardInformation[key].titulo }}</span>
                    <Button icon="pi pi-plus" severity="secondary" rounded outlined @click="agregarNuevoItem('a')" />
                  </div>
                </template>
                <template #content>
                 <DataViewCard :itemsCardValue="cardInformation[key]" :data-key="key"/>
                </template>
              </Card>
            </TabPanel>
            <TabPanel header="Datos Legales">
              <DatosLegalesView />
            </TabPanel>
            
          </TabView>
        </template>
      </Card>
    </div>
    <div class="col">
      <DiligenciaView :actuacion="actuacion" />
    </div>
  </div>
</template>
<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center; 
}
.custom-title {
  /* font-size: 28px; */ /* Ajusta el tamaño de la fuente según tus preferencias */
  /* font-weight: 500;  *//* Puedes ajustar el peso de la fuente según tus preferencias */
  color: #333; /* Cambia el color del texto según tus preferencias */
 
}
.buttons-container {
  display: flex;
  gap: 10px; /* Espacio entre los botones */
}


.color-border-top {
  border-top: 1px solid #e9e9e984; /* Cambia el color y grosor del borde según necesites */
}

</style>