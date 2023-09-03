<template>
   <div class="circle-main">
    <div class="left"></div>
    <div class="right"></div>
   </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss">
$tjx:#d3b4f4;
$ava:#9ac8e2;
.circle-main{
    height: 500px;
    width: 500px;
    background-image: linear-gradient(45deg,$tjx,$ava);
    border-radius: 250px;
    position: relative;
    overflow: hidden;
}
</style>