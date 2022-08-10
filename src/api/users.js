// 登录页面 请求

import request from "@/utils/reqest";

// 用户认证
export const login = (data) =>
	request({
		method: "post",
		url: "/v1_0/authorizations",
		data,
	});

// 发送验证码
export const sendSMS = (mobile) =>
	request({
		url: "/v1_0/sms/codes/" + mobile,
	});

// 获取用户自己信息
export const userInfo = () =>
	request({
		url: "/v1_0/user",
	});

// 获取用户个人资料
export const getUserProfile = () =>
	request({
		url: "/v1_0/user/profile",
	});

// 上传头像
export const updateAvator = (file) => {
	const fm = new FormData();
	fm.append("photo", file);
	return request({
		url: "/v1_0/user/photo",
		method: "PATCH",
		data: fm,
	});
};

// 编辑用户个人资料
export const changeProfile = (data) =>
	request({
		method: "PATCH",
		url: "/v1_0/user/profile",
		data,
	});

// 关注用户
export const followUser = (id) =>
	request({
		method: "POST",
		url: "/v1_0/user/followings",
		data: {
			target: id,
		},
	});

// 取消关注
export const cancelFollow = (id) =>
	request({
		method: "DELETE",
		url: "/v1_0/user/followings/" + id,
	});
