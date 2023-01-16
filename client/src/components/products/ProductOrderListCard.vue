<template>
    <div style="display: flex;justify-content: space-between;height: 64px">
        <img :src="product.image" :alt="product.name" class="order-image" style="margin-right: 10px;">
        <div class="tg-text condensed order-product-name">
            <span>{{ product.name }}</span>
        </div>
        <div style="margin-left: auto;" class="tg-text order-product-price chakra_petch">
            {{ product.count }} * {{ product.price }} (฿)
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
.order-image {
    width: 64px;
    height: 64px;
    object-fit: contain;
    border-radius: 10px;
}

.order-product-name {
    margin-top: auto;
    margin-bottom: auto;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
}
.order-product-price{
    font-weight: 400;
font-size: 16px;
line-height: 21px;
}
</style>