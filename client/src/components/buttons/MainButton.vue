<template>
    <button v-if="cartFilled" @click="clickMain" class="tg-main-button">Main</button>
</template>

<script>
import {mapState} from "pinia/dist/pinia";
import {useCartStore} from "../../stores/cart";
import router from "../../router";
import telegram from "../../mixins/telegram";
import {useItemsStore} from "../../stores/items";
import {computed} from "vue";

export default {
    name: "MainButton",
    computed: {
        ...mapState(useCartStore, ['cartFilled']),
    },
    setup() {
        const {tg, setCompleteButton} = telegram();
        tg.MainButton.setParams({"color": "#88B04B", 'text': 'Оформить'}); //так изменяются все параметры
        function clickMain() {
            const {items} = useItemsStore();
            const {cart} = useCartStore()
            const cartItems = items.map(el => {
                if (Object.keys(cart).some(item => item === el.id)) {
                    return {name: el.name, count: cart[el.id]}
                }
            }).filter(el => !!el)
            tg.sendData(JSON.stringify({'user': tg.initDataUnsafe.user.username, 'items': cartItems}));
        }

        return {
            clickMain
        }
    }
}
</script>

<style>
.tg-main-button {
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 75px;
    background: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
}
</style>