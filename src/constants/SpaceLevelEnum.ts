/**
 * 空间级别枚举
 */
export enum SPACE_LEVEL_ENUM {
  COMMON = 0,
  PROFESSIONAL = 1,
  FLAGSHIP = 2,
}

/**
 * 空间级别文本映射
 */
export const SPACE_LEVEL_MAP = {
  [SPACE_LEVEL_ENUM.COMMON]: {
    text: '普通版',
    value: SPACE_LEVEL_ENUM.COMMON,
  },
  [SPACE_LEVEL_ENUM.PROFESSIONAL]: {
    text: '专业版',
    value: SPACE_LEVEL_ENUM.PROFESSIONAL,
  },
  [SPACE_LEVEL_ENUM.FLAGSHIP]: {
    text: '旗舰版',
    value: SPACE_LEVEL_ENUM.PROFESSIONAL,
  },
};
