# Componente Dialog Customizado

Este documento describe el uso del componente customizado `Dialog` El componente muestra un diálogo modal con un título, contenido y botones configurables.
## Componente Custm
### El componente tiene las siguientes props:
```
interface buttonProps {
  label: string;
  class?: string;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  action: string;
  focus: boolean;
}
interface Props {
  visible: boolean;
  title: string;
  buttons: buttonProps[];
}
```
### El componente tiene los siguientes emits:
```
const emit = defineEmits(['update:visible', 'button-click']);
```
### El componente maneja metodos propios
```
const onButtonClick = (action: string) => {
  emit('button-click', action);
  emit('update:visible', false);
};
```
### Cuando se inicializa recibe la props en false de la visibilidad. Tendrá unos watch que estaran observando esa propiedad local. Y cuando cambie actualizaran la propiedad del padre.

### El componente tiene funciones y carga de propiedades desde el composable useDialog


## Guia de Uso.
1. En el componente que lo va a alojar lo importamos
2. El body del mismo se lo pasamos por medio de un template (template)
3. Llamamos al useDialog ```const { dialogState, hideDialog, confirmNavigation } = useDialog();```
4. Utilizamos el dialogState para el pasaje de las propiades (DialogState)
5. LLamamos al metodo de donde lo necesitemos showDialog del useDialog con sus respectivas props(Options)

#### template
```
<MyDialog
    :visible="dialogState.isDialogVisible"
    :title="dialogState.header.title"
    :buttons="dialogButtons"
    @update:visible="dialogState.isDialogVisible = $event"
    @button-click="handleButtonClick"
  >
    <template #body>
      <div
        class="modal-body flex flex-col items-center w-full"
        style="padding: 0"
      >
        <div class="flex items-center w-full justify-between">
          <i
            class="text-red-500 text-7xl mt-3 ml-5"
            :class="[dialogState.body.colorClass, dialogState.body.icon]"
          ></i>
          <p class="font-bold text-xl ml-4">
            {{ dialogState.body.answer }}
          </p>
        </div>
        <p
          class="text-lg ml-8 text-center text-gray-600"
          style="margin-top: -20px"
        >
          {{ dialogState.body.comments }}
        </p>
      </div>
    </template>
  </MyDialog>
```

#### DialogState
```
const dialogState = ref({
  isDialogVisible: false,
  pendingRoute: null as string | null,
  allowNavigation: false,
  header: {
    title: 'Consulta del Sistema!!'
  },
  body: {
    icon: '',
    comments: '',
    colorClass: '',
    answer: ''
  },
  footer: null as any
});
```
#### Options
```
 const optionDialog: DialogOptions = {
        nameRouteToRedirect: to.name,
        header: {
          title: 'Confirmación Necesaria'
        },
        body: {
          icon: 'pi pi-question-circle',
          answer: '¿Desea salir sin guardar los cambios?',
          colorClass: 'text-red-400',
          comments: 'Los cambios no guardados se perderán.'
        },
        footer: {} // Completar más adelante según sea necesario
      };
      showDialog(optionDialog);
```