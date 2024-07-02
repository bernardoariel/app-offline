<script lang="ts" setup>
import { onMounted } from 'vue';
import DataTableExpansion from '@/components/DataTableExpansion.vue';
import useActuacion from '../composables/useActuacion';

const { toogleDateActuacion } = useActuacion()

</script>
<template>

   <DataTableExpansion />

</template>

<style scoped>

</style>