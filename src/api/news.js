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

// 收藏文章
export const collectArticle = (id) =>
	request({
		method: "POST",
		url: "/v1_0/article/collections",
		data: {
			target: id,
		},
	});

// 取消收藏文章
export const cancleCollect = (id) =>
	request({
		method: "DELETE",
		url: "/v1_0/article/collections/" + id,
	});

// 对文章点赞
export const setLike = (id) =>
	request({
		method: "POST",
		url: "/v1_0/article/likings",
		data: {
			target: id,
		},
	});
// 取消文章点赞
export const setDislike = (id) =>
	request({
		method: "DELETE",
		url: "/v1_0/article/likings/" + id,
	});
