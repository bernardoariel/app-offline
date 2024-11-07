<template>
  <MyModal
    :visible="modalVisible"
    title="Título de prueba"
    :buttons="buttons"
    @update:visible="updateVisible"
    @button-click="buttonClick"
  >
    <template #body>
      <p>Contenido del modal</p>
    </template>
  </MyModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MyModal } from '@/components/elementos/index';

const modalVisible = ref(false);
const buttons = [
  { label: 'Aceptar', action: 'accept', focus: true },
  { label: 'Cancelar', action: 'cancel', focus: false },
];

const updateVisible = (value: boolean) => {
  modalVisible.value = value;
};

const buttonClick = (action: string) => {
  console.log(`Botón clicado: ${action}`);
};
</script>
