// 新闻
import request from "@/utils/reqest";

// 获取文章新闻推荐
export const getArticleList = (params) =>
	request({
		url: "/v1_0/articles",
		params,
	});

// 获取新闻详情
export const getArticle = (article_id) =>
	request({
		url: "/v1_0/articles/" + article_id,
	});
