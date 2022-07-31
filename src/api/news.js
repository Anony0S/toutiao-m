// 新闻
import request from "@/utils/reqest";

// 获取文章新闻推荐
export const getArticleList = (params) =>
	request({
		url: "/v1_0/articles",
		params,
	});
