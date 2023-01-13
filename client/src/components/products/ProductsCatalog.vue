<template>
    <div class="products-row">
        <div v-for="(product,index) in products" :key="index">
            <product-catalog-card  :product="{id:index,name:'White widow',properties:'Lemon Berry Candy OG, известный своим супер вкусным вкусом, обладает хорошо сбалансированным эффектом с тяжелыми эффектами, которые заставят вас физически расслабиться, когда ваш разум достигнет новых высот.  Этот шишка имеет кисло-сладкий цитрусово-лимонный вкус с легким оттенком ягод.  Аромат землистый и газированный, с кисло-цитрусовым оттенком, подчеркнутым сладкими ягодами и тяжелым дизельным топливом.  Эффект Lemon Berry Candy OG наступает через несколько минут после последней затяжки, сначала поражая ваш разум, а затем распространяясь по всему телу.  Вы почувствуете прилив энергии и мотивации благодаря творческому и мотивированному обертону, наполненному сосредоточенностью. ',price: 2,image:'https://avatars.mds.yandex.net/i?id=894609fec003f369b815003b3c967d6b-4504463-images-thumbs&n=13'}"></product-catalog-card>
        </div>
    </div>
</template>

<script setup>
import ProductCatalogCard from "./ProductCatalogCard.vue";
import {computed} from "vue";
import { onMounted } from 'vue'
import {useProductsStore} from "../../stores/products";
const productsStore = useProductsStore()

const products = computed(() => {
    return productsStore.getProducts;
});

onMounted(() => {
    productsStore.fetchProducts()
})
</script>

<style scoped>
.products-row {
    max-width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin-top: 10px;
}
</style>