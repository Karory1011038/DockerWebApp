<template>
    <div class="products-row">
        <div v-for="(product,index) in products" :key="index">
            <product-catalog-card @click="toProduct(product.id)" :product="product"></product-catalog-card>
        </div>
    </div>
</template>

<script setup>
import ProductCatalogCard from "./ProductCatalogCard.vue";
import {computed} from "vue";
import { onMounted } from 'vue'
import {useProductsStore} from "../../stores/products";
import router from "../../router";
const productsStore = useProductsStore()

const products = computed(() => {
    return productsStore.getProducts;
});

const toProduct = (id) =>{
    router.push({ name: 'product', params: { id: id } })
}

onMounted(() => {
    productsStore.fetchProducts()
})
</script>

<style scoped>
.products-row {
    max-width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 10px;
}
</style>