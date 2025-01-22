/**
 * 用户角色枚举
 */
export enum USER_ROLE_ENUM {
  ADMIN = 'admin',
  USER = 'user',
  BAN = 'ban',
}

/**
 * 用户角色枚举
 */
export const USER_ROLE_MAP = {
  [USER_ROLE_ENUM.ADMIN]: {
    text: '管理员',
    value: USER_ROLE_ENUM.ADMIN,
    color: 'processing',
  },
  [USER_ROLE_ENUM.USER]: {
    text: '普通用户',
    value: USER_ROLE_ENUM.USER,
    color: 'success',
  },
  [USER_ROLE_ENUM.BAN]: {
    text: '封禁',
    value: USER_ROLE_ENUM.BAN,
    color: 'error',
  },
};

