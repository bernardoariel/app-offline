<script setup lang="ts">
import { ref, watch } from 'vue';

import MyInput from '@/components/elementos/MyInput.vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';

import { municipiosDropdown } from '@/helpers/getDropItems';
import type { FechaUbicacionForm, FechaUbicacion } from '../interfaces/fecha.interface';
import useFecha from '@/composables/useFecha';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFiledsState';
interface CalendarComponent {
  overlayVisible?: boolean;
  value: Date;
}
const {initialValues,agregar,selectedMunicipioDrop} = useFecha()
const { selectedItem } = useItemValue()
const { agregarIdState, setPristineById, setModifiedData, guardarModificaciones } = useFieldState();

const formData = ref<FechaUbicacionForm>({...initialValues.value});
const desdeFechaHoraRef = ref<CalendarComponent | null>(null);
const hastaFechaHoraRef = ref<CalendarComponent | null>(null);

const getInputValue = (campo: keyof FechaUbicacionForm) => {
  return formData.value[campo];
};

const handleInputChange = (campo: keyof FechaUbicacionForm, event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  // Verificar si el campo es 'jerarquia' o 'dependencia'
  const field = formData.value[campo] as { name: string };
  field.name = value;
};
const { statesID } = useFieldState();

const handleBlur = (campo: string) => {
  // Aquí podrías hacer algo adicional si lo necesitas
};

const handleAgregarElemento = () => {

    const nuevoItem: FechaUbicacion = {
      desdeFechaHora: formData.value.desdeFechaHora,
      hastaFechaHora: formData.value.hastaFechaHora,
      calle: formData.value.calle,
      numero: formData.value.numero,
      departamento: selectedMunicipioDrop.value.name
    };

    agregar(nuevoItem)

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
    
    if (!newVal)  formData.value = ({ ...initialValues.value })
    formData.value = ({...newVal})
    
   
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
                <MyInput type="text" class="mt-2" v-model="formData.calle" />
                </div>
                <div class="col-4">
                <label for="numero">Número</label>
                <MyInput type="text" class="mt-2" v-model="formData.numero" />
                </div>
                <div class="col-4">
                <label for="departamento">Departamento</label>

                <MyDropdown
                  class="mt-2"
                  :items="municipiosDropdown"
                  v-model="selectedMunicipioDrop"
                  placeholder="Seleccione un departamento" />
                
              </div>
                <!-- Botones para acciones -->
                <div class="ml-auto mt-2 p-0">
                  <Button label="Agregar"  @click="handleAgregarElemento()"></Button>
                <!-- Botón para agregar o editar elementos -->
                <!-- <Button label="Agregar" v-if="isEditing" @click="handleAgregarElemento"></Button>
                <Button label="Guardar Cambios" v-else @click="handleModificarElemento"></Button> -->
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

  

  