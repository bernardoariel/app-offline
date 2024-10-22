<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { DatosLegalesComponent, DataViewCard } from '@/components/index';

import {
    useActuacion,
    useCardInformation,
    useItems,
    useDatosLegales,
    useDatosDiligencia,
    useItemValue,
    useFieldsState,
    useLegalesState,
    useCardValidations
} from '@/composables/index'

interface Props {
    id?: number;
    actuacionName: string;
    actuacionData: any;
}
const props = defineProps<Props>();
const activeButtonTab = ref(0);

const { agregarNuevoItem } = useActuacion();
const {
    markNewRecordCreated,
    isUnsavedChange,
    areAnyFieldsModifiedGlobally,
    isNewRecordCreated,
    isRecordDeleted,
    isDiligenciaChange,
} = useFieldsState();
const { isAnyFieldModified: isLegalModified } = useLegalesState();
const { addDataFake } = useDatosLegales();
const { setAll } = useItems();
const { relato } = useDatosDiligencia(props.actuacionName);
const { cardInformationKeys, cardInformation } = useCardInformation(props.actuacionName, props.actuacionData);
const { missingFieldsEmpty } = useCardValidations();
const { prepararNuevoItem } = useItemValue();

const handleClick = (event: { ctrlKey: any; altKey: any }) => {
    if (event.ctrlKey && event.altKey) {
        setAll();
        addDataFake();
        markNewRecordCreated();
        relato.value = 'esto es una prueba del relato';
    }
};

const handleNuevoItem = (key: string) => {
    prepararNuevoItem();
    agregarNuevoItem(key);
};

const isAnyChange = computed(() => {
    return (
        isUnsavedChange.value ||
        areAnyFieldsModifiedGlobally() ||
        isNewRecordCreated.value ||
        isRecordDeleted.value ||
        isLegalModified.value ||
        isDiligenciaChange.value
    );
});

const toggleVisibility = (key: string | number) => {
    cardInformation[key].visible = !cardInformation[key].visible;
}

const isLargeScreen = ref(window.innerWidth >= 992);

const handleResize = () => {
    isLargeScreen.value = window.innerWidth >= 992;
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

</script>

<template>

    <div class="w-full">
        <Card v-if="Object.keys(props.actuacionData).length > 0 ? true : false">
            <template #content>
                <div class="flex gap-2 justify-content-end relative">
                    <div class="flex justify-content-end gap-2 w-full">
                        <Tag @click="handleClick" v-if="$props.id" icon="pi pi-pencil" severity="danger" value="Edición"
                            class="px-2"></Tag>
                        <Tag @click="handleClick" v-else icon="pi pi-bolt" severity="success" value="Nueva"
                            class="px-2"></Tag>
                        <Button @click="activeButtonTab = 0" rounded label="1" class="button"
                            :outlined="activeButtonTab !== 0" />
                        <Button @click="activeButtonTab = 1" rounded label="2" class="button"
                            :outlined="activeButtonTab !== 1" />
                    </div>
                    <div class="change-status">
                        <i :class="isAnyChange ? 'pi pi-circle-fill' : 'pi pi-circle'"></i>
                    </div>
                </div>
                <TabView v-model:activeIndex="activeButtonTab">
                    <TabPanel header="Datos Requeridos">
                        <div class="flex flex-wrap  gap-2 justify-content-evenly lg:block">
                            <Card v-for="key in cardInformationKeys" :key="key" class="p-fluid mb-2 w-full" :style="missingFieldsEmpty[key]
                                ? key === 'efectos'
                                    ? 'borderBottom: 2px solid #f97316'
                                    : 'borderBottom: 2px solid #dc3545'
                                : null
                                ">
                                <template #title>
                                    <div class="flex justify-content-between align-items-center relative">
                                        <div class="flex align-items-center">
                                            <div class="lg:hidden">
                                                <Button v-if="cardInformation[key].visible" icon="pi pi-chevron-up" text
                                                    rounded severity="secondary" @click="toggleVisibility(key)" />
                                                <Button v-else icon="pi pi-chevron-down" text rounded
                                                    severity="secondary" @click="toggleVisibility(key)" />
                                            </div>
                                            <div class="font-medium text-3xl text-900">
                                                {{ cardInformation[key]?.titulo }}
                                            </div>
                                        </div>
                                        <div>
                                            <Button icon="pi pi-plus" severity="secondary" rounded outlined
                                                @click="handleNuevoItem(key as string)"
                                                :data-testid="cardInformation[key].titulo + 'PlusButton'" />
                                        </div>
                                    </div>
                                </template>
                                <template #content>
                                    <div :class="{ 'hidden': !cardInformation[key]?.visible && !isLargeScreen }">
                                        <DataViewCard v-if="cardInformation[key]" :itemsCardValue="cardInformation[key]"
                                            :data-key="key" :actuacion="actuacionName" />
                                    </div>
                                </template>
                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel header="Datos Legales">
                        <DatosLegalesComponent v-if="props.actuacionData?.datosLegales"
                            :datosLegalesItems="props.actuacionData.datosLegales.items" />
                    </TabPanel>
                </TabView>
            </template>
        </Card>
    </div>


</template>

<style scoped>
.change-status {
    position: absolute;
    top: -33px;
    right: -10px;
    font-size: 1.5rem;
}
</style>
