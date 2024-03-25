<script setup lang="ts">
import MyInput from '@/components/elementos/MyInput.vue';
</script>
<template>
    <div class="grid">
                
        <div class="col-9">
            <label for="dropdown" >Legajo N° / N° de extracto</label>
            <MyInput
                type="number"
                class="mt-2"
                />
        </div>
        <div class="col-3">
            <label for="dropdown">Año</label>
            <MyInput
                type="number"
                class="mt-2"
                
            />
        </div>    
        <!-- Sitio -->
        <div class="col-12">
            <label for="dropdown" >Sitio</label>
            <MyInput
            type="number"
            class="mt-2"
            
            />
        </div>
        <!-- Modus Operandi -->
        <div class="col-12">
            <label for="dropdown" >Modus operandi</label>
            <MyInput
            type="number"
            class="mt-2"
            
            />
        </div>
        <!-- Modus Operandi -->
        <div class="col-12">
            <label for="dropdown" >Delito</label>
            <MyInput
            type="number"
            class="mt-2"
            
            />
        </div>
        <!-- UFI Nro. -->
        <div class="col-12">
            <label for="dropdown" >UFI N°</label>
            <MyInput
            type="number"
            class="mt-2"
            />
        </div>
        <!-- Fiscal a Cargo -->
        <div class="col-12">
            <label for="dropdown" >Fiscal a Cargo</label>
            <MyInput
            type="number"
            class="mt-2"
            
            />
        </div>
        <!-- Ayudante Fiscal -->
        <div class="col-12">
            <label for="dropdown" >Ayudante Fiscal</label>
            <MyInput
            type="number"
            class="mt-2"
            
            />
        </div>
              
    </div>
</template>
