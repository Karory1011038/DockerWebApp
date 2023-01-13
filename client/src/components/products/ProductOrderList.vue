<template>
    <div v-if="products.length">
        <order-card v-for="(item,index) in products" :style="index === 0?'':{'margin-top':'10px'}" :product="product">
        </order-card>
    </div>
    <div v-else>
        Cart is empty
    </div>
</template>

<script>
import OrderCard from "./ProductOrderListCard.vue";
export default {
    name: "ProductOrderList",
    components: {OrderCard},
    props:['products']
}
</script>

<style scoped>

</style>