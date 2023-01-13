import {ref, computed} from 'vue'
import {defineStore} from 'pinia'


export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: ref(JSON.parse(localStorage.getItem('cart')) || {} )
    }),
    getters: {
        // cartFilled: (state) => Object.keys(state.cart).some(el => state.cart[el] > 0),
        cartFilled: (state) => computed(() => Object.keys(state.cart).some(el => state.cart[el] > 0)),
        getCart: (state) => state.cart,
    },
    actions: {
        addItem(item) {
            this.cart[item.id] = this.cart[item.id] ? this.cart[item.id] + 1 : 1
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        clearCart() {
            localStorage.removeItem('cart')
        },
        deleteItem(item) {
            this.cart[item.id] = this.cart[item.id] ? this.cart[item.id] - 1 : 0
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    },
})
