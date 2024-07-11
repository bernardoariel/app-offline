<template>
    <ConfirmPopup></ConfirmPopup>
  </template>
  
  <script setup lang="ts">
  import { useConfirm } from 'primevue/useconfirm';
  import { defineProps, watch } from 'vue';
  
  interface Config {
    message: string;
    icon: string;
    rejectClass: string;
    acceptClass: string;
    rejectLabel: string;
    acceptLabel: string;
    event: Event | null;
  }
  
  const { config } = defineProps<{ config: Config }>();
  const emit = defineEmits(['accepted', 'rejected']);

  const confirm = useConfirm();
  watch(() =>config.event, (newEvent) => {
  if (newEvent) {
    confirm.require({
      target: newEvent.currentTarget as HTMLElement,
      message:config.message,
      icon:config.icon,
      rejectClass:config.rejectClass,
      acceptClass:config.acceptClass,
      rejectLabel:config.rejectLabel,
      acceptLabel:config.acceptLabel,
      accept: () => {
        emit('accepted');
      },
      reject: () => {
        emit('rejected');
      },
    });
  }
});
</script>

<style scoped>
</style>
<!-- Como usar este componente y llamarlo desde el padre -->
<!-- <Button
icon="pi pi-plus"
severity="secondary"
rounded
outlined
@click="showConfirm"
/> -->
<!-- <MyConfirmModal
    :config="confirmConfig"
    @accepted="handleAccepted"
    @rejected="handleRejected"
  />  -->
<!-- const confirmConfig = ref({
    message: 'Are you sure you want to proceed?',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
    acceptClass: 'p-button-sm',
    rejectLabel: 'Cancel',
    acceptLabel: 'Save',
    event: null as Event | null
}); -->
<!-- const showConfirm = (event: Event) => {
    confirmConfig.value.event = event;
  };
  const handleAccepted = () => {
    console.log('Accepted');
    // Aquí puedes manejar la lógica cuando se hace clic en aceptar
  };
  
  const handleRejected = () => {
    console.log('Rejected');
    // Aquí puedes manejar la lógica cuando se hace clic en rechazar
  }; -->