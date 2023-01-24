<template>
    <div className="section bg1">
        <products-row :products="products" className="revealUp">
            <template #header>
                <div>buds</div>
            </template>
        </products-row>
    </div>
    <div className="section bg2">
        <products-row className="revealUp">
            <template #header>
                <div>joints / wax / edible</div>
            </template>
        </products-row>
    </div>
    <div className="spacer"></div>
</template>

<script setup>
// FUNC
import {computed, ref, watch} from "vue";
import {onMounted} from 'vue'
import {useProductsStore} from "../../stores/products";
import {useCartStore} from "../../stores/cart";
import telegram from "../../telegram/telegram";
const {tg} = telegram()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const products = computed(() => {
    return productsStore.getProducts;
});
const cart = computed(() => {
    return cartStore.getCart;
});

let loading = ref(false);

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



// GSAP
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import ProductsRow from "./ProductsRow.vue";

gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
        gsap.utils.toArray(".revealUp").forEach(function (elem) {
            ScrollTrigger.create({
                trigger: elem,
                start: "top 70%",
                end: "bottom 30%",
                markers: false,
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
    })

</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Signika+Negative:300,400&display=swap");

*, *:before, *:after {
    box-sizing: border-box;
    position: relative;
    letter-spacing: 0.04em;
}

body {
    font-family: "Signika Negative", sans-serif;
    font-weight: 300;
}

.section {
    height: var(--tg-viewport-height);
    width: 100%;
    position: relative;
    padding: 0;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bg1 {
    background-color: #ccc;
}

.bg2 {
    background-color: #333;
}

.revealUp {
    opacity: 0;
    visibility: hidden;
}

.spacer {
    height: 50vh;
    background-color: #000;
}
</style>
