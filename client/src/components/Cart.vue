<template>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
        <div class="tg-text" style="font-size: 18px;font-weight: 600">YOUR ORDER</div>
        <div class="tg-link" @click="goHome">Edit</div>
    </div>
    <order-row style="margin: 20px" :items="cartItems"></order-row>

    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
        <div class="tg-text" style="font-size: 16px;font-weight: 600">Общая стоимость:</div>
        <div class="tg-text" style="font-weight: 600" @click="goHome">{{ totalSum }}฿</div>
    </div>
    <div style="margin: 20px">
        <order-form @validate="changeBtnStatus"></order-form>
    </div>
</template>

<script setup>
import {mapState} from "pinia/dist/pinia";
import {useCartStore} from "../stores/cart";
import {useItemsStore} from "../stores/items";
import OrderRow from "./order/OrderRow.vue";
import {computed, onMounted} from "vue";
import router from "../router";
import OrderForm from "./order/form/OrderForm.vue";
import telegram from "../mixins/telegram";

const store = useItemsStore();
const items = computed(() => {
    return store.getItems;
});
const user = computed(() => {
    return store.user;
});
onMounted(() => {
    store.fetchItems();
});

const {cart} = useCartStore()
const cartItems = computed(() => {
    return items.value.map(el => {
        if (Object.keys(cart).some(item => item === el.id) && cart[el.id] > 0) {
            return {...el, count: cart[el.id]}
        }
    }).filter(el => !!el)
})
const totalSum = cartItems.value.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.count),
    0
);
const goHome = () => {
    unsetCompleteButton()
    router.push('/')
}
const {tg, showButton, hideButton, setCompleteButton, unsetCompleteButton} = telegram();
setCompleteButton()

const changeBtnStatus = (val) => {
    if (val.username !== '' && val.phone.length >= 13) {
        store.setUser(val)
        showButton()
    } else
        hideButton()
}
</script>

<style scoped>

</style>