
<script setup lang="ts">
import DataViewCard from '@/components/DataViewCard.vue';


</script>
<template>
    <div class="grid">
      <div class="col">
        <Card class="p-fluid">
          <template #title>
            <div class="title-container">
              <span>Afectados</span>
   
              <Button icon="pi pi-plus" severity="secondary" rounded outlined />
            </div>
          </template>
          <template #content>
            <!-- <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </p> -->
           <!-- <DataViewCard /> -->
          </template>
        </Card>
      </div>
  
      <div class="col">
        <div class="text-center p-3 border-round-sm bg-primary font-bold ">3</div>
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