<template>
    <div class="container">
        <products-catalog></products-catalog>
    </div>
</template>

<script setup>
import ProductsCatalog from "./products/ProductsCatalog.vue";
import telegram from '../telegram/telegram'

const {initHomeButtons} = telegram()

initHomeButtons()
</script>

<style scoped>

</style>