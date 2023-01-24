<template>
    <welcome-block></welcome-block>
    <products-catalog></products-catalog>
</template>

<script setup>
import ProductsCatalog from "./products/ProductsCatalog.vue";
import WelcomeBlock from "./WelcomeBlock.vue";
import Ticker from "./custom/Ticker.vue";

import telegram from '../telegram/telegram'
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useUserStore} from "../stores/user";
///Text

const userStore = useUserStore()


const {initHomeButtons, tgUserData} = telegram()

onMounted(() => {
    userStore.setUser(tgUserData)
})

initHomeButtons()

</script>

<style>


</style>