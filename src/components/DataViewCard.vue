<script setup lang="ts">
import { computed, ref, onActivated, watch } from 'vue';
import DataView from 'primevue/dataview';
import ButtonOptions from '@/components/ButtonOptions.vue';
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import { useToast } from 'primevue/usetoast';
import MyModal from './elementos/MyModal.vue';
import { getTitleCase, getTruncatedString, getUpperCase } from '@/helpers/stringUtils';
import { formatFecha } from '@/helpers/getFormatFecha';
import useActuacion from '@/composables/useActuacion';
import useItemValue from '@/composables/useItemValue';
import { useRoute } from 'vue-router';
import useDatosDiligencia from '@/composables/useDatosDiligencia';
import { getAge } from '@/helpers/getAge';
import useActuacionLoading from '@/composables/useActuacionLoading';
import useFieldState from '@/composables/useFieldsState';
import useCardValidation from '@/composables/useCardValidations';

const props = defineProps<{
  itemsCardValue: { titulo: string; items: any[] };
  dataKey: string;
  actuacion?: string;
}>();
const condicion: boolean = false;
const toast = useToast();
const { relato } = useDatosDiligencia('sumario-denuncia');
const { agregarNuevoItem } = useActuacion();
const { selectedItem } = useItemValue();
const { markRecordDeleted } = useFieldState();
const { isLoading, setLoading } = useActuacionLoading();
const { missingFieldsEmpty } = useCardValidation();
const isCreateActuation = ref(false);
const { path } = useRoute();

onActivated(() => {
  isCreateActuation.value = path.includes('new') ? true : false;
  if (isCreateActuation.value) {
    setLoading(false);
  }
});

const items = computed(() => {
  if (props.dataKey === 'personalInterviniente') {
  }
  return props.itemsCardValue.items;
});

const editProduct = (productId: any) => {
  const itemToEdit = items.value.find((item) => item.id === productId);
  selectedItem.value = itemToEdit;
  agregarNuevoItem(props.dataKey);
};

const deleteItem = (productId: any) => {
  console.log('productId', productId);
  const index = props.itemsCardValue.items.findIndex(
    (item) => item.id === productId
  );
  if (index !== -1) {
    props.itemsCardValue.items.splice(index, 1);
    markRecordDeleted();
  }
};
interface buttonProps {
  label: string;
  class?: string;
  icon?: string;
  iconPos?: 'left' | 'right' | 'top' | 'bottom';
  action: string;
}
const visible = ref(false);
const itemToDelete = ref<string | null>(null);
const itemType = ref(null);
const mensaje = ref('');
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
const openDeleteConfirmation = (item, dataKey) => {
  itemType.value = item;
  itemToDelete.value = item.id;
  visible.value = true;
  if (dataKey === 'efectos') {
    mensaje.value = `
    <span class="font-semibold">${item.categoria}</span><span>, ${item.marca}</span><br/>
    modelo <span class="font-semibold">${item.modelo}`;
    return;
  }
  if (dataKey === 'fecha') {
    mensaje.value = ``;
    return;
  }
  mensaje.value = `
    <span class="font-semibold">${item.apellido}</span><span>, ${item.nombre}</span><br/>
    con <span class="font-semibold">DNI:</span> ${item.nroDocumento}`;
};

