import {ref} from 'vue'
import {defineStore} from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"

export const useItemsStore = defineStore("user", {
    state: () => ({
        items: ref(null),
        user: ref({username: '', phone: ''}),
    }),
    getters: {
        getUser(state) {
            return state.user.value
        },
        getItems(state) {
            return state.items.value
        }
    },
    actions: {
        async fetchItems() {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'no-cors'
                };
                const data = await axios('https://webappbot.website:8000/products', options)
                this.items.value = data?.data
            } catch (error) {
                alert(error)
                console.log(error)
            }
        },
        setUser(val) {
            this.user.value = val
        }
    },
})