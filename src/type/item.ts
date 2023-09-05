type Item = {
  type: 0 | 1 | 2; // 0:金 1:紫 2:蓝
  name: string;
  img?: string; // 图片url
  up?: boolean; // 是否up
};

export type { Item };
