<script setup lang="ts">
import { onActivated, ref, watch } from 'vue';
import useFecha from '@/composables/useFecha';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFiledsState';

import MyInput from '@/components/elementos/MyInput.vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';

import type { FechaUbicacionForm, FechaUbicacion } from '../interfaces/fecha.interface';
import { municipiosDropdown } from '@/helpers/getDropItems';
interface CalendarComponent {
  overlayVisible?: boolean;
  value: Date;
}
const {
  agregar,
  editar,
  initialValues,
  selectedMunicipioDrop } = useFecha()

const { selectedItem } = useItemValue()
const { statesID, setPristineById, setModifiedData, guardarModificaciones,isEditing, cancelarModificaciones } = useFieldState();
let formData = ref<FechaUbicacionForm>({ ...initialValues });
const desdeFechaHoraRef = ref<CalendarComponent | null>(null);
const hastaFechaHoraRef = ref<CalendarComponent | null>(null);

onActivated(() => {
  selectedItem.value= null
});

const handleDropdownChange = (
  campo: keyof FechaUbicacionForm, 
  newValue: { value: any;name:string }
  ) => {

  const name = newValue.value.name

  if (campo in formData.value) {
    // Actualizar formData para que el campo específico tenga un objeto con la propiedad 'name' actualizada
    formData.value = { 
      ...formData.value, 
      [campo]: { name } // Asigna un objeto con 'name' a campo
    };

    const itemId = formData.value.id!;
    if (itemId) { 
      setPristineById(itemId, false);
      setModifiedData(itemId, campo,  name );
    }
  }
};

const getInputValue = (campo: keyof FechaUbicacionForm) => {
  if (campo in formData.value) {
    const modifiedData = statesID.find((state) => state.id === selectedItem.value?.id)?.modifiedData;
    return modifiedData && modifiedData[campo] !== undefined ? modifiedData[campo] : formData.value[campo];
  }
};

const handleInputChange = (campo: string | number, event: Event) => {
  const valor = (event.target as HTMLInputElement).value;
  formData.value = { ...formData.value, [campo]: valor };

  const itemId = formData.value.id!;
  setPristineById(itemId, false);
  
  const campoStr = typeof campo === 'number' ? campo.toString() : campo;
  setModifiedData(itemId, campoStr, valor);
};

const handleBlur = (campo: keyof FechaUbicacionForm) => {
  const valor = getInputValue(campo);
  if (!selectedItem.value) return 

  setModifiedData(selectedItem.value!.id, campo, valor);
};

const handleAgregarElemento = () => {

  if(!formData.value) return 
  const nuevoItem: FechaUbicacion = {
    desdeFechaHora: formData.value.desdeFechaHora,
    hastaFechaHora: formData.value.hastaFechaHora,
    calle: formData.value.calle,
    numero: formData.value.numero,
    departamento: selectedMunicipioDrop.value!.name
  };

  agregar(nuevoItem)
  formData.value = ({ ...initialValues });
};
const handleCancelar = () => {
  if (!selectedItem.value) return;
  cancelarModificaciones(selectedItem.value.id);
  formData.value = formData.value = { ...initialValues, ...selectedItem.value };
};
const handleModificarElemento = () => {
  let itemStateEncontrado = guardarModificaciones(selectedItem.value!.id);
  let itemAEditar = {
      ...formData.value,
      departamento: selectedMunicipioDrop.value!.name,
      ...itemStateEncontrado
    };
  editar(itemAEditar);

};
function closeCalendar(calendarRef: CalendarComponent | null) {
  if (calendarRef && 'overlayVisible' in calendarRef) {
    calendarRef.overlayVisible = false;
  }
}

function setToNow(nameInput: 'desdeFechaHora' | 'hastaFechaHora') {
  formData.value[nameInput] = new Date();
}

