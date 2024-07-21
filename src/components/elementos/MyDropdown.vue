<script setup lang="ts">
import { ref } from "vue";

interface Props {
  items: any[],
  placeholder: string,
  color: boolean,
  filter: boolean,
  error?: string,
}
const props = withDefaults(defineProps<Props>(), {
  color: false,
  filter: true
})


const selectedItem = ref<any>(null);
</script>
<template>
  <div>
  <Dropdown v-model="selectedItem" :options="items" :filter optionLabel="name" :placeholder="placeholder"
    :class="{ 'surface-100': props.color, 'border-red-500': props.error ? true : false }"
    class="w-full border-round-sm">
    <template #value="{ value, placeholder }">
      <span v-if="value">{{ value.name }}</span>
      <span v-else>{{ placeholder }}</span>
    </template>
    <template #option="{ option }">
      <span>{{ option.name }}</span>
    </template>
  </Dropdown>
  <span class="text-red-400" v-if="error ? true : false" >
            {{ error }}
          </span>
          </div>

</template>
