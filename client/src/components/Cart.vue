<template>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
        <div class="tg-text condensed order-title">YOUR ORDER</div>
        <div class="tg-link edit-button" @click="goHome">Edit</div>
    </div>
    <div style="margin: 20px">
        <order-form @validate="changeBtnStatus"></order-form>
    </div>
    <product-order-list style="margin: 20px" :products="cartProducts"></product-order-list>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
        <div class="tg-text total-label" >Total price:</div>
        <div class="tg-text total-price" >{{ totalSum }} ฿</div>
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

const {tg, initCartButtons, actualCallback} = telegram()

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