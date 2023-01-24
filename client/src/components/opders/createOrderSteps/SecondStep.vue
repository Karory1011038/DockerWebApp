<template>
    <div style="display: flex;justify-content: space-between;padding: 10px 20px">
        <div class="tg-text condensed order-title"><span class="order-number">#W003</span><br>CHECKOUT</div>
    </div>
    <div>
        <order-form @validate="() =>{}"></order-form>
    </div>
    <div style="display: flex;justify-content: space-between;margin: 10px 20px">

    </div>
</template>

<script setup>
import OrderForm from "../OrderForm.vue";
</script>

<style scoped>

</style>