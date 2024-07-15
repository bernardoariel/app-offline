# Componente Dialog Customizado

Este documento describe el uso del componente customizado `Dialog` El componente muestra un diálogo modal con un título, contenido y botones configurables.

## Padre

1. El componente tiene las siguientes props: el titulo,la visibilidad, los botones y el evento del boton.

```
<MyModal
    v-model:visible="visible"
    title="Confirmar Eliminación"
    :buttons="deleteModalButtons"
    @button-click="handleDeleteConfirmation"
  >
```

2. El padre manejara la visibilidad por medio de la propiedad

```
const isVisibleModal = ref(false);
```

3. Los botones tendran su interface

```
interface buttonProps {
  label: string;
  class?: string;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  action: string;
}
```

4. Las propiedades de los botones en el caso de dos botones

```
const deleteModalButtons = ref<buttonProps[]>([
  {
    label: 'Cancelar',
    class: 'p-button-secondary',
    icon: 'pi pi-times',
    iconPos: 'left',
    action: 'cancel',
  },
  {
    label: 'Eliminar',
    class: 'p-button-danger',
    icon: 'pi pi-trash',
    iconPos: 'left',
    action: 'delete',
  },
]);
```

5. Y el evento que hará lo que precisemos

```
const handleDeleteConfirmation = async () => ()
```

6. Por ultimo el modal recibe un slot por medio de un template para renderizar lo que precisamos

```
<template #body>
      <div class="modal-body">
        <i
          class="pi pi-exclamation-triangle"
          :style="{ fontSize: '3rem', color: 'orange' }"
        ></i>
        <div class="flex justify-content-center" style="width: 100%">
          <p class="text-left font-bold">
            ¿Deseas eliminar el item {item}?
          </p>
        </div>
      </div>
      <p class="text-center m-0 text-sm" v-html="mensaje"></p>
    </template>
```

## Hijo <MyModal />

1. Recibira de la siguiente manera las props del padre

```

interface buttonProps {
  label: string;
  class?: string;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  action: string;
}
interface Props {
  visible: boolean;
  title: string;
  buttons: buttonProps[];
}
const props = defineProps<Props>();
```

Siendo que isVisible es una propiedad local pero recibe del padre la props `isVisibleModal`

```
const isVisible = ref(props.isVisibleModal);
<Dialog
    v-model:visible="isVisible"
    :header="title"
    modal
    :style="{ width: '500px' }"
    closable
  >
```

2. Defino los emits

```
const emit = defineEmits(['update:visible', 'button-click']);
```

3. Observo cambios en la props de entrada visibilidad y mi props de visibilidad

```
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

4. Y creo una funcion para manejar los eventos

```
const onButtonClick = (action: string) => {
  emit('button-click', action);
  emit('update:visible', false);
};
```

```
<Dialog
    v-model:visible="isVisible"
    :header="title"
    modal
    :style="{ width: '500px' }"
    closable
  >
    <template #header></template>

    <slot name="body" />

    <template #footer>
      <div class="modal-footer">
        <Button
          v-for="(button, index) in buttons"
          :key="index"
          :label="button.label"
          :class="button.class"
          :icon="button.icon"
          :iconPos="button.iconPos"
          @click="onButtonClick(button.action)"
          :autofocus="index === 0"
        />
      </div>
    </template>
  </Dialog>
```

## Mediante el Composable useDialog() (showDialog)

1. El composable useDialog proporciona un conjunto de métodos y estados para manejar la lógica del diálogo de confirmación:

```
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const isDialogVisible = ref(false);
const pendingRoute = ref<string | null>(null);

interface DialogOptions {
  route?: { name: string };
  title: string;
  icon: string;
  message: string;
}

export function useDialog() {
  const router = useRouter();

  const showDialog = (options: DialogOptions) => {
    if (options.route) {
      pendingRoute.value = options.route.name;
    }
    isDialogVisible.value = true;
  };

  const hideDialog = () => {
    isDialogVisible.value = false;
  };

  const confirmNavigation = () => {
    if (pendingRoute.value) {
      router.push({ name: pendingRoute.value });
    }
    hideDialog();
  };

  return {
    isDialogVisible,
    showDialog,
    hideDialog,
    confirmNavigation,
    pendingRoute
  };
}

  >
```

2. importar el composable

```
import { useDialog } from '@/composables/useDialog';
```

3. Definir los botones del diálogo y manejar los eventos de clic:

```
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

const handleButtonClick = (action: string) => {
  if (action === 'accept') {
    confirmNavigation();
  } else {
    hideDialog();
  }
};

```

4. Mostrar el diálogo cuando sea necesario:

```
const handleShowDialog = () => {
  showDialog({
    route: { name: 'actuaciones' },
    title: 'Consulta del Sistema',
    icon: 'pi pi-exclamation-triangle',
    message: '¿Deseas salir sin guardar los datos?'
  });
};
```

5. Integrar el componente MyModal en tu template y pasar las props:

```
<MyModal
  :visible="isDialogVisible"
  title="Consulta del Sistema"
  :buttons="dialogButtons"
  @update:visible="isDialogVisible = $event"
  @button-click="handleButtonClick"
>
  <template #body>
    <div class="modal-body">
      <i class="pi pi-exclamation-triangle" :style="{ fontSize: '3rem', color: 'orange' }"></i>
      <div class="flex justify-content-center" style="width: 100%">
        <p class="text-left font-bold">¿Deseas salir sin guardar los datos?</p>
      </div>
    </div>
  </template>
</MyModal>
```
