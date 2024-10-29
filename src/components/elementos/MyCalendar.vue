<template>
  <Calendar ref="calendarRef" v-model="innerValue" :dateFormat="'dd/mm/yy'" :manualInput="false"
    :minDate="computedMinDate" :maxDate="computedMaxDate" showTime showIcon>
    <template #footer>
      <div class="flex justify-content-between">
        <Button label="Hoy" icon="pi pi-check" class="p-button-text" @click="setToNow" />
        <div class="flex-grow-1"></div>
        <Button label="Cerrar" icon="pi pi-times" class="p-button-text" @click="closeCalendar" />
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

type ModelValue = Date | null;

const props = defineProps<{
  modelValue: ModelValue;
  minDate?: Date | 'today' | number | null;
  maxDate?: Date | 'today' | number | null;
}>();

const emits = defineEmits(['update:modelValue']);

const calendarRef = ref<PrimeVueCalendar | null>(null);
const innerValue = ref<ModelValue>(props.modelValue);

const computedMinDate = computed(() => {
  if (props.minDate === 'today') return new Date();
  if (typeof props.minDate === 'number')
    return new Date(Date.now() - props.minDate * 24 * 60 * 60 * 1000);
  return props.minDate ?? undefined;
});

const computedMaxDate = computed(() => {
  if (props.maxDate === 'today') return new Date();
  if (typeof props.maxDate === 'number')
    return new Date(Date.now() + props.maxDate * 24 * 60 * 60 * 1000);
  return props.maxDate ?? undefined;
});

function setToNow() {
  const now = new Date();
  if (innerValue.value?.getTime() !== now.getTime()) {
    innerValue.value = now;
    emits('update:modelValue', now);
  }
}

function closeCalendar() {
  if (calendarRef.value) {
    calendarRef.value.overlayVisible = false;
  }
}

watch(innerValue, (newValue) => {
  if (newValue?.getTime() !== props.modelValue?.getTime()) {
    emits('update:modelValue', newValue);
  }
});

watch(() => props.modelValue, (newValue) => {
  if (newValue?.getTime() !== innerValue.value?.getTime()) {
    innerValue.value = newValue;
  }
});
</script>
