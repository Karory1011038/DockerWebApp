<template>
    <div
        class="text-center item-card" style="vertical-align: top">
        <div style="text-align: center">
            <img
                style="width: 100px;height: 100px"
                :src="item.image"
                :alt="item.name"
            >
            <div>{{item.img}}</div>
            <div style="line-height: 20px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">
            <span class="tg-text item-title">
            {{ item.name }}
                <br>
            </span>
                <span class="tg-text item-subtitle">
            {{ item.price }}฿
            </span>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div v-if="cart[item.id]" class="counter">{{ cart[item.id] }}</div>
        </transition>
        <div class="item-card-actions">
            <transition name="fade" mode="out-in">
                <default-button v-if="!cart[item.id]" @click="emit('add')" color="#88B04B" text="Add"></default-button>
                <div v-else style="display:flex;justify-content: space-between">
                    <default-button @click="emit('delete')" color="#FF6F61" text="-"></default-button>
                    <div style="width: 10px"></div>
                    <default-button @click="emit('add')" color="#88B04B" text="+"></default-button>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import DefaultButton from "../buttons/DefaultButton.vue";
import {mapState} from "pinia/dist/pinia";
import {useCartStore} from "../../stores/cart";

export default {
    name: "ItemCard",
    components: {DefaultButton},
    emits: ['add', 'delete'],
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        ...mapState(useCartStore, ['cart']),
    },
    methods: {
        emit(ev) {
            this.$emit(ev)
        }
    }
}
</script>

<style>
.item-card {
    width: 100px;
    height: 195px;
    margin: 10px;
    position: relative;
    /*    padding: 0 20px;*/
}

.counter {
    position: absolute;
    border-radius: 50%;
    background-color: #FF6F61;
    width: 24px;
    height: 24px;
    font-weight: 600;
    right: -12px;
    top: -12px;
    text-align: center;
    color: var(--tg-theme-text-color);
}

.item-card-actions {
    position: absolute;
    width: 100%;
    bottom: 0;
}

.item-title {
    font-size: 16px;
    font-weight: 500;
}

.item-subtitle {
    font-size: 14px;
    font-weight: 700;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/*bounce-enter-active {*/
/*    animation: bounce-in 0.5s;*/
/*}*/

/*bounce-leave-active {*/
/*    animation: bounce-in 0.5s reverse;*/
/*}*/

/*@keyframes bounce-in {*/
/*    0% {*/
/*        transform: scale(0);*/
/*    }*/
/*    100% {*/
/*        transform: scale(1.25);*/
/*    }*/
/*}*/
</style>