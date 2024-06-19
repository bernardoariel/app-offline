<script lang="ts" setup>
import { ref, onMounted, reactive, onActivated } from 'vue';
import { useToast } from 'primevue/usetoast';
import { ProductService } from '@/service/ProductService';
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import useSaveData from '../composables/useSaveData';

const products = ref();
const expandedRows = ref([]);
const toast = useToast();

const selectedOption = ref('afectados');
const {fetchActuaciones}= useSaveData()
let actuaciones:any 
/* onMounted(async () => {
    actuaciones = await fetchActuaciones();
    products.value = actuaciones
    // ProductService.getProductsWithOrdersSmall().then((data: any) => (products.value = data));
}) */
onActivated(async()=>{
    actuaciones = await fetchActuaciones();
    products.value = actuaciones
})
const onRowExpand = (event: { data: { name: any; }; }) => {
    toast.add({ severity: 'info', summary: 'Item Expandidos', detail: event.data.name, life: 3000 });
};
const onRowCollapse = (event: { data: { name: any; }; }) => {
    toast.add({ severity: 'success', summary: 'Items Colapsados', detail: event.data.name, life: 3000 });
};
const expandAll = () => {
    expandedRows.value = products.value.reduce((acc: { [x: string]: boolean; }, p: { id: string | number; }) => (acc[p.id] = true) && acc, {});
};
const collapseAll = () => {
    expandedRows.value = [];
};

const getSeverity = (product: { statusActuacion: any; }) => {
    switch (product.statusActuacion) {
        case 'EN CURSO':
            return 'success';

        case 'VENCIDA':
            return 'warning';

        case 'FINALIZADA':
            return 'danger';

        default:
            return null;
    }
};
const getOrderSeverity = (order:any) => {
    switch (order.status) {
        case 'DELIVERED':
            return 'success';

        case 'CANCELLED':
            return 'danger';

        case 'PENDING':
            return 'warning';

        case 'RETURNED':
            return 'info';

        default:
            return null;
    }
};
const editActuacion = (event) => {
    console.log('Editar actuación', event);
};
</script>
<template>
     <div class="card">
        <DataTable 
            class="my-custom-datatable"    
            v-model:expandedRows="expandedRows" :value="products" dataKey="id"
            @rowExpand="onRowExpand" @rowCollapse="onRowCollapse" tableStyle="min-width: 60rem">
            <!-- <template #header >
                <div class="flex flex-wrap justify-content-end gap-2">
                    <Button text icon="pi pi-plus"  @click="expandAll" style="font-size: 0.1rem;"/>
                    <Button text icon="pi pi-minus" @click="collapseAll" />
                </div>
            </template> -->
            <Column expander style="width: 5rem" />
            <Column field="fechaCreacion" header="Fecha"></Column>
            <Column field="nroLegajoCompleto" header="Nro.de Actuación"></Column>
            <Column field="nombreActuacion" header="Actuaciones"></Column>
            <Column field="juzgadoInterviniente" header="Juzgado"></Column>
            <Column header="Acciones">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" @click="editActuacion($event)" class="p-button-rounded p-button-text" />
                </template>
            </Column>
            <!-- <Column header="Estado">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.statusActuacion" :severity="getSeverity(slotProps.data) as string" />
                </template>
            </Column> -->
            <template #expansion="slotProps">
                <div class="p-3">
                    
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="selectedOption" inputId="optionAfectados" name="options" value="afectados" />
                            <label for="afectados" class="ml-2">Afectados</label>
                        </div>
                        <div class="flex align-items-center">
                            <RadioButton v-model="selectedOption" inputId="optionVinculados" name="options" value="vinculados" />
                            <label for="vinculados" class="ml-2">Vinculados</label>
                        </div> 
                        <div class="flex align-items-center">
                            <RadioButton v-model="selectedOption" inputId="optionFechaUbicacion" name="options" value="fechaUbicacion" />
                            <label for="fechaUbicacion" class="ml-2">Fecha y Ubicación</label>
                        </div> 
                        <div class="flex align-items-center">
                            <RadioButton v-model="selectedOption" inputId="optionEfectos" name="options" value="efectos" />
                            <label for="fechaEfectos" class="ml-2">Efectos</label>
                        </div> 
                        <div class="flex align-items-center">
                            <RadioButton v-model="selectedOption" inputId="optionIntervinientes" name="options" value="intervinientes" />
                            <label for="intervinientes" class="ml-2">Intervinientes</label>
                        </div> 
                    </div>
                    <div v-if="selectedOption === 'afectados'">
                        
                        <div class="flex justify-content-center">
                            <h2 class="uppercase">Afectados</h2>
                        </div>
                        <DataTable :value="slotProps.data.afectados">
                            <Column field="nombre" header="Nombre" sortable></Column>
                            <Column field="apellido" header="Apellido" sortable></Column>
                            <Column field="nroDocumento" header="Nro.Documento" sortable></Column>
                            <Column field="telefono" header="Teléfono" sortable></Column>
                            <Column header="Tipo de Afectado">
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.typeAfectado" :severity="getColorByAfectado(slotProps.data.typeAfectado)" />
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                    <div v-if="selectedOption === 'vinculados'">
                        <div class="flex justify-content-center">
                            <h2 class="uppercase">Vinculados</h2>
                        </div>
                        <DataTable :value="slotProps.data.vinculados">
                            <Column field="nombre" header="Nombre" sortable></Column>
                            <Column field="apellido" header="Apellido" sortable></Column>
                            <Column field="nroDocumento" header="Nro.Documento" documento></Column>
                            <Column field="telefono" header="Teléfono" sortable></Column>
                            <Column field="apodo" header="Apodo" sortable></Column>
                            <Column header="Tipo de Vinculado">
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.typeAfectado" :severity="getColorByAfectado(slotProps.data.typeAfectado)" />
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                    <div v-if="selectedOption === 'fechaUbicacion'">
                        <div class="flex justify-content-center">
                            <h2 class="uppercase">Fecha Ubicacion</h2>
                        </div>
                        <DataTable :value="slotProps.data.fechaUbicacion">
                            <Column field="desdeFechaHora" header="Fecha desde"></Column>
                            <Column field="hastaFechaHora" header="Fecha hasta"></Column>
                            <Column field="calle" header="Calle"></Column>
                            <Column field="numero" header="Número"></Column>
                            <Column field="departamento" header="Departamento"></Column>
                        </DataTable>
                    </div>
                    <div v-if="selectedOption === 'efectos'">
                        <div class="flex justify-content-center">
                            <h2 class="uppercase">Efectos</h2>
                        </div>
                        <DataTable :value="slotProps.data.efectos">
                            <Column field="categoria" header="Categoría" sortable></Column>
                            <Column field="marca" header="Marca" sortable></Column>
                            <Column field="modelo" header="Modelo" sortable></Column>
                            <Column field="subcategoria" header="Subcategoría" documento></Column>
                            <Column field="tipo" header="Tipo" sortable></Column>
                        </DataTable>
                    </div>
                    <div v-if="selectedOption === 'intervinientes'">
                        <div class="flex justify-content-center">
                            <h2 class="uppercase">Intervinientes</h2>
                        </div>
                        <DataTable :value="slotProps.data.intervinientes">
                            <Column field="apellido" header="Apellido"></Column>
                            <Column field="nombre" header="Nombre"></Column>
                            <Column field="jerarquia" header="Jerarquía"></Column>
                            <Column field="dependencia" header="Dependencia"></Column>
                        </DataTable>
                    </div>
                </div>
            </template>
        </DataTable>
        <Toast />
    </div>
</template>

<style scoped>
.card {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
}

</style>