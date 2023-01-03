<template>
    <div v-if="items.length">
        <order-card v-for="(item,index) in items" :style="index === 0?'':{'margin-top':'10px'}" :item="item">
        </order-card>
    </div>
    <div v-else>
        Cart is empty
    </div>
</template>

<script>
import OrderCard from "./OrderCard.vue";
export default {
    name: "OrderRow",
    components: {OrderCard},
    props:['items']
}
</script>

<style scoped>

</style>