<script setup lang="ts">
import InputMask from 'primevue/inputmask';
import { ref, watch } from 'vue';

interface Props {
  modelValue?: string;
  error?: string;
  color: boolean;
  placeholder?: string;
  mask?: string;
  slotChar?: string;
}

const props = defineProps<Props>();

const emits = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  localValue.value = target.value; // Actualiza localValue antes de emitir el evento
  emits('update:modelValue', target.value); // Emite el evento con el valor actual
};
</script>

<template>
  <div>
    <InputMask
      v-model="localValue"
      @blur="updateValue"
      :placeholder="props.placeholder"
      :mask="props.mask"
      :slotChar="props.slotChar"
      class="w-full border-round-sm"
      :class="{
        'surface-100': props.color,
        'border-red-500': props.error ? true : false,
      }"
    />
    <span class="text-red-400" v-if="props.error">{{ props.error }}</span>
  </div>
</template>
<style scoped></style>
