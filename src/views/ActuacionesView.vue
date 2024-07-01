<script lang="ts" setup>
import { onMounted } from 'vue';
import DataTableExpansion from '@/components/DataTableExpansion.vue';
import useActuacion from '../composables/useActuacion';
import checkUser from '../guards/checkUser'

const { toogleDateActuacion } = useActuacion()
onMounted(() => {
  console.log('cargue');
  checkUser();
});
</script>
<template>

   <DataTableExpansion />

</template>

<style scoped>

</style>