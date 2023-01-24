<template>
    <div class="product-row">
        <section class="scrollport">
            <div>
<!--                <product-catalog-card :product="products[1]"></product-catalog-card>-->
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </section>
    </div>
</template>

<script setup>
import ProductCatalogCard from "./ProductCatalogCard.vue";
import {computed, ref, watch} from "vue";
import {onMounted} from 'vue'
import {useProductsStore} from "../../stores/products";
import router from "../../router";
import {useCartStore} from "../../stores/cart";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

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
gsap.registerPlugin(ScrollTrigger);
// REVEAL //
gsap.utils.toArray(".revealUp").forEach(function (elem) {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 80%",
        end: "bottom 20%",
        markers: true,
        onEnter: function () {
            gsap.fromTo(
                elem,
                {y: 100, autoAlpha: 0},
                {
                    duration: 1.25,
                    y: 0,
                    autoAlpha: 1,
                    ease: "back",
                    overwrite: "auto"
                }
            );
        },
        onLeave: function () {
            gsap.fromTo(elem, {autoAlpha: 1}, {autoAlpha: 0, overwrite: "auto"});
        },
        onEnterBack: function () {
            gsap.fromTo(
                elem,
                {y: -100, autoAlpha: 0},
                {
                    duration: 1.25,
                    y: 0,
                    autoAlpha: 1,
                    ease: "back",
                    overwrite: "auto"
                }
            );
        },
        onLeaveBack: function () {
            gsap.fromTo(elem, {autoAlpha: 1}, {autoAlpha: 0, overwrite: "auto"});
        }
    });
});
</script>

<style >
@import "https://unpkg.com/open-props";
@import "https://unpkg.com/open-props/normalize.min.css";

.scrollport {
  -webkit-mask-image: linear-gradient(to right, #0000, #000, #000, #0000);

  overflow-x: auto;
  overscroll-behavior-x: contain;

  display: flex;
  gap: var(--size-10);
  align-items: start;
  padding: var(--size-10);
}

.scrollport > div {
  block-size: 250px;
  aspect-ratio: var(--ratio-square);
  background-color: var(--surface-2);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-4);
}

.product-row {
  display: grid;
  place-content: center;
}
</style>`