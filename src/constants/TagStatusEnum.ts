/**
 * 标签状态枚举
 */
export enum TAG_STATUS_ENUM {
  NOT_IS_PARENT = 0,
  IS_PARENT = 1,
}

/**
 * 标签状态枚举
 */
export const tagStatus = {
  [TAG_STATUS_ENUM.NOT_IS_PARENT]: {
    text: '不是父标签',
    value: TAG_STATUS_ENUM.NOT_IS_PARENT
  },
  [TAG_STATUS_ENUM.IS_PARENT]: {
    text: '是父标签',
    value: TAG_STATUS_ENUM.IS_PARENT
  }
}