const handleSendRelato = (item, dataKey) => {
  console.log('dataKey', dataKey);
  console.log('item', item);
  if (dataKey === 'afectados') {
    relato.value = `${relato.value}
${item.typeAfectado} ${item.apellido.toUpperCase()} ${item.nombre}, DNI N° ${
      item.nroDocumento
    }, de nacionalidad ${item.nacionalidad.toUpperCase()}, estado civil ${
      item.estadoCivil
    }, de ${getAge(item.fecha)} años de edad, ${
      item.instruccion
    }, con domicilio en  ${item.domicilioResidencia}`;
  }
  if (dataKey === 'vinculados') {
    relato.value = `${relato.value}
${item.typeAfectado} ${item.apellido.toUpperCase()} ${item.nombre}, DNI N° ${
      item.nroDocumento
    }, de nacionalidad ${item.nacionalidad.toUpperCase()}, estado civil ${
      item.estadoCivil
    }, de ${getAge(item.fecha)} años de edad, ${
      item.instruccion
    }, con domicilio en  ${item.domicilioResidencia}`;
  }
  if (dataKey === 'personalInterviniente') {
    relato.value = `${relato.value}
Interviniente ${item.apellido.toUpperCase()} ${item.nombre}, de jerarquia ${
      item.jerarquia
    }, en ${item.dependencia}`;
  }
  if (dataKey === 'fecha') {
    relato.value = `${relato.value}
En la fecha ${item.desdeFechaHora}, en ${item.calle} ${item.numero}, ${item.departamento}`;
  }
  if (dataKey === 'efectos') {
    relato.value = `${relato.value}
  ${item.estado.toUpperCase()}, ${item.categoria}, ${item.subcategoria} ${
      item.marca
    } ${item.modelo}, de tipo ${item.tipo}`;
  }
};

const handleDeleteConfirmation = async (action: string) => {
  if (action === 'delete' && itemToDelete.value) {
    try {
      await deleteItem(itemToDelete.value);
      toast.add({
        severity: 'success',
        summary: 'Item eliminado',
        life: 3000,
      });
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: `Error al eliminar Item`,
        life: 3000,
      });
    }
  }
  itemToDelete.value = null;
};

const copyProduct = (productId: any) => {
  // Lógica para copiar el producto con el ID proporcionado
};

const convertStringToPhrase = (key: string): string => {
  const phrases: { [key: string]: string } = {
    afectados: 'al siguiente afectado',
    vinculados: 'al siguiente vinculado',
    personalInterviniente: 'al siguiente interviniente',
    fecha: 'la fecha y ubicación',
    efectos: 'el siguiente efecto',
  };

  return phrases[key] || key;
};
</script>

