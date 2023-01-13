<template>
    <div class="product-catalog-card-card">
        <transition name="bounce">
            <div :key="cart[String(product.id)]" v-if="cart[String(product.id)]" class="product-catalog-card-circle">
                {{ cart[String(product.id)] }}
            </div>
        </transition>
        <img :src="props.product.image" alt="Error load image"
             class="product-catalog-card-image">
        <div class="product-catalog-card-name ff-font">{{ props.product.name }}</div>
        <p class="product-catalog-card-description">{{ props.product.properties }}</p>
        <div class="product-catalog-card-price">{{ props.product.price }} ฿</div>
        <div class="button-container">
            <button :class="cart[String(product.id)]?'hidden':''" @click.stop="addProduct(props.product)"
                    id="add-button">
                Add
            </button>
            <div :class="cart[String(product.id)]?'':'hidden'" id="counter-container">
                <button @click.stop="deleteProduct(props.product)" id="decrement-button">
                    <svg height="22" enable-background="new 0 0 40 40" id="Слой_1" version="1.1"
                         viewBox="0 0 40 40"
                         xml:space="preserve" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z"/></g>
                        <g><path d="M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z"/></g>
                        <g><path d="M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z"/></g>
                        <g><path d="M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z"/></g>
                        <g><path d="M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z"/></g></svg>
                </button>
                <button @click.stop="addProduct(props.product)" id="increment-button">
                    <svg height="25" viewBox="0 0 30 30" width="30" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M25.5 3C23.02 3 21 5.02 21 7.5s2.02 4.5 4.5 4.5S30 9.98 30 7.5 27.98 3 25.5 3zm0 1C27.44 4 29 5.56 29 7.5S27.44 11 25.5 11 22 9.44 22 7.5 23.56 4 25.5 4zm0 1c-.277 0-.5.223-.5.5V7h-1.5c-.277 0-.5.223-.5.5s.223.5.5.5H25v1.5c0 .277.223.5.5.5s.5-.223.5-.5V8h1.5c.277 0 .5-.223.5-.5s-.223-.5-.5-.5H26V5.5c0-.277-.223-.5-.5-.5zm-15 11h13c.277 0 .5.223.5.5s-.223.5-.5.5h-13c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm-1-4h12c.277 0 .5.223.5.5s-.223.5-.5.5h-12c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zm12 10c-1.375 0-2.5 1.125-2.5 2.5s1.125 2.5 2.5 2.5 2.5-1.125 2.5-2.5-1.125-2.5-2.5-2.5zm0 1c.834 0 1.5.666 1.5 1.5s-.666 1.5-1.5 1.5-1.5-.666-1.5-1.5.666-1.5 1.5-1.5zm-10-1C10.125 22 9 23.125 9 24.5s1.125 2.5 2.5 2.5 2.5-1.125 2.5-2.5-1.125-2.5-2.5-2.5zm0 1c.834 0 1.5.666 1.5 1.5s-.666 1.5-1.5 1.5-1.5-.666-1.5-1.5.666-1.5 1.5-1.5zM.508 4c-.67 0-.677 1 0 1H4.1c.074.355.64 3.055 1.314 6.23.358 1.686.724 3.406 1.018 4.766.293 1.36.505 2.327.588 2.633.132.494.256 1.055.62 1.544.362.488 1 .826 1.86.826h13.992c.86 0 1.498-.338 1.862-.826.363-.49.486-1.05.62-1.545.087-.332.224-1.103.41-2.07.183-.97.4-2.093.6-2.947.165-.613-.856-.88-.972-.226-.206.884-.427 2.012-.612 2.984-.185.973-.347 1.832-.392 2-.136.506-.263.945-.457 1.206-.194.262-.42.424-1.058.424H9.5c-.638 0-.864-.162-1.06-.424-.193-.26-.32-.7-.456-1.205-.05-.193-.28-1.227-.574-2.585-.293-1.358-.66-3.076-1.017-4.764-.716-3.373-1.4-6.624-1.4-6.624-.048-.23-.252-.396-.49-.396zm7.994 4c-.665 0-.657 1 0 1h9.992c.672 0 .657-1 0-1z"/>
                    </svg>
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import {useCartStore} from "../../stores/cart";
import {onMounted, ref, watch} from "vue";
import telegram from '../../telegram/telegram'

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
const isCartFilled = useCartStore().cartFilled

function addProduct(product) {
    cart[product.id] = cart[product.id] ? cart[product.id] + 1 : 1
    localStorage.setItem('cart', JSON.stringify(cart));
}

function deleteProduct(product) {
    cart[product.id] = cart[product.id] ? cart[product.id] - 1 : 0
    localStorage.setItem('cart', JSON.stringify(cart));
}

function setButton(val){
    val ? tg.MainButton.show() : tg.MainButton.hide()
}

watch(isCartFilled, setButton);
onMounted(() =>{
    setButton(isCartFilled)
})

</script>

<style>
.product-catalog-card-card {
    background: #505160;
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
    padding: 2px;
    border-radius: 10px;
}

.product-catalog-card-name {
    line-height: 25px;
    max-width: 100%;
    height: 25px;
    margin: 0;
    padding: 0 15px;
    font-size: 1.2em;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.product-catalog-card-description {
    padding: 0px 5px;
    color: #d6d6d6;
    overflow: hidden;
    max-width: 100%;
    height: 48px;
    font-size: 0.7em;
    text-align: center;
    margin-bottom: 2px;
}

.product-catalog-card-price {
    font-size: 1.1em;
    font-weight: 500;
    color: white;
}


/* BUTTONS */
.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 40px;
}

#add-button {
    border: 0;
    background-color: #AEBD38;
    color: black;
    position: absolute;
    border-radius: 10px;
    height: 40px;
    width: 100%;
    z-index: 1;
    transition: all 0.3s ease-in-out;
}

#counter-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    transition: all 0.3s ease-in-out;
}

#increment-button,
#decrement-button {
    background-color: #AEBD38;
    border: 0;
    width: calc(50% - 14px);
    height: 100%;
    border-radius: 10px;

}

#decrement-button {
}

#increment-button {
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
