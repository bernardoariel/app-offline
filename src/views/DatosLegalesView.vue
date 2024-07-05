<script setup lang="ts">
import MyInput from '@/components/elementos/MyInput.vue';
import { getYearsDrop } from '@/helpers/getYearsDrop';
import MyDropdown from '@/components/elementos/MyDropdown.vue';
import { mapToDropdownItems } from '@/helpers/dropUtils';

import { ref, watch } from 'vue';
import { sitiosDropdwown, modusOperandiDropdwown, causaCaratulaDropdwown, juzgadoIntervinienteDropdwown } from '../helpers/getDropItems';
import { getUpperCase } from '@/helpers/stringUtils';
import useDatosLegales from '../composables/useDatosLegales';
import { DatosLegalesForm } from '../interfaces/datosLegalesForm.interface';
import useItemValue from '@/composables/useItemValue';


const { 
    selectedYear,
    selectedSitio,
    selectedModusOperandi,
    selectedCausaCaratula,
    selectedJuzgadoInterviniente,
    selectedCausaCaratulaList,
    nroLegajo,
    itemsCausaCaratula
} = useDatosLegales()
const { selectedItem } = useItemValue();

let yearsActuacion:string[] = getYearsDrop()
let formData = ref<DatosLegalesForm>({ ...selectedItem.value });
const handleDropdownChange = (
  campo: keyof DatosLegalesForm,
  newValue: { value: any; name: string }
) => {
  const name = newValue.value.name;
  console.log('name::: ', name);

  if (campo in formData.value) {
    // Actualizar formData para que el campo específico tenga un objeto con la propiedad 'name' actualizada
    formData.value = {
      ...formData.value,
      [campo]: { name }, // Asigna un objeto con 'name' a campo
    };

    const itemId = formData.value.id!;
   /*  if (itemId) {
      setPristineById(itemId, false);
      setModifiedData(itemId, campo, name);
    } */
  }
};

watch(selectedCausaCaratula, () => {

    if(!selectedCausaCaratula.value) return

    const itemExists = itemsCausaCaratula.value.some( item => item.name === selectedCausaCaratula.value?.name)
    if (!itemExists) itemsCausaCaratula.value.push(selectedCausaCaratula.value);
    
    selectedCausaCaratula.value = undefined
    console.log('selectedYear::: ', selectedYear.value);
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
                v-model="nroLegajo"
                color
             />
        </div>
        <div class="col-3">
            <label for="dropdown">Año</label>
            <MyDropdown
                class="w-full mt-2"
                :items="mapToDropdownItems(yearsActuacion)"
                v-model="selectedYear"
                :placeholder="yearsActuacion[0].toString()"
                optionLabel="name"
                :filter=false
                color
                @change="
                    (newValue) => handleDropdownChange('yearsActuacion', newValue)
                "
                />
        </div>    
        <!-- Sitio -->
        <div class="col-12">
            <label for="dropdown">Sitio</label>
            <MyDropdown
                :items="sitiosDropdwown"
                v-model="selectedSitio"
                placeholder="Seleccione un sitio"
                optionLabel="name"
                filter
                color
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
                filter
                color
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
                filter
                color
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
                filter
                color
                class="w-full mt-2" />
        </div>
    
    </div>
</template>
