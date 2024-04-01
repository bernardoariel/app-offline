<script setup lang="ts">
interface Props{
    type:string,
    color: boolean
}
const props = withDefaults(defineProps<Props>(),{
    type:'text',
    color:false
})
</script>
<template>
   <InputText
        :type="type"
        :class="{'surface-100': props.color}"
        class="w-full border-round-sm font-semibold"
    />
</template>


<style scoped>

</style>