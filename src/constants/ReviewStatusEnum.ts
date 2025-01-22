/**
 * 用户角色枚举
 */
export enum REVIEW_STATUS_ENUM {
  REVIEWING = 0,
  PASS = 1,
  REJECT = 2,
}

/**
 * 用户角色枚举
 */
export const REVIEW_STATUS_MAP = {
  [REVIEW_STATUS_ENUM.REVIEWING]: {
    text: '审核中',
    value: REVIEW_STATUS_ENUM.REVIEWING,
    color: 'processing',
  },
  [REVIEW_STATUS_ENUM.PASS]: {
    text: '审核通过',
    value: REVIEW_STATUS_ENUM.PASS,
    color: 'success',
  },
  [REVIEW_STATUS_ENUM.REJECT]: {
    text: '拒绝',
    value: REVIEW_STATUS_ENUM.REJECT,
    color: 'error',
  },
};
