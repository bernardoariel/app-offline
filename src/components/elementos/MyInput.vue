<script setup lang="ts">
interface Props {
    modelValue?: string | number | null,
    type?: 'text' | 'number',
    error?: string,
    color: boolean,
    placeholder?: string,
}
const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    color: false
})
const emit = defineEmits(['update:modelValue', 'blur'])
// console.log(props )
// console.log(props )
</script>
<template>
    <div>
        <InputText
            :value="modelValue" 
            :placeholder
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
            @blur="$emit('blur')"
            :type="type" 
            :class="{ 'surface-100': props.color, 'border-red-500': props.error ? true : false }"
            class="w-full border-round-sm" 
        />
        <span class="text-red-400" v-if="error">{{ error }}</span>
    </div>

</template>
