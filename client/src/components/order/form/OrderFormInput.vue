<template>
    <label>
        {{ label }}
        <div class="tg-bg" >
            <div class="tg-text fs-16" style="display: inline-block;width: 30px;text-align: center">{{ prepend }}</div>
            <input :value="modelValue" :placeholder="placeholder" class="fs-16 order-form-input tg-text tg-bg"
                   @input="changeValue">
        </div>
    </label>
</template>

<script>
export default {
    name: "OrderFormInput",
    props: ['modelValue', 'label', 'placeholder', 'prepend','phoneVal'],
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

.order-form-div {
    border-radius: 10px;
    padding: 5px 10px;
    border: #88B04B solid 2px

}

.order-form-div:focus-visible {
    border: var(--tg-theme-link-color) solid 2px;
}
.fs-16{
    font-size: 16px;font-weight: 500
}
</style>