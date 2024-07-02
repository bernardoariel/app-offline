<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleReload = () => {
  router.push('/');
};
</script>

<template>
    <div class="container">
        <h1 class="title">SIIS - Modo OFFLine</h1>
        <h2 class="subtitle">Su usuario no está habilitado para el modo offline</h2>
        <Button label="Reload" square class="p-button-rounded" @click="handleReload"></Button>
    </div>
</template>

<style>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.title{
    font-weight: 500;
}
.subtitle{
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-weight: 400;
}

</style>