<script setup lang="ts">
import { ref } from 'vue';

import MyInput from '@/components/elementos/MyInput.vue';
import MyDropdown from '@/components/elementos/MyDropdown.vue';

import useNewActuacion from '@/composables/useNewActuacion';
import type { FechaUbicacion } from '@/interfaces/fecha.interface';

import { municipiosDropdown } from '@/helpers/getDropItems';


const fechaUbicacion = ref<FechaUbicacion>({
  desdeFechaHora: new Date(),
  hastaFechaHora: new Date(),
  calle: '',
  numero: '',
  departamento: '',
  ubicacion: ''
});
const { fecha } = useNewActuacion();


interface CalendarComponent {
  overlayVisible?: boolean;
  value: Date;
}
const desdeFechaHoraRef = ref<CalendarComponent | null>(null);
const hastaFechaHoraRef = ref<CalendarComponent | null>(null);
const agregarFechaUbicacion = ()=>{
  console.log('agregando fecha')
}
function closeCalendar(calendarRef: CalendarComponent | null) {
  if (calendarRef && 'overlayVisible' in calendarRef) {
    calendarRef.overlayVisible = false;
  }
}

function setToNow(nameInput: 'desdeFechaHora' | 'hastaFechaHora') {
  fechaUbicacion.value[nameInput] = new Date();
}
const time = ref();

</script>
<template>
    <Card>
        <template #content>
          <div class="grid" v-if="fechaUbicacion">
            <div class="col-6">
              <label for="desdeFechaHoraRef">Desde</label>
                <Calendar 
                  ref="desdeFechaHoraRef"
                  v-model="fechaUbicacion.desdeFechaHora" 
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
                  v-model="fechaUbicacion.hastaFechaHora" 
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
                <MyInput type="text" class="mt-2" v-model="fechaUbicacion.calle" />
                </div>
                <div class="col-4">
                <label for="numero">Número</label>
                <MyInput type="text" class="mt-2" v-model="fechaUbicacion.numero" />
                </div>
                <div class="col-4">
                <label for="departamento">Departamento</label>

                <MyDropdown class="mt-2" :items="municipiosDropdown" v-model="fechaUbicacion.departamento" placeholder="Seleccione un departamento" />
                
              </div>
                <!-- Botones para acciones -->
                <div class="ml-auto mt-2 p-0">
                  <Button label="Agregar"  @click="agregarFechaUbicacion()"></Button>
                <!-- Botón para agregar o editar elementos -->
                <!-- <Button label="Agregar" v-if="isEditing" @click="handleAgregarElemento"></Button>
                <Button label="Guardar Cambios" v-else @click="handleModificarElemento"></Button> -->
                </div>
            </div>
        </template>
        </Card>
</template>

  

  