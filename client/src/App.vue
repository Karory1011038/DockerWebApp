<script setup>
import {RouterView} from 'vue-router'
import {onMounted, ref, watch} from "vue";

const transitionName = ref('')

onMounted(() => {
    watch(
        () => {
            return this.$route
        },
        (to, from) => {
            const toDepth = to.path.split('/').length
            const fromDepth = from.path.split('/').length
            transitionName.value = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }
    )
})
</script>

<template>
    <transition :name="transitionName">
        <router-view></router-view>
    </transition>
    <!--  <RouterView />-->
</template>

<style scoped>
.slide-left-enter-active, .slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}
.slide-left-enter, .slide-right-leave-to {
  transform: translateX(-100%);
}
.slide-right-enter-active, .slide-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}
.slide-right-enter, .slide-left-leave-to {
  transform: translateX(100%);
}
</style>
