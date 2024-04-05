<script setup lang="ts">

import { ref, watch } from "vue";

interface Props {
  tarjetaNombre?: string;
  item: any;
} 

const { item, tarjetaNombre = '' } = defineProps<Props>();


const menu = ref();
const items = ref([
  {
    label: 'Opciones',
    items: [
      {
        label: 'Enviar al Relato',
        icon: 'pi pi-file-import'
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => {
            eliminarItem(item.id);      
            menu.value.toggle(event);
        }
      }
    ]
  }
]);

const eliminarItem = (id: string) => {
  console.log('id::: ', id);
  
  
};

const toggle = (event: Event) => {
  menu.value.toggle(event);
};

watch(() => item, (newItem) => {
  // Actualiza la propiedad 'items' cuando 'item' cambie
  items.value[1].label = `${newItem.id}Eliminar`;
});
</script>

<template>
  <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" text rounded severity="secondary"/>
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
</template>
