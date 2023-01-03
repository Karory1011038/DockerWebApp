<template>
    <div style="display: flex;justify-content: space-between;height: 50px">
        <img :src="item.img" :alt="item.name" class="order-image" style="margin-right: 10px;">
        <div class="tg-text">
            <span>{{item.name}}</span>
            <br/>
            <span>{{item.info}}</span>
        </div>
    <div style="margin-left: auto;font-weight: 600" class="tg-text">
        {{item.count}} * {{item.price}}฿
    </div>
    </div>
</template>

<script>
import telegram from "../../mixins/telegram";

export default {
    name: "OrderCard",
    props: ['item'],
}
</script>

<style>
.order-image{
    width: 50px;
    height: 50px;
    object-fit: contain;
}
</style>