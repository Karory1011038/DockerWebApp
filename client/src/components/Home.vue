<template>
    <div>{{tgUserData}}</div>
</template>

<script setup>
import telegram from '../telegram/telegram'

const {initHomeButtons,tgUserData} = telegram()

initHomeButtons()
</script>

<style scoped>

</style>