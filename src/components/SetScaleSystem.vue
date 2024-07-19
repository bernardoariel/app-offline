<script lang="ts" setup>
import { computed } from 'vue';
import Button from 'primevue/button';
import useTheme from '@/composables/useTheme';

const { currentTheme, changeFontSize } = useTheme();

const iconClass = computed(() => {
  return [
    currentTheme.value.fontSize === 12 ? 'text-primary' : 'text-200',
    currentTheme.value.fontSize === 13 ? 'text-primary' : 'text-200',
    currentTheme.value.fontSize === 14 ? 'text-primary' : 'text-200',
    currentTheme.value.fontSize === 15 ? 'text-primary' : 'text-200',
    currentTheme.value.fontSize === 16 ? 'text-primary' : 'text-200',
  ];
});

const increaseFontSize = (): void => {
  if (currentTheme.value.fontSize < 16) {
    changeFontSize(currentTheme.value.fontSize + 1);
  }
};

const decreaseFontSize = (): void => {
  if (currentTheme.value.fontSize > 12) {
    changeFontSize(currentTheme.value.fontSize - 1);
  }
};
</script>

<template>
  <section
    class="pb-4 flex align-items-center justify-content-between border-bottom-1 surface-border"
  >
    <span class="text-xl font-semibold">Escala</span>
    <div
      class="flex align-items-center gap-2 border-1 surface-border py-1 px-2"
      style="border-radius: 30px"
    >
      <Button
        severity="primary"
        text
        rounded
        @click="decreaseFontSize"
        style="font-size: 0.5rem"
      >
        <template #icon>
          <i class="pi pi-minus"></i>
        </template>
      </Button>

      <i class="pi pi-circle-fill text-sm" :class="iconClass[0]"></i>
      <i class="pi pi-circle-fill text-sm" :class="iconClass[1]"></i>
      <i class="pi pi-circle-fill text-sm" :class="iconClass[2]"></i>
      <i class="pi pi-circle-fill text-sm" :class="iconClass[3]"></i>
      <i class="pi pi-circle-fill text-sm" :class="iconClass[4]"></i>

      <Button
        severity="primary"
        text
        rounded
        @click="increaseFontSize"
        style="font-size: 0.5rem"
      >
        <template #icon>
          <i class="pi pi-plus"></i>
        </template>
      </Button>
    </div>
  </section>
</template>
