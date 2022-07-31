import request from "@/utils/reqest";

export const getChannels = () =>
	request({
		url: "/v1_0/channels",
	});
