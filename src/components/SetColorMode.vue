<script setup lang="ts">
import { watch, ref } from 'vue';
import useThemeColor from '@/composables/useThemeColor';
import { usePrimeVue } from 'primevue/config';

const PrimeVue = usePrimeVue();
const { currentTheme, changeThemeCurrent } = useThemeColor();
const isDark = ref<boolean>(currentTheme.value.isDark);

watch(isDark, (newValue) => {
  let themeName = currentTheme.value.name;

  if (newValue) {
    themeName = themeName.replace('light', 'dark');
  } else {
    themeName = themeName.replace('dark', 'light');
  }

  PrimeVue.changeTheme(currentTheme.value.name, themeName, 'theme-link', () => {
    changeThemeCurrent(themeName);
  });
});

watch(currentTheme, (newValue) => {
  isDark.value = newValue.isDark;
});
</script>

<template>
  <section class="py-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
    <span class="text-xl font-semibold">Modo oscuro</span>
    <InputSwitch v-model="isDark" :disabled="!currentTheme.hasModeDark" />
  </section>
</template>
