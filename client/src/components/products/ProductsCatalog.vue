<template>
    <div v-if="products.length > 0 && !loading" class="products-row">
        <div v-for="product in products" :key="product.id">
            <product-catalog-card @click="toProduct(product.id)" :key="product.id"
                                  :product="product"></product-catalog-card>
        </div>
    </div>
    <div v-else style="display: flex;width: 100%;height: var(--tg-viewport-height)">
        <div class="center">
            <div v-if="loading">
                <div id="loading">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                </div>
            </div>
            <div v-else>
                <div class="np-message tg-text condensed">
                    No products found :c
                </div>
                <div style="margin-left: -24px;">
                    <svg width="200px" height="200px" viewBox="0 0 64 64" id="svg5" version="1.1" xml:space="preserve"
                         xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">

<defs id="defs2"/>

                        <g id="layer1" transform="translate(-384,-96)">

<path d="m 393.99999,105 h 49 v 6 h -49 z" id="path27804"
      style="fill:#3e4f59;fill-opacity:1;fill-rule:evenodd;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1"/>

                            <path d="m 393.99999,111 h 49 v 40 h -49 z" id="path27806"
                                  style="fill:#acbec2;fill-opacity:1;fill-rule:evenodd;stroke-width:2.00001;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1"/>

                            <path d="m 393.99999,111 v 40 h 29.76954 a 28.484051,41.392605 35.599482 0 0 18.625,-40 z"
                                  id="path27808"
                                  style="fill:#e8edee;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:2.00002;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1"/>

                            <path
                                d="m 395.99999,104 c -1.64501,0 -3,1.355 -3,3 v 40 c 0,0.55229 0.44772,1 1,1 0.55229,0 1,-0.44771 1,-1 v -40 c 0,-0.56413 0.43587,-1 1,-1 h 45 c 0.56414,0 1,0.43587 1,1 v 3 h -42 c -0.55228,0 -1,0.44772 -1,1 0,0.55229 0.44772,1 1,1 h 42 v 37 c 0,0.56413 -0.43586,1 -1,1 h -49 c -0.55228,0 -1,0.44772 -1,1 0,0.55229 0.44772,1 1,1 h 49 c 1.64501,0 3,-1.35499 3,-3 0,-14 0,-28 0,-42 0,-1.645 -1.35499,-3 -3,-3 z"
                                id="path27810"
                                style="color:#000000;fill:#000000;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1"/>

                            <path
                                d="m 438.99999,107 c -0.55228,0 -1,0.44772 -1,1 0,0.55229 0.44772,1 1,1 0.55229,0 1,-0.44771 1,-1 0,-0.55228 -0.44771,-1 -1,-1 z"
                                id="path27812"
                                style="color:#000000;fill:#ed7161;fill-opacity:1;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                            <path
                                d="m 434.99999,107 c -0.55228,0 -1,0.44772 -1,1 0,0.55229 0.44772,1 1,1 0.55229,0 1,-0.44771 1,-1 0,-0.55228 -0.44771,-1 -1,-1 z"
                                id="path27814"
                                style="color:#000000;fill:#ecba16;fill-opacity:1;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                            <path
                                d="m 430.99999,107 c -0.55228,0 -1,0.44772 -1,1 0,0.55229 0.44772,1 1,1 0.55229,0 1,-0.44771 1,-1 0,-0.55228 -0.44771,-1 -1,-1 z"
                                id="path27816"
                                style="color:#000000;fill:#42b05c;fill-opacity:1;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                            <path d="m 388.99999,150 a 1,1 0 0 0 -1,1 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z"
                                  id="path27818"
                                  style="color:#000000;fill:#000000;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                            <path
                                d="m 396.99999,110 c -0.55228,0 -1,0.44772 -1,1 0,0.55229 0.44772,1 1,1 0.55229,0 1,-0.44771 1,-1 0,-0.55228 -0.44771,-1 -1,-1 z"
                                id="path27820"
                                style="color:#000000;fill:#000000;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                            <rect height="22" id="rect4427" rx="2" ry="2"
                                  style="fill:#0075d3;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1"
                                  width="29" x="404" y="120"/>

                            <path
                                d="m 406,120 c -1.108,0 -2,0.892 -2,2 v 18 c 0,1.108 0.892,2 2,2 h 19.58398 A 19.317461,16.374676 0 0 0 430.2207,131.36719 19.317461,16.374676 0 0 0 424.80273,120 Z"
                                id="path27648"
                                style="fill:#0588e2;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1"/>

                            <rect height="6" id="rect8552"
                                  style="fill:#fe73c5;fill-opacity:1;fill-rule:evenodd;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1"
                                  width="29" x="404" y="120"/>

                            <path d="m 404,120 v 6 h 24.58984 a 14,8.5 0 0 0 0.10938,-1 14,8.5 0 0 0 -2.67969,-5 z"
                                  id="path8626"
                                  style="fill:#fe93d3;fill-opacity:1;fill-rule:evenodd;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1"/>

                            <g id="path4429" transform="translate(0,-4)">

