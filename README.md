使用Vite+Vue+TypeScript构建

# 1.配置文件

配置文件路径：**src/config/gachya-config.json**

## 1.1 参数解析：

| 参数名               | 参数类型   | 说明                       |
| ----------------- | ------ | ------------------------ |
| godenProbability  | number | 金色概率,不能大于1               |
| purpleProbability | number | 紫色概率,不能大于1，且与金色概率之和不能大于1 |
| upProbability     | number | up概率,不能大于1               |
| godenLast         | number | 金色保底次数                   |
| purpleLast        | number | 紫色保底次数                   |
| godenUnupMax      | number | 金色最大非up次数                |
| purpleUnupMax     | number | 紫色最大非up次数                |
| godenList         | Item[] | 金色池子                     |
| purpleList        | Item[] | 紫色池子                     |
| blueList          | Item[] | 蓝色池子                     |
| godenUp           | Item[] | 金色up池子,该池子必须被金色池子包含      |
| purpleUp          | Item[] | 紫色up池子,该池子必须被紫色池子包含      |

## 1.2 Item类型解析

| 属性   | 类型      | 必填  | 说明      | 例                         |
| ---- |:------- | --- | ------- | ------------------------- |
| type | 0\|1\|2 | 是   | 物品品质    | 0:金色 1:紫色 2:蓝色            |
| name | string  | 是   | 物品名称    | "浪漫华彩"                    |
| img  | string  | 否   | 物品图片url | 网络图片url；本地图片请存放到public目录下 |
| up   | boolean | 否   | 是否为up物品 | 略                         |

JSON配置案例

```json
{
  "godenProbability": 0.006,
  "purpleProbability": 0.1,
  "upProbability": 0.75,
  "godenLast": 80,
  "purpleLast": 10,
  "godenUnupMax": 1,
  "purpleUnupMax": 1,
  "godenList":[{
      "type": 0,
      "name": "北极星-绯红疗愈",
      "img": "https://patchwiki.biligame.com/images/klbq/a/a5/fvdwpikd2rr7jscyqzx0ziiu7c033k8.png"
    }],
  "purpleList":[{
      "type": 1,
      "name": "警探-夏日派对",
      "img": "/imgs/weapons/警探-夏日派对.png"
    }],
  "blueList":[{
      "type": 2,
      "name": "警探-彩斑",
      "img": "/imgs/weapons/警探-彩斑.png"
    }],
  "godenUp":[{
      "type": 0,
      "name": "北极星-绯红疗愈",
      "img": "/imgs/weapons/北极星-绯红疗愈.png"
    }],
  "purpleUp":[{
      "type": 1,
      "name": "警探-夏日派对",
      "img": "/imgs/weapons/警探-夏日派对.png"
    }]
}
```

本例子中：金色概率0.006；紫色概率0.1；up概率0.75；金色保底80次；紫色保底10次；金色最大能歪1次，紫色最大能歪1次。

本地文件完整路径：/public/imgs/weapons/*.png

# 2.抽卡机制

抽卡机制位于**src/lib/gachyaAlgorithm.ts**。

请自行查看。
