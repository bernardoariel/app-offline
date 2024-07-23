<script setup lang="ts">

interface Props {
    color?: boolean,
    error?: string,
    modelValue: string
    placeholder?: string
}
const props = withDefaults(defineProps<Props>(), {
    color: false,
    modelValue: '' 
})

const emit = defineEmits(['update:modelValue', 'blur'])


</script>

<template>
    <div>
        <Textarea 
            rows="5" cols="120" 
            :value="modelValue" 
            :placeholder
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
            @blur="$emit('blur')"
            :class="{ 'surface-100': props.color, 
            'border-red-500': props.error ? true : false }"
            class="w-full border-round-sm"/>
        <span class="text-red-400" v-if="props.error">{{ props.error }}</span>
    </div>
</template>

<style scoped>
.w-full {
    font-family: inherit;
    font-size: inherit;

}
</style>