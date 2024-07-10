# Componente ConfirmPopup Customizado

Este documento describe el uso del componente customizado `ConfirmPopup` El componente muestra un popup de confirmación con opciones para aceptar o rechazar.

### Código ejemplo en el componente padre

```vue
<template>
  <Button
    icon="pi pi-plus"
    severity="secondary"
    rounded
    outlined
    @click="showConfirm"
  />
  <MyConfirmModal
    :config="confirmConfig"
    @accepted="handleAccepted"
    @rejected="handleRejected"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyConfirmModal from '@/components/MyConfirmModal.vue';

const confirmConfig = ref({
  message: 'Are you sure you want to proceed?',
  icon: 'pi pi-exclamation-triangle',
  rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
  acceptClass: 'p-button-sm',
  rejectLabel: 'Cancel',
  acceptLabel: 'Save',
  event: null as Event | null,
});

const showConfirm = (event: Event) => {
  confirmConfig.value.event = event;
};

const handleAccepted = () => {
  console.log('Accepted');
  // Aquí puedes manejar la lógica cuando se hace clic en aceptar
};

const handleRejected = () => {
  console.log('Rejected');
  // Aquí puedes manejar la lógica cuando se hace clic en rechazar
};
</script>
```

## Eventos Emitidos (emits)

El componente hijo MyConfirmModal.vue utiliza los siguientes emits para comunicar cambios al componente padre:

- accepted: Este evento se emite cuando se acepta la confirmación.
- rejected: Este evento se emite cuando se rechaza la confirmación.

### Cómo Funcionan los emits

- accepted: Se emite cuando el usuario hace clic en el botón de aceptar en el popup de confirmación.
- rejected: Se emite cuando el usuario hace clic en el botón de rechazar en el popup de confirmación.

### Ejemplo de Uso de los emits

```
const emit = defineEmits(['accepted', 'rejected']);

watch(() => props.config.event, (newEvent) => {
  if (newEvent) {
    confirm.require({
      target: newEvent.currentTarget as HTMLElement,
      message: props.config.message,
      icon: props.config.icon,
      rejectClass: props.config.rejectClass,
      acceptClass: props.config.acceptClass,
      rejectLabel: props.config.rejectLabel,
      acceptLabel: props.config.acceptLabel,
      accept: () => {
        emit('accepted');
      },
      reject: () => {
        emit('rejected');
      },
    });
  }
});
```
