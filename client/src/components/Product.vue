<template>
    <div class="product-page-container">
        <div class="product-image-container">
            <img :src="product.image" alt="Error loading image" class="product-image">
        </div>
        <div class="product-info-container">
            <h1 class="product-name tg-text condensed">{{ product.name }}</h1>
            <p class="product-properties tg-text">{{ product.properties }}</p>
            <div class="product-price-container">
                <span class="product-price tg-text chakra_petch">{{ product.price }} ฿ / gram</span>
            </div>
            <p class="product-description tg-text">{{ product.description }}</p>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router/dist/vue-router";
import {useProductsStore} from "../stores/products";
import router from "../router";
import telegram from '../telegram/telegram'

const {initProductButtons} = telegram()
initProductButtons()

const productsStore = useProductsStore()
const route = useRoute()

let product = ref({})

onMounted(() => {
    productsStore.getProduct(route.params.id)
        .then(r => {
            console.log(r)
            product.value = r.data
        })
        .catch((err) => {
            router.push('/')
        })
})
</script>

<style>
.product-page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.product-image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-image {
    max-width: 100%;
    max-height: 100%;
}

.product-info-container {
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: center;
}

.product-name {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.product-description {
    font-size: 1.5rem;
    line-height: 1.5;
}

.product-description {
    margin-bottom: 0.5rem;
}

.product-price-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
}

.product-price {
    font-size: 1.5rem;
    font-weight: bold;
}
</style>
