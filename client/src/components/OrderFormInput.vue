<template>
    <div class="order-form-input-container">
        <div style="display:flex;">
            <div style="margin: auto" class="label">{{ label }}</div>
        </div>
        <div class="tg-bg">
            <div class="tg-text input-text" style="display: inline-block;width: 30px;text-align: center">{{
                    prepend
                }}
            </div>
            <input :value="modelValue" :placeholder="placeholder" class="input-text order-form-input tg-text tg-bg"
                   @input="changeValue">
        </div>
    </div>
</template>

<script>
export default {
    name: "OrderFormInput",
    props: ['modelValue', 'label', 'placeholder', 'prepend', 'phoneVal'],
    emits: ['update:modelValue'],
    methods: {
        changeValue(val) {
            if (this.phoneVal) {
                const x = val.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                val.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            }
            this.$emit('update:modelValue', val.target.value)
        }
    }
}
</script>

<style>
.order-form-input {
    border: none;
    width: auto;
}

.order-form-input:focus-visible {
    outline: none;
    /*border: var(--tg-theme-link-color) solid 2px;*/
}

.input-text {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}

.label {
    font-weight: 500;
    font-size: 18px;
    line-height: 16px;
}

.order-form-input-container {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid;
    margin-bottom: 15px;
}
</style>