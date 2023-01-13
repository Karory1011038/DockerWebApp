<template>
    <div class="item-row">
        <div v-for="item in items" :key="item.id">
            <item-card @add="addItem(item)" @delete="deleteItem(item)" :item="item"></item-card>
        </div>
    </div>
</template>

<script>
import ItemCard from "./ItemCard.vue";
import telegram from "../../mixins/telegram";
import {useCartStore} from "../../stores/cart";
import {mapActions, mapState} from "pinia/dist/pinia";

export default {
    name: "ItemsRow",
    components: {ItemCard},
    props: {
        items: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    computed: {
        ...mapState(useCartStore, ['cart','cartFilled']),
    },
    methods: {
        ...mapActions(useCartStore, ['addItem', 'deleteItem']),
    },
    watch: {
        cartFilled: {
            handler(val) {
                val.value? this.showButton(): this.hideButton()
            },
            deep: true,
        },
    },
    mounted() {
        this.cartFilled.value? this.showButton(): this.hideButton()
    },
    setup() {
        const {showButton,hideButton} = telegram();
        return {
            showButton,
            hideButton
        }
    }
}
</script>

<style>
.item-row {
    max-width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 10px;
}
</style>