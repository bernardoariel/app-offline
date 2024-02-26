import useFieldState from '@/composables/useFiledsState';

const isSavedChanges = (to:any, from:any, next:any) => {
   
    const { statesID } = useFieldState();

    if (from.path.includes('/actuacion/personas') && statesID.some(state => !state.pristine)) {
        if (!window.confirm('Hay cambios no guardados. ¿Deseas guardar los cambios?')) {
            next();
            return;
        }
        //TODO: Agregar componente de primevue
        //TODO: Guardar los cambios desde aquí usando los composables.
        next(false);
    } else {
        next();
    }
 
};

export default isSavedChanges;
