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
    <button @click="csl">GOOGGOGO</button>
</template>

<script setup>
import {mapState} from "pinia/dist/pinia";
import {useCartStore} from "../stores/cart";
import {useItemsStore} from "../stores/items";
import OrderRow from "./order/OrderRow.vue";
import {computed} from "vue";
import router from "../router";
import OrderForm from "./order/form/OrderForm.vue";
import telegram from "../mixins/telegram";

const {items} = useItemsStore();
const {cart} = useCartStore()
const cartItems = computed(() => {
    return items.map(el => {
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
const {setUser} = useItemsStore()
const {tg, showButton, hideButton, setCompleteButton, unsetCompleteButton} = telegram();
setCompleteButton()

const changeBtnStatus = (val) => {
    if (val.username !== '' && val.phone.length >= 13) {
        setUser(val)
        showButton()
    } else
        hideButton()
}

// import axios from 'axios'

const csl = async () => {
    const {items, user} = useItemsStore();
    const {cart, clearCart} = useCartStore()
    const cartItems = items.map(el => {
        if (Object.keys(cart).some(item => item === el.id) && cart[el.id] > 0) {
            return {name: el.name, count: cart[el.id]}
        }
    }).filter(el => !!el)

    try {
        fetch("https://webappbot.website:8000/web-data", {
            "headers": {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            },
            "method": "POST",
            "mode": "no-cors",
            "credentials": "omit"
        }).then(r => {
            alert('yes')
        }).catch(e => {
            alert(e)
        });
    } catch (e) {
        alert(e)
    }
    // const response = await fetch("http://185.184.55.97:8000/web-data", requestOptions);
    // alert(response)
    // tg.sendData(JSON.stringify({'user': user, 'items': cartItems}));
    // clearCart()
    // tg.close()


}
</script>

<style scoped>

</style>