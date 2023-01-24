<template>
    <div class="order-form-container">
        <div class="order-form-title tg-text">Shipping address</div>

        <order-form-input prepend="@" label="Username" placeholder="someuser"
                          v-model="formData.username"></order-form-input>

        <br>
        <order-form-input prepend=" +66" label="Phone" placeholder="(012) 345-6789"
                          :phone-val="true"
                          v-model="formData.phone"></order-form-input>

        <br>
        <order-form-input label="Address" placeholder="Enter address..."
                          v-model="formData.address"></order-form-input>
    </div>
</template>

<script>
import OrderFormInput from "../OrderFormInput.vue";
import telegram from '../../telegram/telegram'

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
.order-form-title{
    font-size: 24px;
    font-weight: 800;
    padding-bottom: 25px;
}
.order-form-container {
    height: 65vh;
    padding: 15px;
    background-color: black;
}
</style>