<template>
    <div style="margin: 20px 0;">
        <!--        <default-header></default-header>-->
        <items-row :items="items"></items-row>
        <!--        <default-button text="Выход" @click="onClose"></default-button>-->
<!--        <main-button></main-button>-->
    </div>
</template>

<script setup>
import telegram from "../mixins/telegram.js";
import ItemsRow from "./items/ItemsRow.vue";
import {useItemsStore} from "../stores/items";
import {useCartStore} from "../stores/cart";


const {tg, setOrderPageButton} = telegram();
// Telegram.WebApp.onEvent('mainButtonClicked', function () {
/*tg.sendData("some string that we need to send");*/
//при клике на основную кнопку отправляем данные в строковом виде
// });
setOrderPageButton()
import {computed, watch} from "vue";

const {items} = useItemsStore();

</script>

<style scoped>

</style>