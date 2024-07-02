<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface buttonProps {
  label: string;
  class?: string;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  action: string;
}

const props = defineProps({
  visible: Boolean,
  title: String,
  icon: String,
  iconColor: String,
  message: String,
  buttons: Array as () => buttonProps[],
});

const emits = defineEmits(['update:visible', 'button-click']);

const onHide = () => {
  emits('update:visible', false);
};

const onButtonClick = (action:string) => {
  emits('button-click', action);
  emits('update:visible', false);
};
</script>

<template>
  <Dialog :visible="visible" @hide="onHide" modal :style="{ width: '500px' }" closable>
    <template #header>
      <div class="modal-header">
        <h2>{{ title }}</h2>
      </div>
    </template>
    <div class="modal-body">
      <i :class="['pi', icon]" :style="{ fontSize: '2rem', color: iconColor }"></i>
      <p>{{ message }}</p>
    </div>
    <template #footer>
      <div class="modal-footer">
        <Button
          v-for="(button, index) in buttons"
          :key="index"
          :label="button.label"
          :class="button.class"
          :icon="button.icon"
          :iconPos="button.iconPos"
          @click="() => onButtonClick(button.action)"
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
.modal-header {
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
}

.modal-body {
  display: flex;
  align-items: center;
  justify-items: center;
  padding: 1rem;
  gap: 1rem;
}

.modal-body p {
  font-size: 20px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  gap: 1rem;
}
</style>
