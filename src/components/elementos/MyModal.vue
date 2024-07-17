<template>
  <Dialog
    v-model:visible="isVisible"
    :header="title"
    modal
    :style="{ width: '500px' }"
    closable
  >
    <template #header></template>

    <slot name="body" />

    <template #footer>
      <div class="modal-footer">
        <Button
          v-for="(button, index) in buttons"
          :key="index"
          :label="button.label"
          :class="button.class"
          :icon="button.icon"
          :iconPos="button.iconPos"
          :autofocus="button.focus || index === 0"
          @click="onButtonClick(button.action)"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface buttonProps {
  label: string;
  class?: string;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  action: string;
  focus: boolean;
}
interface Props {
  visible: boolean;
  title: string;
  buttons: buttonProps[];
}
const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'button-click']);

const isVisible = ref(props.visible);

const onButtonClick = (action: string) => {
  emit('button-click', action);
  emit('update:visible', false);
};

watch(
  () => props.visible,
  (newVal) => {
    isVisible.value = newVal;
  }
);

watch(isVisible, (newVal) => {
  emit('update:visible', newVal);
});
</script>

<style scoped></style>
