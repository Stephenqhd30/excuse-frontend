/**
 * 用户角色枚举
 */
export enum ReviewStatus {
  REVIEWING = 0,
  PASS = 1,
  REJECT = 2,
}

/**
 * 用户角色枚举
 */
export const reviewStatusEnum = {
  [ReviewStatus.REVIEWING]: {
    text: '审核中',
    value: ReviewStatus.REVIEWING,
    color: 'processing',
  },
  [ReviewStatus.PASS]: {
    text: '审核通过',
    value: ReviewStatus.PASS,
    color: 'success',
  },
  [ReviewStatus.REJECT]: {
    text: '拒绝',
    value: ReviewStatus.REJECT,
    color: 'error',
  },
};
