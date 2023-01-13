import {defineStore} from "pinia/dist/pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {username: '', phone: ''},
    }),
    getters: {
        getUser(state) {
            return state.user
        }
    },
    actions :{
        setUser(val) {
            this.user = val
        }
    }
})