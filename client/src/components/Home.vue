<template>
    <div class="container">
        <products-catalog></products-catalog>
    </div>
</template>

<script setup>
import ProductsCatalog from "./products/ProductsCatalog.vue";
import initHomeButtons from '../telegram/telegram'
initHomeButtons()
</script>

<style scoped>

</style>