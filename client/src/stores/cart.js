import {ref, computed, reactive, watch} from 'vue'
import {defineStore} from 'pinia'
import {useStorage} from '@vueuse/core'
import telegram from "./../mixins/telegram";


// export const useCartStore = defineStore('cart', () => {
//     const cart = ref(JSON.parse(localStorage.getItem('cart')) || {});
//     const cartFilled = computed(() => {
//         return Object.keys(cart).some(el => cart[el] > 0);
//     })
//     const {tg} = telegram()
//
//     function clearCart() {
//         localStorage.removeItem('cart')
//     }
//
//     function addItem(item) {
//         cart[item.id] = cart[item.id] ? cart[item.id] + 1 : 1
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }
//
//     function deleteItem(item) {
//         cart[item.id] = cart[item.id] ? cart[item.id] - 1 : 0
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }
//
//     return {cart, cartFilled, addItem, deleteItem, clearCart}
// })


export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: ref(JSON.parse(localStorage.getItem('cart')) || {} )
    }),
    getters: {
        // cartFilled: (state) => Object.keys(state.cart).some(el => state.cart[el] > 0),
        cartFilled: (state) => computed(() => Object.keys(state.cart).some(el => state.cart[el] > 0)),
    },
    actions: {
        addItem(item) {
            this.cart[item.id] = this.cart[item.id] ? this.cart[item.id] + 1 : 1
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }, clearCart() {
            localStorage.removeItem('cart')
        }, deleteItem(item) {
            this.cart[item.id] = this.cart[item.id] ? this.cart[item.id] - 1 : 0
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    },
})
