import { useDialog } from '../composables/useDialog';

const {showDialog} = useDialog()

const isSavedChanges = (to, from, next) => {
    console.log('from::: ', from);
  
    if (from.path.includes('/edit/') || from.path.includes('/new/')) {
        showDialog(to);
      next(false); // Detener la navegación hasta que el usuario confirme
    } else {
      next(); // Continuar la navegación si la condición no se cumple
    }
  };

export default isSavedChanges;
