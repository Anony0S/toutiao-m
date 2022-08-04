import request from "@/utils/reqest";

// 获取联想建议
export const searchHint = (q) =>
	request({
		url: "/v1_0/suggestion",
		params: {
			q,
		},
	});

// 获取搜索结果
export const searchResaults = (params) =>
	request({
		url: "/v1_0/search",
		params,
	});
