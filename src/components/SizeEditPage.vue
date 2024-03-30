<script lang="ts" setup>
import { computed, ref } from 'vue';
type SidebarPosition = "left" | "right" | "top" | "bottom" | "full";
const fontSize = ref(14); // Tamaño inicial de la fuente en píxeles
let colorIcono = "primary"
const iconClass = computed(() => {
  return [
    fontSize.value === 12 ? 'text-primary' : 'text-200', 
    fontSize.value === 13 ? 'text-primary' : 'text-200', 
    fontSize.value === 14 ? 'text-primary' : 'text-200', 
    fontSize.value === 15 ? 'text-primary' : 'text-200', 
    fontSize.value === 16 ? 'text-primary' : 'text-200', 
  ];
});

const increaseFontSize = (): void => {
  if(fontSize.value < 16) fontSize.value++;
  document.documentElement.style.fontSize = `${fontSize.value}px`;
};

const decreaseFontSize = (): void => {
  if(fontSize.value > 12) fontSize.value--;
  document.documentElement.style.fontSize = `${fontSize.value}px`;
};
</script>
<template>
    <section class="pb-4 flex align-items-center justify-content-between border-bottom-1 surface-border">
        <span class="text-xl font-semibold">Escala</span>
        <div class="flex align-items-center gap-2 border-1 surface-border py-1 px-2" style="border-radius: 30px;">
            
            <Button :severity="colorIcono" text rounded @click="decreaseFontSize" style="font-size: 0.50rem;">
                <template #icon>
                    <i class="pi pi-minus" ></i>
                </template>
            </Button>

            <i class="pi pi-circle-fill text-sm" :class="iconClass[0]"></i>
            <i class="pi pi-circle-fill text-sm" :class="iconClass[1]"></i>
            <i class="pi pi-circle-fill text-sm" :class="iconClass[2]"></i>
            <i class="pi pi-circle-fill text-sm" :class="iconClass[3]"></i>
            <i class="pi pi-circle-fill text-sm" :class="iconClass[4]"></i>
            <Button :severity="colorIcono" text rounded @click="increaseFontSize" style="font-size: 0.50rem;">
                <template #icon>
                    <i class="pi pi-plus" ></i>
                </template>
            </Button>
        </div>
    </section>
</template>



<style lang="scss" scoped>

</style>