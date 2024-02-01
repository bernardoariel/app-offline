<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["items", "placeholder"]);

const selectedItem = ref();
</script>
<template>
    <Dropdown
      v-model="selectedItem"
      :options="items"
      filter
      optionLabel="name"
      :placeholder="placeholder"
      class="w-full border-round-sm "
    >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center">
        <div>{{ slotProps.value.name }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex align-items-center">
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Dropdown>
</template>



<style scoped>
/* Estilos específicos del componente */
</style>
