<template>
    <div class="products-row">
        {{ isCartFilled }}
        {{ cart }}
        <div v-for="(product,index) in products" :key="index">
            <product-catalog-card @click="toProduct(product.id)" :product="product"></product-catalog-card>
        </div>
    </div>
</template>

<script setup>
import ProductCatalogCard from "./ProductCatalogCard.vue";
import {computed, watch} from "vue";
import {onMounted} from 'vue'
import {useProductsStore} from "../../stores/products";
import router from "../../router";
import {useCartStore} from "../../stores/cart";

const cartStore = useCartStore()

const productsStore = useProductsStore()
import telegram from '../../telegram/telegram'

const {tg} = telegram()
const products = computed(() => {
    return productsStore.getProducts;
});
const cart = computed(() => {
    return cartStore.getCart;
});

const toProduct = (id) => {
    router.push({name: 'product', params: {id: id}})
}
const isCartFilled = computed(() => {
    return Object.keys(cart.value).some(el => cart.value[el] > 0)
});

function setButton(val) {
    console.log(val)
    val.value ? tg.MainButton.show() : tg.MainButton.hide()
}

watch(isCartFilled, (val) => setButton(val));
onMounted(() => {
    setButton(isCartFilled.value)
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
</style>`