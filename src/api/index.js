// API 汇总

import { login, sendSMS, userInfo } from "./users";
import {
	getChannels,
	getUserChannels,
	setUserChannels,
	delUserChannel,
} from "./channels";
import { getArticleList } from "./news";
import { searchHint, searchResaults } from "./search";

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

// 获取用户频道列表
export const getUserChannelsAPI = getUserChannels;

// 设置用户的频道
export const setUserChannelsAPI = setUserChannels;

// 删除用户频道
export const delUserChannelAPI = delUserChannel;

// 获取联想建议
export const searchHintAPI = searchHint;

// 获取搜索结果
export const searchResaultsAPI = searchResaults;
