<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue';

interface Props {
  modelValue?: string | number | null;
  type?: 'text' | 'number';
  error?: string;
  color: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  color: false,
});

const emit = defineEmits(['update:modelValue', 'blur']);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target?.value ?? '');
};

const handleBlur = () => {
  emit('blur');
};
</script>

<template>
  <div>
    <InputText
      :value="props.modelValue"
      :placeholder="props.placeholder"
      @input="handleInput"
      @blur="handleBlur"
      :type="props.type"
      :class="[
        'w-full border-round-sm',
        { 'surface-100': props.color, 'border-red-500': !!props.error },
      ]"
    />
    <span class="text-red-400" v-if="props.error">{{ props.error }}</span>
  </div>
</template>
