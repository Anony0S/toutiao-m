import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

export default new VueRouter({
	routes: [
		{
			path: "/login",
			name: "login",
			component: () => import("@/views/login")
		},
		{
			path: "/",
			redirect: "/home",	//默认页面，名字和路径都可以
			component: () => import('@/views/layout'),
			children: [
				{
					path: "home",	//默认子路由
					name: "home",
					component: () => import("@/views/home")
				},
				{
					path: "question",
					name: "question",
					component: () => import("@/views/question")
				},
				{
					path: "movies",
					name: "movies",
					component: () => import("@/views/movies")
				},
				{
					path: "my",
					name: "my",
					component: () => import("@/views/my")
				}
			]
		}
	]
})