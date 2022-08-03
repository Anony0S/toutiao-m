import Vue from "vue";
import VueRouter from "vue-router";
import { getItem } from "@/utils/auth";

import { Toast } from "vant";
Vue.use(Toast);

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: "/login",
			name: "login",
			component: () => import("@/views/login"),
			meta: { title: "登录" },
		},
		{
			path: "/",
			redirect: "/home", //默认页面，名字和路径都可以
			component: () => import("@/views/layout"),
			children: [
				{
					path: "home", //默认子路由
					name: "home",
					component: () => import("@/views/home"),
					meta: { title: "首页" },
				},
				{
					path: "question",
					name: "question",
					component: () => import("@/views/question"),
					meta: { title: "问答" },
				},
				{
					path: "movies",
					name: "movies",
					component: () => import("@/views/movies"),
					meta: { title: "视频" },
				},
				{
					path: "my",
					name: "my",
					component: () => import("@/views/my"),
					meta: { title: "我的" },
				},
			],
		},
		{
			path: "/message",
			name: "message",
			component: () => import("@/views/message"),
			meta: {
				// 是否需要鉴权
				isAth: true,
				title: "消息通知",
			},
		},
		{
			path: "/xiaozhi",
			name: "xiaozhi",
			component: () => import("@/views/xiaozhi"),
			meta: {
				// 是否需要鉴权
				isAth: true,
				title: "小智同学",
			},
		},
		{
			path: "/search",
			name: "search",
			component: () => import("@/views/search"),
		},
	],
});

// 使用前置路由守卫进行权限校验
// 注意：路由守卫必须放在 路由实例 抛出之前
router.beforeEach((to, from, next) => {
	if (to.meta.isAth) {
		if (getItem()) next();
		else Toast.fail("请登陆！");
	} else next();
});

// 使用后置路由守卫：更新页面标题
router.afterEach((to) => {
	document.title = to.meta.title || "黑马头条";
});

export default router;
