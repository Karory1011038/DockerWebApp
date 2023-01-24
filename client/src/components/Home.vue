<template>
    <div>{{ localizedText.hello +`, ${ userName}.`}}</div>
    <div>{{ localizedText.welcome }}</div>
</template>

<script setup>
import telegram from '../telegram/telegram'
import {computed, onMounted} from "vue";
///Text
import {text} from '../assets/text'

const language = computed(() => {
    return userStore.getLang;
});
const localizedText = computed(() => text[language.value])
///TEXT

import {useUserStore} from "../stores/user";

const userStore = useUserStore()
const userName = computed(() => {
    return userStore.getFullName;
});

const {initHomeButtons, tgUserData} = telegram()

onMounted(() => {
    userStore.setUser(tgUserData)
})

initHomeButtons()
</script>

<style scoped>

</style>