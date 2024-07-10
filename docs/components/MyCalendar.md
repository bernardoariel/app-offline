# Componente Calendar Customizado

Este documento describe el uso del componente customizado `Calendar` con PrimeVue. El componente permite la selección de fechas con funcionalidades adicionales como establecer la fecha mínima y máxima, y botones de "Hoy" y "Cerrar" en el pie del calendario.

### Código ejemplo en el componente padre

```vue
<template>
  <Calendar
    ref="calendarRef"
    v-model="selectedDate"
    :dateFormat="'dd/mm/yy'"
    :manualInput="false"
    :minDate="minDate"
    :maxDate="maxDate"
    showTime
    showIcon
    :fechaDesde="fechaDesde"
    :fechaHasta="fechaHasta"
    @update:modelValue="updateDate"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Calendar from '@/components/CalendarCustom.vue';

const selectedDate = ref<Date | null>(null);
const fechaDesde = ref<'today' | number | null>(null); // Ejemplo: 'today' o número de días
const fechaHasta = ref<'today' | number | null>(null);

function updateDate(newDate: Date | null) {
  selectedDate.value = newDate;
}
</script>
```

# Eventos Emitidos (emits)

El componente hijo CalendarCustom.vue utiliza los siguientes emits para comunicar cambios al componente padre:

- update:modelValue: Este evento se emite cada vez que la fecha seleccionada cambia. Se pasa la nueva fecha como argumento del evento.

# Cómo Funcionan los emits

update:modelValue: Se emite en las siguientes situaciones:
Cuando se selecciona una nueva fecha en el calendario.
Cuando se hace clic en el botón "Hoy", lo que establece la fecha a la fecha actual.
Cuando la propiedad modelValue cambia y se sincroniza con la variable interna value.

# Ejemplo de Uso de los emits

```
const emits = defineEmits(['update:modelValue']);

function setToNow() {
  value.value = new Date();
  emits('update:modelValue', value.value);
}

watch(value, (newValue) => {
  emits('update:modelValue', newValue);
});
```

# En el ejemplo anterior:

La función setToNow establece la fecha actual y emite el evento update:modelValue con la nueva fecha.
El watch en la variable value emite el evento update:modelValue cada vez que value cambia.
Esto permite que el componente padre reaccione a los cambios en la fecha seleccionada, actualizando su estado y reflejando los cambios en la interfaz de usuario según sea necesario.
