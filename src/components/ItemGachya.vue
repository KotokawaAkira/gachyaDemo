<template>
    <div class="item-gachya">
        <section class="result">
            <!-- 此处delay_show为显示延迟 -->
            <div class="item" :style="`--delay_show:${0.1 * index}s;`" v-for="(item, index) in resultList"
                :key="item.name + Math.random()">
                <!-- 此处delay_rotate为卡片翻转延迟 -->
                <div class="item-inner"
                    :style="`--delay_rotate:${.5 * index + 1.5}s;--bgc:${getBGColorForItem(item.type)};`">
                    <div class="item-inner-back"></div>
                    <div class="item-inner-forward" :style="`--url:url(${item.img})`">
                        <div class="title">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </section>
        <div class="options">
            <div class="btns">
                <button @click="gachyaOne(true)">一次</button><button @click="gachyaTen">十次</button>
            </div>
            <div class="tips">
                <div>
                    已抽<span style="color: #e5c07b;">{{ counter.godenCount }}</span>未出金,<span style="color: #c678dd;">{{ counter.purpleCount }}</span>未出紫
                </div>

                <div>
                    金色已抽<span style="color: #e5c07b;">{{ counter.godenUnupCount }}</span>次未up,紫色已抽<span style="color: #c678dd;">{{ counter.purpleUnupCount }}</span>次未up
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { gachya, randomGetFromList } from "../lib/gachyaAlgorithm";
import { Item } from "../type/item";
const resultList = ref<Item[]>([]);// 结果列表
const counter = reactive({// 计数器
    godenCount: 0,
    purpleCount: 0,
    godenUnupCount: 0,
    purpleUnupCount: 0
})
/**
 * 抽取一次物品
 * @param once 是否是单抽
 */
function gachyaOne(once: boolean) {
    if (once)// 单抽清除所有已存在的卡片
        resultList.value.splice(0, 10);
    const resultNum = gachya(counter.godenCount, counter.purpleCount);// 进行一次抽取
    switch (resultNum) {
        /** 0:金 1:紫 2:蓝 **/
        case 0:
            counter.purpleCount++;// 紫色计数器+1
            counter.godenCount = 0;// 金色计数器归零
            const godenResult = randomGetFromList(0, counter.godenUnupCount);// 从金卡池抽取物品
            if (godenResult.up)
                counter.godenUnupCount = 0;
            else
                counter.godenUnupCount++;
            resultList.value.push(godenResult);// 抽取到的物品添加进结果列表
            break;
        case 1:
            counter.godenCount++;
            counter.purpleCount = 0;
            const purpleResult = randomGetFromList(1, counter.purpleUnupCount);
            if (purpleResult.up)
                counter.purpleUnupCount = 0;
            else
                counter.purpleUnupCount++;
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
        width: 1280px;
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
                    background-color: #f8f8f8;
                    color: var(--bgc);
                    transform: rotateY(180deg);
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    background-image: var(--url);
                    background-position: center;
                    padding-top: 5px;
                    box-sizing: border-box;

                    .title {
                        backdrop-filter: blur(10px);
                        border-radius: 10px;
                        padding: 5px;
                    }
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

    .options {
        display: flex;
        flex-direction: column;
        align-items: center;
        .btns{
            display: flex;
            gap: 15px;
        }
        .tips {
            margin-top: 15px;
            padding: 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }
    }

}

// 卡片出现动画
@keyframes show {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

// 卡片翻转动画
@keyframes show_rotate {
    from {
        transform: rotateY(0deg);
    }

    to {
        transform: rotateY(180deg);
    }
}
</style>