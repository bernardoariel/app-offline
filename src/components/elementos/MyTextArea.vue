<script setup lang="ts">
interface Props{
    color: boolean
}
const props = defineProps<Props>();
</script>
<template>
    <Textarea
      rows="5"
      cols="120"
      :class="{'surface-100': props.color}"
      class="border-round-sm" />
</template>


<style scoped>

</style>