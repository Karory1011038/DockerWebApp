<template>
    <create-order-steps></create-order-steps>
</template>

<script setup>
import CreateOrderSteps from './opders/CreateOrderSteps.vue'
</script>

<style scoped>
.order-title {
    font-weight: 700;
    font-size: 26px;
    line-height: 28px;
}

.order-number{
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
}

.edit-button {
    margin:  auto 0;
    font-weight: 600;
    font-size: 18px;
    line-height: 19px;
    background-color: black;
    border-radius: 30px;
    text-align: center;
    padding: 15px 25px;
}

.total-label {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}

.total-price {
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
}
</style>