<template>
    <div>{{tgData}}</div>
</template>

<script setup>
import telegram from '../telegram/telegram'

const {initHomeButtons,tgData} = telegram()

initHomeButtons()
</script>

<style scoped>

</style>