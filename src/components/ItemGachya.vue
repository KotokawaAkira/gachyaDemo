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
                <button @click="gachyaOne(true)">单抽</button>
                <button @click="gachyaTen">十连</button>
                <button @click="clear">清空</button>
                <button @click="showDialog = true">抽卡结果</button>
            </div>
            <div class="tips">
                <div>金色概率: <span style="color: #e5c07b;">{{ gachyaConfig.godenProbability * 100 }}%</span> | 紫色概率: <span
                        style="color: #c678dd;">{{ gachyaConfig.purpleProbability * 100 }}%</span> |
                    up概率: <span style="color: #e05851;">{{ gachyaConfig.upProbability * 100 }}%</span> |
                    金色保底:<span style="color: #e05851;">{{ gachyaConfig.godenLast }}次</span> | 紫色保底:<span
                        style="color: #e05851;">{{ gachyaConfig.purpleLast }}次</span>
                </div>
                <div class="up-list">
                    当前UP: <span style="color: #e5c07b;" v-for="item in gachyaConfig.godenUp" :key="item.name">{{ item.name
                    }}</span>
                    <span style="color: #c678dd;" v-for="item in gachyaConfig.purpleUp">{{ item.name }}</span>
                </div>
                <div>
                    总抽取次数:<span style="color: #e05851;">{{ counter.totalCount }}</span> 已抽<span style="color: #e5c07b;">{{
                        counter.godenCount }}</span>次未出金,<span style="color: #c678dd;">{{
        counter.purpleCount }}</span>次未出紫
                </div>

                <div>
                    金色已抽<span style="color: #e5c07b;">{{ counter.godenUnupCount }}</span>次未up,紫色已抽<span
                        style="color: #c678dd;">{{ counter.purpleUnupCount }}</span>次未up
                </div>
            </div>
        </div>
        <section style="position: fixed;">
            <transition name="fade">
                <div v-if="showDialog" class="mask" @click="showDialog = false"></div>
            </transition>
            <transition name="show">
                <div class="dialog" v-if="showDialog">
                    <div class="show-detail">
                        <div class="s-title">抽卡结果</div>
                        <div class="show-main">
                            <section class="purple-section">
                                <div>紫色</div>
                                <div class="detail-list">
                                    <span style="color: #c678dd;" v-for="item in ownItems.purpleList"> [{{ item.name }}]
                                    </span>
                                </div>
                            </section>
                            <section class="goden-section">
                                <div>金色</div>
                                <div class="detail-list">
                                    <span style="color: #e5c07b;" v-for="item in ownItems.godenList"> [{{ item.name }}]
                                    </span>
                                </div>
                            </section>
                        </div>
                        <div class="confirm-option">
                            <button @click="showDialog = false">确定</button>
                        </div>
                    </div>
                </div>
            </transition>
        </section>
    </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { gachya, randomGetFromList } from "../lib/gachyaAlgorithm";
import { GachyaConfiguration } from "../config/gachya-config.ts";
import { Item } from "../type/item.ts";
import GachyaConfig from "../config/gachya-config.json";
const gachyaConfig = GachyaConfig as GachyaConfiguration;
// 结果列表
const resultList = ref<Item[]>([]);
// 所有已抽取物品(金、紫)
const ownItems = reactive<{ godenList: Item[], purpleList: Item[] }>({
    godenList: [],
    purpleList: []
});
// 计数器
const counter = reactive({
    godenCount: 0,
    purpleCount: 0,
    godenUnupCount: 0,
    purpleUnupCount: 0,
    totalCount: 0
});
const showDialog = ref(false);
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
            ownItems.godenList.push(godenResult);
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
            ownItems.purpleList.push(purpleResult);
            break;
        case 2:
            counter.godenCount++;
            counter.purpleCount++;
            const blueResult = randomGetFromList(2);
            resultList.value.push(blueResult);
            break;
    }
    counter.totalCount++;
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
/**
 * 清空
 */
function clear() {
    resultList.value = [];
    ownItems.godenList = [];
    ownItems.purpleList = [];
    counter.godenCount = 0;
    counter.godenUnupCount = 0;
    counter.purpleCount = 0;
    counter.purpleUnupCount = 0;
    counter.totalCount = 0;
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
    min-height: 650px;
    min-width: 1280px;

    .result {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
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

        .btns {
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

            .up-list {
                span {
                    padding: 0 5px;
                    display: inline-block;
                }
            }

        }
    }

    .dialog {
        position: fixed;


        .show-detail {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 60vw;
            background-color: var(--bgc);
            color: var(--c_text);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 25px;
            box-sizing: border-box;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0px 0px 12px rgba(0, 0, 0, .72);

            .s-title {
                font-size: 24px;
            }

            .show-main {
                width: 100%;

                section {
                    padding: 15px 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;

                    .detail-list {
                        max-height: 200px;
                        overflow-y: auto;
                    }
                }
            }

            .confirm-option {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                padding: 0 20px;
                box-sizing: border-box;

            }
        }
    }

    .mask {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        background-color: rgba($color: #232323, $alpha: .6);
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

// 抽卡统计界面切换动画
.show-enter-from,
.show-leave-to {
    opacity: 0.0;
    transform: scale(.3);
}

.show-enter-to,
.show-leave-from {
    opacity: 1.0;
    transform: scale(1.0);
}

.show-enter-active,
.show-leave-active {
    transition: all .3s ease-in-out;
}

// 详细界面背景动画
.fade-enter-from,
.fade-leave-to {
    opacity: 0.0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1.0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .3s ease-in-out;
}
</style>