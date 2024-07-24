<script setup lang="ts">
//listBoxItems
import { getUpperCase, getTitleCase, getTruncatedString } from '@/helpers/stringUtils';
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import { getColorByEstado } from '@/helpers/getColorByEstado';
import { formatFecha } from '@/helpers/getFormatFecha';
import useItemsComputados from '@/composables/useItemsComputados';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFieldsState';

const { itemsComputados, routeType, eliminarItem } = useItemsComputados();
const { selectedItem } = useItemValue();
const { statesID } = useFieldState();

const getPristineById = (id: string) => {
  const found = statesID.find((state) => state.id === id);
  return found ? found.pristine : false;
};
console.log("lista", itemsComputados)
</script>
<template>
  <div class="card flex flex-column justify-content-center">
    <Listbox
      v-if="itemsComputados && itemsComputados.length > 0"
      v-model="selectedItem"
      :options="itemsComputados"
      optionLabel="nombre"
      class="w-full listbox-lower"
    >
      <template #option="{ option }">
        <div class="listbox-item fixed-height">
          <div class="left-column">
            <!-- Afectados y vinculados -->
            <div v-if="routeType === 'afectados' || routeType === 'vinculados'">
              <div v-if="!option.descripcionDesconocido" class="text-row">
                <span class="font-bold">{{
                  option.apellido ? getUpperCase(option.apellido) + ',' : ''
                }}</span>
                <span class="ml-2">{{
                  option.nombre ? getTitleCase(option.nombre) : ''
                }}</span>
                <span class="ml-5">
                  <i v-if="option.typeDocumento">{{ option.typeDocumento +  ': ' }}</i>
                  <i v-if="option.nroDocumento">{{ option.nroDocumento }}</i>
                </span>
              </div>
              <div v-else class="text-row">
                <span class="font-bold">
                  Persona de filiación desconocida: 
                </span>
                <span class="ml-2">{{
                  getTruncatedString(option.descripcionDesconocido, 40)
                }}</span>
              </div>
              <div class="tag-row">
                <Tag
                  :value="option.typeAfectado"
                  :severity="getColorByAfectado(option.typeAfectado)"
                />
              </div>
            </div>

            <!-- fecha -->
            <div v-if="option && routeType === 'fecha'">
              <div class="text-row">
                <span class="font-bold">Entre </span
                ><span
                  >{{
                    option.desdeFechaHora
                      ? formatFecha(option.desdeFechaHora)
                      : ''
                  }}
                  y
                  {{
                    option.desdeFechaHora
                      ? formatFecha(option.hastaFechaHora)
                      : ''
                  }}</span
                >
              </div>
              <div class="tag-row">
                <Tag
                  :value="option.departamento"
                  :severity="getColorByAfectado(option.departamento)"
                />
              </div>
            </div>

            <!-- personal interviniente -->
            <div v-else-if="routeType === 'personalInterviniente'">
              <div class="text-row">
                <span class="font-bold">{{
                  option.apellido ? getUpperCase(option.apellido) + ',' : ''
                }}</span>
                <span class="ml-2">{{
                  option.nombre ? getTitleCase(option.nombre) : '-'
                }}</span>
              </div>
              <div class="tag-row">
                <Tag
                  :value="option.jerarquia"
                  :severity="getColorByAfectado(option.jerarquia)"
                />
              </div>
              <div class="w-full" style="margin-top: -30px; margin-left: 55px">
                <p class="ml-5 text-xs">{{ option.dependencia }}</p>
              </div>
            </div>

            <!-- Efectos -->
            <div v-else-if="routeType === 'efectos'">
              <div class="text-row">
                <span class="font-bold">{{
                  option.subcategoria
                    ? getUpperCase(option.subcategoria) + ' '
                    : ''
                }}</span>
                <span class="font-bold">{{
                  option.categoria ? getUpperCase(option.categoria) + ',' : ''
                }}</span>
                <span class="ml-2">{{
                  option.marca ? getTitleCase(option.marca) : '-'
                }}</span>
                <span class="ml-2">{{
                  option.modelo ? getTitleCase(option.modelo) : '-'
                }}</span>
                <span
                  >, {{ option.tipo ? getTitleCase(option.tipo) : '-' }}</span
                >
                <div class="tag-row">
                  <Tag
                    :value="option.estado ? getTitleCase(option.estado) : '-'"
                    :severity="getColorByEstado(option.estado)"
                  />
                </div>
              </div>
              <div class="w-full" style="margin-top: -30px; margin-left: 55px">
                <p class="ml-5 text-xs">{{ option.dependencia }}</p>
              </div>
            </div>
          </div>

          <div class="right-column">
            <!-- <Button icon="pi pi-trash" severity="danger" @click="eliminarItem(option.id)" /> -->
            <Button
              v-if="option && option.code === 'new-item'"
              icon="pi pi-plus"
              rounded
              aria-label="Agregar"
              outlined
              severity="primary"
            />
            <div
              class="button-and-dot-container"
              v-else-if="selectedItem === option && option.id"
            >
              <div
                v-if="!getPristineById(option.id)"
                class="uncommited-dot bg-blue-400"
              ></div>
              <Button
                icon="pi pi-trash"
                severity="danger"
                @click="eliminarItem(option.id)"
              />
            </div>
            <div class="button-and-dot-container" v-else>
              <div
                class="uncommited-dot bg-blue-400"
                v-if="!getPristineById(option.id)"
              ></div>
              <Button icon="pi pi-trash" severity="danger" disabled />
            </div>
          </div>
        </div>
      </template>
    </Listbox>
  </div>
</template>

<style scoped>
.fixed-height {
  height: 60px; /* o cualquier otro alto fijo que necesites */
}
.listbox-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Alinea los elementos al principio del contenedor */
  padding: 8px;
}

.left-column {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.right-column {
  /* Estilos para la columna de botones, si es necesario */
  flex-shrink: 0;
  display: flex;
  align-items: center; /* Centra el botón verticalmente */
}

.button-and-dot-container {
  display: flex;
  align-items: center; /* Alinea verticalmente el botón y el círculo */
}

.uncommited-dot {
  width: 12px; /* Tamaño del círculo */
  height: 12px; /* Tamaño del círculo */
  /* Color del círculo */
  border-radius: 50%; /* Hace que sea redondo */
  margin-right: 15px; /* Espacio entre el botón y el círculo */
}
.tag-row {
  margin-top: 4px; /* Espacio arriba del tag */
}

.right-column {
  /* Estilos para la columna de botones, si es necesario */
  flex-shrink: 0;
  display: flex;
  align-items: center; /* Centra el botón verticalmente */
}
</style>
