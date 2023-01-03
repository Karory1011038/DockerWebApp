<template>
    <button @click="emit" :style="{'background-color':color}" class="tg-button" :class="customClass">
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'DefaultButton',
    props: {
        text: String,
        customClass: String,
        color: String,
    },
    emits: ['click'],
    methods: {
        emit() {
            this.$emit('click')
        }
    }
}</script>

<style>
.tg-button {
    border-radius: 20px;
    border-style: solid;
    border-color: black;
    font-size: 14px;
    height: 35px;
    width: 100%;
    /*border-color: var(--tg-theme-button-color);*/
    background: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
}
</style>