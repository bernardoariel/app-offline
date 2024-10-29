<script setup lang="ts">
import { ref, watch } from 'vue';
import { type InputNumberInputEvent } from 'primevue/inputnumber';

interface Props {
    modelValue?: number;
    error?: string;
    color: boolean;
    placeholder?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | null): void;
    (e: 'blur'): void;
}>();

const internalValue = ref<number | null>(props.modelValue ?? null);

watch(() => props.modelValue, (newValue) => {
    internalValue.value = newValue;
});

const handleInput = (event: InputNumberInputEvent) => {
    const value = event.value !== null ? Number(event.value) : null;
    internalValue.value = value;
    emit('update:modelValue', value); // Asegúrate de que se emite correctamente
};

const handleBlur = () => {
    emit('blur');
};
</script>

<template>
    <div>
        <InputNumber v-model="internalValue" :placeholder="props.placeholder" @input="handleInput" @blur="handleBlur"
            :useGrouping="false" :class="[
                'w-full border-round-sm',
                { 'surface-100': props.color, 'border-red-500': !!props.error }
            ]" />
        <span class="text-red-400" v-if="props.error">{{ props.error }}</span>
    </div>
</template>
