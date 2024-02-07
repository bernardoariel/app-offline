<script lang="ts" setup>
//ActuacionView.vue
import Dexie from 'dexie';
const db = new Dexie('my_database');
db.version(1).stores({
    afectados: '++id, typeAfectado, typeDocumento, nroDocumento, typeSexo, apellido, name, fecha, nacionalidad, estadoCivil, domicilioResidencia, telefono, email, profesion, instruccion'
});
import { useRouter } from 'vue-router';

import DataViewCard from '@/components/DataViewCard.vue';
import useActuacion from '@/composables/useActuacion';
import type { Tarjeta } from '@/interfaces/tipoTarjetas.interface';
import { ref } from 'vue';
const guardarDatos = async () => {
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
};

const router = useRouter();

const {   agregarNuevoItem } = useActuacion();
// Obtener las claves válidas de Tarjeta
const tarjetas = {
    afectados: { titulo: 'Afectados', valor: [] },
    vinculados: { titulo: 'Vinculados', valor: [] },
    fecha: { titulo: 'Fecha', valor: null },
    efectos: { titulo: 'Efectos', valor: [] },
    personalInterviniente: { titulo: 'Personal Interviniente', valor: null },
};

const tarjetasKeys: (keyof typeof tarjetas)[] = Object.keys(tarjetas) as (keyof typeof tarjetas)[];

const guardarDatosClick = async () => {
  try {
    await guardarDatos();
    console.log('Datos guardados correctamente');
  } catch (error) {
    console.error('Error al guardar los datos:', error);
  }
}

</script>

<template>
  <div class="grid">
    <div class="col-5">
      <Card v-for="key in tarjetasKeys" :key="key"
        :pt="{ title: { class: 'custom-title' }, content: { style: 'padding: 0!important;' } }" 
        class="p-fluid mb-2"  :tarjeta="tarjetas[key]">
        <template #title>
          <div class="title-container">
            <span class="custom-title">{{ tarjetas[key]!.titulo }}</span>
            <Button icon="pi pi-plus" severity="secondary" rounded outlined @click="agregarNuevoItem(key)"/>
          </div>
        </template>
        <template #content >
           <DataViewCard :itemsCardValue="tarjetas[key]" :itemKey="key" />
           
        </template>
      </Card>
    </div>
    <div class="col">
      <div class="text-center p-3 border-round-sm bg-primary font-bold">
        <Button label="Guardar datos" severity="danger" @click="guardarDatosClick" />
      </div>
    </div>
  </div>
</template>
<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
}
.custom-title {
  font-size: 28px; /* Ajusta el tamaño de la fuente según tus preferencias */
  font-weight: 500; /* Puedes ajustar el peso de la fuente según tus preferencias */
  color: #333; /* Cambia el color del texto según tus preferencias */
  /* Otros estilos que desees aplicar al título */
}
</style>