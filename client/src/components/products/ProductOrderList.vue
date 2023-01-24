<template>
    <div v-if="products.length" class="products-horizontal-row" :class="{'has-more': hasMore}">
        <div v-for="(product,index) in products"
             :style="{'margin-top': index === 0 ? '0' : '10px'}">
            <order-card :product="product"></order-card>
        </div>
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
    props: ['products'],
    computed: {
        hasMore() {
            return this.products.length > 5; // can be adjusted as needed
        }
    }
}
</script>

<style>
.products-horizontal-row {
    height: 450px;
    overflow-y: scroll
}
.products-horizontal-row.has-more::before {
    content: "...";
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
}
</style>
