// 登录页面 请求


import { request } from "@/utils/reqest";
/**
 * 
 * @param {Object} data 手机号、验证码 
 * @returns Promise
 */
// 用户认证
export const login = data => request({
	method: "post",
	url: "/v1_0/authorizations",
	data,
})

/**
 * 
 * @param {Object} params 手机号 
 * @returns Promise
 */

// 发送验证码
export const sendSMS = params => request({
	url: "/v1_0/sms/codes/:mobile",
	params
})