import { GachyaConfiguration } from "../config/gachya-config.ts";
import GachyaConfig from "../config/gachya-config.json";
const gachyaConfig: GachyaConfiguration = GachyaConfig;
// 初始化全局非up金池子
const godenUnupList = initUnupList(
  gachyaConfig.godenUp,
  gachyaConfig.godenList
);
// 初始化全局非up紫池子
const purpleUnupList = initUnupList(
  gachyaConfig.purpleUp,
  gachyaConfig.purpleList
);
/**
 * 抽取物品
 * @param godenCount 金色已抽取数量
 * @param purpleCount 紫色已抽取数量
 * @returns 0:金 1:紫 2:蓝
 */
function gachya(godenCount: number = 0, purpleCount: number = 0) {
  const gachyaNum = Math.random() * 100;
  // console.log(gachyaNum);
  if (godenCount >= 79) return 0; // 金色计数器超过79触发保底
  else if (purpleCount >= 9) {
    // 紫色计数器超过9触发保底
    return 1;
  }
  return resultMapping(gachyaNum);
  
}
/**
 * 传入gachya方法抽出的类型，从列表中抽取物品
 * @param type 0:金 1:紫 2:蓝
 * @returns 抽取到的物品
 */
function randomGetFromList(type: 0 | 1 | 2) {
  let list: string[]; // 初始化总池子
  let upList: string[]; // 初始化up池子
  let unupList: string[];// 初始化非up池子
  switch (type) {
    case 0:
      unupList = godenUnupList; // 非up金池子
      upList = gachyaConfig.godenUp; // 金up池子
      list = gachyaConfig.godenList; // 金池子
      break;
    case 1:
      unupList = purpleUnupList; // 非up紫池子
      upList = gachyaConfig.purpleUp; // 紫up池子
      list = gachyaConfig.purpleList; // 紫池子
      break;
    case 2:
      const index = Math.floor(Math.random() * gachyaConfig.blueList.length);
      return gachyaConfig.blueList[index]; // 随机抽取一个蓝色并返回
  }

  const randomNum = Math.random() * 100; // 随机一个数
  if (randomNum < gachyaConfig.upProbability * 100) {
    // 随机数处于up区间
    const index = Math.floor(Math.random() * upList.length); // 随机输出up项目
    return upList[index];
  } else {
    // 非up区间
    const index = Math.floor(Math.random() * unupList.length);// 随机抽取一个非up项目
    return unupList[index]; 
  }
}
/**
 * 判断获得的品质
 * @param num 随机数
 * @returns 0:金色 1:紫色 2:蓝色
 */
function resultMapping(num: number) {
  if (num < gachyaConfig.godenProbability * 100) {
    // 随机数落到金色区间
    return 0;
  } else if (
    // 随机数落到紫色区间
    num >= gachyaConfig.godenProbability * 100 &&
    num < gachyaConfig.purpleProbability * 100 + gachyaConfig.godenProbability * 100
  ) {
    return 1;
  } else return 2; // 剩下的是蓝色区间
}
/**
 * 初始化非up池子
 * @param upList up池子
 * @param list 总池子
 */
function initUnupList(upList: string[], list: string[]) {
  const unupList: string[] = []; // 初始化非up池子

  for (let el of list) {
    if (!upList.includes(el)) unupList.push(el);
  }
  return unupList;
}
export {gachya,randomGetFromList};
