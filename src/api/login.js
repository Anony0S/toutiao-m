// 登录页面 请求

import { request } from "@/utils/reqest";

// 用户认证
export const login = data => request({
	method: "post",
	url: "/app/v1_0/authorizations",
	data,
})

// 发送验证码
export const sendSMS = params => request({
	url: "/app/v1_0/sms/codes/:mobile",
	params
})