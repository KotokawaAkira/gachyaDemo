<template>
  <div>
    <!-- <CircleGachya/> -->
    <ItemGachya/>
    <!-- <div class="outer">
      <div class="f"></div>
      <div class="b"></div>
    </div> -->
  </div>
</template>
<script setup lang="ts">
// import CircleGachya from './components/CircleGachya.vue';
import ItemGachya from "./components/ItemGachya.vue"
</script>
<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.outer {
  height: 100px;
  width: 50px;
  perspective: 1000px;
  position: relative;
  transform-style: preserve-3d;

  .f {
    background-color: blue;
    position: absolute;
    height: 100%;
    width: 100%;

    transform: translateZ(1px);
  }

  .b {
    background-color: red;
    position: absolute;
    height: 100%;
    width: 100%;
  }
}
</style>
