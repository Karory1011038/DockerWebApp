<template>
    <div>{{ localizedText.hello + `, ${userName}.` }}</div>
    <div>{{ localizedText.welcome }}</div>
    <div class="container">
        <div class="row">
            <div class="content">
                <h2 class="text_shadows">hey</h2>
            </div>
            <div class="content">
                <h2 class="newAnima">Weed Space</h2>
            </div>
            <div class="col-md-12 text-center">
                <h3 class="animate-charcter">Weed Space</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import telegram from '../telegram/telegram'
import {computed, onMounted} from "vue";
///Text
import {text} from '../assets/text'

const language = computed(() => {
    return userStore.getLang;
});
const localizedText = computed(() => text[language.value])
///TEXT

import {useUserStore} from "../stores/user";

const userStore = useUserStore()
const userName = computed(() => {
    return userStore.getFullName;
});

const {initHomeButtons, tgUserData} = telegram()

onMounted(() => {
    userStore.setUser(tgUserData)
})

initHomeButtons()
</script>

<style>



.newAnima{
  margin: auto;
  font-size: 3.5rem;
  font-weight: 300;
  animation: lights 5s 750ms linear infinite;
}

@keyframes lights {
  0% {
    color: hsl(230, 40%, 80%);
    text-shadow:
      0 0 1em hsla(320, 100%, 50%, 0.2),
      0 0 0.125em hsla(320, 100%, 60%, 0.3),
      -1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
      1em 0.125em 0.5em hsla(200, 100%, 60%, 0);
  }

  30% {
    color: hsl(230, 80%, 90%);
    text-shadow:
      0 0 1em hsla(320, 100%, 50%, 0.5),
      0 0 0.125em hsla(320, 100%, 60%, 0.5),
      -0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
      0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4);
  }

  40% {
    color: hsl(230, 100%, 95%);
    text-shadow:
      0 0 1em hsla(320, 100%, 50%, 0.5),
      0 0 0.125em hsla(320, 100%, 90%, 0.5),
      -0.25em -0.125em 0.125em hsla(40, 100%, 60%, 0.2),
      0.25em 0.125em 0.125em hsla(200, 100%, 60%, 0.4);
  }

  70% {
    color: hsl(230, 80%, 90%);
    text-shadow:
      0 0 1em hsla(320, 100%, 50%, 0.5),
      0 0 0.125em hsla(320, 100%, 60%, 0.5),
      0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
      -0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4);
  }

  100% {
    color: hsl(230, 40%, 80%);
    text-shadow:
      0 0 1em hsla(320, 100%, 50%, 0.2),
      0 0 0.125em hsla(320, 100%, 60%, 0.3),
      1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
      -1em 0.125em 0.5em hsla(200, 100%, 60%, 0);
  }

}

body {
  margin: 0;
  font: 100% / 1.5 Raleway, sans-serif;
  color: hsl(230, 100%, 95%);
  background: linear-gradient(135deg, hsl(230, 40%, 12%), hsl(230, 20%, 7%)) !important;
  height: 100vh;
  display: flex;
}

</style>