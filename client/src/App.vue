<style>
#app{
    background-color: black !important;
}
</style>

<template >
<marquee>Бегущая строка</marquee>
    <router-view class="bgc" v-slot="{ Component }">
        <transition>
            <component  :is="Component"/>
        </transition>
    </router-view>
</template>
