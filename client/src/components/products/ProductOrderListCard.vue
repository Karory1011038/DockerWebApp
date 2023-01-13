<template>
    <div style="display: flex;justify-content: space-between;height: 50px">
        <img :src="product.image" :alt="product.name" class="order-image" style="margin-right: 10px;">
        <div class="tg-text">
            <span>{{product.name}}</span>
        </div>
    <div style="margin-left: auto;font-weight: 600" class="tg-text">
        {{product.count}} * {{product.price}}฿
    </div>
    </div>
</template>

<script>

export default {
    name: "ProductOrderListCard",
    props: ['product'],
}
</script>

<style>
.order-image{
    width: 50px;
    height: 50px;
    object-fit: contain;
}
</style>