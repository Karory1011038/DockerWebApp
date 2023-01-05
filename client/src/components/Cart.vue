<template>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
        <div class="tg-text" style="font-size: 18px;font-weight: 600">YOUR ORDER</div>
        <div class="tg-link" @click="goHome">Edit</div>
    </div>
    <order-row style="margin: 20px" :items="cartItems"></order-row>
    <button @click="csl">gogog</button>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">
        <div class="tg-text" style="font-size: 16px;font-weight: 600">Общая стоимость:</div>
        <div class="tg-text" style="font-weight: 600" @click="goHome">{{ totalSum }}฿</div>
    </div>
    <div style="margin: 20px">
        <order-form @validate="changeBtnStatus"></order-form>
    </div>
</template>

<script setup>
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
const cart = useCartStore().getCart
const cartItems = computed(() => {
    return items.value.map(el => {
        if (Object.keys(cart).some(item => item == el.id) && cart[el.id] > 0) {
            return {...el, count: cart[el.id]}
        }
    }).filter(el => !!el)
})
const totalSum = cartItems.value.reduce((partialSum, a) => partialSum + a.price, 0);
;
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

async function csl() {
    const {getItems, getUser} = useItemsStore();
    const items = computed(() => {
        return getItems;
    });
    const user = computed(() => {
        return getUser;
    });
    const cartStore = useCartStore()
    const cart = cartStore.getCart
    const clearCart = cartStore.clearCart

    const cartItems = items.value.map(el => {
        if (Object.keys(cart).some(item => item === el.id) && cart[el.id] > 0) {
            return {name: el.name, count: cart[el.id]}
        }
    }).filter(el => !!el)
    new Promise(function (resolve, reject) {
        if (tg.initDataUnsafe.user) {
            const requestBody = JSON.stringify({
                user: user,
                items: cartItems,
                queryId: tg.initDataUnsafe.query_id,
            });
            fetch('https://webappbot.website:8000/web-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: requestBody
            }).then(r => {
                resolve(r)
            }).catch(r => {
                alert(r)
                reject(r)
            })
        } else {
            tg.sendData(JSON.stringify({'user': user, 'items': cartItems})).then(r => resolve(r));
        }
    }).then(() => {
        clearCart()
        tg.close()
    })

}
</script>

<style scoped>

</style>