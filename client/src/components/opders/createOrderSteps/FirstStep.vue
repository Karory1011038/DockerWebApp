<template>
    <div style="display: flex;justify-content: space-between;padding: 10px 20px">
        <div class="tg-text condensed order-title"><span class="order-number">#W003</span><br>YOUR ORDER</div>
        <div class="tg-link edit-button" @click="goHome">EDIT</div>
    </div>
    <product-order-list  :products="cartProducts"></product-order-list>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
        <div class="tg-text total-label">Total price:</div>
        <div class="tg-text total-price chakra_petch">{{ totalSum }} ฿</div>
    </div>
</template>

<script setup>
import ProductOrderList from "../../products/ProductOrderList.vue";
import {computed, onMounted} from "vue";
import {useProductsStore} from "../../../stores/products";
import {useCartStore} from "../../../stores/cart";
import telegram from "../../../telegram/telegram";

const {tg, initCartButtons, goHome} = telegram()
initCartButtons()
const productsStore = useProductsStore()
const cartStore = useCartStore();
const products = computed(() => {
    return productsStore.getProducts;
});
const cartProducts = computed(() => {
    return products.value.map(el => {
        if (Object.keys(cartStore.getCart).some(item => item == el.id) && cartStore.getCart[el.id] > 0) {
            return {...el, count: cartStore.getCart[el.id]}
        }
    }).filter(el => !!el)
})
const totalSum = computed(() => {
    return cartProducts.value.reduce((partialSum, a) => {
        return partialSum + (a.price * a.count)
    }, 0);
})

onMounted(() => {
    tg.MainButton.hide()
    productsStore.fetchProducts()
})

</script>

<style scoped>

</style>