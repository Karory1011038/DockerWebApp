<style>
#app{
    /*background-color: black !important;*/
}
</style>

<template >
    <router-view class="bgc" v-slot="{ Component }">
        <transition>
            <component  :is="Component"/>
        </transition>
    </router-view>
</template>
