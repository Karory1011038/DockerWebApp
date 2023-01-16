<template>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
            <button style="background-color: black;width: 500px" @click="clearCart">CLEAR</button>

        <div class="tg-text condensed order-title">YOUR ORDER</div>
        <div class="tg-link edit-button" @click="goHome">Edit</div>
    </div>
    <div style="margin: 20px">
        <order-form @validate="changeBtnStatus"></order-form>
    </div>
    <product-order-list style="margin: 20px" :products="cartProducts"></product-order-list>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
        <div class="tg-text total-label">Total price:</div>
        <div class="tg-text total-price chakra_petch">{{ totalSum }} ฿</div>
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

const {tg, initCartButtons, goHome} = telegram()

initCartButtons()
const productsStore = useProductsStore()
const userStore = useUserStore()
const cartStore = useCartStore();

const products = computed(() => {
    return productsStore.getProducts;
});

const clearCart = () => {
    cartStore.clearCart()
}

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
.order-title {
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
}

.edit-button {
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
}

.total-label {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}

.total-price {
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
}
</style>