<template>
  <DataTableExpansion />
</template>

<script setup lang="ts">
import DataTableExpansion from '@/components/DataTableExpansion.vue';
import { onActivated } from 'vue';
import useActuacion from '@/composables/useActuacion';
const {isActuationInit,currentEditId} = useActuacion()
onActivated(()=>{
  isActuationInit.value = false 
  currentEditId.value = null
})
</script>

<style scoped>
</style>
