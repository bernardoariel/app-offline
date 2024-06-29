<script lang="ts" setup>
import DataTableExpansion from '@/components/DataTableExpansion.vue';
import useActuacion from '../composables/useActuacion';
import { onActivated } from 'vue';

const { toogleDateActuacion,isActivated } = useActuacion()
onActivated(()=>{
   isActivated.value = false
})
</script>
<template>

   <DataTableExpansion />

</template>

<style scoped>

</style>