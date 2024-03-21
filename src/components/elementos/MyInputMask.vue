<script setup lang="ts">
const props = defineProps({
  modelValue: String
});
const emit = defineEmits(['update:modelValue', 'blur']);

const updateValue = (event:any) => {
  emit('update:modelValue', event.target.value);
};

const onBlur = () => {
  emit('blur');
};
</script>
<template>
    <InputMask
      :model-value="props.modelValue"
      @input="updateValue($event)"
      @blur="onBlur"
      placeholder="dd/mm/yyyy"
      mask="99/99/9999"
      class="w-full border-round-sm"
      slotChar="dd/mm/yyyy" />
  </template>
<style scoped>

</style>