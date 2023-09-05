import {Item} from "../type/item.ts";
type GachyaConfiguration = {
    godenProbability:number//金色概率
    purpleProbability:number
    upProbability:number
    godenLast:number// 金色保底次数
    purpleLast:number
    godenUnupMax:number// 获得金色非保底最大次数(例:1为两次必定获得up)
    purpleUnupMax:number;
    godenList:Item[]
    purpleList:Item[]
    blueList:Item[]
    godenUp:Item[]
    purpleUp:Item[]
}
export type {GachyaConfiguration}