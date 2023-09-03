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
import gachya from "../lib/gachyaAlgorithm";
const resultList = ref<string[]>([]);
const blueList = ref(['b1', 'b2', 'b3', 'b4', 'b5']);
const purpleList = ref(['纸牌屋', '占星', '主角之星', 'Q版世界']);
const godenList = ref();
const counter = reactive({
    godenCount: 0,
    purpleCount: 0
})
function randomGetOneFromList(list: string[]) {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
}
function gachyaOne() {
    const resultNum = gachya(counter.godenCount, counter.purpleCount);
    switch (resultNum) {
        case 0:
            counter.purpleCount++;
            counter.godenCount = 0;
            const godenResult = randomGetOneFromList(godenList.value);
            resultList.value.push(godenResult);
            break;
        case 1:
            counter.godenCount++;
            counter.purpleCount = 0;
            const purpleResult = randomGetOneFromList(purpleList.value);
            resultList.value.push(purpleResult);
            break;
        case 2:
            counter.godenCount++;
            counter.purpleCount++;
            const blueResult = randomGetOneFromList(blueList.value);
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