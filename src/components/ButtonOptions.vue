
<template>
    
        <Button type="button" icon="pi pi-ellipsis-v" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" text rounded severity="secondary"/>
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />

</template>

<script setup lang="ts">
import { ref } from "vue";

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
                icon: 'pi pi-trash'
            }
        ]
    }
]);

const toggle = (event:Event) => {
    menu.value.toggle(event);
};
</script>