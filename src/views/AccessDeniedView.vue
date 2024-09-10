<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';
import { ref, onActivated } from 'vue';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const visible = ref(false);

onActivated(() => {
  showTemplate()
})

const handleReload = () => {
  router.push('/');
};

const onClose = () => {
    visible.value = false;
}

const showTemplate = () => {
    if (!visible.value) {
        toast.add({ severity: 'warn', summary: 'Se ha perdido la conexión a internet. Es posible que algunas funcionalidades no esten disponibles.', group: 'bc' });
        visible.value = true;
    } 
};
</script>

<template >
  <Toast position="top-center" group="bc" @close="onClose">
    <template #message="slotProps">
      <div class="font-medium text-lg my-3 text-900">{{ slotProps.message.summary }}</div>
      
    </template>
  </Toast>
    <div class="container">
      <h1 class="title">SIIS - Modo OFFLine</h1>
        <h2 class="subtitle">Su usuario no está habilitado para el modo offline</h2>
        <Button label="Reintentar" square class="p-button-rounded" @click="handleReload"></Button>
    </div>
</template>

<style>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.title{
    font-weight: 500;
}
.subtitle{
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-weight: 400;
}

</style>