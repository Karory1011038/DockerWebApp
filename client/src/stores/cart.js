import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => {
        let cartData = {}
        try {
            cartData = JSON.parse(localStorage.getItem('cart')) || {}
        } catch (e) {
            console.error(`Error loading cart data from localStorage: ${e}`)
        }
        return {
            cart: ref(cartData)
        }
    },
    mutations: {
        addItem(state, item) {
            state.cart.value[item.id] = state.cart.value[item.id] ? state.cart.value[item.id] + 1 : 1
            localStorage.setItem('cart', JSON.stringify(state.cart.value))
        },
        clearCart(state) {
            state.cart.value = {}
            localStorage.removeItem('cart')
        },
        deleteItem(state, item) {
            if (!state.cart.value[item.id]) return
            state.cart.value[item.id] = state.cart.value[item.id] > 1 ? state.cart.value[item.id] - 1 : undefined
            localStorage.setItem('cart', JSON.stringify(state.cart.value))
        }
    },
    getters: {
        cartCount: (state) => Object.values(state.cart.value).reduce((count, itemCount) => count + itemCount, 0),
        isInCart: (state) => (itemId) => !!state.cart.value[itemId],
        getCart: (state) => () => state.cart.value,
    },
})
