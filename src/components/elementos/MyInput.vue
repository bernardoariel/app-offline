<script setup lang="ts">
interface Props{
    modelValue?:string | null ,
    type?: 'text' | 'number',
    error?:string,
    color: boolean,
}
const props = withDefaults(defineProps<Props>(),{
    type:'text',
    color:false
})
const emit = defineEmits(['update:modelValue','blur'])
</script>
<template>
    <div>
        <InputText
            :value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value ?? '')"
            @blur="$emit('blur')"
            :type="type"
            :class="{'surface-100': props.color}"
            class="w-full border-round-sm font-semibold"
        />
        <span class="text-red-400" v-if="error">{{ error }}</span>
    </div>
   
</template>
