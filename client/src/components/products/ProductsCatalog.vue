<template>
    <div className="section bg1">
        <products-row className="revealUp">
            <template #header>
                <div>weed</div>
            </template>
        </products-row>
    </div>
    <div className="section bg2">
        <products-row className="revealUp">
            <template #header>
                <div>weed</div>
            </template>
        </products-row>
    </div>
    <div className="spacer"></div>
</template>

<script>
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import ProductsRow from "./ProductsRow.vue";

gsap.registerPlugin(ScrollTrigger);
export default {
    components: {ProductsRow},
    mounted() {
        gsap.utils.toArray(".revealUp").forEach(function (elem) {
            ScrollTrigger.create({
                trigger: elem,
                start: "top 70%",
                end: "bottom 30%",
                markers: false,
                onEnter: function () {
                    gsap.fromTo(
                        elem,
                        {y: 100, autoAlpha: 0},
                        {
                            duration: 1.25,
                            y: 0,
                            autoAlpha: 1,
                            ease: "back",
                            overwrite: "auto"
                        }
                    );
                },
                onLeave: function () {
                    gsap.fromTo(elem, {autoAlpha: 1}, {autoAlpha: 0, overwrite: "auto"});
                },
                onEnterBack: function () {
                    gsap.fromTo(
                        elem,
                        {y: -100, autoAlpha: 0},
                        {
                            duration: 1.25,
                            y: 0,
                            autoAlpha: 1,
                            ease: "back",
                            overwrite: "auto"
                        }
                    );
                },
                onLeaveBack: function () {
                    gsap.fromTo(elem, {autoAlpha: 1}, {autoAlpha: 0, overwrite: "auto"});
                }
            });
        });
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Signika+Negative:300,400&display=swap");

*, *:before, *:after {
    box-sizing: border-box;
    position: relative;
    letter-spacing: 0.04em;
}

body {
    font-family: "Signika Negative", sans-serif;
    font-weight: 300;
}

.section {
    height: 100vh;
    width: 100%;
    position: relative;
    padding: 0;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bg1 {
    background-color: #ccc;
}

.bg2 {
    background-color: #333;
}

.revealUp {
    opacity: 0;
    visibility: hidden;
}

.spacer {
    height: 50vh;
    background-color: #000;
}
</style>
