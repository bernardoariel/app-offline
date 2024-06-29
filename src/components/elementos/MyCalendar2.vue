<script lang="ts" setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
      modelValue: {
          type: Date,
      required: true,
    }
  });
  
  const emits = defineEmits(['update:modelValue', 'close']);
  
  const internalDate = ref<Date | null>(props.modelValue);
  
  const refreshDate = () => {
      internalDate.value = new Date();
      emits('update:modelValue', internalDate.value);
    };
  
    watch(() => props.modelValue, (newVal) => {
        internalDate.value = newVal;
    });
</script>
<template>
    <div class="flex items-center justify-center ml-3">
        <Calendar dateFormat="dd/mm/yy" v-model="internalDate" :manualInput="false" showTime show-icon>
            <template #footer>
                <div class="flex justify-content-center">
                    <Button
                        label="Cerrar"
                        icon="pi pi-times"
                        class="p-button-text"
                        @click="$emit('close')"
                    />
                </div>
            </template>
        </Calendar>
    </div>
    <Button @click="refreshDate" icon="pi pi-refresh" severity="primary" text rounded />
</template>
  