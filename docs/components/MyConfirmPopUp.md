# Componente ConfirmPopup Customizado

Este documento describe el uso del componente customizado `ConfirmPopup` El componente muestra un popup de confirmación con opciones para aceptar o rechazar.
## EN EL PADRE
1.  Primero colocamos el llamado al componente y su importacion
```
<MyConfirmPopup
  :config="confirmConfig"
  @accepted="handleAccepted"
  @rejected="handleRejected"
/>
```
2. Definimos los metodos a llamar:
```
const handleAccepted = () => {
  console.log('Accepted');
  // Aquí puedes manejar la lógica cuando se hace clic en aceptar
};

const handleRejected = () => {
  console.log('Rejected');
  // Aquí puedes manejar la lógica cuando se hace clic en rechazar
};
```
3. Creamos un metodo para que aparezca el popup
```
const showConfirm = (event: Event,id:number) => {

    confirmConfig.value.event = event;
};
```

### Componente hijo
1. Preparamos las props

```
 interface Config {
    message: string;
    icon: string;
    rejectClass: string;
    acceptClass: string;
    rejectLabel: string;
    acceptLabel: string;
    event: Event | null;
  }
  const confirmConfig = ref({
    message: '¿Seguro que desea eliminar esta actuación?',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-danger p-button-sm',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Eliminar',
    event: null as Event | null
})
```

<template>
  <div>
    <Button
      type="button"
      icon="pi pi-ellipsis-v"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      text
      rounded
      severity="secondary"
    />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem'; // Importa el tipo MenuItem y MenuItemCommandEvent de PrimeVue

const props = defineProps<{
  tarjetaNombre?: string;
  item: any;
  deleteItem: (event: Event, id: string) => void;
  sendRelato?: (item: any) => void;
}>();

const menu = ref();

// Define el tipo de items correctamente como un array de MenuItem
const items = ref<MenuItem[]>([
  {
    label: 'Opciones',
    items: [
      {
        label: 'Enviar al Relato',
        icon: 'pi pi-file-import',
        command: (event: MenuItemCommandEvent) => { // Asegúrate de recibir el evento aquí
          props.sendRelato!(props.item);
          menu.value.toggle(event.originalEvent); // Usa el evento original
        }
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: (event: MenuItemCommandEvent) => { // Asegúrate de recibir el evento aquí
          props.deleteItem(event.originalEvent, props.item.id); // Usa el evento original
          menu.value.toggle(event.originalEvent); // Usa el evento original
        },
      },
    ],
  },
]);

const toggle = (event: Event) => {
  menu.value.toggle(event);
};
</script>
