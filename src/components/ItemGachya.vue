<template>
    <div class="item-gachya">
        <section class="result">
            <!-- 此处delay_show为显示延迟 -->
            <div class="item" :style="`--delay_show:${0.1 * index}s;`" v-for="(item, index) in resultList"
                :key="item.name + Math.random()">
                <!-- 此处delay_rotate为卡片翻转延迟 -->
                <div class="item-inner" :style="`--delay_rotate:${.5 * index + 1.5}s;`">
                    <div class="item-inner-back" :style="`--bgc:${getBGColorForItem(item.type)};`"></div>
                    <div class="item-inner-forward">{{ item.name }}</div>
                </div>
            </div>
        </section>
        <div>
            <button @click="gachyaOne(true)">一次</button><button @click="gachyaTen">十次</button>
            <div>已抽{{ counter.godenCount }}未出金,{{ counter.purpleCount }}未出紫</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { gachya, randomGetFromList } from "../lib/gachyaAlgorithm";
type item = {
    type: 0 | 1 | 2;
    name: string
}
const resultList = ref<item[]>([]);// 结果列表
const counter = reactive({// 计数器
    godenCount: 0,
    purpleCount: 0
})
/**
 * 抽取一次物品
 * @param once 是否是单抽
 */
function gachyaOne(once: boolean) {
    if (once)// 单抽清楚所有已存在的卡片
        resultList.value.splice(0, 10);
    const resultNum = gachya(counter.godenCount, counter.purpleCount);// 进行一次抽取
    switch (resultNum) {
        /** 0:金 1:紫 2:蓝 **/
        case 0:
            counter.purpleCount++;// 紫色计数器+1
            counter.godenCount = 0;// 金色计数器归零
            const godenResult = randomGetFromList(0);// 从金卡池抽取物品
            resultList.value.push({ type: 0, name: godenResult });// 抽取到的物品添加进结果列表
            break;
        case 1:
            counter.godenCount++;
            counter.purpleCount = 0;
            const purpleResult = randomGetFromList(1);
            resultList.value.push({ type: 1, name: purpleResult });
            break;
        case 2:
            counter.godenCount++;
            counter.purpleCount++;
            const blueResult = randomGetFromList(2);
            resultList.value.push({ type: 2, name: blueResult });
            break;
    }
}
/**
 * 抽十次
 */
function gachyaTen() {
    resultList.value.splice(0, 10);// 清除所有存在的卡片
    let count = 0;
    while (count < 10) {
        gachyaOne(false);
        count++;
    }
}
/**
 * 设置卡面颜色
 * @param type 物品类型
 */
function getBGColorForItem(type: number) {
    switch (type) {
        case 0:
            return "#e5c07b";
        case 1:
            return "#c678dd";
        case 2:
            return "#42a5f5";
    }
}
</script>
<style lang="scss">
$tjx: #d3b4f4;

.item-gachya {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    .result {
        display: flex;
        flex-wrap: wrap;
        width: 800px;
        height: 400px;
        margin-bottom: 20px;

        .item {
            box-sizing: border-box;
            width: 20%;
            height: 50%;
            padding: 10px;
            animation: show .5s ease var(--delay_show) forwards;
            opacity: 0;

            &-inner {
                border: 1px $tjx solid;
                height: 100%;
                position: relative;
                perspective: 1000px;
                transform-style: preserve-3d;
                animation: show_rotate .5s ease var(--delay_rotate) forwards;
                border-radius: 10px;

                &-forward {
                    border-radius: 10px;
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    background-color: #d3b4f4;
                    transform: rotateY(180deg);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                &-back {
                    border-radius: 10px;
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    transform: translateZ(1px);
                    background-color: var(--bgc);
                }
            }
        }
    }
}

@keyframes show {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes show_rotate {
    from {
        transform: rotateY(0deg);
    }

    to {
        transform: rotateY(180deg);
    }
}
</style>