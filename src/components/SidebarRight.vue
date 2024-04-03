<script lang="ts" setup>
import { ref } from "vue";
import SetScaleSystem from "./SetScaleSystem.vue";
import SetColorMode from "./SetColorMode.vue";
import SetColorSystem from "./SetColorSystem.vue";


type SidebarPosition = "left" | "right" | "top" | "bottom" | "full";
const visible = ref(false);
interface Props{
    icono:string,
    position?:SidebarPosition,
    colorIcono:string
}

const closeSidebar = () => {
  visible.value = false;
};
const props = defineProps<Props>();



</script>

<template>
    <div class="card flex justify-content-center">
        <Sidebar v-model:visible="visible" :position="props.position">
            <template #container="{ closeCallback }">
                <div class="flex flex-column h-full">
                    <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0 bg-cyan-800">
                        <span>
                            <Button type="button" @click="closeCallback" icon="pi pi-times" rounded text outlined class="h-2rem w-2rem">
                                <i class="pi pi-times" style="color: whitesmoke"></i>
                            </Button>
                        </span>
                        <span class="inline-flex align-items-center gap-2">
                            <h1 style="color:whitesmoke">Configuración</h1>
                        </span>
                    </div>

                    <SetScaleSystem class="mt-5 px-2"/>

                    <SetColorMode class="px-2" />          
                    <SetColorSystem class="px-2" />
                    
                </div>
            </template>
        </Sidebar>
        <Button :severity="colorIcono" text rounded @click="visible = true">
            <template #icon>
                <i :class="['pi', icono]" style="font-size: 1.50rem;"></i>
            </template>
        </Button>
    </div>
</template>


<style scoped>

</style>