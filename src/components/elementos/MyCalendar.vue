<template>
  <Calendar
    ref="calendarRef"
    v-model="value"
    :dateFormat="'dd/mm/yy'"
    :manualInput="false"
    :minDate="minDate"
    :maxDate="maxDate"
    showTime
    showIcon
  >
    <template #footer>
      <div class="flex justify-content-between">
        <Button
          label="Hoy"
          icon="pi pi-check"
          class="p-button-text"
          @click="setToNow"
        />
        <div class="flex-grow-1"></div>
        <Button
          label="Cerrar"
          icon="pi pi-times"
          class="p-button-text"
          @click="closeCalendar"
        />
      </div>
    </template>
  </Calendar>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { ComponentPublicInstance } from 'vue';

interface PrimeVueCalendar extends ComponentPublicInstance {
  overlayVisible: boolean;
}

// Define el tipo explícitamente para modelValue
type ModelValue = Date | null;

const props = defineProps<{
  modelValue: ModelValue;
  fechaDesde?: null | 'today' | number;
  fechaHasta?: null | 'today' | number;
}>();

const emits = defineEmits(['update:modelValue']);

const calendarRef = ref<PrimeVueCalendar | null>(null);
const value = ref<ModelValue>(props.modelValue);

function setToNow() {
  value.value = new Date();
  emits('update:modelValue', value.value);
}

const minDate = computed(() => {
  if (props.fechaDesde === 'today') return new Date();
  if (typeof props.fechaDesde === 'number')
    return new Date(Date.now() - props.fechaDesde * 24 * 60 * 60 * 1000);

  return undefined;
});

const maxDate = computed(() => {
  if (props.fechaHasta === 'today') return new Date();
  if (typeof props.fechaHasta === 'number')
    return new Date(Date.now() + props.fechaHasta * 24 * 60 * 60 * 1000);

  return undefined;
});

function closeCalendar() {
  if (calendarRef.value) {
    calendarRef.value.overlayVisible = false;
  }
}

watch(value, (newValue) => {
  emits('update:modelValue', newValue);
});
</script>

<style scoped>
/* Estilos específicos para el calendario si es necesario */
</style>
