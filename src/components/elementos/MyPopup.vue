<template>
  <div>
    <!-- Botón para activar el ConfirmPopup -->
    <Button @click="requireConfirmation" :label="label" :icon="icon" />

    <!-- ConfirmPopup con slot personalizado -->
    <ConfirmPopup ref="confirmPopup" :target="popupTarget">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="border-round p-3">
          <span>{{ title }}</span>
          <slot name="body" />
          <div class="flex align-items-center gap-2 mt-3">
            <Button
              v-for="(button, index) in buttons"
              :key="index"
              :label="button.label"
              :class="button.class"
              :icon="button.icon"
              :iconPos="button.iconPos"
              @click="() => handleButtonClick(button.action, acceptCallback, rejectCallback)"
              :autofocus="index === 0"
            />
          </div>
        </div>
      </template>
    </ConfirmPopup>
    <!-- Elemento target para el popup -->
    <div ref="popupTarget" style="display: none;"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ConfirmPopup from 'primevue/confirmpopup';
import Button from 'primevue/button';

interface buttonProps {
  label: string;
  class?: string;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  action: string;
}

interface Props {
  visible: boolean;
  title: string;
  label: string
  icon?: string;
  buttons: buttonProps[];
}

const props = defineProps<Props>();
const emit = defineEmits(['update:visible', 'button-click']);

const confirmPopup = ref();
const popupTarget = ref<HTMLElement | null>(null);

const requireConfirmation = (event: Event) => {
  if (popupTarget.value) {
    popupTarget.value.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
  }
};

const handleButtonClick = (action: string, acceptCallback?: Function, rejectCallback?: Function) => {
  emit('button-click', action);
  emit('update:visible', false);
  if (action === 'accept' && acceptCallback) {
    acceptCallback();
  } else if (action === 'reject' && rejectCallback) {
    rejectCallback();
  }
};

const isVisible = ref(props.visible);

watch(() => props.visible, (newVal) => {
  isVisible.value = newVal;
});

watch(isVisible, (newVal) => {
  emit('update:visible', newVal);
});
</script>

<style scoped>
</style>
