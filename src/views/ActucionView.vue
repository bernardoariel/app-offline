<script lang="ts" setup>
import DataViewCard from '@/components/DataViewCard.vue';
import { useRoute } from 'vue-router';

const {params} = useRoute();

</script>

<template>
  <div class="grid">
    <div class="col">
      <Card class="p-fluid">
        <template #title>
          <div class="title-container">
            <span>{{ params.actuacion }}</span>
            <Button icon="pi pi-plus" severity="secondary" rounded outlined />
          </div>
        </template>
        <template #content>
          <!-- Contenido de tu componente -->
          <DataViewCard />
        </template>
      </Card>
    </div>

    <div class="col">
      <div class="text-center p-3 border-round-sm bg-primary font-bold">3</div>
    </div>
  </div>
</template>

<style scoped>
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>