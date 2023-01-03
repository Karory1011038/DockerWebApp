import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import telegram from "./../mixins/telegram";

export const useItemsStore = defineStore('items', () => {
    const items = ref([
    {
        id: '1e',
        name: 'Jack Reaper',
        receive: 20,
        price: 500,
        img: 'https://reefdispensaries.com/wp-content/uploads/2018/05/REEFMarch2018MatureStrains_JackHerer-0775.jpg',
        info: 'testInfo',
    },
    {
        id: '2e',
        name: 'White Widow',
        receive: 20,
        price: 500,
        img: 'https://reefdispensaries.com/wp-content/uploads/2018/05/REEFMarch2018MatureStrains_JackHerer-0775.jpg',
        info: 'testInfo',
    },
    {
        id: '3e',
        name: 'Amnesia',
        receive: 20,
        price: 500,
        img: 'https://reefdispensaries.com/wp-content/uploads/2018/05/REEFMarch2018MatureStrains_JackHerer-0775.jpg',
        info: 'testInfo',
    },
    {
        id: '4e',
        name: 'Jack Reaper',
        receive: 20,
        price: 500,
        img: 'https://reefdispensaries.com/wp-content/uploads/2018/05/REEFMarch2018MatureStrains_JackHerer-0775.jpg',
        info: 'testInfo',
    },
    {
        id: '5e',
        name: 'White Widow',
        receive: 20,
        price: 500,
        img: 'https://reefdispensaries.com/wp-content/uploads/2018/05/REEFMarch2018MatureStrains_JackHerer-0775.jpg',
        info: 'testInfo',
    },
    {
        id: '6e',
        name: 'Amnesia',
        receive: 20,
        price: 500,
        img: 'https://reefdispensaries.com/wp-content/uploads/2018/05/REEFMarch2018MatureStrains_JackHerer-0775.jpg',
        info: 'testInfo',
    },
])
    const user = ref({username:'',phone:''})

    const setUser = (val) => {
        user.value = val
    }

    return {items,setUser,user}
})
