<template>
    <div>
        <order-form-input prepend="@" label="Username" placeholder="someuser"
                          v-model="formData.username"></order-form-input>
        <br>
        <order-form-input prepend="+66" label="Phone number" placeholder="(012) 345-6789"
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