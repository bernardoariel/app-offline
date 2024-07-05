<script lang="ts" setup>
import { sidebarLinks } from "@/data/sideBarLinks";
import { computed, ref, onMounted } from 'vue';
import useActuacion from '@/composables/useActuacion';
import { useStorageData } from '../composables/useStorageData';

type SidebarPosition = "left" | "right" | "top" | "bottom" | "full";
const visible = ref(false);
const { activateComponent } = useActuacion();
const { dependencia } = useStorageData()

interface Props {
    icono: string,
    position?: SidebarPosition,
    colorIcono: string
}
export interface SidebarLink {
    path: string;
    pathName: string;
    titulo: string;
    icon: string;
    roles: string[];
    type: string;
    grupo: string;
    props?: any;
    subitems?: SidebarLink[];
    action?: any;
}
interface GroupedLinks {
    [groupName: string]: SidebarLink[];
}
const dependenciaActual = dependencia.value!['nombre'] ||dependencia.value!['dependenciaLetra']
const closeSidebar = () => {
    visible.value = false;
};
const props = defineProps<Props>();

// Estado de expansión para los enlaces y subenlaces
const linkState = ref<{ [key: string]: boolean }>({});

// Inicializa el estado de los enlaces principales como expandidos
const initializeLinkState = () => {
    sidebarLinks.forEach(link => {
        if (!linkState.value[link.grupo]) {
            linkState.value[link.grupo] = true; // Inicializar grupos principales como expandidos
        }
        linkState.value[link.pathName] = false;
        if (link.subitems) {
            link.subitems.forEach(subitem => {
                linkState.value[subitem.pathName] = false;
            });
        }
    });
};
initializeLinkState();

// Filtra y agrupa los enlaces basados en los roles
const groupedLinks = computed(() => {
    const grouped: GroupedLinks = {};
    sidebarLinks.filter(link => link.roles.includes('Oficial Sumariante')).forEach(link => {
        if (!grouped[link.grupo]) {
            grouped[link.grupo] = [];
        }
        grouped[link.grupo].push(link);
    });
    return grouped;
});

const onHandleClick = () => {
    console.log('HandleClick');
    activateComponent();
    closeSidebar();
};

// Controla la expansión de los links
const toggleLink = (pathName: string | number) => {
    linkState.value[pathName] = !linkState.value[pathName];
};
</script>

<template>
    <div class="card flex justify-content-center">
        <Sidebar v-model:visible="visible" :position="props.position">
            <template #container="{ closeCallback }">
                <div class="flex flex-column h-full">
                    <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                        <span class="inline-flex align-items-center gap-2">
                            <img src="../assets/logo-policia-de-san-juan.png" alt="Logo Policía de San Juan" style="height: 50px;" />
                        </span>
                        <span>
                            <Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined class="h-2rem w-2rem"></Button>
                        </span>
                    </div>
                    <div class="overflow-y-auto">
                        <div v-for="(links, groupName) in groupedLinks" :key="groupName">
                            <div v-if="groupName != 'principal'"
                                v-ripple
                                class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                                @click="toggleLink(groupName)"
                            >
                                <span class="font-medium">{{ groupName }}</span>
                                <i class="pi" :class="linkState[groupName] ? 'pi-chevron-up' : 'pi-chevron-down'"></i>
                            </div>
                            <ul v-show="linkState[groupName]" class="list-none p-3 m-0 overflow-hidden transition-all transition-duration-300">
                                <li v-for="link in links" :key="link.pathName">
                                    <div v-if="link.subitems"
                                        v-ripple
                                        @click="toggleLink(link.pathName)"
                                        class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                                    >
                                        <span class="font-medium">{{ link.titulo }}</span>
                                        <i class="pi" :class="linkState[link.pathName] ? 'pi-chevron-up' : 'pi-chevron-down'"></i>
                                    </div>
                                    <router-link v-else
                                        v-ripple
                                        :to="link.path"
                                        @click="onHandleClick"
                                        class="flex align-items-center no-underline cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                                    >
                                        <i class="mr-2" :class="'pi ' + link.icon"></i>
                                        <span class="font-medium">{{ link.titulo }}</span>
                                    </router-link>
                                    <transition name="slidedown">
                                        <ul v-show="linkState[link.pathName]" class="list-none pl-4 transition-all transition-duration-300">
                                            <li v-for="subitem in link.subitems" :key="subitem.pathName">
                                                <router-link
                                                    v-ripple
                                                    :to="subitem.path"
                                                    @click="onHandleClick"
                                                    class="flex align-items-center no-underline cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                                                >
                                                    <i class="mr-2" :class="'pi ' + subitem.icon"></i>
                                                    <span class="font-medium">{{ subitem.titulo }}</span>
                                                </router-link>
                                            </li>
                                        </ul>
                                    </transition>
                                </li>
                            </ul>
                            <!-- Check if link has subitems -->
                        </div>
                    </div>
                    <div class="mt-auto">
                        <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
                        <a v-ripple class="m-3 flex align-items-center  p-3 gap-2 border-round text-700 transition-duration-150 transition-colors p-ripple">
                            <i class="pi pi-wifi" style="font-size: 2rem; position: relative;">
                                <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); width: 2.3rem; height: 2px; background-color: #343a40;"></span>
                            </i>
                            <span class="font-bold">{{dependenciaActual}}</span>
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
.hidden {
    display: none;
}

.slidedown-enter-active,
.slidedown-leave-active {
    transition: max-height 0.3s ease-in-out;
    overflow: hidden;
}

.slidedown-enter-from,
.slidedown-leave-to {
    max-height: 0;
}

.slidedown-enter-to,
.slidedown-leave-from {
    max-height: 500px; /* Ajusta esto según el contenido */
}
</style>
