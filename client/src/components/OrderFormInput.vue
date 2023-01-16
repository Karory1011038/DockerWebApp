<template>
    <label>
        <span class="label">{{ label }}</span>
        <div class="tg-bg">
            <div class="tg-text input-text" style="display: inline-block;width: 30px;text-align: center">{{
                    prepend
                }}
            </div>
            <input :value="modelValue" :placeholder="placeholder" class="input-text order-form-input tg-text tg-bg"
                   @input="changeValue">
        </div>
    </label>
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
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
}
</style>