import request from "@/utils/reqest";

// 获取所有频道列表
export const getChannels = () =>
	request({
		url: "/v1_0/channels",
	});

// 获取用户的频道列表
export const getUserChannels = () =>
	request({
		url: "/v1_0/user/channels",
	});

// 设置用户的频道
export const setUserChannels = (channel) =>
	request({
		method: "PATCH",
		url: "/v1_0/user/channels",
		data: {
			channels: [channel],
		},
	});

// 删除用户频道
export const delUserChannel = (channelId) =>
	request({
		method: "DELETE",
		url: "/v1_0/user/channels/" + channelId,
	});
