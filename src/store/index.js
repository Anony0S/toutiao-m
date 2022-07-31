import Vue from "vue";
import Vuex from "vuex";
import { getItem, setItem } from "@/utils/auth"

Vue.use(Vuex)

export default new Vuex.Store({
	// 存储数据
	state: {
		// 一个对象，存储当前登录用户信息（token等数据）
		user: getItem()
	},
	// 操作数据
	mutations: {
		setUser(state, data) {
			state.user = data

			// 为了防止刷新丢失，我们需要把数据备份到本地存储
			setItem(state.user)
		}
	},
	// 响应组件中的动作
	actions: {

	}
})