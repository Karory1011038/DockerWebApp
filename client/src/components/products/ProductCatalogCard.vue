<template>
    <div class="product-catalog-card-card">
        <transition name="bounce">
            <div :key="cart[String(product.id)]" v-show="cart[String(product.id)]" class="product-catalog-card-circle">
                {{ cart[String(product.id)] }}
            </div>
        </transition>
        <img :src="props.product.image" alt="Error load image"
             class="product-catalog-card-image">
        <div class="product-catalog-card-name condensed">{{ props.product.name }}</div>
        <p class="product-catalog-card-description">{{ props.product.properties }}</p>
        <div class="button-container">
            <button :class="cart[String(product.id)]?'hidden':''" @click.stop="addProduct(props.product)"
                    id="add-button">
                <div class="product-catalog-card-price chakra_petch">{{ props.product.price }} (฿)</div>
            </button>
            <div :class="cart[String(product.id)]?'':'hidden'" id="counter-container">
                <button @click.stop="deleteProduct(props.product)" id="decrement-button">
                    <minus-icon></minus-icon>
                </button>
                <button @click.stop="addProduct(props.product)" id="increment-button">
                    <plus-icon></plus-icon>
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import {useCartStore} from "../../stores/cart";
import {onMounted, ref, watch} from "vue";
import telegram from '../../telegram/telegram'
import PlusIcon from "../icons/PlusIcon.vue";
import MinusIcon from "../icons/MinusIcon.vue";

const {tg} = telegram()
const props = defineProps({
    product: {
        type: Object,
        default: () => {
            return {}
        }
    }
})
const cart = useCartStore().getCart

function addProduct(product) {
    cart[product.id] = cart[product.id] ? cart[product.id] + 1 : 1
    localStorage.setItem('cart', JSON.stringify(cart));
}

function deleteProduct(product) {
    cart[product.id] = cart[product.id] ? cart[product.id] - 1 : 0
    localStorage.setItem('cart', JSON.stringify(cart));
}


</script>

<style>
.product-catalog-card-card {
    background: rgba(217, 217, 217, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    height: 300px;
    max-width: 100%;
    margin: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
}

.product-catalog-card-card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    /*transform: translateY(-4px);*/
}

.product-catalog-card-image {
    width: 100%;
    height: 148px;
    object-fit: cover;
    padding: 5px;
    border-radius: 10px;
}

.product-catalog-card-name {
    max-width: 100%;
    height: 32px;
    padding: 0 15px;
    font-weight: 700;
    font-size: 14px;
    text-align: center;
    color: #FFFFFF;
    line-height: 16px;
    margin-bottom: 5px;
    /*overflow: hidden;*/
    /*white-space: nowrap;*/
    /*text-overflow: ellipsis;*/
}

.product-catalog-card-description {
    padding: 0px 5px;
    font-weight: 300;
    font-style: normal;
    font-size: 12px;
    max-width: 100%;
    height: 42px;
    line-height: 14px;
    text-align: center;
    margin-bottom: 10px;
    color: #FFFFFF;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.product-catalog-card-price {
    font-weight: 300;
    font-style: normal;
    font-size: 16px;
    line-height: 21px;
    text-align: center;

    color: #000000;
}


/* BUTTONS */
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 50px;
}

#add-button {
    border: 0;
    background: #75FE72;
    color: black;
    position: absolute;
    border-radius: 100px;
    height: 50px;
    width: 100%;
    z-index: 1;
    transition: all 0.3s ease-in-out;
}

#counter-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    transition: all 0.3s ease-in-out;
}

#increment-button,
#decrement-button {
    background-color: #AEBD38;
    border: 0;
    /*width: calc(50% - 14px);*/
    /*height: 100%;*/
    width: 50px;
    height: 50px;
    border-radius: 50%;

}

#decrement-button {
    background: #FF5050;
}

#increment-button {
    background: #75FE72;
}

.hidden {
    visibility: hidden;
    opacity: 0;
}


.product-catalog-card-circle {
    z-index: 1;
    width: 25px;
    height: 25px;
    background-color: #68829E;
    border-radius: 50%;
    position: absolute;
    top: -12.5px;
    right: -12.5px;
    text-align: center;
}


.bounce-enter-active {
    animation: bounce-in 0.25s;
}

.bounce-leave-active {
    animation: bounce-in 0.25s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.25);
    }
    100% {
        transform: scale(1);
    }
}

</style>
