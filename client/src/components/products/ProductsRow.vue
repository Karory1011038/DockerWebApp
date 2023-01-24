<template>
    <div class="product-row">
        <section class="scrollport">
            <div>
<!--                <product-catalog-card :product="products[1]"></product-catalog-card>-->
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </section>
    </div>

</template>

<script>
export default {
    name: "ProductsRow"
}
</script>

<style >
@import "https://unpkg.com/open-props";
@import "https://unpkg.com/open-props/normalize.min.css";

.scrollport {
  -webkit-mask-image: linear-gradient(to right, #0000, #000, #000, #0000);

  overflow-x: auto;
  overscroll-behavior-x: contain;

  display: flex;
  gap: var(--size-10);
  align-items: start;
  padding: var(--size-10);
}

.scrollport > div {
  block-size: 250px;
  aspect-ratio: var(--ratio-square);
  background-color: var(--surface-2);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-4);
}

.product-row {
  display: grid;
  place-content: center;
}
</style>