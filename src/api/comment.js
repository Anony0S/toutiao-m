import request from "@/utils/reqest";

// 对文章或者评论进行评论
export const publishComment = (data) =>
	request({
		method: "POST",
		url: "/v1_0/comments",
		data,
	});

// 获取文章评论
export const getComments = (params) =>
	request({
		url: "/v1_0/comments",
		params,
	});

// 对评论或评论回复点赞
export const giveLike = (id) =>
	request({
		method: "POST",
		url: "/v1_0/comment/likings",
		data: {
			target: id,
		},
	});

// 取消对评论或评论回复点赞
export const cancelLike = (id) =>
	request({
		method: "DELETE",
		url: "/v1_0/comment/likings/" + id,
	});
