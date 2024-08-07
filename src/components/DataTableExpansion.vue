<script lang="ts" setup>
import { ref, onActivated } from 'vue';
import { useToast } from 'primevue/usetoast';
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import useSaveData from '../composables/useSaveData';
import { useViewPdf } from '@/composables/useViewPdf';
import { useRouter } from 'vue-router';
import useActuacion from '@/composables/useActuacion';
import MyConfirmPopup from './elementos/MyConfirmPopup.vue';

const actuacionesList = ref();
const expandedRows = ref([]);
const toast = useToast();
const router = useRouter();
const selectedOption = ref('afectados');
const { generatePdf, pdfUrl } = useViewPdf();
const { fetchActuaciones, deleteActuacion } = useSaveData();
const { activateComponent } = useActuacion();
const mensaje = ref('');
let actuaciones: any;

onActivated(async () => {
  actuaciones = await fetchActuaciones();
  console.log('actuaciones::: ', actuaciones);
  actuacionesList.value = actuaciones;
});
const onRowExpand = (event: { data: { name: any } }) => {
  toast.add({
    severity: 'info',
    summary: 'Item Expandidos',
    detail: event.data.name,
    life: 3000,
  });
};
const onRowCollapse = (event: { data: { name: any } }) => {
  toast.add({
    severity: 'success',
    summary: 'Items Colapsados',
    detail: event.data.name,
    life: 3000,
  });
};
const expandAll = () => {
  expandedRows.value = actuacionesList.value.reduce(
    (acc: { [x: string]: boolean }, p: { id: string | number }) =>
      (acc[p.id] = true) && acc,
    {}
  );
};
const collapseAll = () => {
  expandedRows.value = [];
};
const viewPdf = async (id: string) => {
  await generatePdf(+id);
  window.open(pdfUrl.value, '_blank');
};

const onEditActuacion = (id: number, nombreActuacion: string) => {
  activateComponent();
  router.push({
    name: 'editActuacion',
    params: { id, actuacion: nombreActuacion },
  });
};

interface buttonProps {
  label: string;
  class?: string;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  action: string;
}
const visible = ref(false);
const actuacionIdToDelete = ref<number | null>(null);
const deleteModalButtons = ref<buttonProps[]>([
  {
    label: 'Cancelar',
    class: 'p-button-secondary',
    icon: 'pi pi-times',
    iconPos: 'left',
    action: 'cancel',
  },
  {
    label: 'Eliminar',
    class: 'p-button-danger',
    icon: 'pi pi-trash',
    iconPos: 'left',
    action: 'delete',
  },
]);

const openDeleteConfirmation = (data: any) => {
  console.log('data::: ', data);

  actuacionIdToDelete.value = data.id;

  visible.value = true;
  mensaje.value = `
    Actuacion con <span class="font-semibold">Fecha:</span> ${data.fechaCreacion}
    <span class="font-semibold">Nro: </span> ${data.nroLegajoCompleto}<br/>
    <span class="font-semibold">${data.nombreActuacion}</span>`;
};

const confirmConfig = ref({
  message: '¿Seguro que desea eliminar esta actuación?',
  icon: 'pi pi-exclamation-triangle',
  rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
  acceptClass: 'p-button-danger p-button-sm',
  rejectLabel: 'Cancelar',
  acceptLabel: 'Eliminar',
  event: null as Event | null,
});
const showConfirm = (event: Event, idDelete: number) => {
  actuacionIdToDelete.value = idDelete;
  confirmConfig.value.event = event;
};
const handleAccepted = async () => {
  if (!actuacionIdToDelete.value) return;
  try {
    await deleteActuacion(actuacionIdToDelete.value);
    toast.add({
      severity: 'success',
      summary: 'Actuación eliminada',
      life: 3000,
    });
    actuacionesList.value = await fetchActuaciones();
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: `Error al eliminar actuación con ID ${actuacionIdToDelete.value}`,
      life: 3000,
    });
  }
  actuacionIdToDelete.value = null;
};

