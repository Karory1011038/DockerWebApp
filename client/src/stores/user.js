import {defineStore} from "pinia/dist/pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: {},
    }),
    getters: {
        getUser(state) {
            return state.user
        },
        getFullName(state) {
            if (state.user?.first_name && state.user?.last_name)
                return `${ state.user.first_name} ${state.user.last_name}`
            else
                return 'Incognito'
        },
        getLang(state) {
            return state.user?.language_code || "en"
        },
    },
    actions :{
        setUser(val) {
            this.user = val
        }
    }
})