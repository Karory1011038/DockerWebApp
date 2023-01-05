<template>
    <div style="margin: 20px 0;">
        <!--        <default-header></default-header>-->
        <items-row :items="items"></items-row>
        <!--        <default-button text="Выход" @click="onClose"></default-button>-->
<!--        <main-button></main-button>-->
    </div>
</template>

<script setup>
import telegram from "../mixins/telegram.js";
import ItemsRow from "./items/ItemsRow.vue";
import {useItemsStore} from "../stores/items";


const {tg, setOrderPageButton} = telegram();
setOrderPageButton()



import { ref, onMounted, computed } from "vue";
const store = useItemsStore();
const items = computed(() => {
  return store.getItems;
});
const user = computed(() => {
  return store.getUser;
});
onMounted(() => {
  store.fetchItems();
});

</script>

<style scoped>

</style>