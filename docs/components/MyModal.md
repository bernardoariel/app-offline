# Componente Dialog Customizado

Este documento describe el uso del componente customizado `Dialog` El componente muestra un diálogo modal con un título, contenido y botones configurables.

### Código ejemplo en el componente padre

```vue
<template>
  <Button label="Mostrar Dialog" @click="showDialog" />
  <MyDialog
    :visible="isDialogVisible"
    title="Título del Diálogo"
    :buttons="dialogButtons"
    @update:visible="isDialogVisible = $event"
    @button-click="handleButtonClick"
  >
    <template #body>
      <p>Contenido del diálogo.</p>
    </template>
  </MyDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MyDialog from '@/components/MyDialog.vue';

const isDialogVisible = ref(false);

const dialogButtons = [
  {
    label: 'Aceptar',
    class: 'p-button-primary',
    icon: 'pi pi-check',
    action: 'accept',
  },
  {
    label: 'Cancelar',
    class: 'p-button-secondary',
    icon: 'pi pi-times',
    action: 'cancel',
  },
];

const showDialog = () => {
  isDialogVisible.value = true;
};

const handleButtonClick = (action: string) => {
  console.log(`Button clicked: ${action}`);
  // Manejar la lógica de acuerdo a la acción del botón
};
</script>
```

### Notas Adicionales

- Los botones son configurables a través de la propiedad buttons, que es una lista de objetos con propiedades como label, class, icon, iconPos y action.
- Utiliza propiedades y eventos para manejar la lógica de visibilidad y las acciones de los botones.

## Eventos Emitidos (emits)

El componente hijo MyDialog.vue utiliza los siguientes emits para comunicar cambios al componente padre:

- update:visible: Este evento se emite cada vez que cambia la visibilidad del diálogo.
- button-click: Este evento se emite cuando se hace clic en un botón del diálogo, pasando la acción del botón como argumento.

### Cómo Funcionan los emits

- update:visible: Se emite cuando la visibilidad del diálogo cambia, permitiendo que el componente padre actualice su estado de visibilidad.
- button-click: Se emite cuando un botón del diálogo es clicado, permitiendo que el componente padre maneje la lógica según la acción del botón.

### Ejemplo de Uso de los emits

```
const emit = defineEmits(['update:visible', 'button-click']);

const onButtonClick = (action: string) => {
  emit('button-click', action);
  emit('update:visible', false);
};

watch(
  () => props.visible,
  (newVal) => {
    isVisible.value = newVal;
  }
);

watch(isVisible, (newVal) => {
  emit('update:visible', newVal);
});
```

### En el ejemplo anterior:

- La función onButtonClick emite el evento button-click con la acción del botón y también emite update:visible con false para cerrar el diálogo.
- Los watch en props.visible y isVisible aseguran que la visibilidad del diálogo se sincronice correctamente entre el componente padre e hijo.
