<template>
    <welcome-block @click="scrollTo"></welcome-block>
    <div id="catalog"><products-catalog></products-catalog></div>
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

function scrollTo() {
    document.getElementById('catalog').scrollIntoView({behavior: "smooth"});
}

defineExpose({scrollTo});

const {initHomeButtons, tgUserData} = telegram()

onMounted(() => {
    userStore.setUser(tgUserData)
})

initHomeButtons()

</script>

<style>


</style>