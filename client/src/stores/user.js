import {defineStore} from "pinia/dist/pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {username: '', phone: ''},
        language: 'ru',
    }),
    getters: {
        getUser(state) {
            return state.user
        },
        getLang(state) {
            return state.language
        },
    },
    actions :{
        setUser(val) {
            this.user = val
        },
        setLang(val) {
            this.language = val
        },
    }
})