<template>
    <div>
        <order-form-input prepend="@" label="Имя пользователя" placeholder="someuser"
                          v-model="formData.username"></order-form-input>
        <br>
        <order-form-input prepend="+66" label="Номер телефона" placeholder="(123) 456-7890"
                          :phone-val="true"
                          v-model="formData.phone"></order-form-input>
    </div>
</template>

<script>
import OrderFormInput from "./OrderFormInput.vue";
import telegram from '../telegram/telegram'
export default {
    name: "OrderForm",
    components: {OrderFormInput},
    emits: ['validate'],
    data() {
        return {
            formData: {
                username: '',
                phone: ''
            },
        }
    },
    watch: {
        formData: {
            handler(val) {
                this.$emit('validate', val)
            },
            deep: true,
        },
    },
    mounted() {
        const {tg} = telegram()
        if (tg.initDataUnsafe.user)
            this.formData.username = tg.initDataUnsafe.user.username
    }
}
</script>

<style>

</style>