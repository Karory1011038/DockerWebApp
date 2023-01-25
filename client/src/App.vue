<style>
#app{
    /*background-color: beige !important;*/
}
</style>

<template >
    <router-view class="bgc" v-slot="{ Component }">
        <transition>
            <component  :is="Component"/>
        </transition>
    </router-view>
</template>
