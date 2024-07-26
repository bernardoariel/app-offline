import { describe, it, expect, beforeEach } from 'vitest';
import { reactive, ref } from 'vue';
import useFieldState from '../../src/composables/useFieldsState';

describe('useFieldState composable', () => {
  let composable;

  beforeEach(() => {
    composable = useFieldState();
  });

  it('should add a new state', () => {
    composable.agregarIdState('1', { key: 'value' });

    expect(composable.statesID).toHaveLength(1);
    expect(composable.statesID[0]).toEqual({
      id: '1',
      modifiedData: { key: 'value' },
      pristine: true,
      isModified: false,
    });
  });

  it('should set pristine by id', () => {
    composable.agregarIdState('1', { key: 'value' });
    composable.setPristineById('1', false);

    expect(composable.statesID[0].pristine).toBe(false);
  });

  it('should set modified data', () => {
    composable.agregarIdState('1', { key: 'value' });
    composable.setModifiedData('1', 'key', 'newValue');

    expect(composable.statesID[0].modifiedData.key).toBe('newValue');
    expect(composable.statesID[0].isModified).toBe(true);
  });

 /*  it('should find state by id', () => {
    composable.agregarIdState('1', { key: 'value' });
    const { index, item } = composable.findById('1');

    expect(index).toBe(0);
    expect(item).toEqual(composable.statesID[0]);
  }); */

  it('should save modifications', () => {
    composable.agregarIdState('1', { key: 'value' });
    composable.setModifiedData('1', 'key', 'newValue');
    const modifiedData = composable.guardarModificaciones('1');

    expect(modifiedData).toEqual({ key: 'newValue' });
    expect(composable.statesID[0].pristine).toBe(true);
  });

  it('should cancel modifications', () => {
    composable.agregarIdState('1', { key: 'value' });
    composable.setModifiedData('1', 'key', 'newValue');
    composable.cancelarModificaciones('1');

    expect(composable.statesID[0].modifiedData).toEqual({});
    expect(composable.statesID[0].pristine).toBe(true);
  });

  it('should check if editing', () => {
    composable.agregarIdState('1', { key: 'value' });

    expect(composable.isEditing('1')).toBe(true);
  });

//   it('should delete state by id', () => {
//     composable.agregarIdState('1', { key: 'value' });
//     composable.eliminarIdState('1');

//     expect(composable.statesID).toHaveLength(0);
//   });

  it('should get all unsaved changes', () => {
    composable.agregarIdState('1', { key: 'value' });
    composable.setModifiedData('1', 'key', 'newValue');

    const unsavedChanges = composable.getAllUnsavedChanges();

    expect(unsavedChanges).toEqual([
      { id: '1', modifiedData: { key: 'newValue' } },
    ]);
  });

  it('should reset unsaved changes', () => {
    composable.agregarIdState('1', { key: 'value' });
    composable.setModifiedData('1', 'key', 'newValue');
    composable.resetUnsavedChanges();

    expect(composable.statesID[0].isModified).toBe(false);
  });

  it('should check if any fields are modified globally', () => {
    composable.agregarIdState('1', { key: 'value' });
    composable.setModifiedData('1', 'key', 'newValue');

    expect(composable.areAnyFieldsModifiedGlobally()).toBe(true);
  });

  it('should handle new record created flag', () => {
    composable.markNewRecordCreated();

    expect(composable.isNewRecordCreated.value).toBe(true);

    composable.resetNewRecordCreated();

    expect(composable.isNewRecordCreated.value).toBe(false);
  });

  it('should handle record deleted flag', () => {
    composable.markRecordDeleted();

    expect(composable.isRecordDeleted.value).toBe(true);

    composable.resetRecordDeleted();

    expect(composable.isRecordDeleted.value).toBe(false);
  });

  it('should handle diligencia change flag', () => {
    composable.setDiliginciaChange();

    expect(composable.isDiligenciaChange.value).toBe(true);

    composable.resetDiliginciaChange();

    expect(composable.isDiligenciaChange.value).toBe(false);
  });
});
