<script setup lang="ts">
import InputMask from 'primevue/inputmask';
import { ref, watch } from 'vue';

interface Props {
  modelValue?: string | null,
  error?: string,
  color: boolean,
  placeholder?: string,
  mask?: string,
  slotChar?: string,
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  color: false,
  mask: '',
  slotChar: '',
  placeholder: ''
});

const emits = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

const updateValue = (value: string) => {
  console.log("esto no se ve nunca")
  // const target = event as HTMLInputElement;
  emits('update:modelValue', value);
};
</script>

<template>
  <div>
    <InputMask v-model="localValue" @update:modelValue="updateValue" :placeholder :mask class="w-full border-round-sm"
      :slotChar :class="{ 'surface-100': props.color, 'border-red-500': props.error ? true : false }" />
    <span class="text-red-400" v-if="props.error">{{ props.error }}</span>
  </div>
</template>
<style scoped></style>
