<template>
    <div style="display: flex;justify-content: space-between;padding: 10px 20px">
        <div class="tg-text condensed order-title"><span class="order-number">#W003</span><br>YOUR ORDER</div>
        <div class="tg-link edit-button" @click="goHome">EDIT</div>
    </div>
<!--    <div style="margin: 20px">-->
<!--        <order-form @validate="changeBtnStatus"></order-form>-->
<!--    </div>-->
    <product-order-list  :products="cartProducts"></product-order-list>
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
    cartStore.commit('clearCart')
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
    font-size: 26px;
    line-height: 28px;
}

.order-number{
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
}

.edit-button {
    margin:  auto 0;
    font-weight: 600;
    font-size: 18px;
    line-height: 19px;
    background-color: black;
    border-radius: 30px;
    text-align: center;
    padding: 15px 25px;
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