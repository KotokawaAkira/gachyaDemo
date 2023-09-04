import { GachyaConfiguration } from "../config/gachya-config.ts";
import { Item } from "../type/item.ts";
import GachyaConfig from "../config/gachya-config.json";
const gachyaConfig = GachyaConfig as GachyaConfiguration;
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
  if (godenCount >= gachyaConfig.godenLast - 1) return 0; // 金色计数器触发保底
  else if (purpleCount >= gachyaConfig.purpleLast - 1) {
    // 紫色计数器超过9触发保底
    return 1;
  }
  return resultMapping(gachyaNum);
}
/**
 * 传入gachya方法抽出的类型，从列表中抽取物品
 * @param type 0:金 1:紫 2:蓝
 * @param unUpCount 已获得的非up数量
 * @returns 抽取到的物品
 */
function randomGetFromList(type: 0 | 1 | 2, unUpCount?: number) {
  let list: Item[]; // 初始化总池子
  let upList: Item[]; // 初始化up池子
  let unupList: Item[]; // 初始化非up池子
  let unUpMax: number;
  switch (type) {
    case 0:
      unupList = godenUnupList; // 非up金池子
      upList = gachyaConfig.godenUp; // 金up池子
      list = gachyaConfig.godenList; // 金池子
      unUpMax = gachyaConfig.godenUnupMax; // 金色最大非up次数
      break;
    case 1:
      unupList = purpleUnupList; // 非up紫池子
      upList = gachyaConfig.purpleUp; // 紫up池子
      list = gachyaConfig.purpleList; // 紫池子
      unUpMax = gachyaConfig.purpleUnupMax; // 紫色最大非up次数
      break;
    case 2:
      const index = Math.floor(Math.random() * gachyaConfig.blueList.length);
      return gachyaConfig.blueList[index]; // 随机抽取一个蓝色并返回
  }

  const randomNum = Math.random() * 100; // 随机一个数
  if (
    randomNum < gachyaConfig.upProbability * 100 ||
    (unUpCount !== undefined && unUpCount >= unUpMax)
  ) {
    // 随机数处于up区间
    const index = Math.floor(Math.random() * upList.length); // 随机输出up项目
    upList[index].up = true;
    return upList[index];
  } else {
    // 非up区间
    const index = Math.floor(Math.random() * unupList.length); // 随机抽取一个非up项目
    unupList[index].up = false;
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
    num <
      gachyaConfig.purpleProbability * 100 + gachyaConfig.godenProbability * 100
  ) {
    return 1;
  } else return 2; // 剩下的是蓝色区间
}
/**
 * 初始化非up池子
 * @param upList up池子
 * @param list 总池子
 */
function initUnupList(upList: Item[], list: Item[]) {
  let unupList: Item[] = []; // 初始化非up池子
  unupList = list.filter((el) => !upList.some((item) => el.name === item.name));
  return unupList;
}
export { gachya, randomGetFromList };
