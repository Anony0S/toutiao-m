// API 汇总

import {
	login,
	sendSMS,
	userInfo,
	getUserProfile,
	updateAvator,
	changeProfile,
	followUser,
	cancelFollow,
} from "./users";
import {
	getChannels,
	getUserChannels,
	setUserChannels,
	delUserChannel,
} from "./channels";
import {
	getArticleList,
	getArticle,
	collectArticle,
	cancleCollect,
	setLike,
	setDislike,
} from "./news";
import { searchHint, searchResaults } from "./search";
import { publishComment, getComments, giveLike, cancelLike } from "./comment";

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

// 获取新闻详情
export const getArticleAPI = getArticle;

// 获取用户个人资料
export const getUserProfileAPI = getUserProfile;

// 上传头像
export const updateAvatorAPI = updateAvator;

// 编辑用户个人资料
export const changeProfileAPI = changeProfile;

// 对文章或者评论进行评论
export const publishCommentAPI = publishComment;

// 获取评论或评论回复
export const getCommentsAPI = getComments;

// 关注用户
export const followUserAPI = followUser;

// 取关用户
export const cancelFollowAPI = cancelFollow;

// 收藏文章
export const collectArticleAPI = collectArticle;

// 取消收藏文章
export const cancleCollectAPI = cancleCollect;

// 对文章点赞
export const setLikeAPI = setLike;

// 取消文章点赞
export const setDislikeAPI = setDislike;

// 对评论或评论回复点赞
export const giveLikeAPI = giveLike;

// 取消对评论或评论回复点赞
export const cancelLikeAPI = cancelLike;
