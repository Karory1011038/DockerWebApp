import {defineStore} from "pinia/dist/pinia";
import axios from "axios"

export const useProductsStore = defineStore("products", {
    state: () => ({
        products: [],
    }),
    getters: {
        getProducts(state) {
            return state.products
        }
    },
    actions: {
        async fetchProducts() {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors'
                };
                const data = await axios('https://webappbot.website:8000/products', options)
                this.products = data?.data
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
        async getProduct(id) {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors'
                };
                return axios(`https://webappbot.website:8000/product/${id}`, options)
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
    },

})