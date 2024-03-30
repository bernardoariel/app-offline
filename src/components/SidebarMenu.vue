<script lang="ts" setup>
import { sidebarLinks } from "@/data/sideBarLinks";
import { computed, ref } from "vue";
type SidebarPosition = "left" | "right" | "top" | "bottom" | "full";
const visible = ref(false);
interface Props{
    icono:string,
    position?:SidebarPosition,
    colorIcono:string
}
interface GroupedLinks {
  [groupName: string]: typeof sidebarLinks;
}
const closeSidebar = () => {
  visible.value = false;
};
const props = defineProps<Props>();

// Filtra los enlaces basados en los roles
const filteredLinks = computed(() => {
  return sidebarLinks.filter(link => link.roles.includes('Oficial Sumariante'));
});

// Agrupa los enlaces filtrados por el nombre del grupo
const groupedLinks = computed(() => {
  const grouped: GroupedLinks = {};
  filteredLinks.value.forEach(link => {
    if (!grouped[link.grupo]) {
      grouped[link.grupo] = [];
    }
    grouped[link.grupo].push(link);
  });
  return grouped;
});




</script>


<template>
    <div class="card flex justify-content-center">
        <Sidebar v-model:visible="visible" :position="props.position">
            <template #container="{ closeCallback }">
                <div class="flex flex-column h-full">
                    <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                        <span class="inline-flex align-items-center gap-2">
                            <img src="../assets/logo-policia-de-san-juan.png" alt="Logo Policía de San Juan" style="height: 50px;"/>
                        </span>
                        <span>
                            <Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined class="h-2rem w-2rem"></Button>
                        </span>
                    </div>
                    <div class="overflow-y-auto">
                        <div v-for="(links, groupName) in groupedLinks" :key="groupName">
                            <div
                                v-if="groupName!='principal'"
                                v-ripple
                                v-styleclass="{
                                    selector: '@next',
                                    enterClass: 'hidden',
                                    enterActiveClass: 'slidedown',
                                    leaveToClass: 'hidden',
                                    leaveActiveClass: 'slideup'
                                }"
                                class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                                >
                                <span class="font-medium">{{ groupName }}</span>
                                <i class="pi pi-chevron-down"></i>
                            </div>
                            <ul class="list-none p-3 m-0 overflow-hidden">
                                <li v-for="link in links" :key="link.pathName">
                                    <router-link
                                        v-ripple
                                        :to="link.path"
                                        @click="closeSidebar"
                                        class="flex align-items-center no-underline cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                                    >
                                        <i class="mr-2" :class="'pi ' + link.icon "></i>
                                        <span class="font-medium">{{ link.titulo }}</span>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mt-auto">
                        <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
                        <a v-ripple class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                            <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> -->
                            <i class="pi pi-wifi" style="font-size: 2rem; position: relative;">
            <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); width: 2.3rem; height: 2px; background-color: #343a40;"></span>
        </i>
                            <span class="font-bold">Dependecia 2</span>
                        </a>
                    </div>
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