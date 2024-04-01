<script setup lang="ts">
import MyInput from '@/components/elementos/MyInput.vue';
import { getYearsDrop } from '@/helpers/getYearsDrop';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import { mapToDropdownItems } from '@/helpers/dropUtils';
import type { DropDownInterface } from '@/interfaces/dropdown.interface';
import { ref, watch } from 'vue';
import { sitiosDropdwown, modusOperandiDropdwown, causaCaratulaDropdwown, juzgadoIntervinienteDropdwown } from '../helpers/getDropItems';
import { getUpperCase } from '@/helpers/stringUtils';

let selectedYear = ref<DropDownInterface>()
let selectedSitio = ref<DropDownInterface>()
let selectedModusOperandi = ref<DropDownInterface>()
let selectedCausaCaratula = ref<DropDownInterface>()
let selectedJuzgadoInterviniente = ref<DropDownInterface>()
let selectedCausaCaratulaList = ref(null)
    
let yearsActuacion:string[] = getYearsDrop()
let itemsCausaCaratula = ref<any[]>([])

watch(selectedCausaCaratula, () => {

    if(!selectedCausaCaratula.value) return

    const itemExists = itemsCausaCaratula.value.some( item => item.name === selectedCausaCaratula.value?.name)
    if (!itemExists) itemsCausaCaratula.value.push(selectedCausaCaratula.value);
    
    selectedCausaCaratula.value = undefined
    
});
const eliminarItem = (name:string)=>{
    if (itemsCausaCaratula.value === undefined) return
    itemsCausaCaratula.value = itemsCausaCaratula.value.filter(item => item.name !== name);

}
</script>
<template>
    <div class="grid">
                
        <div class="col-9">
            <label for="dropdown" >Legajo N° / N° de extracto</label>
            <MyInput
                type="text"
                class="mt-2"
             />
        </div>
        <div class="col-3">
            <label for="dropdown">Año</label>
            <Dropdown
                v-model="selectedYear"
                :options="mapToDropdownItems(yearsActuacion)"
                :placeholder="yearsActuacion[0]"
                optionLabel="name"
                class="w-full mt-2" />
        </div>    
        <!-- Sitio -->
        <div class="col-12">
            <label for="dropdown">Sitio</label>
            <MyDropdown
                :items="sitiosDropdwown"
                v-model="selectedSitio"
                placeholder="Seleccione un sitio"
                optionLabel="name"
                class="w-full mt-2" />
        </div>
        <!-- Modus Operandi -->
        <div class="col-12">
            <label for="dropdown">Modus operandi</label>
            <MyDropdown
                :items="modusOperandiDropdwown"
                v-model="selectedModusOperandi"
                placeholder="Seleccione Modus Operandi"
                optionLabel="name"
                class="w-full mt-2" />
        </div>
        <!-- Modus Operandi -->
        <div class="col-12">
            <label for="dropdown">Causa Caratula</label>
            <MyDropdown
                :items="causaCaratulaDropdwown"
                v-model="selectedCausaCaratula"
                placeholder="Seleccione Causa Caratula"
                optionLabel="name"
                class="w-full mt-2" />
        </div>
        <div class="col-12">
            <Listbox
                v-model="selectedCausaCaratulaList"
                :options="itemsCausaCaratula"
                optionLabel="name"
                class="w-full" > 
                <template #option="{ option }">
                    <div class="flex align-content-center justify-content-between flex-wrap">
                        <div class="justify-content-between">
                            <span class="font-bold">{{ option.name ? getUpperCase(option.name) : '' }}</span>
                        </div>
                        <div class="justify-content-between">
                            <Button icon="pi pi-trash" 
                                severity="danger" 
                                @click="eliminarItem(option.name)" />
                        </div>
                    </div>
                </template>
            </Listbox>

         </div>
        <!-- UFI Nro. -->
        <div class="col-12">
            <label for="dropdown">Juzgado Interviniente</label>
            <MyDropdown
                :items="juzgadoIntervinienteDropdwown"
                v-model="selectedJuzgadoInterviniente"
                placeholder="Seleccione Juzgado Interviniente"
                optionLabel="name"
                class="w-full mt-2" />
        </div>
    
    </div>
</template>
