<template>
    <button v-if="cartFilled" @click="clickMain" class="tg-main-button">Main</button>
</template>

<script>
import {mapState} from "pinia/dist/pinia";
import {useCartStore} from "../../stores/cart";
import telegram from "../../mixins/telegram";
export default {
    name: "MainButton",
    computed: {
        ...mapState(useCartStore, ['cartFilled']),
    },
    setup() {
        const {tg, setCompleteButton} = telegram();
        setCompleteButton()
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