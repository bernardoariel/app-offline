
<script setup lang="ts">
import DataViewCard from './DataViewCard.vue';

interface Props {
  tarjeta: string | { titulo: string; valor: string[] };
}

const {tarjeta} = defineProps<Props>()

const isObject = (value: unknown): value is { titulo: string; valor: string[] } => {
  return typeof value === 'object' && value !== null;
};

</script>
<template>
    <Card class="p-fluid">
        <template #title>
          <div class="title-container">
            <span>{{ isObject(tarjeta) ? tarjeta.titulo : tarjeta }}</span>
            <Button icon="pi pi-plus" severity="secondary" rounded outlined />
          </div>
        </template>
        <template #content>
          <!-- Contenido de tu componente -->
          <DataViewCard />
        </template>
      </Card>
</template>

<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>