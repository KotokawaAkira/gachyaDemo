<template>
    <div class="item-gachya">
        <div>
            <button @click="gachyaOne">一次</button><button @click="gachyaTen">十次</button>
            <div>已抽{{ counter.godenCount }}未出金,{{ counter.purpleCount }}未出紫</div>
        </div>
        <section class="result">
            <div v-for="item in resultList" :key="item">{{ item }}</div>
        </section>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import {gachya,randomGetFromList} from "../lib/gachyaAlgorithm";
const resultList = ref<string[]>([]);
const counter = reactive({
    godenCount: 0,
    purpleCount: 0
})

function gachyaOne() {
    const resultNum = gachya(counter.godenCount, counter.purpleCount);
    switch (resultNum) {
        case 0:
            counter.purpleCount++;
            counter.godenCount = 0;
            const godenResult = randomGetFromList(0);
            resultList.value.push(godenResult);
            break;
        case 1:
            counter.godenCount++;
            counter.purpleCount = 0;
            const purpleResult = randomGetFromList(1);
            resultList.value.push(purpleResult);
            break;
        case 2:
            counter.godenCount++;
            counter.purpleCount++;
            const blueResult = randomGetFromList(2);
            resultList.value.push(blueResult);
            break;
    }
}
function gachyaTen(){
    let count = 0;
    while(count<10){
        gachyaOne();
        count++;
    }
}
</script>
<style lang="scss">
.item-gachya{
    .result{
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        width: 500px;
    }
}
</style>