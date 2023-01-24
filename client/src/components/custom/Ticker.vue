<template>
  <div>
    <div class="ticker-line">
      <div class="ticker-text" :style="{transform: `translateX(${tickerPosition}%)`}">
        {{tickerText}}
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
  let tickerText = ref('This is the ticker text')
  let tickerPosition = ref(100)
  let tickerInterval
  function handleTicker(){
    tickerPosition.value-=1000;
    if (tickerPosition.value < -1000) {
      tickerPosition.value = 1000;
    }
  }
  onMounted(()=>{
    tickerInterval = setInterval(handleTicker, 4)
  })
  onBeforeUnmount(()=>{
    clearInterval(tickerInterval);
  })
</script>

<style>
.ticker-line {
  overflow: hidden;
  white-space: nowrap;
}

.ticker-text {
  display: inline-block;
  animation: ticker 60s linear infinite;
}

@keyframes ticker {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
