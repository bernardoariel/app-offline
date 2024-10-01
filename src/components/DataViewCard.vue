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
    <span class="font-semibold">${item.categoria.name}</span><span>, ${item.marca.name}</span><br/>
    modelo <span class="font-semibold">${item.modelo.name}`;
    return;
  }
  if (dataKey === 'fecha') {
    mensaje.value = ``;
    return;
  }
  if (dataKey === 'vinculados' && item.descripcionDesconocido) {
    mensaje.value = `
    <span class="font-semibold">Persona de filiación desconocida:</span> </br><span> ${item.descripcionDesconocido}`;
    return
  }
  if (dataKey === 'afectados' && item.descripcionOrdenPublico) {
    mensaje.value = `
    <span class="font-semibold">Orden público: </span> </br></span><span> ${getTruncatedString(item.descripcionOrdenPublico, 30)}`;
    return
  }

  mensaje.value = `
    <span class="font-semibold">${item.apellido}</span><span>, ${item.nombre}</span><br/>
    con <span class="font-semibold">DNI:</span> ${item.nroDocumento}`;
};

const handleSendRelato = (item, dataKey) => {
  if (dataKey === 'afectados') {
    if (!item.descripcionOrdenPublico) {
      relato.value =
        `${relato.value} ${item.typeAfectado} ${item.apellido.toUpperCase()} ${item.nombre}, DNI N° ${item.nroDocumento
        }, de nacionalidad ${item.nacionalidad.toUpperCase()}, estado civil ${item.estadoCivil
        }, de ${getAge(item.fecha)} años de edad, ${item.instruccion
        }, con domicilio en  ${item.domicilioResidencia}`;
    }
    else {
      relato.value =
        `${relato.value} ${item.typeAfectado} (Orden público): ${item.descripcionOrdenPublico}`
    }
  }
  if (dataKey === 'vinculados') {
    if (!item.descripcionDesconocido) {
      relato.value =
        `${relato.value} ${item.typeAfectado} ${item.apellido.toUpperCase()} ${item.nombre}, DNI N° ${item.nroDocumento
        }, de nacionalidad ${item.nacionalidad.toUpperCase()}, estado civil ${item.estadoCivil
        }, de ${getAge(item.fecha)} años de edad, ${item.instruccion
        }, con domicilio en  ${item.domicilioResidencia}`;
    } else {
      relato.value =
        `${relato.value} ${item.typeAfectado} (Persona de filiación desconocida): ${item.descripcionDesconocido}`
    }
  }
  if (dataKey === 'personalInterviniente') {
    relato.value = `${relato.value} Interviniente ${item.apellido.toUpperCase()} ${item.nombre}, de jerarquia ${item.jerarquia
      }, en ${item.dependencia}`;
  }
  if (dataKey === 'fecha') {
    relato.value = `${relato.value} En la fecha ${item.desdeFechaHora}, en ${item.calle} ${item.numero}, ${item.departamento}`;
  }
  if (dataKey === 'efectos') {
    relato.value = `${relato.value} ${item.estado.name.toUpperCase()}, ${item.categoria.name}, ${item.subcategoria.name} ${item.marca.name
      } ${item.modelo.name}, de tipo ${item.tipo.name}`;
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

          <!-- VINCULADOS -->
          <div v-if="dataKey == 'vinculados'">
            <div class="flex flex-row flex-nowrap justify-content-between align-items-center w-full"
              :class="{ 'border-top-1 surface-border': index !== 0 }">
              <div class="hidden md:block">
                <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
              </div>
              <div class="flex flex-column w-full p-2" @click="editProduct(item.id)">
                <div
                  :class="['flex flex-column xl:flex-row w-full justify-content-between', { 'my-4': item.descripcionDesconocido || item.descripcionOrdenPublico }]">
                  <div class="mb-1 xl:mb-0">
                    <span v-if="!item.descripcionDesconocido && !item.descripcionOrdenPublico" class="font-bold">
                      {{ item.apellido ? getUpperCase(item.apellido) + ',' : '' }}
                    </span>
                    <span v-if="!item.descripcionDesconocido && !item.descripcionOrdenPublico">
                      {{ item.nombre ? getTitleCase(item.nombre) : 'Nuevo' }}
                    </span>
                  </div>
                  <div class="mb-2 xl:mb-0">
                    <span v-if="item.typeDocumento && item.nroDocumento">
                      <i>{{ item.typeDocumento + ': ' }}</i>
                      <i>{{ item.nroDocumento }}</i>
                    </span>
                  </div>
                  <span v-if="item.descripcionDesconocido" class="font-bold">
                    Persona de filiación desconocida:
                  </span>
                  <span v-if="item.descripcionDesconocido">{{ getTruncatedString(item.descripcionDesconocido,
                    20) }}</span>
                  <Tag v-if="item.typeAfectado && item.typeAfectado" :value="item.typeAfectado" class="w-max"
                    :severity="getColorByAfectado(item.typeAfectado)"></Tag>
                </div>
                <div>
                  <span class="text-xs">{{ item.domicilioResidencia }}</span>
                </div>
              </div>
              <div>
                <ButtonOptions :tarjetaNombre="item.title" :item="item"
                  :deleteItem="() => openDeleteConfirmation(item, dataKey)"
                  :sendRelato="() => handleSendRelato(item, dataKey)" />
              </div>
            </div>
          </div>

          <!-- AFECTADOS -->
          <div v-else-if="dataKey == 'afectados'">
            <div class="flex flex-row flex-nowrap justify-content-between align-items-center p-2 w-full"
              :class="{ 'border-top-1 surface-border': index !== 0 }">
              <div class="hidden md:block">
                <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
              </div>
              <div class="flex flex-column w-full" @click="editProduct(item.id)">
                <div
                  :class="['flex flex-column xl:flex-row w-full justify-content-between', { 'my-4': item.descripcionDesconocido || item.descripcionOrdenPublico }]"
                  :data-testid="dataKey + 'name'">
                  <div class="mb-1 xl:mb-0">
                    <!-- Apellido-->
                    <span v-if="!item.descripcionDesconocido && !item.descripcionOrdenPublico" class="font-bold">
                      {{ item.apellido ? getUpperCase(item.apellido) + ',' : '' }}
                    </span>
                    <!-- Nombre-->
                    <span v-if="!item.descripcionDesconocido && !item.descripcionOrdenPublico" class="ml-2">
                      {{ item.nombre ? getTitleCase(item.nombre) : 'Nuevo' }}
                    </span>
                  </div>
                  <!-- Documento-->
                  <div class="mb-2 xl:mb-0">
                    <span v-if="item.typeDocumento && item.nroDocumento">
                      <i>{{ item.typeDocumento + ': ' }}</i>
                      <i>{{ item.nroDocumento }}</i>
                    </span>
                  </div>
                  <span v-if="item.descripcionOrdenPublico" class="font-bold">
                    Orden público:
                  </span>
                  <span v-if="item.descripcionOrdenPublico">{{ getTruncatedString(item.descripcionOrdenPublico,
                    20) }}</span>
                  <Tag v-if="item.typeAfectado && item.typeAfectado" :value="item.typeAfectado" class="w-max"
                    :severity="getColorByAfectado(item.typeAfectado)"></Tag>
                </div>
                <div>
                  <span class="text-xs">{{ item.domicilioResidencia }}</span>
                </div>
              </div>
              <div class="w-max">
                <ButtonOptions :tarjetaNombre="item.title" :item="item"
                  :deleteItem="() => openDeleteConfirmation(item, dataKey)"
                  :sendRelato="() => handleSendRelato(item, dataKey)" />
              </div>
            </div>

          </div>

          <!-- PERSONAL INTERVINIENTE -->
          <div v-else-if="dataKey === 'personalInterviniente'">
            <div class="flex flex-row flex-nowrap justify-content-between align-items-center p-2 "
              :class="{ 'border-top-1 surface-border': index !== 0 }">
              <div class="hidden md:block">
                <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
              </div>
              <div class="flex flex-column w-full" @click="editProduct(item.id)">
                <div class="flex flex-column xl:flex-row w-full justify-content-between">
                  <div class="mb-1 xl:mb-0">
                    <span class="font-bold">
                      {{ item.apellido ? getUpperCase(item.apellido) + ',' : '' }}
                    </span>
                    <span class="ml-2">
                      {{ item.nombre ? getTitleCase(item.nombre) : 'Nuevo' }}
                    </span>
                  </div>
                  <Tag v-if="item.jerarquia && item.jerarquia" :value="item.jerarquia" class="w-max"
                    :severity="getColorByAfectado(item.jerarquia)"></Tag>
                </div>
                <div>
                  <span class="text-xs">{{ item.dependencia }}</span>
                </div>
              </div>
              <div>
                <ButtonOptions :tarjetaNombre="item.title" :item="item"
                  :deleteItem="() => openDeleteConfirmation(item, dataKey)"
                  :sendRelato="() => handleSendRelato(item, dataKey)" />
              </div>
            </div>
          </div>

          <!-- FECHA -->
          <div v-else-if="dataKey == 'fecha'" :data-testid="dataKey + 'name'">
            <div class="flex flex-row flex-nowrap justify-content-between align-items-center p-2s"
              :class="{ 'border-top-1 surface-border': index !== 0 }">
              <div class="hidden md:block">
                <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
              </div>
              <div class="flex flex-column w-full p-2" @click="editProduct(item.id)">
                <div class="flex flex-column xl:flex-row justify-content-between">
                  <div class="flex flex-column xl:flex-row">
                    <div>
                      <span class="font-bold mr-2">Entre </span>
                      <span>{{ formatFecha(item.desdeFechaHora) }}</span>
                    </div>
                    <div>
                      <span class="font-bold xl:mx-2"> Y </span>
                      <span>{{ formatFecha(item.hastaFechaHora) }}</span>
                    </div>
                  </div>
                  <div>
                    <i class="pi pi-map-marker" :style="{ color: 'red', opacity: condicion ? 1 : 0.3 }"></i>
                    <Tag v-if="item.departamento && item.departamento" :value="item.departamento" class="w-max ml-2"
                      :severity="getColorByAfectado(item.departamento)"></Tag>
                  </div>
                </div>
                <div>
                  <span class="text-xs">{{ item.calle + ' ' + item.numero }}</span>
                </div>
              </div>
              <div>
                <ButtonOptions :tarjetaNombre="item.title" :item="item"
                  :deleteItem="() => openDeleteConfirmation(item, dataKey)"
                  :sendRelato="() => handleSendRelato(item, dataKey)" />
              </div>
            </div>
          </div>

          <!-- EFECTOS -->
          <div v-else-if="dataKey == 'efectos'">
            <div class="flex flex-row flex-nowrap justify-content-between align-items-center"
              :class="{ 'border-top-1 surface-border': index !== 0 }">
              <div class="hidden md:block">
                <Button icon="pi pi-pencil" @click="editProduct(item.id)" text rounded style="font-size: 1rem"></Button>
              </div>

              <div class="flex flex-column xl:flex-row justify-content-between w-full p-2"
                @click="editProduct(item.id)">
                <span class="font-bold">{{
                  getUpperCase(item.subcategoria.name)
                }}</span>
                <span class="xl:mt-0 mt-2">{{ getTitleCase(item.tipo.name) }}-{{
                  getTitleCase(item.marca.name)
                }}-{{ getTitleCase(item.modelo.name) }}</span>
                <Tag :value="item.estado.name" :severity="getColorByAfectado(item.estado.name)"
                  class="xl:mt-0 mt-2 w-max h-max" />
              </div>
              <div>
                <ButtonOptions :tarjetaNombre="item.title" :item="item"
                  :deleteItem="() => openDeleteConfirmation(item, dataKey)"
                  :sendRelato="() => handleSendRelato(item, dataKey)" />
              </div>
            </div>
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
    <span class="text-right" :style="missingFieldsEmpty[dataKey]
      ? dataKey === 'efectos'
        ? 'color: #f97316'
        : 'color: #dc3545'
      : null
      ">Sin Registros</span>
  </div>
  <MyModal v-model:visible="visible" title="Confirmar Eliminación" :buttons="deleteModalButtons"
    @button-click="handleDeleteConfirmation">
    <template #body>
      <div class="modal-body">
        <i class="pi pi-exclamation-triangle" :style="{ fontSize: '3rem', color: 'orange' }"></i>
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
  align-items: center;
  /* Centra los elementos verticalmente */
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
  padding-left: 4rem;
  /* Padding solo en los lados */
  padding-right: 3rem;
  /* Padding solo en los lados */
  /* gap: 1rem; */
}
</style>