watch(selectedItem, (newVal:any) => {
  if (!newVal) {
       formData.value = ({ ...initialValues });
   } else {
       formData.value = ({...newVal});
   }
});
</script>
<template>
    <Card>
        <template #content>
          <div class="grid">
            <div class="col-6">
              <label for="desdeFechaHoraRef">Desde</label>
                <Calendar 
                  ref="desdeFechaHoraRef"
                  v-model="formData.desdeFechaHora" 
                  :manualInput="false" 
                  showTime 
                  showIcon>
                  
                  <template #footer>
                    <div class="flex justify-content-between">
                 
                      <Button
                        label="Hoy"
                        icon="pi pi-check"
                        class="p-button-text"
                        @click="setToNow('desdeFechaHora')"

                      />
                      <div class="flex-grow-1"></div>
             
                      <Button
                        label="Cerrar"
                        icon="pi pi-times"
                        class="p-button-text"
                        @click="closeCalendar(desdeFechaHoraRef)"
                      />
                    </div>
                  </template>

                </Calendar>
                </div>
                <div class="col-6">
                <label for="hastaFechaHoraRef">Hasta</label>
                <Calendar 
                  ref="hastaFechaHoraRef"
                  v-model="formData.hastaFechaHora" 
                  :manualInput="false" 
                  showTime 
                  showIcon>
                  
                  <template #footer>
                    <div class="flex justify-content-between">
                      <!-- Botón "Ahora" alineado a la izquierda -->
                      <Button
                        label="Hoy"
                        icon="pi pi-check"
                        class="p-button-text"
                        @click="setToNow('hastaFechaHora')"
                      />

                <!-- Espaciador para empujar los elementos al extremo de sus lados respectivos -->
                <div class="flex-grow-1"></div>

              <!-- Botón "Cerrar" alineado a la derecha -->
              <Button
                label="Cerrar"
                icon="pi pi-times"
                class="p-button-text"
                @click="closeCalendar(hastaFechaHoraRef)"
              />
            </div>
          </template>


                </Calendar>
                </div>
                <div class="col-4">
                  <label for="calle">Calle</label>
                  <MyInput
                    type="text"
                    class="mt-2"
                    :value="getInputValue('calle')"
                    @input="handleInputChange('calle', $event)"
                    @blur="() => handleBlur('calle')" 
                    :color="!!selectedItem"/>
                  </div>
                <div class="col-4">
                <label for="numero">Número</label>
                <MyInput
                  type="text"
                  class="mt-2"
                  :value="getInputValue('numero')"
                  @input="handleInputChange('numero', $event)"
                  @blur="() => handleBlur('numero')"
                  :color="!!selectedItem"/>
                  </div>
                <div class="col-4">
                <label for="departamento">Departamento</label>

                <MyDropdown
                  class="mt-2"
                  :items="municipiosDropdown"
                  v-model="selectedMunicipioDrop"
                  @change="(newValue) => handleDropdownChange('departamento', newValue)"
                  placeholder="Seleccione un departamento" :color="!!selectedItem" />
                
              </div>
                <!-- Botones para acciones -->
                <div class="ml-auto mt-2 p-0">
              <Button
                label="Agregar"
                v-if="!selectedItem"
                @click="handleAgregarElemento()">
              </Button>                
              <div v-else>
                  <Button 
                    :disabled="isEditing(selectedItem!.id)" label="Cancelar"
                    icon="pi pi-times" severity="secondary" outlined aria-label="Cancel" class="mr-3"
                    @click="handleCancelar"
                    ></Button>        
                    <Button
                        label="Guardar Cambios"
                        :disabled="isEditing(selectedItem!.id)"
                        @click="handleModificarElemento()"
                        severity="warning"
                      ></Button>
                </div>
            </div>
            </div>
            <pre>
          <span v-for="(id, pristine) in statesID" key="id">
            ID: {{id}}, Pristine: {{ pristine }}
          </span>
        </pre>
        </template>
    </Card>
</template>

  

  