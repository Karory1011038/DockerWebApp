<template>
<div class="welcome-container text-center">
        <h2 class="newAnima">Weed Space</h2>
        <div>{{ localizedText.hello + `, ${userName}.` }}</div>
        <div>{{ localizedText.welcome }}</div>
        <div class="scrolldown-container">
            <div class='scrolldown'>
                <div class="chevrons">
                    <div class='chevrondown'></div>
                    <div class='chevrondown'></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {text} from '../assets/text'
import {useUserStore} from "../stores/user";
import {computed} from "vue";


const language = computed(() => {
    return userStore.getLang;
});
const localizedText = computed(() => text[language.value])
///TEXT

const userStore = useUserStore()
const userName = computed(() => {
    return userStore.getFullName;
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Neonderthaw&display=swap');

.welcome-container{
    height: 100vh;
}

.newAnima {
    padding: 15vh 0;
    margin-bottom: 30vh;
    font-size: 4rem;
    line-height: 3.8rem;
    font-weight: 800;
    font-family: 'Neonderthaw', cursive;
    animation: lights 5s 750ms linear infinite;
    will-change: auto;
}

@keyframes lights {
    0% {
        color: hsl(230, 40%, 80%);
        text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.2),
        0 0 0.125em hsla(320, 100%, 60%, 0.3),
        -1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
        1em 0.125em 0.5em hsla(200, 100%, 60%, 0);
    }

    30% {
        color: hsl(230, 80%, 90%);
        text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.5),
        0 0 0.125em hsla(320, 100%, 60%, 0.5),
        -0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
        0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4);
    }

    40% {
        color: hsl(230, 100%, 95%);
        text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.5),
        0 0 0.125em hsla(320, 100%, 90%, 0.5),
        -0.25em -0.125em 0.125em hsla(40, 100%, 60%, 0.2),
        0.25em 0.125em 0.125em hsla(200, 100%, 60%, 0.4);
    }

    70% {
        color: hsl(230, 80%, 90%);
        text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.5),
        0 0 0.125em hsla(320, 100%, 60%, 0.5),
        0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
        -0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4);
    }

    100% {
        color: hsl(230, 40%, 80%);
        text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.2),
        0 0 0.125em hsla(320, 100%, 60%, 0.3),
        1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
        -1em 0.125em 0.5em hsla(200, 100%, 60%, 0);
    }

}

.scrolldown-container {
    display: flex;
    margin: 35px auto;
}

.scrolldown {
    --color: white;
    --sizeX: 30px;
    --sizeY: 50px;
    position: relative;
    margin: 0 auto 16px;
    width: var(--sizeX);
    height: var(--sizeY);
    /*margin-left: calc(var(--sizeX) / 2);*/
    border: calc(var(--sizeX) / 10) solid var(--color);
    border-radius: 50px;
    box-sizing: border-box;
}

.scrolldown::before {
    content: "";
    position: absolute;
    bottom: 30px;
    left: 50%;
    width: 6px;
    height: 6px;
    margin-left: -3px;
    background-color: var(--color);
    border-radius: 100%;
    animation: scrolldown-anim 2s infinite;
    box-sizing: border-box;
    box-shadow: 0px -5px 3px 1px #ffffff66;
}

@keyframes scrolldown-anim {
    0% {
        opacity: 0;
        height: 6px;
    }
    40% {
        opacity: 1;
        height: 10px;
    }
    80% {
        transform: translate(0, 20px);
        height: 10px;
        opacity: 0;
    }
    100% {
        height: 3px;
        opacity: 0;
    }
}

.chevrons {
    padding: 6px 0 0 0;
    margin-left: -3px;
    margin-top: 48px;
    width: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chevrondown {
    margin-top: -6px;
    position: relative;
    border: solid var(--color);
    border-width: 0 3px 3px 0;
    display: inline-block;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
}

.chevrondown:nth-child(odd) {
    animation: pulse 500ms ease infinite alternate;
}

.chevrondown:nth-child(even) {
    animation: pulse 500ms ease infinite alternate 250ms;
}

@keyframes pulse {
    from {
        opacity: 0;
    }
    to {
        opacity: 0.5;
    }
}
</style>