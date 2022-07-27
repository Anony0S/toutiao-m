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
			name: "layout",
			component: () => import('@/views/layout')
		}
	]
})