<template>
  <div v-if="items && items.length !== 0">
    <DataView :value="items" dataKey="id">
      <template #list="slotProps">
        <div v-if="isLoading()">
          <div class="flex-container">
            <!-- Primera columna con círculo -->
            <div class="flex-item">
              <Skeleton shape="circle" size="4rem"></Skeleton>
            </div>
            <!-- Segunda columna con dos párrafos -->
            <div class="flex-item">
              <Skeleton width="10rem" class="mb-2"></Skeleton>
              <Skeleton width="5rem" class="mb-2"></Skeleton>
              <Skeleton height=".5rem"></Skeleton>
            </div>
            <!-- Tercera columna con botón esqueleto -->
            <div class="flex-item">
              <Skeleton width="5rem" height="2rem"></Skeleton>
            </div>
          </div>
          <Skeleton class="w-full mb-2" height="1rem"></Skeleton>
          <Skeleton class="w-full" height="1rem"></Skeleton>
        </div>
        <div v-for="(item, index) in items" :key="index">
          <!-- Afectados y Vinculados -->
          <div v-if="dataKey == 'afectados' || dataKey == 'vinculados'">
            <div
              class="flex-container"
              :class="{ 'border-top-1 surface-border': index !== 0 }"
            >
              <div class="flex-items">
                <Button
                  icon="pi pi-pencil"
                  @click="editProduct(item.id)"
                  text
                  rounded
                  style="font-size: 1rem"
                ></Button>
              </div>

              <div class="flex-items">
                <span  v-if="!item.descripcionDesconocido && !item.descripcionOrdenPublico" class="font-bold">{{
                  item.apellido ? getUpperCase(item.apellido) + ',' : ''
                }}</span>
                <span  v-if="!item.descripcionDesconocido && !item.descripcionOrdenPublico" class="ml-2">{{
                  item.nombre ? getTitleCase(item.nombre) : 'Nuevo'
                }}</span>
                <span
                  v-if="item.typeDocumento && item.nroDocumento"
                  class="ml-5"
                >
                  <i>{{ item.typeDocumento + ': ' }}</i>
                  <i>{{ item.nroDocumento }}</i>
                </span>
                <span  v-if="item.descripcionOrdenPublico" class="font-bold">
                  Orden público: 
                </span>
                <span v-if="item.descripcionOrdenPublico">{{getTruncatedString(item.descripcionOrdenPublico, 20)}}</span>
                <span v-if="item.descripcionDesconocido" class="font-bold">
                  Persona de filiación desconocida: 
                </span>
                <span v-if="item.descripcionDesconocido">{{getTruncatedString(item.descripcionDesconocido, 20)}}</span>
                <span v-if="item.typeAfectado && item.typeAfectado">
                  <Tag
                    :value="item.typeAfectado"
                    class="ml-5"
                    :severity="getColorByAfectado(item.typeAfectado)"
                  ></Tag>
                </span>
              </div>

              <div class="flex-items">
                <ButtonOptions
                  :tarjetaNombre="item.title"
                  :item="item"
                  :deleteItem="() => openDeleteConfirmation(item, dataKey)"
                  :sendRelato="() => handleSendRelato(item, dataKey)"
                />
              </div>
            </div>
            <div class="linea-2">
              <p class="text-xs">{{ item.domicilioResidencia }}</p>
            </div>
          </div>
          <!-- personal Interviniente -->
          <div v-else-if="dataKey === 'personalInterviniente'">
            <div
              class="flex-container"
              :class="{ 'border-top-1 surface-border': index !== 0 }"
            >
              <div class="flex-items">
                <Button
                  icon="pi pi-pencil"
                  @click="editProduct(item.id)"
                  text
                  rounded
                  style="font-size: 1rem"
                ></Button>
              </div>

              <div class="flex-items">
                <span class="font-bold">{{
                  item.apellido ? getUpperCase(item.apellido) + ',' : ''
                }}</span>
                <span class="ml-2">{{
                  item.nombre ? getTitleCase(item.nombre) : 'Nuevo'
                }}</span>

                <span v-if="item.jerarquia && item.jerarquia">
                  <Tag
                    :value="item.jerarquia"
                    class="ml-5"
                    :severity="getColorByAfectado(item.jerarquia)"
                  ></Tag>
                </span>
              </div>

              <div class="flex-items">
                <ButtonOptions
                  :tarjetaNombre="item.title"
                  :item="item"
                  :deleteItem="() => openDeleteConfirmation(item, dataKey)"
                  :sendRelato="() => handleSendRelato(item, dataKey)"
                />
              </div>
            </div>
            <div class="linea-2">
              <p class="text-xs">{{ item.dependencia }}</p>
            </div>
          </div>
          <!-- Fecha -->
          <div v-else-if="dataKey == 'fecha'">
            <div
              class="flex-container"
              :class="{ 'border-top-1 surface-border': index !== 0 }"
            >
              <div class="flex-items">
                <Button
                  icon="pi pi-pencil"
                  @click="editProduct(item.id)"
                  text
                  rounded
                  style="font-size: 1rem"
                ></Button>
              </div>

              <div class="flex-items">
                <span class="font-bold">Entre </span>
                <span>{{ formatFecha(item.desdeFechaHora) }}</span>
                <span class="font-bold"> Y </span>
                <span>{{ formatFecha(item.hastaFechaHora) }}</span>
                <i
                  class="pi pi-map-marker ml-5"
                  :style="{ color: 'red', opacity: condicion ? 1 : 0.3 }"
                ></i>

                <span v-if="item.departamento && item.departamento">
                  <Tag
                    :value="item.departamento"
                    class="ml-2"
                    :severity="getColorByAfectado(item.departamento)"
                  ></Tag>
                </span>
              </div>

              <div class="flex-items">
                <ButtonOptions
                  :tarjetaNombre="item.title"
                  :item="item"
                  :deleteItem="() => openDeleteConfirmation(item, dataKey)"
                  :sendRelato="() => handleSendRelato(item, dataKey)"
                />
              </div>
            </div>
            <div class="linea-2">
              <p class="text-xs">{{ item.calle + ' ' + item.numero }}</p>
            </div>
          </div>
          <div v-else-if="dataKey == 'efectos'">
            <div
              class="flex-container"
              :class="{ 'border-top-1 surface-border': index !== 0 }"
            >
              <div class="flex-items">
                <Button
                  icon="pi pi-pencil"
                  @click="editProduct(item.id)"
                  text
                  rounded
                  style="font-size: 1rem"
                ></Button>
              </div>

              <div class="flex-items">
                <span class="font-bold">{{
                  getUpperCase(item.subcategoria)
                }}</span>
                <span class="ml-2"
                  >{{ getTitleCase(item.tipo) }}-{{
                    getTitleCase(item.marca)
                  }}-{{ getTitleCase(item.modelo) }}</span
                >
                <Tag
                  :value="item.estado"
                  :severity="getColorByAfectado(item.estado)"
                  class="ml-5"
                />
              </div>

              <div class="flex-items">
                <ButtonOptions
                  :tarjetaNombre="item.title"
                  :item="item"
                  :deleteItem="() => openDeleteConfirmation(item, dataKey)"
                  :sendRelato="() => handleSendRelato(item, dataKey)"
                />
              </div>
            </div>
            <!-- <div class="linea-2">
              <p class="text-xs">{{ item.dependencia }}</p>
            </div> -->
          </div>
        </div>
      </template>
    </DataView>
  </div>
  <div v-else>
    <div class="flex-container">
      <!-- Primera columna con círculo -->
      <div class="flex-item">
        <Skeleton shape="circle" size="4rem"></Skeleton>
      </div>
      <!-- Segunda columna con dos párrafos -->
      <div class="flex-item">
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton width="5rem" class="mb-2"></Skeleton>
        <Skeleton height=".5rem"></Skeleton>
      </div>
      <!-- Tercera columna con botón esqueleto -->
      <div class="flex-item">
        <Skeleton width="5rem" height="2rem"></Skeleton>
      </div>
    </div>
    <!-- Esqueleto que ocupa todo el ancho -->
    <Skeleton class="w-full mb-2" height="1rem"></Skeleton>
    <Skeleton class="w-full" height="1rem"></Skeleton>
  </div>

  <div v-else class="flex justify-content-end">
    <span
      class="text-right"
      :style="
        missingFieldsEmpty[dataKey]
          ? dataKey === 'efectos'
            ? 'color: #f97316'
            : 'color: #dc3545'
          : null
      "
      >Sin Registros</span
    >
  </div>
  <MyModal
    v-model:visible="visible"
    title="Confirmar Eliminación"
    :buttons="deleteModalButtons"
    @button-click="handleDeleteConfirmation"
  >
    <template #body>
      <div class="modal-body">
        <i
          class="pi pi-exclamation-triangle"
          :style="{ fontSize: '3rem', color: 'orange' }"
        ></i>
        <div class="flex justify-content-center" style="width: 100%">
          <p class="text-left font-bold">
            ¿Deseas eliminar {{ convertStringToPhrase(dataKey) }}?
          </p>
        </div>
      </div>
      <p class="text-center m-0 text-sm" v-html="mensaje"></p>
    </template>
  </MyModal>
  <Toast />
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center; /* Centra los elementos verticalmente */
  align-content: normal;
  margin-bottom: 8px;
}

.flex-items:nth-child(1),
.flex-items:nth-child(3) {
  flex: 0 1 auto;
}

.flex-items:nth-child(2) {
  flex: 1 1 auto;
  align-self: center;
}
.linea-2 {
  margin-top: -20px;
  margin-left: 50px;
}

.modal-body {
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-left: 4rem; /* Padding solo en los lados */
  padding-right: 3rem; /* Padding solo en los lados */
  /* gap: 1rem; */
}
</style>
