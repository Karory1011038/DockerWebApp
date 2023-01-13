<template>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
        <div class="tg-text" style="font-size: 18px;font-weight: 600">YOUR ORDER</div>
        <div class="tg-link" @click="goHome">Edit</div>
    </div>
    <div style="margin: 20px">
        <order-form @validate="changeBtnStatus"></order-form>
    </div>
    <product-order-list style="margin: 20px" :products="cartProducts"></product-order-list>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
        <div class="tg-text" style="font-size: 16px;font-weight: 600">Общая стоимость:</div>
        <div class="tg-text" style="font-weight: 600">{{ totalSum }} ฿</div>
    </div>

</template>

<script setup>
import ProductOrderList from "./products/ProductOrderList.vue";
import {useProductsStore} from "../stores/products";
import {useUserStore} from "../stores/user";
import {computed, onMounted} from "vue";
import {useCartStore} from "../stores/cart";
import OrderForm from "./OrderForm.vue";
import router from "../router";
import telegram from '../telegram/telegram'

const {tg,initCartButtons,actualCallback} = telegram()

initCartButtons()
const productsStore = useProductsStore()
const userStore = useUserStore()
const {getCart} = useCartStore();

const products = computed(() => {
    return productsStore.getProducts;
});



const cartProducts = computed(() => {
    return products.value.map(el => {
        if (Object.keys(getCart).some(item => item == el.id) && getCart[el.id] > 0) {
            return {...el, count: getCart[el.id]}
        }
    }).filter(el => !!el)
})

const totalSum = computed(() => {
    return cartProducts.value.reduce((partialSum, a) => {
        return partialSum + (a.price * a.count)
    }, 0);
})

const goHome = () => {
    tg.offEvent('mainButtonClicked', actualCallback)
    router.push('/')
}

const changeBtnStatus = (val) => {
    if (val.username !== '' && val.phone.length >= 13) {
        userStore.setUser(val)
        tg.MainButton.show()
    } else
        tg.MainButton.hide()
}

onMounted(() => {
    tg.MainButton.hide()
    productsStore.fetchProducts()
})

</script>

<style scoped>

</style>