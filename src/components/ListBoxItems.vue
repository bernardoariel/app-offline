<script setup lang="ts">
//listBoxItems
import {
  getUpperCase,
  getTitleCase,
  getTruncatedString,
} from '@/helpers/stringUtils';
import { getColorByAfectado } from '@/helpers/getColorByAfectado';
import { getColorByEstado } from '@/helpers/getColorByEstado';
import { formatFecha } from '@/helpers/getFormatFecha';
import useItemsComputados from '@/composables/useItemsComputados';
import useItemValue from '@/composables/useItemValue';
import useFieldState from '@/composables/useFieldsState';
import { useRoute } from 'vue-router';
import { onActivated, ref } from 'vue';
import { handleFetchActuacion } from '@/helpers/handleFetchActuacion';

const { itemsComputados, routeType, eliminarItem } = useItemsComputados();
const { selectedItem } = useItemValue();
const { statesID } = useFieldState();

const getPristineById = (id: string) => {
  const found = statesID.find((state) => state.id === id);
  return found ? found.pristine : false;
};
const route = useRoute();

const id = ref(route.params.id);

onActivated(async () => {
  if (itemsComputados.value.length === 0) {
    await handleFetchActuacion(+id.value);
  }
});
</script>
<template>
  <div class="card flex flex-column justify-content-center">
    <Listbox
      v-if="itemsComputados && itemsComputados.length > 0"
      v-model="selectedItem"
      :options="itemsComputados"
      optionLabel="nombre"
      class="w-full"
    >
      <template #option="{ option }">
        <div class="flex align-items-start justify-content-between">
          <div>
            <!-- Afectados y vinculados -->
            <div v-if="routeType === 'afectados' || routeType === 'vinculados'">
              <div
                v-if="
                  !option.descripcionDesconocido &&
                  !option.descripcionOrdenPublico
                "
                class="flex flex-column xl:flex-row xl:gap-0 gap-1 "
              >
                <div>
                  <span class="font-bold">
                    {{ option.apellido ? getUpperCase(option.apellido) + ',' : '' }}
                  </span>
                  <span class="ml-2">
                    {{ option.nombre ? getTitleCase(option.nombre) : ''}}
                  </span>
                </div>
                <span class="ml-0 xl:ml-5">
                  <i v-if="option.typeDocumento">{{
                    option.typeDocumento + ': '
                  }}</i>
                  <i v-if="option.nroDocumento">{{ option.nroDocumento }}</i>
                </span>
              </div>
                <div v-if="option.descripcionDesconocido">
                  <span class="font-bold">
                    Persona de filiación desconocida:
                </span>
                <span class="ml-2">{{
                  getTruncatedString(option.descripcionDesconocido, 40)
                }}</span>
              </div>
              <div v-if="option.descripcionOrdenPublico" >
                <span class="font-bold"> Orden público: </span>
                <span class="ml-2">{{
                  getTruncatedString(option.descripcionOrdenPublico, 40)
                }}</span>
              </div>
              <div>
                <Tag
                  :value="option.typeAfectado"
                  :severity="getColorByAfectado(option.typeAfectado)"
                  class="w-max h-max mt-2"
                />
              </div>
            </div>

            <!-- fecha -->
            <div v-if="option && routeType === 'fecha'">
              <div>
                <span class="font-bold">Entre </span>
                <span>
                  {{
                    option.desdeFechaHora
                      ? formatFecha(option.desdeFechaHora)
                      : ''
                  }}
                  y
                  {{
                    option.desdeFechaHora
                      ? formatFecha(option.hastaFechaHora)
                      : ''
                  }}
                </span>
              </div>
              <div class="tag-row">
                <Tag
                  :value="option.departamento"
                  :severity="getColorByAfectado(option.departamento)"
                  class="w-max h-max mt-2"
                />
              </div>
            </div>

            <!-- personal interviniente -->
            <div v-else-if="routeType === 'personalInterviniente'">
                <div>
                  <span class="font-bold">
                    {{ option.apellido ? getUpperCase(option.apellido) + ',' : ''}}
                  </span>
                  <span class="ml-2">
                    {{ option.nombre ? getTitleCase(option.nombre) : '-' }}
                  </span>
                </div>
                <div>
                  <Tag
                    :value="option.jerarquia"
                    :severity="getColorByAfectado(option.jerarquia)"
                    class="w-max h-max mt-2"
                  />
                </div>
                <p class="text-xs">{{ option.dependencia }}</p>
              </div>

            <!-- Efectos -->
            <div v-else-if="routeType === 'efectos'">
              <div class="flex flex-column xl:flex-row flex-wrap xl:align-items-center">
                <span class="font-bold ">
                  {{ option.subcategoria.name ? getUpperCase(option.subcategoria.name) + ' ' : '' }}
                </span>
                <span class="font-bold ">
                  {{ option.categoria.name ? getUpperCase(option.categoria.name) + ',' : '' }}
                </span>
                <div>
                  <span>
                    {{ option.marca.name ? getTitleCase(option.marca.name) : '-' }}
                  </span>
                  <span>
                    {{ (option.modelo.name ? getTitleCase(option.modelo.name) : '-') + ',  '}} 
                  </span>
                </div>
                <span>
                  {{ option.tipo.name ? getTitleCase(option.tipo.name) : '-' }}
                </span>
                
              </div>
              <div>
                <Tag
                  :value="option.estado.name ? getTitleCase(option.estado.name) : '-'"
                  :severity="getColorByEstado(option.estado.name)"
                  class="h-max w-max mt-2"
                />
              </div>
              <div class="w-full">
                <p class="ml-5 text-xs">{{ option.dependencia }}</p>
              </div>
            </div>
          </div>

          <div>
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

