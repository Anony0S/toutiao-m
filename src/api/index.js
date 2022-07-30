// API 汇总

import { login, sendSMS, userInfo } from "./users";

// 用户认证 API
export const loginAPI = login

// 发送验证码 API
export const sendSMSAPI = sendSMS

// 获取用户个人资料
export const userInfoAPI = userInfo