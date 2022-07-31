// API 汇总

import { login, sendSMS, userInfo } from "./users";
import { getChannels } from "./channels";
import { getArticleList } from "./news";

// 用户认证 API
export const loginAPI = login;

// 发送验证码 API
export const sendSMSAPI = sendSMS;

// 获取用户个人资料
export const userInfoAPI = userInfo;

// 获取所有频道列表
export const getChannelsAPI = getChannels;

// 获取文章新闻推荐
export const getArticleListAPI = getArticleList;