const handleRejected = () => {
  console.log('Rejected');
  // Aquí puedes manejar la lógica cuando se hace clic en rechazar
};
</script>

<template>
  <div class="card">
    <DataTable
      class="my-custom-datatable"
      v-model:expandedRows="expandedRows"
      :value="actuacionesList"
      dataKey="id"
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
      tableStyle="min-width: 60rem"
    >
      <Column expander style="width: 5rem" />
      <Column field="fechaCreacion" header="Fecha"></Column>
      <Column field="nroLegajoCompleto" header="Nro.de Actuación"></Column>
      <Column field="nombreActuacion" header="Actuaciones"></Column>
      <Column field="juzgadoInterviniente" header="Juzgado"></Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button
              icon="pi pi-file-pdf"
              square
              @click="viewPdf(data.id)"
              severity="success"
            ></Button>
            <Button
              icon="pi pi-pencil"
              @click="onEditActuacion(data.id, data.pathName)"
              square
              severity="warning"
            ></Button>
            <Button
              icon="pi pi-trash"
              @click="showConfirm($event, data.id)"
              square
              severity="danger"
            ></Button>
            <span></span>
          </div>
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
              <RadioButton
                v-model="selectedOption"
                inputId="optionAfectados"
                name="options"
                value="afectados"
              />
              <label for="afectados" class="ml-2">Afectados</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton
                v-model="selectedOption"
                inputId="optionVinculados"
                name="options"
                value="vinculados"
              />
              <label for="vinculados" class="ml-2">Vinculados</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton
                v-model="selectedOption"
                inputId="optionFechaUbicacion"
                name="options"
                value="fechaUbicacion"
              />
              <label for="fechaUbicacion" class="ml-2">Fecha y Ubicación</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton
                v-model="selectedOption"
                inputId="optionEfectos"
                name="options"
                value="efectos"
              />
              <label for="fechaEfectos" class="ml-2">Efectos</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton
                v-model="selectedOption"
                inputId="optionIntervinientes"
                name="options"
                value="intervinientes"
              />
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
              <Column
                field="nroDocumento"
                header="Nro.Documento"
                sortable
              ></Column>
              <Column field="telefono" header="Teléfono" sortable></Column>
              <Column header="Tipo de Afectado">
                <template #body="slotProps">
                  <Tag
                    :value="slotProps.data.typeAfectado"
                    :severity="getColorByAfectado(slotProps.data.typeAfectado)"
                  />
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
              <Column
                field="nroDocumento"
                header="Nro.Documento"
                documento
              ></Column>
              <Column field="telefono" header="Teléfono" sortable></Column>
              <Column field="apodo" header="Apodo" sortable></Column>
              <Column header="Tipo de Vinculado">
                <template #body="slotProps">
                  <Tag
                    :value="slotProps.data.typeAfectado"
                    :severity="getColorByAfectado(slotProps.data.typeAfectado)"
                  />
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
              <Column
                field="subcategoria"
                header="Subcategoría"
                documento
              ></Column>
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

    <!--  <MyModal
            v-model:visible="visible"
            title="Confirmar Eliminación"
            :buttons="deleteModalButtons"
            @button-click="handleDeleteConfirmation"
            >
            <template #body>

                <div class="modal-body">
                    <i class="pi pi-exclamation-triangle" :style="{ fontSize: '3rem', color: 'orange' }"></i>
                    <p class="text-right font-bold">¿Deseas eliminar la siguiente actuación?</p>
                </div>
                <p class="text-center m-0 text-sm" v-html="mensaje"></p>
                    
                
                
            </template>
        </MyModal> -->
    <MyConfirmPopup
      :config="confirmConfig"
      @accepted="handleAccepted"
      @rejected="handleRejected"
    />
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
.modal-body {
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-left: 3rem; /* Padding solo en los lados */
  padding-right: 3rem; /* Padding solo en los lados */
  /* gap: 1rem; */
}
</style>
