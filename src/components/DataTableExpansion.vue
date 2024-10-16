<script lang="ts" setup>
import { ref, onActivated, onMounted, onBeforeUnmount } from 'vue';
import { useToast } from 'primevue/usetoast';
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import { formatFecha } from '@/helpers/getFormatFecha';
import useSaveData from '../composables/useSaveData';
import { useViewPdf } from '@/composables/useViewPdf';
import { useRouter } from 'vue-router';
import useActuacion from '@/composables/useActuacion';
import MyConfirmPopup from './elementos/MyConfirmPopup.vue';

const actuacionesList = ref();
const expandedRows = ref([]);
let actuaciones: any;
const toast = useToast();
const router = useRouter();
const selectedOption = ref('afectados');
const { generatePdf, pdfUrl } = useViewPdf();
const { fetchActuaciones, deleteActuacion } = useSaveData();
const { activateComponent } = useActuacion();

onActivated(async () => {
  actuaciones = await fetchActuaciones();
  actuacionesList.value = actuaciones;
});

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

const actuacionIdToDelete = ref<number | null>(null);

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

const isDesktop = ref(window.innerWidth >= 992);
const isTablet = ref(window.innerWidth >= 650);

const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 992;
  isTablet.value = window.innerWidth >= 650;
};

onMounted(() => {
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div class="p-5 border-round-xl bg-white mb-3 ">
    <DataTable v-model:expandedRows="expandedRows" :value="actuacionesList" dataKey="id">
      <Column expander class="w-5rem" />
      <Column field="fechaCreacion" header="Fecha">
        <template #body="{ data }">
          <div @click="onEditActuacion(data.id, data.pathName)" class="cursor-pointer">{{ data.fechaCreacion }}
          </div>
        </template>
      </Column>
      <Column field="nroLegajoCompleto" header="Nro.de Actuación">
        <template #body="{ data }">
          <div @click="onEditActuacion(data.id, data.pathName)" class="cursor-pointer">{{ data.nroLegajoCompleto }}
          </div>
        </template>
      </Column>
      <Column field="nombreActuacion" header="Actuaciones">
        <template #body="{ data }">
          <div @click="onEditActuacion(data.id, data.pathName)" class="cursor-pointer">{{ data.nombreActuacion }}
          </div>
        </template>
      </Column>
      <Column header="Juzgado" v-if="isDesktop">
        <template #body="slotProps">
          <p>
            {{
              slotProps.data.pathName.includes('ufi')
                ? slotProps.data.datosLegales.selectUfiNro
                : slotProps.data.pathName.includes('preliminares')
                  ? slotProps.data.datosLegales.selectJuzgadoInterviniente
                  : slotProps.data.juzgadoInterviniente
            }}
          </p>
        </template>
      </Column>
      <Column header="Acciones" v-if="isDesktop">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button icon="pi pi-file-pdf" square @click="viewPdf(data.id)" severity="success"></Button>
            <Button icon="pi pi-pencil" @click="onEditActuacion(data.id, data.pathName)" square
              severity="warning"></Button>
            <Button icon="pi pi-trash" @click="showConfirm($event, data.id)" square severity="danger"></Button>
            <span></span>
          </div>
        </template>
      </Column>
      <template #expansion="slotProps">
        <div class="p-3">
          <div class="flex flex-wrap gap-3">
            <div class="flex align-items-center">
              <RadioButton v-model="selectedOption" inputId="afectados" name="options" value="afectados" />
              <label for="afectados" class="ml-2">Afectados</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="selectedOption" inputId="vinculados" name="options" value="vinculados" />
              <label for="vinculados" class="ml-2">Vinculados</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="selectedOption" inputId="fechaUbicacion" name="options" value="fechaUbicacion" />
              <label for="fechaUbicacion" class="ml-2">Fecha y Ubicación</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="selectedOption" inputId="fechaEfectos" name="options" value="efectos" />
              <label for="fechaEfectos" class="ml-2">Efectos</label>
            </div>
            <div class="flex align-items-center">
              <RadioButton v-model="selectedOption" inputId="personalInterviniente" name="options"
                value="personalInterviniente" />
              <label for="personalInterviniente" class="ml-2">Intervinientes</label>
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
              <Column field="telefono" header="Teléfono" sortable v-if="isDesktop"></Column>
              <Column header="Tipo de Afectado" v-if='isTablet'>
                <template #body="slotProps">
                  <Tag :value="slotProps.data.typeAfectado"
                    :severity="getColorByAfectado(slotProps.data.typeAfectado)" />
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
              <Column field="telefono" header="Teléfono" sortable v-if="isDesktop"></Column>
              <Column field="apodo" header="Apodo" sortable v-if='isTablet'></Column>
              <Column header="Tipo de Vinculado" v-if='isTablet'>
                <template #body="slotProps">
                  <Tag :value="slotProps.data.typeAfectado"
                    :severity="getColorByAfectado(slotProps.data.typeAfectado)" />
                </template>
              </Column>
            </DataTable>
          </div>
          <div v-if="selectedOption === 'fechaUbicacion'">
            <div class="flex justify-content-center">
              <h2 class="uppercase">Fecha Ubicacion</h2>
            </div>
            <DataTable :value="slotProps.data.fechaUbicacion">
              <Column field="desdeFechaHora" header="Fecha desde" v-if='isTablet'>
                <template #body="slotProps">
                  {{ formatFecha(slotProps.data.desdeFechaHora) }}
                </template>
              </Column>
              <Column field="hastaFechaHora" header="Fecha hasta" v-if='isTablet'>
                <template #body="slotProps">
                  {{ formatFecha(slotProps.data.hastaFechaHora) }}
                </template>
              </Column>
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
              <Column field="categoria.name" header="Categoría" sortable></Column>
              <Column field="marca.name" header="Marca" sortable></Column>
              <Column field="modelo.name" header="Modelo" sortable v-if='isTablet'></Column>
              <Column field="subcategoria.name" header="Subcategoría" documento v-if='isTablet'></Column>
              <Column field="tipo.name" header="Tipo" sortable></Column>
            </DataTable>
          </div>
          <div v-if="selectedOption === 'personalInterviniente'">
            <div class="flex justify-content-center">
              <h2 class="uppercase">Intervinientes</h2>
            </div>
            <DataTable :value="slotProps.data.personalInterviniente">
              <Column field="apellido" header="Apellido"></Column>
              <Column field="nombre" header="Nombre"></Column>
              <Column field="jerarquia" header="Jerarquía"></Column>
              <Column field="dependencia" header="Dependencia" v-if='isTablet'></Column>
            </DataTable>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="flex justify-content-center p-5">
          <h2>No existen registros offline</h2>
        </div>
      </template>
    </DataTable>
    <MyConfirmPopup :config="confirmConfig" @accepted="handleAccepted" @rejected="handleRejected" />
    <Toast />
  </div>
</template>
