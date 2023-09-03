import { GachyaConfiguration } from "../config/gachya-config.ts";
import GachyaConfig from "../config/gachya-config.json";
const gachyaConfig: GachyaConfiguration = GachyaConfig;
/**
 * @param godenCount 金色已抽取数量
 * @param purpleCount 紫色已抽取数量
 * @returns 
 */
function gachya(godenCount: number = 0, purpleCount: number = 0) {
  const gachyaNum = Math.random() * 100;
  
  if (godenCount >= 79) return 0;// 金色计数器超过79触发保底
  else if (purpleCount >= 9) {// 紫色计数器超过9触发保底
    return 1;
  }
  return resultMapping(gachyaNum);
}
function randomGetGodenFromList(list: string[]) {
    const upCount = gachyaConfig.godenUp.length;// up物品个数
    const total = upCount *2 +list.length-upCount;// 总份数
    const one = 100/total;// 每一份所占百分比；
    const randomNum = Math.random() *100;
    
    
    
}
/**
 * @param num 随机数
 * @returns 0:金色 1:紫色 2:蓝色
 */
function resultMapping(num: number) {
  if (num < gachyaConfig.godenProbability * 100) {// 随机数落到金色区间
    return 0;
  } else if (// 随机数落到紫色区间
    num >= gachyaConfig.godenProbability * 100 &&
    num < gachyaConfig.purpleProbability + gachyaConfig.godenProbability * 100
  ) {
    return 1;
  } else return 2;// 剩下的是蓝色区间
}
export default gachya;
