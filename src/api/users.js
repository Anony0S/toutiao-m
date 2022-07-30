// 登录页面 请求

import request from "@/utils/reqest";

// 用户认证
export const login = data => request({
	method: "post",
	url: "/v1_0/authorizations",
	data,
})

// 发送验证码
export const sendSMS = params => request({
	url: "/v1_0/sms/codes/:mobile",
	params
})

// 获取用户自己信息
export const userInfo = () => request({
	url: "/v1_0/user",
})