# Componente ConfirmPopup Customizado

Este documento describe el uso del componente customizado `ConfirmPopup` El componente muestra un popup de confirmación con opciones para aceptar o rechazar.

1.  Primero colocamos el llamado al componente
```
<MyConfirmPopup
    :config="confirmConfig"
    @accepted="handleAccepted"
    @rejected="handleRejected"
/>
```
2. Preparamos las props

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
3. Mostramos un componente a partir de un click

```
<Button icon="pi pi-trash" @click="showConfirm($event,data.id)" square severity="danger"></Button>
const showConfirm = (event: Event,idDelete:number) => {
    actuacionIdToDelete.value = idDelete
    confirmConfig.value.event = event;
};
```

## Eventos Emitidos (emits)

El componente hijo MyConfirmModal.vue utiliza los siguientes emits para comunicar cambios al componente padre:

- accepted: Este evento se emite cuando se acepta la confirmación.
- rejected: Este evento se emite cuando se rechaza la confirmación.