<path d="m 404,130 h 29" id="path7162"
      style="color:#000000;fill:#918383;fill-rule:evenodd;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                                <path
                                    d="m 406,123 c -1.6447,0 -3,1.3553 -3,3 0,1.97201 0,3.94401 0,5.91602 0,0.55228 0.44772,1 1,1 0.55228,0 1,-0.44772 1,-1 V 131 h 27 v 6 c 0,0.55228 0.44772,1 1,1 0.55228,0 1,-0.44772 1,-1 0,-3.66667 0,-7.33333 0,-11 0,-1.6447 -1.3553,-3 -3,-3 z m 0,2 h 25 c 0.5713,0 1,0.4287 1,1 v 3 h -27 v -3 c 0,-0.5713 0.4287,-1 1,-1 z m -2,10 c -0.55228,0 -1,0.44772 -1,1 v 8 c 0,1.6447 1.3553,3 3,3 h 25 c 1.6447,0 3,-1.3553 3,-3 v -3 c 0,-0.55228 -0.44772,-1 -1,-1 -0.55228,0 -1,0.44772 -1,1 v 3 c 0,0.5713 -0.4287,1 -1,1 h -25 c -0.5713,0 -1,-0.4287 -1,-1 v -8 c 0,-0.55228 -0.44772,-1 -1,-1 z"
                                    id="path7164"
                                    style="color:#000000;fill:#000000;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

</g>

                            <path
                                d="m 409.93555,129.00195 c -0.45187,0.0293 -0.82765,0.35863 -0.91602,0.80274 l -1,5 C 407.89645,135.42313 408.36944,135.99975 409,136 h 3 v 2 c 0,0.55228 0.44772,1 1,1 0.55228,0 1,-0.44772 1,-1 0,-1.66667 0,-3.33333 0,-5 0,-0.55228 -0.44772,-1 -1,-1 -0.55228,0 -1,0.44772 -1,1 v 1 h -1.78125 l 0.76172,-3.80469 c 0.10771,-0.54147 -0.24375,-1.06778 -0.78516,-1.17578 -0.0854,-0.0172 -0.17278,-0.0231 -0.25976,-0.0176 z"
                                id="path8873"
                                style="color:#000000;fill:#000000;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                            <path
                                d="m 418.99999,130 c 1.10801,0 2.00002,0.89201 2.00002,2.00002 v 2.99996 c 0,1.10801 -0.89201,2.00002 -2.00002,2.00002 -1.10801,0 -2.00002,-0.89201 -2.00002,-2.00002 v -2.99996 c 0,-1.10801 0.89201,-2.00002 2.00002,-2.00002 z"
                                id="rect5745"
                                style="fill:#ffc343;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1"/>

                            <path
                                d="m 419,129 c -1.64471,0 -3,1.35529 -3,3 v 3 c 0,1.64471 1.35529,3 3,3 1.64471,0 3,-1.35529 3,-3 v -3 a 1,1 0 0 0 -1,-1 1,1 0 0 0 -1,1 v 3 c 0,0.57131 -0.42869,1 -1,1 -0.57131,0 -1,-0.42869 -1,-1 v -3 c 0,-0.57131 0.42869,-1 1,-1 a 1,1 0 0 0 1,-1 1,1 0 0 0 -1,-1 z"
                                id="path7169"
                                style="color:#000000;fill:#000000;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

                            <path
                                d="m 425.93555,129.00195 c -0.45187,0.0293 -0.82765,0.35863 -0.91602,0.80274 l -1,5 C 423.89645,135.42313 424.36944,135.99975 425,136 h 3 v 2 c 0,0.55228 0.44772,1 1,1 0.55228,0 1,-0.44772 1,-1 0,-1.66667 0,-3.33333 0,-5 0,-0.55228 -0.44772,-1 -1,-1 -0.55228,0 -1,0.44772 -1,1 v 1 h -1.78125 l 0.76172,-3.80469 c 0.10771,-0.54147 -0.24375,-1.06778 -0.78516,-1.17578 -0.0854,-0.0172 -0.17278,-0.0231 -0.25976,-0.0176 z"
                                id="path69785"
                                style="color:#000000;fill:#000000;fill-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.1;-inkscape-stroke:none"/>

</g>

</svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ProductCatalogCard from "./ProductCatalogCard.vue";
import {computed, ref, watch} from "vue";
import {onMounted} from 'vue'
import {useProductsStore} from "../../stores/products";
import router from "../../router";
import {useCartStore} from "../../stores/cart";

const cartStore = useCartStore()
let loading = ref(false);
const productsStore = useProductsStore()
import telegram from '../../telegram/telegram'

const {tg} = telegram()
const products = computed(() => {
    return productsStore.getProducts;
    // return [{"id":1,"name":"ww","price":384,"image":"images/1673876843388.jpg","properties":"sat ind","description":"bdbdjdidifkc"}];
});
const cart = computed(() => {
    return cartStore.getCart;
});

const toProduct = (id) => {
    router.push({name: 'product', params: {id: id}})
}
const isCartFilled = computed(() => {
    return Object.keys(cart.value).some(el => cart.value[el] > 0) && products.value.length > 0
});

function setButton(val) {
    val ? tg.MainButton.show() : tg.MainButton.hide()
}

watch(isCartFilled, (val) => {
    setButton(val)
});
onMounted(() => {
    loading.value = true
    productsStore.fetchProducts()
        .finally(() => {
            loading.value = false
            window.scrollTo(0, 0);
            setButton(isCartFilled.value)
        })
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
</style>`