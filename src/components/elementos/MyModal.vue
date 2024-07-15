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
          @click="onButtonClick(button.action)"
          :autofocus="index === 1"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useDialog } from '@/composables/useDialog';

interface ButtonProps {
  label: string;
  class?: string;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  action: string;
}

interface Props {
  visible: boolean;
  title: string;
  route?: string;
  buttons: ButtonProps[];
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'button-click']);

const isVisible = ref(props.visible);
const { hideDialog, confirmNavigation, pendingRoute } = useDialog();

const onButtonClick = (action: string) => {
  emit('button-click', action);
  if (action === 'confirm' && pendingRoute.value) {
    confirmNavigation();
  } else {
    hideDialog();
  }
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
