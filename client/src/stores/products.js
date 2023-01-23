import {defineStore} from "pinia/dist/pinia";
import axios from "axios"

const webappbotBackendUrl = process.env.VUE_APP_URL + ":" + process.env.VUE_APP_URL;

console.log(process.env.VUE_APP_URL)
console.log('process.env.VUE_APP_URL')

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
                const data = await axios(`${webappbotBackendUrl}/products`, options)
                this.products = data?.data
            } catch (error) {
                // alert(error)
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
                return axios( `${webappbotBackendUrl}/products/${id}`, options)
            } catch (error) {
                // alert(error)
                console.log(error)
            }
        },
    },

})